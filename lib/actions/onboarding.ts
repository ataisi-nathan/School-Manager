'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { schools, users } from '@/lib/db/schema';
import { auth } from '@/auth';

export async function completeOnboarding(formData: {
  schoolName: string;
  logoUrl?: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' };
  }

  // Basic input validation
  if (!formData.schoolName?.trim()) {
    return { success: false, error: 'School name is required.' };
  }

  try {
    // 1. Create school record (generates unique UUID automatically)
    const [newSchool] = await db
      .insert(schools)
      .values({
        name: formData.schoolName.trim(),
        logoUrl: formData.logoUrl || null,
      })
      .returning();

    // 2. Link school ID to the Admin User and mark onboarded
    await db
      .update(users)
      .set({
        schoolId: newSchool.id,
        isOnboarded: 'true', // Use true (boolean) if schema uses boolean('is_onboarded')
        role: 'admin',
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    return { 
      success: true, 
      schoolId: newSchool.id,
      schoolName: newSchool.name 
    };
  } catch (error) {
    console.error('Onboarding failed:', error);
    return { success: false, error: 'Failed to complete school setup.' };
  }
}
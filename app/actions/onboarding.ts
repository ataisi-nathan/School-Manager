'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function completeOnboarding(data: { schoolName?: string; role?: string }) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }

  try {
    await db
      .update(users)
      .set({
        isOnboarded: 'true',
        // Add additional onboarding fields here
      })
      .where(eq(users.id, session.user.id));

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update onboarding status.' };
  }
}
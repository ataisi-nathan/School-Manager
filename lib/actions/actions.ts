'use server';

import { db } from '@/lib/db';
import { users, students } from '@/lib/db/schema';
import { auth } from '@/auth';

export async function createStudentByAdmin(data: {
  fullName: string;
  email: string;
  grade: string;
  guardianName?: string;
  emergencyPhone?: string;
}) {
  const session = typeof auth === 'function' ? await auth() : null;
  const adminSchoolId = session?.user?.schoolId;

  if (!adminSchoolId) {
    return { success: false, error: 'Unauthorized: Admin is not assigned to a school.' };
  }

  try {
    // 1. Create login User record for the student
    const [studentUser] = await db
      .insert(users)
      .values({
        fullName: data.fullName,
        email: data.email,
        role: 'student',
        schoolId: adminSchoolId, // Binds student account to admin's school
        isOnboarded: 'true',
      })
      .returning();

    // 2. Create Student profile record
    const [studentProfile] = await db
      .insert(students)
      .values({
        userId: studentUser.id,
        schoolId: adminSchoolId,
        fullName: data.fullName,
        email: data.email,
        grade: data.grade,
        guardianName: data.guardianName,
        emergencyPhone: data.emergencyPhone,
      })
      .returning();

    return { success: true, student: studentProfile };
  } catch (error) {
    console.error('Error creating student account:', error);
    return { success: false, error: 'Failed to create student account.' };
  }
}
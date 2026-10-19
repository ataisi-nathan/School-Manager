'use server';

import { revalidatePath } from 'next/cache';
import { eq, desc, count, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { students, type StudentSelect } from '@/lib/db/schema';
import { auth } from '@/auth';
import { Student } from './_components/StudentTable';

// Type definition for Stats
export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  atRiskStudents: number;
  avgAttendance: string;
}

// Helper to map DB row to frontend component expectations
function mapToStudentUI(row: StudentSelect): Student {
  return {
    id: row.id,
    name: row.fullName,
    email: row.email,
    grade: row.grade,
    status: (row.status as 'Active' | 'At Risk' | 'Suspended') || 'Active',
    gpa: row.gpa,
    attendance: row.attendanceRate.endsWith('%') ? row.attendanceRate : `${row.attendanceRate}%`,
    guardian: row.guardianName,
    phone: row.emergencyphone,
    joinedDate: row.createdAt.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }),
  };
}

// 1. Fetch Students Action
export async function getStudents(): Promise<Student[]> {
  try {
    const session = typeof auth === 'function' ? await auth() : null;
    const schoolId = session?.user?.schoolId;

    if (!schoolId) {
      console.warn('getStudents called without an active school session.');
      return [];
    }

    const rows = await db
      .select()
      .from(students)
      .where(eq(students.schoolId, schoolId))
      .orderBy(desc(students.createdAt));

    return rows.map(mapToStudentUI);
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch students from the database.');
  }
}

// 2. Create Student Action
export async function createStudent(formData: {
  name: string;
  email: string;
  grade: string;
  guardian: string;
  phone: string;
}) {
  try {
    const session = typeof auth === 'function' ? await auth() : null;

    if (!session?.user?.schoolId) {
      return {
        success: false,
        error: 'Unauthorized: Missing active school session.',
      };
    }

    const [insertedStudent] = await db
      .insert(students)
      .values({
        fullName: formData.name,
        email: formData.email,
        grade: formData.grade,
        guardianName: formData.guardian,
        emergencyphone: formData.phone,
        gpa: '0.00',
        attendanceRate: '100%',
        status: 'Active',
        schoolId: session.user.schoolId,
      })
      .returning();

    revalidatePath('/dashboard/students');

    return {
      success: true,
      student: mapToStudentUI(insertedStudent),
    };
  } catch (error) {
    console.error('Error creating student:', error);
    return {
      success: false,
      error: 'Failed to create student record in database.',
    };
  }
}

// 3. Fetch Real-time Student Stats Action
export async function getStudentStats(): Promise<StudentStats> {
  try {
    const session = typeof auth === 'function' ? await auth() : null;
    const schoolId = session?.user?.schoolId;

    if (!schoolId) {
      return {
        totalStudents: 0,
        activeStudents: 0,
        atRiskStudents: 0,
        avgAttendance: '0%',
      };
    }

    const [result] = await db
      .select({
        total: count(students.id),
        active: count(sql`CASE WHEN ${students.status} = 'Active' THEN 1 END`),
        atRisk: count(sql`CASE WHEN ${students.status} = 'At Risk' THEN 1 END`),
        avgAttendanceRaw: sql<number>`
          AVG(NULLIF(REGEXP_REPLACE(${students.attendanceRate}, '[^0-9.]', '', 'g'), '')::numeric)
        `,
      })
      .from(students)
      .where(eq(students.schoolId, schoolId));

    const avgAttendanceNum = Math.round(Number(result?.avgAttendanceRaw || 0));

    return {
      totalStudents: result?.total ?? 0,
      activeStudents: result?.active ?? 0,
      atRiskStudents: result?.atRisk ?? 0,
      avgAttendance: `${avgAttendanceNum}%`,
    };
  } catch (error) {
    console.error('Error fetching student stats:', error);
    return {
      totalStudents: 0,
      activeStudents: 0,
      atRiskStudents: 0,
      avgAttendance: '0%',
    };
  }
}
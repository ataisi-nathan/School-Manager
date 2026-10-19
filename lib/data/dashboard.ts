import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users, schools } from '@/lib/db/schema';

export async function getUserAndSchoolData(userId: string) {
  const result = await db
    .select({
      userId: users.id,
      fullName: users.fullName,
      email: users.email,
      role: users.role,
      schoolId: users.schoolId,
      schoolName: schools.name,
      schoolLogoUrl: schools.logoUrl,
    })
    .from(users)
    .leftJoin(schools, eq(users.schoolId, schools.id))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0] || null;
}
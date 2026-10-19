// app/lib/dal.ts (Data Access Layer)
import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { db } from '@/lib/db';
import { schools, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

export const getUser = cache(async () => {
  // 1. Extract session cookie
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;

  // 2. Decrypt & verify JWT payload
  const session = await decrypt(sessionToken);
  if (!session?.userId) {
    return null;
  }

  try {
    // 3. Query user profile details from database
    const userList = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        schoolName: users.schoolName,
        schoolId: users.schoolId,
        schoolLogoUrl: users.schoolLogoUrl,
        email: users.email,
        role: users.role,
      })
      .from(users)
      .leftJoin(schools, eq(users.schoolId, schools.id))
      .where(eq(users.id, session.userId))
      .limit(1);

    const user = userList[0];
    return user || null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
});
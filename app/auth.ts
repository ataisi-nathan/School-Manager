import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        // 1. Find user in DB
        const userList = await db
          .select()
          .from(users)
          .where(eq(users.email, email.toLowerCase()))
          .limit(1);

        const user = userList[0];
        if (!user || !user.password) return null;

        // 2. Verify password match
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        // 3. Return user object for session
        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
});
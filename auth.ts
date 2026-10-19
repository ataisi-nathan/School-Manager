import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// 1. TypeScript Module Augmentation for custom session & JWT fields
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      schoolId?: string | null;
      role: string;
      isOnboarded: string;
    } & DefaultSession['user'];
  }

  interface User {
    schoolId?: string | null;
    role?: string;
    isOnboarded?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    schoolId?: string | null;
    role?: string;
    isOnboarded?: string;
  }
}

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

        // Find user in DB
        const userList = await db
          .select()
          .from(users)
          .where(eq(users.email, email.toLowerCase()))
          .limit(1);

        const user = userList[0];
        if (!user || !user.password) return null;

        // Verify password match
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        // Return user object with correct database fields
        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
          schoolId: user.schoolId, // 👈 Fixed: maps actual user.schoolId, not user.id
          role: user.role,
          isOnboarded: user.isOnboarded ?? 'false', // 👈 Added: required for middleware
        };
      },
    }),
  ],
  callbacks: {
    // 2. Transfer properties from user object or session update trigger to JWT
    async jwt({ token, user, trigger, session }) {
      // Handle client-side session update() triggers (e.g., after completing onboarding)
      if (trigger === 'update' && session) {
        if (session.schoolId !== undefined) token.schoolId = session.schoolId;
        if (session.isOnboarded !== undefined) token.isOnboarded = session.isOnboarded;
        if (session.role !== undefined) token.role = session.role;
        return token;
      }

      // Initial token population on sign-in
      if (user) {
        token.id = user.id;
        token.schoolId = user.schoolId;
        token.role = user.role;
        token.isOnboarded = user.isOnboarded;
      }
      return token;
    },

    // 3. Expose properties from JWT to client/server session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.schoolId = (token.schoolId as string) || null;
        session.user.role = (token.role as string) || 'admin';
        session.user.isOnboarded = (token.isOnboarded as string) || 'false';
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
});
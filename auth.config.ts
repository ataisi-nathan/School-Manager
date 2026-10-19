import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  providers: [], // keep empty – real providers live in auth.ts
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session) {
        if (session.schoolId !== undefined) token.schoolId = session.schoolId;
        if (session.isOnboarded !== undefined) token.isOnboarded = session.isOnboarded;
        if (session.role !== undefined) token.role = session.role;
        return token;
      }

      if (user) {
        token.id = user.id;
        token.schoolId = user.schoolId;
        token.role = user.role;
        token.isOnboarded = user.isOnboarded;
      }
      return token;
    },
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
} satisfies NextAuthConfig;
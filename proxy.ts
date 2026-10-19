import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const nextAuth = NextAuth(authConfig);

export const proxy = nextAuth.auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isOnboarded =
    req.auth?.user?.isOnboarded === 'true';
    // req.auth?.user?.isOnboarded === true;

  const path = nextUrl.pathname;

  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/students', '/teachers'];
  const authRoutes = ['/login', '/register', '/signup'];

  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));
  const isOnboardingRoute = path.startsWith('/onboarding');

  // 1. Not logged in
  if (!isLoggedIn && (isProtectedRoute || isOnboardingRoute)) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  // 2. Logged in → leave auth pages
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(
      new URL(isOnboarded ? '/dashboard' : '/onboarding', nextUrl)
    );
  }

  // 3. Force onboarding
  if (isLoggedIn && !isOnboarded && !isOnboardingRoute) {
    return NextResponse.redirect(new URL('/onboarding', nextUrl));
  }

  // 4. Already onboarded → block onboarding page
  if (isLoggedIn && isOnboarded && isOnboardingRoute) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';

// 1. Define routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

// 2. Define routes only accessible to unauthenticated users
const authRoutes = ['/login', '/signup'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check route conditions
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.includes(path);

  // Decrypt the session cookie
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;
  const session = await decrypt(cookie);

  // Rule 1: Redirect to /login if accessing a protected route without a session
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Rule 2: Redirect to /dashboard if logged-in user tries to access /login or /signup
  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

// 3. Filter which routes trigger middleware execution
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
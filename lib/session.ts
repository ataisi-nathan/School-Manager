import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from '@/lib/definitions';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_KEY;
if (!secretKey) {
  throw new Error('SESSION_KEY environment variable is missing.');
}

const encodedKey = new TextEncoder().encode(secretKey);

// 1. Encrypt Payload into JWT
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

// 2. Decrypt & Verify JWT
export async function decrypt(session: string | undefined = '') {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionPayload;
  } catch (error) {
    console.error('Failed to verify session:', error);
    return null;
  }
}

// 3. Create New Session Cookie
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt({ userId, expiresAt });
  
  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

// 4. Extend / Refresh Existing Session
export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  // Extend expiration date
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  // Create a newly signed token with updated expiration
  const newSession = await encrypt({ 
    userId: payload.userId, 
    expiresAt 
  });

  cookieStore.set('session', newSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

// 5. Delete Session Cookie
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
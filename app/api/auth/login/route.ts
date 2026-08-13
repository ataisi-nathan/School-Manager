import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { createSession } from '@/lib/session';
import { eq } from 'drizzle-orm';

interface LoginRequestBody {
  email?: string;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const body: LoginRequestBody = await request.json();
    console.log('--> Incoming Login Body:', body);

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 1. Fetch user by email
    const userList = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    const user = userList[0];

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials. Please check your email and password.' },
        { status: 401 }
      );
    }

    // 2. Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials. Please check your email and password.' },
        { status: 401 }
      );
    }

    // 3. Create Session Cookie
    await createSession(user.id);

    return NextResponse.json({
      success: true,
      message: 'Authenticated successfully',
    });
  } catch (error: unknown) {
    // 💡 THIS WILL PRINT THE EXACT FAILURE IN YOUR TERMINAL
    console.error('--> LOGIN ROUTE ERROR:', error);

    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
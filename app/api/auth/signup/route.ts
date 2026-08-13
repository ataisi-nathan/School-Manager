import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db'; // Adjust path to your DB client
import { users } from '@/lib/db/schema'; // Adjust path to your schema definitions
import { SignupFormSchema } from '@/lib/definitions'; // Adjust path to your Zod schema
import { createSession } from '@/lib/session';
import { eq } from 'drizzle-orm';

interface SignupRequestBody {
  fullName?: string;
  schoolName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export async function POST(request: Request) {
  console.log("--> Loaded DATABASE_URL:", process.env.DATABASE_URL ? "EXISTS" : "MISSING");
  try {
    const body: SignupRequestBody = await request.json();
    console.log("--> Incoming Signup Body:", body);

    // 1. Validate fields with Zod schema
    const validationResult = SignupFormSchema.safeParse(body);

    console.log("--> Validation Errors:", validationResult.success ? "No errors" : validationResult.error.flatten().fieldErrors);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Invalid form input.',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { fullName, schoolName, email, password } = validationResult.data;
    const normalizedEmail = email.toLowerCase().trim();

    // 2. Check if user already exists
    const existingUsers = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Insert user into database
    const newUsers = await db
      .insert(users)
      .values({
        fullName,
        schoolName,
        email: normalizedEmail,
        password: hashedPassword,
      })
      .returning({ id: users.id });

    const newUser = newUsers[0];

    if (!newUser) {
      return NextResponse.json(
        { message: 'Failed to create account. Please try again.' },
        { status: 500 }
      );
    }

    // 5. Establish auth session
    await createSession(newUser.id);

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully.',
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Signup API Route Error:', error);

    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
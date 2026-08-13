'use server';

import { SignupFormSchema, FormState } from "@/lib/definitions";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/lib/db"; // Adjust import path to your DB instance
import { users } from "@/app/lib/schema"; // Adjust import path to your Drizzle/ORM schema
import { eq } from "drizzle-orm";

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  // 1. Validate Form Fields against Zod Schema
  const validateFields = SignupFormSchema.safeParse({
    fullName: formData.get('fullName'),
    schoolName: formData.get('schoolName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const { fullName, schoolName, email, password } = validateFields.data;

  try {
    // 2. Check if Email Already Exists
    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        message: "An account with this email address already exists.",
      };
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Insert User into Database
    const insertedUsers = await db
      .insert(users)
      .values({
        fullName,
        schoolName,
        email: email.toLowerCase(),
        password: hashedPassword,
      })
      .returning({ id: users.id });

    const newUser = insertedUsers[0];

    if (!newUser) {
      return {
        message: "An error occurred while creating your account. Please try again.",
      };
    }

    // 5. Create Session
    await createSession(newUser.id);
  } catch (error) {
    console.error("Signup Action Error:", error);
    return {
      message: "Database error: Failed to create user account.",
    };
  }

  // 6. Redirect outside try/catch block
  redirect('/dashboard');
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect('/login');
}
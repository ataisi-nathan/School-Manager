import { z } from 'zod';
import type { JWTPayload } from 'jose';

// 1. Export SessionPayload type interface
export interface SessionPayload extends JWTPayload {
  userId: string;
  expiresAt: Date;
}

// 2. Signup Form Schema
export const SignupFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full name must be at least 2 characters long.' })
      .trim(),
    schoolName: z
      .string()
      .min(2, { message: 'School name must be at least 2 characters long.' })
      .trim(),
    email: z
      .string()
      .email({ message: 'Please enter a valid email address.' })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' }),
    confirmPassword: z.string().optional(),
  })

// 3. Form State Interface
export type FormState =
  | {
      errors?: {
        fullName?: string[];
        schoolName?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;
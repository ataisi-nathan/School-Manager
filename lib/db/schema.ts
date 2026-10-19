import {
  pgTable,
  text,
  uuid,
  timestamp,
  pgEnum,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Role & Status Enums
export const roleEnum = pgEnum('role', ['admin', 'teacher', 'student']);
export const statusEnum = pgEnum('status', ['Active', 'At Risk', 'Suspended', 'Inactive']);

// 2. Schools Table
export const schools = pgTable('schools', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  logoUrl: text('logo_url'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// 3. Users Table (Global Accounts across Admin, Teacher, Student)
export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    fullName: text('full_name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password'), // Nullable for OAuth logins
    role: roleEnum('role').default('admin').notNull(),
    schoolId: uuid('school_id').references(() => schools.id, { onDelete: 'cascade' }),
    schoolName: text('school_name'),
    isOnboarded: text('is_onboarded').default('false').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => [
    index('users_school_id_idx').on(table.schoolId),
    uniqueIndex('users_email_idx').on(table.email),
  ]
);

// 4. NextAuth Sessions Table
export const sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires_at', { mode: 'date' }).notNull(),
});

// 5. Students Table
export const students = pgTable(
  'students',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    schoolId: uuid('school_id')
      .notNull()
      .references(() => schools.id, { onDelete: 'cascade' }),
    fullName: text('full_name').notNull(),
    email: text('email').notNull(),
    grade: text('grade').notNull(),
    status: statusEnum('status').default('Active').notNull(),
    gpa: text('gpa').default('0.00'),
    attendanceRate: text('attendance_rate').default('100%'),
    guardianName: text('guardian_name'),
    emergencyPhone: text('emergency_phone'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => [
    index('students_school_id_idx').on(table.schoolId),
    index('students_user_id_idx').on(table.userId),
  ]
);

// --- Relations ---

export const schoolsRelations = relations(schools, ({ many }) => ({
  users: many(users),
  students: many(students),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  school: one(schools, {
    fields: [users.schoolId],
    references: [schools.id],
  }),
  sessions: many(sessions),
}));

export const studentsRelations = relations(students, ({ one }) => ({
  school: one(schools, {
    fields: [students.schoolId],
    references: [schools.id],
  }),
  userAccount: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
}));
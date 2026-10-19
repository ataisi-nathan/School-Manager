CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"grade" varchar(10) NOT NULL,
	"gpa" text NOT NULL,
	"attendance_rate" text NOT NULL,
	"guardian_name" varchar(255) NOT NULL,
	"emergency_phone" varchar(20) NOT NULL,
	"status" varchar(50) DEFAULT 'Active' NOT NULL,
	"school_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "students_email_unique" UNIQUE("email")
);

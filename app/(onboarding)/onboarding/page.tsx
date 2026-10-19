import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { OnboardingForm } from './_components/OnboardingForm';

export default async function OnboardingPage() {
  const session = await auth();

  // Route protection: If user is already onboarded, send them directly to dashboard
  if (session?.user?.isOnboarded === 'true' && session?.user?.schoolId) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <OnboardingForm />
    </main>
  );
}
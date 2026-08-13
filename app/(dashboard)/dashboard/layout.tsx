// app/dashboard/layout.tsx
import { getUser } from '@/lib/data';
import { redirect } from 'next/navigation';
import { DashboardShell } from './_components/DashboardShell';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}
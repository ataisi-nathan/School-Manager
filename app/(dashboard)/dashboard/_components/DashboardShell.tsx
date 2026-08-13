'use client';

import { useState, ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardShellProps {
  user: {
    fullName: string;
    schoolName: string;
  };
  children: ReactNode;
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 font-sans flex overflow-hidden relative">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
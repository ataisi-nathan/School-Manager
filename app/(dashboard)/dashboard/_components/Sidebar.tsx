'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  GraduationCap,
  BookOpen,
  Sparkles,
  LayoutDashboard,
  Calendar,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  user: {
    fullName: string;
    schoolName: string;
  };
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Students', href: '/dashboard/students', icon: GraduationCap },
  { label: 'Faculty', href: '/dashboard/faculty', icon: Users },
  { label: 'Courses & Classes', href: '/dashboard/courses', icon: BookOpen },
  { label: 'Schedule & Events', href: '/dashboard/schedule', icon: Calendar },
  { label: 'AI Reports', href: '/dashboard/ai-reports', icon: Sparkles, badge: 'AI' },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ sidebarOpen, setSidebarOpen, user }: SidebarProps) {
  const pathname = usePathname();

  // Extract initials from full name
  const initials = user.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-slate-900/90 border-r border-slate-800 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                S
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-indigo-300">
                SchoolOS<span className="text-indigo-400">.ai</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-indigo-400' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/30 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-semibold text-white text-sm">
                {initials}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">{user.fullName}</p>
                <p className="text-[11px] text-slate-400">{user.schoolName}</p>
              </div>
            </div>
            <Link
              href="/login"
              className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
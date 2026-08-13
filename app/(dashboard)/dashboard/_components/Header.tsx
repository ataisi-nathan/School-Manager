'use client';

import { Search, Bell, ShieldCheck, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-400 hover:text-white p-1"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative hidden sm:block w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students, faculty, or records..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>7 Days Left in Trial</span>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/40 border border-slate-800 hover:bg-slate-800 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-slate-900" />
        </button>
      </div>
    </header>
  );
}
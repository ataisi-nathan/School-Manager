import { getUser } from '@/lib/data';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ChevronRight } from 'lucide-react';
import { DashboardShell } from './_components/DashboardShell';
import { StatsGrid } from './_components/StatsGrid';
import { ActivityLog } from './_components/ActivityLog';

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {user.fullName}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Here’s what is happening across {user.schoolName} today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl transition-all">
            Export Data
          </button>
          <button className="px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>AI Insight Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <StatsGrid />

      {/* Main Analytics Canvas & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Enrollment & Attendance Overview</h2>
              <p className="text-slate-400 text-xs">Real-time attendance telemetry for Q3</p>
            </div>
            <select className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500">
              <option>Last 30 Days</option>
              <option>Last Semester</option>
              <option>Academic Year</option>
            </select>
          </div>

          <div className="h-64 w-full bg-slate-950/60 border border-slate-800/60 rounded-xl p-4 flex items-end gap-3 justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-t from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
            {[40, 65, 55, 80, 95, 75, 85, 90, 60, 70, 88, 92].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar h-full justify-end">
                <div
                  style={{ height: `${height}%` }}
                  className="w-full bg-linear-to-t from-indigo-600 to-cyan-400 rounded-t-sm opacity-70 group-hover/bar:opacity-100 transition-all duration-300"
                />
                <span className="text-[10px] text-slate-600 font-mono">M{i + 1}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
            <span>Average Student Attendance Rate: <strong className="text-white">94.2%</strong></span>
            <Link href="#" className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1">
              View Detailed Analytics <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <ActivityLog />
      </div>
    </>
  );
}
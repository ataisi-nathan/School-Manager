// app/(dashboard)/dashboard/students/_components/StudentStats.tsx
import React from 'react';
import { StudentStats as StudentStatsType } from '../actions';

interface StudentStatsProps {
  stats: StudentStatsType;
}

export function StudentStats({ stats }: StudentStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Students" value={stats.totalStudents} />
      <StatCard title="Active Enrolled" value={stats.activeStudents} />
      <StatCard title="At-Risk Students" value={stats.atRiskStudents} />
      <StatCard title="Avg Attendance" value={stats.avgAttendance} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
      <p className="text-xs font-medium text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
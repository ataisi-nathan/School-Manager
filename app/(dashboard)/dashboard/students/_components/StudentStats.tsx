import { GraduationCap, UserCheck, AlertTriangle, UserPlus } from 'lucide-react';

const stats = [
  {
    title: 'Total Enrolled',
    value: '1,284',
    change: '+3.2%',
    trend: 'up',
    icon: GraduationCap,
    color: 'from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/30',
  },
  {
    title: 'Active Students',
    value: '1,240',
    change: '96.5%',
    trend: 'neutral',
    icon: UserCheck,
    color: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
  },
  {
    title: 'Academic At-Risk',
    value: '28',
    change: '-4 this term',
    trend: 'down',
    icon: AlertTriangle,
    color: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30',
  },
  {
    title: 'New Admissions',
    value: '42',
    change: 'This Month',
    trend: 'up',
    icon: UserPlus,
    color: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30',
  },
];

export function StudentStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">{stat.title}</span>
            <div className={`p-2.5 rounded-xl bg-linear-to-b border ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
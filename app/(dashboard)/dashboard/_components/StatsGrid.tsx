import { GraduationCap, Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Students',
    value: '2,845',
    change: '+12.4%',
    icon: GraduationCap,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Active Teachers',
    value: '142',
    change: '+3.2%',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Active Courses',
    value: '68',
    change: '0.0%',
    icon: BookOpen,
    color: 'from-cyan-500 to-indigo-500',
  },
  {
    title: 'Monthly Revenue',
    value: '$84,200',
    change: '+18.6%',
    icon: DollarSign,
    color: 'from-emerald-500 to-teal-500',
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="relative group bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl shadow-xl hover:border-slate-700/80 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">{stat.title}</span>
            <div className={`p-2.5 rounded-xl bg-linear-to-tr ${stat.color} text-white shadow-md`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 gap-0.5">
              <TrendingUp className="w-3 h-3" />
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
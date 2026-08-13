import { MoreVertical } from 'lucide-react';

const recentActivities = [
  {
    id: 1,
    user: 'Dr. Sarah Jenkins',
    action: 'Published new curriculum for Advanced Physics',
    time: '10 mins ago',
    category: 'Curriculum',
  },
  {
    id: 2,
    user: 'Marcus Vance',
    action: 'Completed tuition fee payment ($1,200)',
    time: '32 mins ago',
    category: 'Finance',
  },
  {
    id: 3,
    user: 'SchoolOS AI Engine',
    action: 'Generated automated attendance risk report for Grade 10',
    time: '1 hour ago',
    category: 'AI Analytics',
  },
  {
    id: 4,
    user: 'Elena Rostova',
    action: 'Registered 24 new student profiles',
    time: '3 hours ago',
    category: 'Enrollment',
  },
];

export function ActivityLog() {
  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Recent Activity</h2>
        <button className="text-slate-400 hover:text-white p-1">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {recentActivities.map((act) => (
          <div key={act.id} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-300">{act.user}</span>
              <span className="text-[10px] text-slate-500">{act.time}</span>
            </div>
            <p className="text-xs text-slate-300 leading-snug">{act.action}</p>
            <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-medium bg-slate-800 text-slate-400 rounded-md">
              {act.category}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold rounded-xl transition-all">
        View All Activity Logs
      </button>
    </div>
  );
}
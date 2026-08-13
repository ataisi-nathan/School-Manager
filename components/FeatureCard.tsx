interface FeatureCardProps {
  title: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, description, badge, icon }: FeatureCardProps) {
  return (
    <div className="group relative bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
      {badge && (
        <span className="absolute top-4 right-4 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          {badge}
        </span>
      )}
      <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
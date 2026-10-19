interface FeatureCardProps {
  title: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, description, badge, icon }: FeatureCardProps) {
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100">
      {badge && (
        <span className="absolute right-4 top-4 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-700">
          {badge}
        </span>
      )}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
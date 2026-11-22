export default function KpiCard({ title, value, subtitle, icon: Icon, accent = "slate" }) {
  const ACCENTS = {
    slate: {
      bar: "bg-slate-800",
      iconWrap: "bg-slate-100 text-slate-700 border-slate-200",
    },
    emerald: {
      bar: "bg-emerald-600",
      iconWrap: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    amber: {
      bar: "bg-amber-500",
      iconWrap: "bg-amber-50 text-amber-700 border-amber-200",
    },
    rose: {
      bar: "bg-rose-600",
      iconWrap: "bg-rose-50 text-rose-700 border-rose-200",
    },
    sky: {
      bar: "bg-sky-600",
      iconWrap: "bg-sky-50 text-sky-700 border-sky-200",
    },
  };

  const theme = ACCENTS[accent] || ACCENTS.slate;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-md">
      <div className={`absolute inset-x-0 top-0 h-1 ${theme.bar}`} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <p className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs font-medium text-slate-500">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`rounded-lg border p-2.5 ${theme.iconWrap}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
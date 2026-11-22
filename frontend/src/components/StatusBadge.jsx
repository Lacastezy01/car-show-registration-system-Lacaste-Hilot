import { CheckCircle2, Clock, CarFront, XCircle } from "lucide-react";

const STATUS_STYLES = {
  Confirmed: {
    container: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  Pending: {
    container: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  CheckedIn: {
    container: "bg-sky-50 text-sky-700 border-sky-200",
    icon: CarFront,
  },
  Cancelled: {
    container: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle,
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_STYLES[status] || {
    container: "bg-slate-100 text-slate-700 border-slate-200",
    icon: Clock,
  };
  const Icon = config.icon;
  const label = status === "CheckedIn" ? "Checked In" : status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide ${config.container}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span>{label}</span>
    </span>
  );
}
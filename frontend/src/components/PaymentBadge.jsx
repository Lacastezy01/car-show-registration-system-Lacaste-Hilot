import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const PAYMENT_STYLES = {
  Paid: {
    container: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  Partial: {
    container: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  Unpaid: {
    container: "bg-rose-50 text-rose-700 border-rose-200",
    icon: AlertCircle,
  },
};

export default function PaymentBadge({ paymentStatus }) {
  const config = PAYMENT_STYLES[paymentStatus] || {
    container: "bg-slate-100 text-slate-700 border-slate-200",
    icon: AlertCircle,
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide ${config.container}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span>{paymentStatus}</span>
    </span>
  );
}
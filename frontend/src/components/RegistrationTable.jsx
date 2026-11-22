import { Trophy, Car, Crown, Mail, Phone } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount ?? 0);

const formatDate = (isoString) => {
  if (!isoString) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoString));
};

const TYPE_META = {
  Competitor: { icon: Trophy, style: "text-amber-700 bg-amber-50 border-amber-200" },
  VIP: { icon: Crown, style: "text-purple-700 bg-purple-50 border-purple-200" },
  Exhibitor: { icon: Car, style: "text-slate-700 bg-slate-100 border-slate-200" },
};

export default function RegistrationTable({ items }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-900 text-xs font-semibold uppercase tracking-wider text-slate-200">
              <th className="px-4 py-3.5">Reg. No.</th>
              <th className="px-4 py-3.5">Date</th>
              <th className="px-4 py-3.5">Participant</th>
              <th className="px-4 py-3.5">Car & Plate</th>
              <th className="px-4 py-3.5">Type</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5 text-right">Fee / Paid</th>
              <th className="px-4 py-3.5">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80">
            {items.map((row) => {
              const typeCfg = TYPE_META[row.registrationType] || TYPE_META.Exhibitor;
              const TypeIcon = typeCfg.icon;

              return (
                <tr
                  key={row.id || row.registrationNumber}
                  className="transition-colors hover:bg-slate-50/90"
                >
                  {/* Registration No */}
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span className="font-mono-tabular rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-xs font-bold text-slate-800">
                      {row.registrationNumber}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-4 py-3.5 text-xs font-medium text-slate-600">
                    {formatDate(row.registrationDate)}
                  </td>

                  {/* Participant */}
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-slate-900">
                      {row.participantName}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
                      {row.contactNumber && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="h-3 w-3 text-slate-400" />
                          {row.contactNumber}
                        </span>
                      )}
                      {row.email && (
                        <span className="inline-flex items-center gap-1">
                          <Mail className="h-3 w-3 text-slate-400" />
                          {row.email}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Car & Plate */}
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-slate-900">
                      {row.carMakeModel}
                    </div>
                    <span className="font-mono-tabular mt-1 inline-block rounded border border-slate-300 bg-amber-50/70 px-1.5 py-0.5 text-[11px] font-bold tracking-wider text-slate-800 uppercase">
                      {row.plateNumber}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold ${typeCfg.style}`}
                    >
                      <TypeIcon className="h-3.5 w-3.5" />
                      <span>{row.registrationType}</span>
                    </span>
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <StatusBadge status={row.status} />
                  </td>

                  {/* Fee / Paid */}
                  <td className="font-mono-tabular whitespace-nowrap px-4 py-3.5 text-right">
                    <div className="text-xs font-medium text-slate-500">
                      Fee: {formatCurrency(row.registrationFee)}
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      Paid: {formatCurrency(row.amountPaid)}
                    </div>
                  </td>

                  {/* Payment Badge */}
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <PaymentBadge paymentStatus={row.paymentStatus} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
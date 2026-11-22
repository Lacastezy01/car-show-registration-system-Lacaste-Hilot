import { Users, Wallet, AlertCircle, BadgeCheck, CarFront } from "lucide-react";
import KpiCard from "./KpiCard";

const formatPhp = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount ?? 0);

export default function KpiCards({ summary, loading }) {
  const data = summary || {
    totalRegistrations: 0,
    totalPayments: 0,
    uncollectedPayments: 0,
    confirmed: 0,
    checkedIn: 0,
  };

  const cards = [
    {
      title: "Total Registrations",
      value: loading ? "—" : data.totalRegistrations,
      subtitle: "All registered vehicles",
      icon: Users,
      accent: "slate",
    },
    {
      title: "Total Payments",
      value: loading ? "—" : formatPhp(data.totalPayments),
      subtitle: "Collected fees",
      icon: Wallet,
      accent: "emerald",
    },
    {
      title: "Uncollected Payments",
      value: loading ? "—" : formatPhp(data.uncollectedPayments),
      subtitle: "Remaining balance",
      icon: AlertCircle,
      accent: "rose",
    },
    {
      title: "Confirmed",
      value: loading ? "—" : data.confirmed,
      subtitle: "Approved entries",
      icon: BadgeCheck,
      accent: "amber",
    },
    {
      title: "Checked In",
      value: loading ? "—" : data.checkedIn,
      subtitle: "On-site at Coliseum",
      icon: CarFront,
      accent: "sky",
    },
  ];

  return (
    <section aria-label="Event Summary Metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <KpiCard key={card.title} {...card} />
      ))}
    </section>
  );
}
import React from "react";
import { Car, Plus, ExternalLink } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5205";
const SCALAR_DOCS_URL = `${API_BASE_URL.replace(/\/+$/, "")}/scalar/v1`;

export default function AppHeader({
  activeTab = "dashboard",
  onSelectTab,
  onOpenNewRegistration,
}) {
  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "registrations", label: "Registrations" },
    { id: "event-info", label: "Event Info" },
  ];

  return (
    <header className="w-full">
      <nav
        aria-label="Primary Navigation"
        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-pink-200/70 bg-white px-5 py-3.5 shadow-sm"
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-200 text-pink-700 shadow-2xs">
            <Car className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                AutoVista Event<span className="text-pink-500"></span>
              </span>
              <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-[11px] font-semibold text-pink-700">
                Car Show 2027
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Showcase Pass Portal
            </p>
          </div>
        </div>

        {/* Navigation Pills */}
        <div className="flex items-center gap-1 rounded-xl bg-rose-50/80 p-1 border border-pink-100">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab?.(item.id)}
                className={
                  isActive
                    ? "rounded-lg bg-pink-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-2xs transition"
                    : "rounded-lg px-3.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-pink-700"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Scalar API Docs Stacked Above New Registration */}
        <div className="flex flex-col items-end gap-1.5">
          <a
            href={SCALAR_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-pink-600 transition hover:text-pink-700 hover:underline"
          >
            <span>Scalar API Docs</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            type="button"
            onClick={onOpenNewRegistration}
            className="inline-flex items-center gap-1.5 rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-pink-600 active:scale-[0.99]"
          >
            <Plus className="h-4 w-4" />
            <span>New Registration</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
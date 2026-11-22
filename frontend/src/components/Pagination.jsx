import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  loading,
  onPageChange,
  onPageSizeChange,
}) {
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);
  const pages = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200/90 bg-white px-4 py-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
      {/* Summary + Page Size */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
        <span>
          Showing <strong className="font-semibold text-slate-900">{start}–{end}</strong> of{" "}
          <strong className="font-semibold text-slate-900">{totalCount}</strong> registrations
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-slate-500">
            Per page:
          </label>
          <select
            id="page-size"
            value={pageSize}
            disabled={loading}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:border-rose-500 focus:outline-none disabled:opacity-50"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Page Navigation Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={loading || page <= 1}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Prev</span>
        </button>

        {pages.map((p) => {
          const isActive = p === page;
          return (
            <button
              key={p}
              type="button"
              disabled={loading}
              onClick={() => onPageChange(p)}
              className={`h-8 min-w-8 rounded-lg px-2.5 text-xs font-bold transition ${
                isActive
                  ? "bg-rose-600 text-white shadow-xs"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              } disabled:cursor-not-allowed disabled:opacity-45`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={loading || page >= totalPages}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
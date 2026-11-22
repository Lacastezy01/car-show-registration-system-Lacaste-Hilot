import { useEffect, useState, useCallback } from "react";
import {
  Flag,
  MapPin,
  CalendarDays,
  Loader2,
  SearchX,
  WifiOff,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import useDebounce from "../hooks/useDebounce";
import { getRegistrations, getSummary } from "../api/registrationsApi";
import KpiCards from "../components/KpiCards";
import RegistrationFilters from "../components/RegistrationFilters";
import RegistrationTable from "../components/RegistrationTable";
import Pagination from "../components/Pagination";

export default function RegistrationsPage() {
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const data = await getSummary();
      setSummary(data);
    } catch {
      // Handled by main error banner if API is unreachable
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const loadRegistrations = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getRegistrations({
        participantName: debouncedSearch,
        type,
        status,
        page,
        pageSize,
      });
      setItems(result.items || []);
      setTotalCount(result.totalCount ?? 0);
      setTotalPages(result.totalPages ?? 1);
    } catch (err) {
      setError(
        err?.message || "Cannot reach the API. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, type, status, page, pageSize]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleTypeChange = (value) => {
    setType(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setType("");
    setStatus("");
    setPage(1);
  };

  const handleRetry = () => {
    loadSummary();
    loadRegistrations();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Automotive Command Header */}
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-600/25">
              <Flag className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-rose-600/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-rose-400">
                  AutoVista Events
                </span>
              </div>
              <h1 className="font-display mt-0.5 text-2xl font-bold tracking-wide text-white sm:text-3xl">
                CAR SHOW 2027 — REGISTRATION DASHBOARD
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
              <MapPin className="h-4 w-4 text-rose-500" />
              Sorsogon City Coliseum
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
              <CalendarDays className="h-4 w-4 text-amber-400" />
              3-Day Exhibition & Show & Shine
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* KPI Summary Row */}
        <KpiCards summary={summary} loading={summaryLoading} />

        {/* Section Header & Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-slate-900">
              Participant Registrations
            </h2>
          </div>

          <RegistrationFilters
            search={search}
            onSearchChange={handleSearchChange}
            type={type}
            onTypeChange={handleTypeChange}
            status={status}
            onStatusChange={handleStatusChange}
            onClear={handleClearFilters}
          />

          {/* States: Loading / Error / Empty / Data Table */}
          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white px-6 py-16 text-center shadow-xs">
              <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
              <p className="mt-3 text-sm font-semibold text-slate-800">
                Loading registrations...
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Fetching latest participant records and payment status
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50/60 px-6 py-14 text-center">
              <div className="rounded-full bg-rose-100 p-3 text-rose-600">
                <WifiOff className="h-6 w-6" />
              </div>
              <h3 className="font-display mt-3 text-lg font-bold text-slate-900">
                Cannot reach the API
              </h3>
              <p className="mt-1 max-w-md text-xs text-slate-600">{error}</p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-rose-700"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Try again</span>
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white px-6 py-14 text-center shadow-xs">
              <div className="rounded-full bg-slate-100 p-3 text-slate-500">
                <SearchX className="h-6 w-6" />
              </div>
              <h3 className="font-display mt-3 text-lg font-bold text-slate-900">
                No registrations match your filters
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Try adjusting your search query or clearing active type and status filters.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear filters</span>
              </button>
            </div>
          ) : (
            <>
              <RegistrationTable items={items} />
              <Pagination
                page={page}
                pageSize={pageSize}
                totalCount={totalCount}
                totalPages={totalPages}
                loading={loading}
                onPageChange={setPage}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
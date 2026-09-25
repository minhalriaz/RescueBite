import { BarChart3, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { api } from "../../api/client";

export default function Reports() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    api.getAdminReports().then(setReport).catch((requestError) => setError(requestError.message || "Unable to load reports."));
  }, []);
  const trend = report?.trend || [];
  const max = Math.max(1, ...trend.flatMap((item) => [item.donations, item.completed]));
  return (
    <AdminLayout>
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F9F76]">Insights</p><h1 className="mt-2 text-3xl font-black">Reports & Analytics</h1><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">A visual overview of RescueBite activity.</p></div>
      {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600">{error}</div>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[
        ["Total Donations", report?.stats.donations ?? "—"],
        ["Completed Rescues", report?.stats.completed ?? "—"],
        ["Pending Requests", report?.stats.pending_requests ?? "—"],
        ["Open Reports", report?.stats.open_reports ?? "—"],
      ].map(([label, value]) => <div key={label} className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5"><p className="text-xs text-[color:var(--color-rescue-text-muted)]">{label}</p><p className="mt-2 text-2xl font-black">{value}</p><p className="mt-1 flex items-center gap-1 text-xs font-bold text-[color:var(--color-rescue-text-muted)]"><TrendingUp size={13}/>Database total</p></div>)}</div>
      <div className="mt-6 rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm">
        <div className="flex items-center gap-2"><BarChart3 className="text-[#0F9F76]" size={20}/><div><h2 className="font-black">Donations vs Rescues</h2><p className="text-xs text-[color:var(--color-rescue-text-muted)]">Based on recorded database activity.</p></div></div>
        <div className="mt-8 flex h-72 items-end gap-3 overflow-x-auto border-b border-[color:var(--color-rescue-border)] px-2">
          {trend.length === 0 ? <p className="m-auto text-sm text-[color:var(--color-rescue-text-muted)]">No rescue data available yet.</p> : trend.map(item => <div key={item.month} className="flex min-w-16 flex-1 items-end justify-center gap-1">
            <div title={`Donations: ${item.donations}`} className="w-5 rounded-t-md bg-[#0F9F76]/80" style={{ height: `${(item.donations / max) * 210}px` }} />
            <div title={`Completed: ${item.completed}`} className="w-5 rounded-t-md bg-slate-400/60" style={{ height: `${(item.completed / max) * 210}px` }} />
            <span className="absolute translate-y-40 text-[10px] text-[color:var(--color-rescue-text-muted)]">{item.month}</span>
          </div>)}
        </div>
        <div className="mt-5 flex gap-5 text-xs font-semibold text-[color:var(--color-rescue-text-muted)]"><span><i className="mr-2 inline-block h-2.5 w-2.5 rounded-sm bg-[#0F9F76]" />Donations</span><span><i className="mr-2 inline-block h-2.5 w-2.5 rounded-sm bg-slate-400" />Rescues</span></div>
      </div>
    </AdminLayout>
  );
}

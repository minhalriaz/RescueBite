import { BarChart3, TrendingUp } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminStats, rescueChart } from "../../data/adminMockData";

export default function Reports() {
  const max = Math.max(...rescueChart.flatMap(x => [x.donations, x.rescues]));
  return (
    <AdminLayout>
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F9F76]">Insights</p><h1 className="mt-2 text-3xl font-black">Reports & Analytics</h1><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">A visual overview of RescueBite activity.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{adminStats.slice(0,4).map(s => <div key={s.label} className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5"><p className="text-xs text-[color:var(--color-rescue-text-muted)]">{s.label}</p><p className="mt-2 text-2xl font-black">{s.value}</p><p className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-300"><TrendingUp size={13}/>{s.change}</p></div>)}</div>
      <div className="mt-6 rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm">
        <div className="flex items-center gap-2"><BarChart3 className="text-[#0F9F76]" size={20}/><div><h2 className="font-black">Donations vs Rescues</h2><p className="text-xs text-[color:var(--color-rescue-text-muted)]">Demo data — replace with API data later.</p></div></div>
        <div className="mt-8 flex h-72 items-end gap-3 overflow-x-auto border-b border-[color:var(--color-rescue-border)] px-2">
          {rescueChart.map(item => <div key={item.month} className="flex min-w-16 flex-1 items-end justify-center gap-1">
            <div title={`Donations: ${item.donations}`} className="w-5 rounded-t-md bg-[#0F9F76]/80" style={{ height: `${(item.donations / max) * 210}px` }} />
            <div title={`Rescues: ${item.rescues}`} className="w-5 rounded-t-md bg-slate-400/60" style={{ height: `${(item.rescues / max) * 210}px` }} />
            <span className="absolute translate-y-40 text-[10px] text-[color:var(--color-rescue-text-muted)]">{item.month}</span>
          </div>)}
        </div>
        <div className="mt-5 flex gap-5 text-xs font-semibold text-[color:var(--color-rescue-text-muted)]"><span><i className="mr-2 inline-block h-2.5 w-2.5 rounded-sm bg-[#0F9F76]" />Donations</span><span><i className="mr-2 inline-block h-2.5 w-2.5 rounded-sm bg-slate-400" />Rescues</span></div>
      </div>
    </AdminLayout>
  );
}

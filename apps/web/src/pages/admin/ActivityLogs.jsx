import AdminLayout from "../../components/admin/AdminLayout";
import { adminActivities } from "../../data/adminMockData";

export default function ActivityLogs() {
  return (
    <AdminLayout>
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F9F76]">Monitoring</p><h1 className="mt-2 text-3xl font-black">Recent Activity & Audit Logs</h1><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">A frontend-ready activity feed for future API integration.</p></div>
      <div className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm">
        <div className="space-y-3">{adminActivities.map(a => <div key={a.id} className="flex gap-4 rounded-xl border border-[color:var(--color-rescue-border)] p-4"><div className="mt-1 h-3 w-3 rounded-full bg-[#0F9F76] shadow-[0_0_0_5px_var(--color-rescue-accent-soft)]" /><div className="flex-1"><p className="font-bold">{a.title}</p><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">{a.detail}</p></div><span className="text-xs text-[color:var(--color-rescue-text-muted)]">{a.time}</span></div>)}</div>
      </div>
    </AdminLayout>
  );
}

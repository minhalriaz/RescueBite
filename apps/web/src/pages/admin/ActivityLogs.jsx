import AdminLayout from "../../components/admin/AdminLayout";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../api/client";

export default function ActivityLogs() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    api.getAdminActivity().then((response) => setRows(response.activities || [])).catch((requestError) => setError(requestError.message || "Unable to load activity logs.")).finally(() => setLoading(false));
  }, []);
  return (
    <AdminLayout>
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F9F76]">Monitoring</p><h1 className="mt-2 text-3xl font-black">Recent Activity & Audit Logs</h1><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">Recorded actions from the RescueBite database.</p></div>
      {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600">{error}</div>}
      <div className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm">
        {loading ? <LoaderCircle className="mx-auto animate-spin" /> : rows.length === 0 ? <p className="py-10 text-center text-sm text-[color:var(--color-rescue-text-muted)]">No activity recorded yet.</p> : <div className="space-y-3">{rows.map((row) => <div key={row.id} className="flex gap-4 rounded-xl border border-[color:var(--color-rescue-border)] p-4"><div className="mt-1 h-3 w-3 rounded-full bg-[#0F9F76] shadow-[0_0_0_5px_var(--color-rescue-accent-soft)]" /><div className="flex-1"><p className="font-bold">{row.action}</p><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">{row.actor} · {row.entity_type || "system"} {row.entity_id || ""}</p></div><span className="text-xs text-[color:var(--color-rescue-text-muted)]">{new Date(row.created_at).toLocaleString()}</span></div>)}</div>}
      </div>
    </AdminLayout>
  );
}

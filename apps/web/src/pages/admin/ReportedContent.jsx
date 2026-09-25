import { Check, Eye, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { api } from "../../api/client";

export default function ReportedContent() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getAdminReportedContent().then((response) => setRows(response.reports || [])).catch((requestError) => setError(requestError.message || "Unable to load reports.")).finally(() => setLoading(false));
  }, []);

  const resolve = async (id) => {
    try {
      const response = await api.resolveReport(id, "resolved");
      setRows((current) => current.map((row) => row.id === id ? response.report : row));
    } catch (requestError) {
      setError(requestError.message || "Unable to resolve report.");
    }
  };
  return (
    <AdminLayout>
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">Moderation</p><h1 className="mt-2 text-3xl font-black">Reported Content</h1><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">Review reports before they are resolved.</p></div>
      {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600">{error}</div>}
      <AdminTable headers={["Report", "Target", "Reason", "Reporter", "Status", "Action"]}>
        {loading ? <tr><td colSpan={6} className="px-5 py-12 text-center"><LoaderCircle className="mx-auto animate-spin" /></td></tr> : rows.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[color:var(--color-rescue-text-muted)]">No reports found.</td></tr> : rows.map(r => <tr key={r.id} className="hover:bg-[color:var(--color-rescue-bg)]">
          <td className="px-5 py-4 text-sm font-black">{r.id}</td><td className="px-5 py-4 text-sm font-bold">{r.target_type} #{r.target_id}</td><td className="px-5 py-4 text-sm">{r.reason}</td><td className="px-5 py-4 text-sm text-[color:var(--color-rescue-text-muted)]">{r.reporter?.name || "N/A"}</td><td className="px-5 py-4"><StatusBadge status={r.status} /></td>
          <td className="px-5 py-4"><div className="flex gap-2"><button className="rounded-lg border border-[color:var(--color-rescue-border)] p-2 hover:border-[#0F9F76]/50" title="Review"><Eye size={15}/></button>{r.status !== "resolved" && r.status !== "dismissed" && <button onClick={() => resolve(r.id)} className="rounded-lg bg-[#0F9F76] p-2 text-white" title="Resolve"><Check size={15}/></button>}</div></td>
        </tr>)}
      </AdminTable>
    </AdminLayout>
  );
}

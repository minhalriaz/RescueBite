import { Check, Eye } from "lucide-react";
import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { reportItems } from "../../data/adminMockData";

export default function ReportedContent() {
  const [rows, setRows] = useState(reportItems);
  const resolve = id => setRows(current => current.map(r => r.id === id ? { ...r, status: "Resolved" } : r));
  return (
    <AdminLayout>
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">Moderation</p><h1 className="mt-2 text-3xl font-black">Reported Content</h1><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">Review reports before they are resolved.</p></div>
      <AdminTable headers={["Report", "Target", "Reason", "Reporter", "Status", "Action"]}>
        {rows.map(r => <tr key={r.id} className="hover:bg-[color:var(--color-rescue-bg)]">
          <td className="px-5 py-4 text-sm font-black">{r.id}</td><td className="px-5 py-4 text-sm font-bold">{r.target}</td><td className="px-5 py-4 text-sm">{r.reason}</td><td className="px-5 py-4 text-sm text-[color:var(--color-rescue-text-muted)]">{r.reporter}</td><td className="px-5 py-4"><StatusBadge status={r.status} /></td>
          <td className="px-5 py-4"><div className="flex gap-2"><button className="rounded-lg border border-[color:var(--color-rescue-border)] p-2 hover:border-[#0F9F76]/50" title="Review"><Eye size={15}/></button>{r.status !== "Resolved" && <button onClick={() => resolve(r.id)} className="rounded-lg bg-[#0F9F76] p-2 text-white" title="Resolve"><Check size={15}/></button>}</div></td>
        </tr>)}
      </AdminTable>
    </AdminLayout>
  );
}

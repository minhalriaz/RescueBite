import { useMemo, useState } from "react";
import { Check, Search, X } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";

export default function ManagementPage({ title, description, initialRows, type }) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => rows.filter(r => JSON.stringify(r).toLowerCase().includes(query.toLowerCase())), [rows, query]);

  const updateStatus = (id, status) => setRows(current => current.map(row => row.id === id ? { ...row, status } : row));

  const isApproval = type === "ngo" || type === "volunteer";
  const headers = type === "donor"
    ? ["Donor", "Email", "Donations", "Status", "Action"]
    : ["Name", "Contact", "Area", "Status", isApproval ? "Action" : "Joined"];

  return (
    <AdminLayout>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F9F76]">Management</p>
        <h1 className="mt-2 text-3xl font-black">{title}</h1>
        <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">{description}</p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--color-rescue-text-muted)]" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${type}s...`} className="w-full rounded-xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] py-3 pl-10 pr-4 text-sm text-[color:var(--color-rescue-text)] outline-none focus:border-[#0F9F76]" />
        </div>
        <span className="text-xs font-semibold text-[color:var(--color-rescue-text-muted)]">{filtered.length} records</span>
      </div>

      <AdminTable headers={headers}>
        {filtered.map(row => (
          <tr key={row.id} className="hover:bg-[color:var(--color-rescue-bg)]">
            <td className="px-5 py-4"><p className="text-sm font-bold">{row.name}</p><p className="mt-0.5 text-xs text-[color:var(--color-rescue-text-muted)]">{row.email || row.contact}</p></td>
            <td className="px-5 py-4 text-sm text-[color:var(--color-rescue-text-muted)]">{row.email || row.contact}</td>
            <td className="px-5 py-4 text-sm">{type === "donor" ? `${row.donations} donations` : row.area}</td>
            <td className="px-5 py-4"><StatusBadge status={row.status} /></td>
            <td className="px-5 py-4">
              {isApproval ? (
                <div className="flex gap-2">
                  {row.status !== "Approved" && <button onClick={() => updateStatus(row.id, "Approved")} className="inline-flex items-center gap-1 rounded-lg bg-[#0F9F76] px-3 py-2 text-xs font-bold text-white"><Check size={14} /> Approve</button>}
                  {row.status !== "Rejected" && <button onClick={() => updateStatus(row.id, "Rejected")} className="inline-flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-500"><X size={14} /> Reject</button>}
                </div>
              ) : (
                <button className="rounded-lg border border-[color:var(--color-rescue-border)] px-3 py-2 text-xs font-bold hover:border-[#0F9F76]/50">View details</button>
              )}
            </td>
          </tr>
        ))}
      </AdminTable>
    </AdminLayout>
  );
}

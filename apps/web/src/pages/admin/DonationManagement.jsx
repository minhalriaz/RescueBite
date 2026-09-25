import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { api } from "../../api/client";

export default function DonationManagement() {
  const [rows, setRows] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.getAdminDonations(), api.getAdminRequests()])
      .then(([donationResponse, requestResponse]) => {
        setRows(donationResponse.donations || []);
        setRequests(requestResponse.requests || []);
      })
      .catch((requestError) => setError(requestError.message || "Unable to load donations."))
      .finally(() => setLoading(false));
  }, []);

  async function review(id, decision) {
    setActionLoading(id);
    setError("");

    try {
      await api.reviewAdminRequest(id, decision);
      const refreshed = await api.getAdminRequests();
      setRequests(refreshed.requests || []);
    } catch (requestError) {
      setError(requestError.message || "Unable to review request.");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <AdminLayout>
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F9F76]">Operations</p><h1 className="mt-2 text-3xl font-black">Donations & Rescues</h1><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">Monitor food donations and rescue progress.</p></div>
      {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600">{error}</div>}
      <AdminTable headers={["ID", "Food", "Donor", "Quantity", "Area", "Status"]}>
        {loading ? <tr><td colSpan={6} className="px-5 py-12 text-center"><LoaderCircle className="mx-auto animate-spin" /></td></tr> : rows.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[color:var(--color-rescue-text-muted)]">No donations found.</td></tr> : rows.map(row => <tr key={row.id} className="hover:bg-[color:var(--color-rescue-bg)]">
          <td className="px-5 py-4 text-sm font-black text-[#0F9F76]">{row.id}</td>
          <td className="px-5 py-4 text-sm font-bold">{row.food}</td>
          <td className="px-5 py-4 text-sm">{row.donor || "N/A"}</td>
          <td className="px-5 py-4 text-sm text-[color:var(--color-rescue-text-muted)]">{row.quantity}</td>
          <td className="px-5 py-4 text-sm text-[color:var(--color-rescue-text-muted)]">{row.address}</td>
          <td className="px-5 py-4"><StatusBadge status={row.status} /></td>
        </tr>)}
      </AdminTable>
      <div className="mt-8 mb-4"><h2 className="text-xl font-black">Donation Requests</h2><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">Review NGO requests before pickup becomes available.</p></div>
      <AdminTable headers={["Food", "Donor", "NGO", "Location", "Status", "Action"]}>
        {requests.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[color:var(--color-rescue-text-muted)]">No donation requests found.</td></tr> : requests.map((item) => <tr key={item.id}>
          <td className="px-5 py-4 text-sm font-bold">{item.food}</td>
          <td className="px-5 py-4 text-sm">{item.donor || "N/A"}</td>
          <td className="px-5 py-4 text-sm">{item.ngo || "N/A"}</td>
          <td className="px-5 py-4 text-sm">{item.address || "N/A"}</td>
          <td className="px-5 py-4"><StatusBadge status={item.status} /></td>
          <td className="px-5 py-4"><div className="flex gap-2">{item.status === "pending" && <><button disabled={actionLoading === item.id} onClick={() => review(item.id, "approve")} className="rounded-lg bg-[#0F9F76] px-3 py-2 text-xs font-bold text-white">Approve</button><button disabled={actionLoading === item.id} onClick={() => review(item.id, "reject")} className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-500">Reject</button></>}</div></td>
        </tr>)}
      </AdminTable>
    </AdminLayout>
  );
}

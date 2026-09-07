import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { adminDonations } from "../../data/adminMockData";

export default function DonationManagement() {
  return (
    <AdminLayout>
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F9F76]">Operations</p><h1 className="mt-2 text-3xl font-black">Donations & Rescues</h1><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">Monitor food donations and rescue progress.</p></div>
      <AdminTable headers={["ID", "Food", "Donor", "Quantity", "Area", "Status"]}>
        {adminDonations.map(row => <tr key={row.id} className="hover:bg-[color:var(--color-rescue-bg)]">
          <td className="px-5 py-4 text-sm font-black text-[#0F9F76]">{row.id}</td>
          <td className="px-5 py-4 text-sm font-bold">{row.food}</td>
          <td className="px-5 py-4 text-sm">{row.donor}</td>
          <td className="px-5 py-4 text-sm text-[color:var(--color-rescue-text-muted)]">{row.quantity}</td>
          <td className="px-5 py-4 text-sm text-[color:var(--color-rescue-text-muted)]">{row.area}</td>
          <td className="px-5 py-4"><StatusBadge status={row.status} /></td>
        </tr>)}
      </AdminTable>
    </AdminLayout>
  );
}

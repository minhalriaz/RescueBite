import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F9F76]">Administration</p><h1 className="mt-2 text-3xl font-black">Admin Settings</h1><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">Basic settings UI ready for future integration.</p></div>
      <div className="max-w-2xl rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-6 shadow-sm">
        <div className="space-y-5">
          <label className="block"><span className="text-xs font-bold text-[color:var(--color-rescue-text-muted)]">Dashboard name</span><input defaultValue="RescueBite Admin Console" className="mt-2 w-full rounded-xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-bg)] p-3 text-sm text-[color:var(--color-rescue-text)] outline-none focus:border-[#0F9F76]" /></label>
          <label className="flex items-center justify-between rounded-xl border border-[color:var(--color-rescue-border)] p-4"><div><p className="text-sm font-bold">Email notifications</p><p className="text-xs text-[color:var(--color-rescue-text-muted)]">Receive admin alerts when approvals need attention.</p></div><input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0F9F76]" /></label>
          <button className="rounded-xl bg-[#0F9F76] px-5 py-3 text-sm font-bold text-white">Save settings</button>
        </div>
      </div>
    </AdminLayout>
  );
}

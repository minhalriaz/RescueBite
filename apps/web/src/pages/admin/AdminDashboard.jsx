import { ArrowRight, CheckCircle2, Clock3, Flag, LoaderCircle, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminStatCard from "../../components/admin/AdminStatCard";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const response = await api.getAdminDashboard();

        if (!cancelled) {
          setDashboard(response);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load the admin dashboard.");
        }
      }
    }

    loadDashboard();
    api.getAdminActivity().then((response) => setActivities((response.activities || []).slice(0, 5))).catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = dashboard
    ? [
        { label: "Total Donors", value: dashboard.stats.total_donors, change: "Live", tone: "green" },
        { label: "Total NGOs", value: dashboard.stats.total_ngos, change: "Live", tone: "blue" },
        { label: "Volunteers", value: dashboard.stats.total_volunteers, change: "Live", tone: "purple" },
        { label: "Active Donations", value: dashboard.stats.active_donations, change: "Live", tone: "orange" },
        { label: "Completed Rescues", value: dashboard.stats.completed_rescues, change: "Live", tone: "green" },
        { label: "Meals Shared", value: dashboard.stats.meals_shared, change: "Live", tone: "teal" },
      ]
    : [];

  const pendingNgos = dashboard?.pending?.ngos || 0;
  const pendingVolunteers = dashboard?.pending?.volunteers || 0;

  return (
    <AdminLayout>
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F9F76]">RescueBite Control Center</p>
        <div className="mt-2 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">Good evening, Admin 👋</h1>
            <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">Monitor donations, people and rescues from one place.</p>
          </div>
          <Link to="/admin/reports" className="inline-flex items-center gap-2 rounded-xl bg-[#0F9F76] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0C8562]">View reports <ArrowRight size={16} /></Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {!dashboard && !error ? (
        <div className="flex items-center gap-2 py-12 text-sm font-semibold text-[color:var(--color-rescue-text-muted)]">
          <LoaderCircle size={18} className="animate-spin" />
          Loading dashboard...
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {stats.map(stat => <AdminStatCard key={stat.label} stat={stat} />)}
        </section>
      )}

      <section className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div><h2 className="font-black">Approval Queue</h2><p className="mt-1 text-xs text-[color:var(--color-rescue-text-muted)]">Items that need administrator attention</p></div>
            <ShieldCheck className="text-[#0F9F76]" size={22} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link to="/admin/ngos" className="rounded-xl border border-[color:var(--color-rescue-border)] p-4 hover:border-[#0F9F76]/50">
              <div className="flex items-center justify-between"><span className="text-sm font-bold">NGO approvals</span><span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-black text-amber-600 dark:text-amber-300">{pendingNgos}</span></div>
              <p className="mt-2 text-xs text-[color:var(--color-rescue-text-muted)]">Review new NGO registrations.</p>
            </Link>
            <Link to="/admin/volunteers" className="rounded-xl border border-[color:var(--color-rescue-border)] p-4 hover:border-[#0F9F76]/50">
              <div className="flex items-center justify-between"><span className="text-sm font-bold">Volunteer approvals</span><span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-black text-amber-600 dark:text-amber-300">{pendingVolunteers}</span></div>
              <p className="mt-2 text-xs text-[color:var(--color-rescue-text-muted)]">Verify volunteer registrations.</p>
            </Link>
            <Link to="/admin/donations" className="rounded-xl border border-[color:var(--color-rescue-border)] p-4 hover:border-[#0F9F76]/50">
              <div className="flex items-center justify-between"><span className="text-sm font-bold">Donation requests</span><span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-black text-amber-600 dark:text-amber-300">{dashboard?.pending?.requests || 0}</span></div>
              <p className="mt-2 text-xs text-[color:var(--color-rescue-text-muted)]">Review NGO pickup requests.</p>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm">
          <div className="flex items-center justify-between"><div><h2 className="font-black">System Health</h2><p className="mt-1 text-xs text-[color:var(--color-rescue-text-muted)]">Current platform services</p></div><CheckCircle2 className="text-[#0F9F76]" size={22} /></div>
          <div className="mt-5 space-y-3">
            {["Donation workflow", "Role-based navigation", "Notification UI", "Theme system"].map(item => <div key={item} className="flex items-center justify-between rounded-xl bg-[color:var(--color-rescue-bg)] px-4 py-3"><span className="text-sm font-semibold">{item}</span><span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-300"><CheckCircle2 size={15} /> Ready</span></div>)}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm">
          <div className="flex items-center justify-between"><div><h2 className="font-black">Recent Activity</h2><p className="mt-1 text-xs text-[color:var(--color-rescue-text-muted)]">Latest platform events</p></div><Link to="/admin/activity" className="text-xs font-bold text-[#0F9F76]">View all</Link></div>
          <div className="mt-4 space-y-3">
            {activities.length === 0 ? <div className="rounded-xl border border-[color:var(--color-rescue-border)] p-4 text-sm text-[color:var(--color-rescue-text-muted)]">No recent activity recorded.</div> : activities.map((activity) => <div key={activity.id} className="flex gap-3 rounded-xl border border-[color:var(--color-rescue-border)] p-3"><div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg bg-[color:var(--color-rescue-accent-soft)] text-center text-[#0F9F76]"><span className="relative top-1.5">•</span></div><div className="min-w-0 flex-1"><p className="text-sm font-bold">{activity.action}</p><p className="mt-0.5 text-xs text-[color:var(--color-rescue-text-muted)]">{activity.actor}</p></div></div>)}
          </div>
        </div>

        <div className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm">
          <div className="flex items-center justify-between"><div><h2 className="font-black">Quick Overview</h2><p className="mt-1 text-xs text-[color:var(--color-rescue-text-muted)]">What needs attention now</p></div><Clock3 className="text-[#0F9F76]" size={21} /></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link to="/admin/reported-content" className="rounded-xl bg-red-500/5 p-4 hover:bg-red-500/10"><Flag className="text-red-500" size={19} /><p className="mt-3 text-sm font-bold">Reported content</p><p className="mt-1 text-xs text-[color:var(--color-rescue-text-muted)]">{dashboard?.stats?.open_reports || 0} items awaiting review</p></Link>
            <Link to="/admin/donations" className="rounded-xl bg-[#0F9F76]/5 p-4 hover:bg-[#0F9F76]/10"><CheckCircle2 className="text-[#0F9F76]" size={19} /><p className="mt-3 text-sm font-bold">Rescue tracking</p><p className="mt-1 text-xs text-[color:var(--color-rescue-text-muted)]">Monitor current donation states</p></Link>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

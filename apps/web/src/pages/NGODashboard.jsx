import { BellRing, Handshake, Users } from "lucide-react";
import DashboardShell from "../components/dashboard/DashboardShell";
import NotificationSection from "../components/dashboard/NotificationSection";
import { useNotifications } from "../context/NotificationContext";
import { beneficiaryLabel } from "../utils/notification";
import { getStoredUser } from "../lib/auth";

export default function NGODashboard() {
  const { notifications, unreadCount } = useNotifications();
  const user = getStoredUser();

  return (
    <DashboardShell role="ngo">
      <section className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-500 p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-emerald-100 font-medium">RescueBite NGO alerts</p>
            <h1 className="mt-1 text-3xl font-bold">Matching food donations</h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-50/90">
              You receive in-app alerts when a donor posts food matching your beneficiary preference.
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wider text-emerald-100">Preference</p>
            <p className="mt-1 text-lg font-bold">{beneficiaryLabel(user?.beneficiary_preference)}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm">
          <BellRing className="text-emerald-600" />
          <p className="mt-4 text-3xl font-bold text-gray-900">{unreadCount}</p>
          <p className="text-sm text-gray-500">Unread alerts</p>
        </div>
        <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm">
          <Handshake className="text-emerald-600" />
          <p className="mt-4 text-3xl font-bold text-gray-900">{notifications.length}</p>
          <p className="text-sm text-gray-500">Recent matching posts</p>
        </div>
        <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm">
          <Users className="text-emerald-600" />
          <p className="mt-4 text-lg font-bold text-gray-900">{beneficiaryLabel(user?.beneficiary_preference)}</p>
          <p className="text-sm text-gray-500">Beneficiary preference</p>
        </div>
      </section>

      <section className="mt-6 max-w-3xl">
        <NotificationSection />
      </section>
    </DashboardShell>
  );
}

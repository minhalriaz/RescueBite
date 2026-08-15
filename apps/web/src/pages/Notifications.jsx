import { AlertCircle, Bell, CheckCheck, LoaderCircle, RefreshCcw } from "lucide-react";
import DashboardShell from "../components/dashboard/DashboardShell";
import NotificationRow from "../components/notifications/NotificationRow";
import { useNotifications } from "../context/NotificationContext";
import { getStoredUser } from "../lib/auth";

export default function Notifications() {
  const user = getStoredUser();
  const role = user?.role === "ngo" ? "ngo" : "donor";
  const {
    notifications,
    unreadCount,
    loading,
    error,
    refreshNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  return (
    <DashboardShell role={role}>
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">In-app alerts</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="mt-1 text-sm text-gray-500">{unreadCount} unread notification{unreadCount === 1 ? "" : "s"}</p>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0 || loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={18} />
            Mark all as read
          </button>
        </div>

        <div className="mt-6">
          {loading && notifications.length === 0 ? (
            <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <LoaderCircle className="mx-auto animate-spin text-emerald-600" size={30} />
              <p className="mt-3 text-gray-500">Loading notifications...</p>
            </div>
          ) : error && notifications.length === 0 ? (
            <div className="rounded-3xl border border-rose-100 bg-white p-10 text-center shadow-sm">
              <AlertCircle className="mx-auto text-rose-500" size={30} />
              <p className="mt-3 font-medium text-gray-800">Could not load notifications</p>
              <p className="mt-1 text-sm text-gray-500">{error}</p>
              <button onClick={refreshNotifications} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">
                <RefreshCcw size={16} /> Retry
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <Bell className="mx-auto text-gray-400" size={32} />
              <p className="mt-3 font-medium text-gray-800">No notifications yet</p>
              <p className="mt-1 text-sm text-gray-500">Matching donation alerts will appear here automatically.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <NotificationRow key={notification.id} notification={notification} onRead={markAsRead} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

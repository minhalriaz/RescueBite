import { AlertCircle, Bell, CheckCheck, LoaderCircle, RefreshCcw } from "lucide-react";
import DashboardShell from "../components/dashboard/DashboardShell";
import NotificationRow from "../components/notifications/NotificationRow";
import { useNotifications } from "../context/NotificationContext";
import { getStoredUser } from "../lib/auth";

export default function Notifications({ role: routeRole }) {
  const user = getStoredUser();
  const role = routeRole || (user?.role === "ngo" ? "ngo" : "donor");
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
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0F9F76]">In-app alerts</p>
            <h1 className="mt-1 text-3xl font-bold text-[color:var(--color-rescue-text)]">Notifications</h1>
            <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">{unreadCount} unread notification{unreadCount === 1 ? "" : "s"}</p>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0 || loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F9F76] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0C8562] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={18} />
            Mark all as read
          </button>
        </div>

        <div className="mt-6">
          {loading && notifications.length === 0 ? (
            <div className="rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-12 text-center shadow-sm">
              <LoaderCircle className="mx-auto animate-spin text-[#0F9F76]" size={30} />
              <p className="mt-3 text-[color:var(--color-rescue-text-muted)]">Loading notifications...</p>
            </div>
          ) : error && notifications.length === 0 ? (
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-10 text-center shadow-sm">
              <AlertCircle className="mx-auto text-rose-400" size={30} />
              <p className="mt-3 font-medium text-[color:var(--color-rescue-text)]">Could not load notifications</p>
              <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">{error}</p>
              <button onClick={refreshNotifications} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-rescue-accent-soft)] px-4 py-2 text-sm font-semibold text-[color:var(--color-rescue-text)] hover:bg-[color:var(--color-rescue-border)]">
                <RefreshCcw size={16} /> Retry
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-12 text-center shadow-sm">
              <Bell className="mx-auto text-[color:var(--color-rescue-text-muted)]" size={32} />
              <p className="mt-3 font-medium text-[color:var(--color-rescue-text)]">No notifications yet</p>
              <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">Matching donation alerts will appear here automatically.</p>
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

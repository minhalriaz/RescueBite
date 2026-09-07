import { AlertCircle, ArrowRight, Bell, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { getStoredUser } from "../../lib/auth";
import NotificationRow from "../notifications/NotificationRow";

export default function NotificationSection() {
  const user = getStoredUser();
  const role = user?.role === "ngo" ? "ngo" : "donor";
  const { notifications, loading, error, markAsRead, refreshNotifications } = useNotifications();
  const path = role === "ngo" ? "/ngo/notifications" : "/donor/notifications";

  return (
    <div className="bg-[color:var(--color-rescue-surface)] rounded-3xl border border-[color:var(--color-rescue-border)] shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-[color:var(--color-rescue-border)]">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#0F9F76]" />
          <h2 className="text-lg font-semibold text-[color:var(--color-rescue-text)]">Latest Notifications</h2>
        </div>
        <Link to={path} className="text-sm font-medium text-[#0F9F76] hover:text-[#0C8562]">View All</Link>
      </div>

      <div className="divide-y divide-[color:var(--color-rescue-border)] min-h-44">
        {loading && notifications.length === 0 ? (
          <div className="flex items-center justify-center gap-2 p-8 text-sm text-[color:var(--color-rescue-text-muted)]">
            <LoaderCircle size={18} className="animate-spin" /> Loading notifications...
          </div>
        ) : error && notifications.length === 0 ? (
          <div className="p-6 text-center">
            <AlertCircle className="mx-auto text-rose-500" size={22} />
            <p className="mt-2 text-sm text-[color:var(--color-rescue-text)]">{error}</p>
            <button onClick={refreshNotifications} className="mt-3 text-sm font-semibold text-[#0F9F76]">Retry</button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-sm text-[color:var(--color-rescue-text-muted)]">No notifications yet.</div>
        ) : notifications.slice(0, 3).map((notification) => (
          <NotificationRow key={notification.id} notification={notification} onRead={markAsRead} compact />
        ))}
      </div>

      <div className="border-t border-[color:var(--color-rescue-border)] p-4 flex justify-center">
        <Link to={path} className="flex items-center gap-2 font-semibold text-[#0F9F76] hover:text-[#0C8562] transition">
          See All Notifications <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

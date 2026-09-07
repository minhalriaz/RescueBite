import { AlertCircle, Bell, CheckCheck, LoaderCircle, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import NotificationRow from "./NotificationRow";

export default function NotificationDropdown({
  role,
  notifications,
  unreadCount,
  loading,
  error,
  onRead,
  onReadAll,
  onRetry,
  onClose,
}) {
  const viewAllPath = role === "ngo" ? "/ngo/notifications" : "/donor/notifications";

  return (
    <div className="absolute right-0 top-12 z-50 w-[min(92vw,390px)] overflow-hidden rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[color:var(--color-rescue-border)] px-4 py-3">
        <div>
          <p className="font-semibold text-[color:var(--color-rescue-text)]">Notifications</p>
          <p className="text-xs text-[color:var(--color-rescue-text-muted)]">{unreadCount} unread</p>
        </div>

        <button
          type="button"
          onClick={onReadAll}
          disabled={unreadCount === 0 || loading}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-[#0F9F76] hover:bg-[color:var(--color-rescue-accent-soft)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCheck size={15} />
          Read all
        </button>
      </div>

      <div className="max-h-[430px] overflow-y-auto">
        {loading && notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-10 text-[color:var(--color-rescue-text-muted)]">
            <LoaderCircle className="animate-spin" size={24} />
            <p className="text-sm">Loading notifications...</p>
          </div>
        ) : error && notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
            <AlertCircle className="text-rose-500" size={24} />
            <p className="text-sm text-[color:var(--color-rescue-text)]">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="flex items-center gap-1 rounded-lg bg-[color:var(--color-rescue-accent-soft)] px-3 py-2 text-xs font-semibold text-[color:var(--color-rescue-text)] hover:bg-[color:var(--color-rescue-border)]"
            >
              <RefreshCcw size={14} />
              Retry
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-10 text-center text-[color:var(--color-rescue-text-muted)]">
            <Bell size={25} />
            <p className="font-medium text-[color:var(--color-rescue-text)]">No notifications yet</p>
            <p className="text-xs">New matching food donations will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-[color:var(--color-rescue-border)]">
            {notifications.slice(0, 6).map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                onRead={onRead}
                compact
              />
            ))}
          </div>
        )}
      </div>

      <Link
        to={viewAllPath}
        onClick={onClose}
        className="block border-t border-[color:var(--color-rescue-border)] px-4 py-3 text-center text-sm font-semibold text-[#0F9F76] hover:bg-[color:var(--color-rescue-accent-soft)]"
      >
        View all notifications
      </Link>
    </div>
  );
}

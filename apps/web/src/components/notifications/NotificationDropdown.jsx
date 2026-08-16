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
    <div className="absolute right-0 top-12 z-50 w-[min(92vw,390px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div>
          <p className="font-semibold text-gray-900">Notifications</p>
          <p className="text-xs text-gray-500">{unreadCount} unread</p>
        </div>

        <button
          type="button"
          onClick={onReadAll}
          disabled={unreadCount === 0 || loading}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCheck size={15} />
          Read all
        </button>
      </div>

      <div className="max-h-[430px] overflow-y-auto">
        {loading && notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-10 text-gray-500">
            <LoaderCircle className="animate-spin" size={24} />
            <p className="text-sm">Loading notifications...</p>
          </div>
        ) : error && notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
            <AlertCircle className="text-rose-500" size={24} />
            <p className="text-sm text-gray-600">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200"
            >
              <RefreshCcw size={14} />
              Retry
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-10 text-center text-gray-500">
            <Bell size={25} />
            <p className="font-medium text-gray-700">No notifications yet</p>
            <p className="text-xs">New matching food donations will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
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
        className="block border-t border-gray-100 px-4 py-3 text-center text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
      >
        View all notifications
      </Link>
    </div>
  );
}

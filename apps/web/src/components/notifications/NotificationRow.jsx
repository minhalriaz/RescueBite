import { Clock3, MapPin, Users } from "lucide-react";
import { beneficiaryLabel, formatNotificationTime } from "../../utils/notification";

export default function NotificationRow({ notification, onRead, compact = false }) {
  const data = notification.data || {};
  const unread = !notification.read_at;

  return (
    <button
      type="button"
      onClick={() => unread && onRead?.(notification.id)}
      className={`w-full text-left transition ${compact ? "px-4 py-3" : "p-5 rounded-2xl border"} ${
        unread
          ? "bg-[color:var(--color-rescue-accent-soft)] border-[color:var(--color-rescue-border)] hover:bg-[color:var(--color-rescue-accent-soft)]"
          : "bg-[color:var(--color-rescue-surface)] border-[color:var(--color-rescue-border)] hover:bg-[color:var(--color-rescue-accent-soft)]"
      }`}
    >
      <div className="flex gap-3">
        <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${unread ? "bg-[#0F9F76]" : "bg-[color:var(--color-rescue-text-muted)]"}`} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-[color:var(--color-rescue-text)]">{notification.title}</p>
              <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)] line-clamp-2">
                {data.food || notification.message}
                {data.quantity ? ` · ${data.quantity}` : ""}
              </p>
            </div>

            {unread ? (
              <span className="shrink-0 rounded-full bg-[#0F9F76]/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0F9F76]">
                New
              </span>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[color:var(--color-rescue-text-muted)]">
            <span className="flex items-center gap-1">
              <Clock3 size={13} />
              {formatNotificationTime(notification.created_at)}
            </span>
            {data.beneficiary_type ? (
              <span className="flex items-center gap-1">
                <Users size={13} />
                {beneficiaryLabel(data.beneficiary_type)}
              </span>
            ) : null}
            {data.address ? (
              <span className="flex items-center gap-1 truncate">
                <MapPin size={13} />
                {data.address}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}
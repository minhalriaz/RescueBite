import { Clock3 } from "lucide-react";

export default function NotificationItem({
    ngo,
    message,
    time,
    color,
}) {
    return (
        <div
            className="
        flex
        items-center
        justify-between
        px-5
        py-4
        hover:bg-[color:var(--color-rescue-accent-soft)]
        transition
      "
        >
            {/* Left */}
            <div className="flex items-center gap-4">

                {/* NGO Avatar */}
                <div
                    className={`
            w-11
            h-11
            rounded-full
            flex
            items-center
            justify-center
            text-white
            font-bold
            ${color}
          `}
                >
                    {ngo.charAt(0)}
                </div>

                {/* Text */}
                <div>

                    <h4 className="font-semibold text-[color:var(--color-rescue-text)]">
                        {ngo}
                    </h4>

                    <p className="text-sm text-[color:var(--color-rescue-text-muted)] mt-1">
                        {message}
                    </p>

                    <div className="flex items-center gap-1 mt-1 text-xs text-[color:var(--color-rescue-text-muted)]">
                        <Clock3 size={13} />
                        {time}
                    </div>

                </div>

            </div>

            {/* Unread Dot */}
            <div className="w-2 h-2 rounded-full bg-red-500"></div>

        </div>
    );
}
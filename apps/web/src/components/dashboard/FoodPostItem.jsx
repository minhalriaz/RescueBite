import { MapPin, ChevronRight } from "lucide-react";

export default function FoodPostItem({
    image,
    title,
    location,
    quantity,
    expiry,
    status,
}) {
    return (
        <div
            className="
        flex
        items-center
        justify-between
        rounded-2xl
        p-3
        hover:bg-[color:var(--color-rescue-accent-soft)]
        transition
      "
        >
            {/* Left */}

            <div className="flex items-center gap-4">

                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-16 h-16 rounded-xl object-cover"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-xl bg-[color:var(--color-rescue-accent-soft)] flex items-center justify-center text-2xl shrink-0">
                        🍲
                    </div>
                )}

                <div>

                    <h3 className="font-semibold text-[color:var(--color-rescue-text)]">
                        {title}
                    </h3>

                    <div className="flex items-center gap-1 text-sm text-[color:var(--color-rescue-text-muted)] mt-1">

                        <MapPin size={14} />

                        {location}

                    </div>

                    <span
                        className="
              inline-block
              mt-2
              px-2
              py-1
              rounded-full
              bg-[color:var(--color-rescue-accent-soft)]
              text-[#0F9F76]
              text-xs
              font-medium
            "
                    >
                        {status}
                    </span>

                </div>

            </div>

            {/* Right */}

            <div className="text-right">

                <p className="font-semibold text-[color:var(--color-rescue-text)]">
                    {quantity}
                </p>

                <p className="text-xs text-[color:var(--color-rescue-text-muted)] mt-1">
                    {expiry}
                </p>

                <ChevronRight
                    className="ml-auto mt-2 text-[color:var(--color-rescue-text-muted)]"
                    size={18}
                />

            </div>

        </div>
    );
}
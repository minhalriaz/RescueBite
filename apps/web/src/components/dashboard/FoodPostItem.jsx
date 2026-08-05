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
        hover:bg-emerald-50
        transition
      "
        >
            {/* Left */}

            <div className="flex items-center gap-4">

                <img
                    src={image}
                    alt={title}
                    className="w-16 h-16 rounded-xl object-cover"
                />

                <div>

                    <h3 className="font-semibold text-gray-800">
                        {title}
                    </h3>

                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">

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
              bg-emerald-100
              text-emerald-700
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

                <p className="font-semibold text-gray-800">
                    {quantity}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                    {expiry}
                </p>

                <ChevronRight
                    className="ml-auto mt-2 text-gray-400"
                    size={18}
                />

            </div>

        </div>
    );
}
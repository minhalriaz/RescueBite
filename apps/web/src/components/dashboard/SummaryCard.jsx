const colorStyles = {
  emerald: {
    icon: "bg-emerald-100 text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    graph: "bg-emerald-500",
  },

  blue: {
    icon: "bg-blue-100 text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    graph: "bg-blue-500",
  },

  violet: {
    icon: "bg-violet-100 text-violet-600",
    badge: "bg-violet-100 text-violet-700",
    graph: "bg-violet-500",
  },

  orange: {
    icon: "bg-orange-100 text-orange-600",
    badge: "bg-orange-100 text-orange-700",
    graph: "bg-orange-500",
  },
};

export default function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  trend,
  color,
  compact = false,
}) {
  const style = colorStyles[color];

  return (
    <div
      className={`
      bg-white
      rounded-3xl
      border border-gray-100
      shadow-md
      ${compact ? "px-4 py-4" : "px-5 py-5"}
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    `}
    >
      {/* Top */}

      <div className="flex items-center justify-between">

        <div
          className={`
            ${compact ? "w-10 h-10" : "w-12 h-12"}
            rounded-xl
            flex
            items-center
            justify-center
            ${style.icon}
          `}
        >
          {icon}
        </div>

        <span
          className={`
            px-2.5
            py-1
            rounded-full
            text-[11px]
            font-semibold
            ${style.badge}
          `}
        >
          {trend}
        </span>

      </div>

      {/* Title */}

      <h3 className={`${compact ? "mt-3" : "mt-4"} text-sm font-medium text-gray-500`}>
        {title}
      </h3>

      {/* Value */}

      <h2 className={`${compact ? "text-3xl" : "text-4xl"} mt-1 font-bold text-gray-900`}>
        {value}
      </h2>

      {/* Subtitle */}

      <p className="mt-1 text-sm text-gray-500">
        {subtitle}
      </p>

      {/* Mini Graph */}

      <div className={`${compact ? "mt-3 h-5" : "mt-4 h-7"} flex items-end gap-1`}>

        {[5, 8, 6, 11, 9, 13, 12, 15].map((height, index) => (
          <div
            key={index}
            style={{ height }}
            className={`
              w-2
              rounded-full
              ${style.graph}
              opacity-80
            `}
          />
        ))}

      </div>

    </div>
  );
}
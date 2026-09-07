const colorStyles = {
  emerald: {
    icon: "bg-[color:var(--color-rescue-accent-soft)] text-[#0F9F76]",
    badge: "bg-[color:var(--color-rescue-accent-soft)] text-[#0F9F76]",
    graph: "bg-[#0F9F76]",
  },

  blue: {
    icon: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
    badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700",
    graph: "bg-blue-500",
  },

  violet: {
    icon: "bg-violet-100 dark:bg-violet-900/30 text-violet-600",
    badge: "bg-violet-100 dark:bg-violet-900/30 text-violet-700",
    graph: "bg-violet-500",
  },

  orange: {
    icon: "bg-orange-100 dark:bg-orange-900/30 text-orange-600",
    badge: "bg-orange-100 dark:bg-orange-900/30 text-orange-700",
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
      bg-[color:var(--color-rescue-surface)]
      rounded-3xl
      border border-[color:var(--color-rescue-border)]
      shadow-md
      ${compact ? "px-4 py-4" : "px-5 py-5"}
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    `}
    >
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

      <h3 className={`${compact ? "mt-3" : "mt-4"} text-sm font-medium text-[color:var(--color-rescue-text-muted)]`}>
        {title}
      </h3>

      <h2 className={`${compact ? "text-3xl" : "text-4xl"} mt-1 font-bold text-[color:var(--color-rescue-text)]`}>
        {value}
      </h2>

      <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
        {subtitle}
      </p>

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
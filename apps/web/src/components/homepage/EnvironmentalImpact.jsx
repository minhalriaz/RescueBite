import { Leaf, Trash2, Wind } from "lucide-react";

const GOALS = { meals: 2400, waste: 600, co2: 1500 };

const LABELS = [
  {
    key: "meals",
    label: "Food Rescued",
    unit: "meals",
    icon: <Leaf size={16} className="text-[#0F9F76]" />,
    fallback: 1240,
  },
  {
    key: "waste",
    label: "Waste Prevented",
    unit: "kg",
    icon: <Trash2 size={16} className="text-[#0F9F76]" />,
    fallback: 310,
  },
  {
    key: "co2",
    label: "CO₂ Avoided",
    unit: "kg",
    icon: <Wind size={16} className="text-[#0F9F76]" />,
    fallback: 780,
  },
];

function parseQty(raw) {
  const num = typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);
  return Number.isFinite(num) && num > 0 ? num : null;
}

function computeMetrics(donations) {
  const rescues = (Array.isArray(donations) ? donations : []).filter(
    (d) => d.status === "collected" || d.status === "requested"
  );
  let meals = 0;
  if (rescues.length) {
    rescues.forEach((d) => {
      const q = parseQty(d.quantity);
      meals += q !== null ? q : 12;
    });
  }
  const waste = Math.round(meals * 0.25);
  const co2 = Math.round(meals * 0.64);
  return { meals, waste, co2, rescues: rescues.length };
}

export default function EnvironmentalImpact({ donations = [], loading = false }) {
  const { meals, waste, co2, rescues } = computeMetrics(donations);
  const hasData = rescues > 0;
  const display = hasData
    ? { meals, waste, co2 }
    : { meals: 1240, waste: 310, co2: 780 };

  const totalLabel = hasData
    ? `${rescues} donations delivered`
    : loading
      ? "Refreshing live data..."
      : "Representative impact estimates";

  return (
    <section className="mt-16">
      <div className="flex flex-col gap-1 mb-6">
        <div className="flex items-center gap-2.5">
          <Leaf size={22} className="text-[#0F9F76]" />
          <h2 className="text-2xl font-extrabold text-[color:var(--color-rescue-text)] tracking-tight">
            Environmental Impact
          </h2>
        </div>
        <p className="text-sm text-[color:var(--color-rescue-text-muted)]">{totalLabel}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LABELS.map((meta) => {
          const value = display[meta.key];
          const goal = GOALS[meta.key];
          const pct = Math.min(100, Math.round((value / goal) * 100));
          return (
            <div
              key={meta.key}
              className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-rescue-text)]">
                  {meta.icon}
                  {meta.label}
                </span>
                <span className="text-xs font-black text-[#0F9F76]">
                  {value.toLocaleString()} {meta.unit}
                </span>
              </div>

              <div className="relative h-3 w-full rounded-full bg-[color:var(--color-rescue-accent-soft)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0F9F76] to-[#0C8562] transition-all duration-500 ease-out"
                  style={{ width: `${pct}%` }}
                />
                <span
                  className={`absolute -inset-x-0 top-1/2 -translate-y-1/2 text-[10px] font-black ${
                    pct >= 30 ? "text-white" : "text-[color:var(--color-rescue-text-muted)]"
                  }`}
                  style={{ left: `${Math.max(pct, 6)}%` }}
                >
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-[color:var(--color-rescue-text-muted)]">
        Waste and CO₂ estimates use an average of 0.25 kg and 0.64 kg per rescued
        meal respectively.
      </p>
    </section>
  );
}

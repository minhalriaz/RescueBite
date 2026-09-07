import { ArrowUpRight, BarChart3, HeartHandshake, Package, Store, Users } from "lucide-react";

const icons = {
  green: HeartHandshake,
  blue: Store,
  purple: Users,
  orange: Package,
  teal: BarChart3,
};

export default function AdminStatCard({ stat }) {
  const Icon = icons[stat.tone] || BarChart3;
  return (
    <div className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-rescue-accent-soft)] text-[#0F9F76]">
          <Icon size={21} />
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-300">
          <ArrowUpRight size={12} /> {stat.change}
        </span>
      </div>
      <p className="mt-5 text-xs font-semibold text-[color:var(--color-rescue-text-muted)]">{stat.label}</p>
      <p className="mt-1 text-2xl font-black tracking-tight text-[color:var(--color-rescue-text)]">{stat.value}</p>
    </div>
  );
}

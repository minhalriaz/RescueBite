import SummaryCard from './SummaryCard';
import { Package, CheckCircle2, Building2, HeartHandshake } from 'lucide-react';

const STAT_DEFS = [
  {
    key: 'active',
    title: 'Active Donations',
    subtitle: 'Currently Active',
    trend: '',
    icon: <Package size={22} />,
    color: 'emerald',
  },
  {
    key: 'completed',
    title: 'Completed Donations',
    subtitle: 'Successfully Delivered',
    trend: '',
    icon: <CheckCircle2 size={22} />,
    color: 'blue',
  },
  {
    key: 'pending',
    title: 'Pending Requests',
    subtitle: 'Awaiting Pickup',
    trend: '',
    icon: <Building2 size={22} />,
    color: 'violet',
  },
  {
    key: 'ngos_reached',
    title: 'NGOs Reached',
    subtitle: 'Partner NGOs',
    trend: '',
    icon: <HeartHandshake size={22} />,
    color: 'orange',
  },
];

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-6 animate-pulse">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--color-rescue-accent-soft)]" />
      <div className="mt-5 h-3 w-20 rounded bg-[color:var(--color-rescue-accent-soft)]" />
      <div className="mt-2 h-6 w-10 rounded bg-[color:var(--color-rescue-accent-soft)]" />
    </div>
  );
}

export default function StatsSection({ stats = {}, loading = false }) {
  if (loading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
        {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
      {STAT_DEFS.map(def => (
        <SummaryCard
          key={def.key}
          title={def.title}
          value={String(stats[def.key] ?? 0)}
          subtitle={def.subtitle}
          trend={def.trend}
          icon={def.icon}
          color={def.color}
        />
      ))}
    </section>
  );
}

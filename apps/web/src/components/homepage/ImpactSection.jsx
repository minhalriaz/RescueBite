import { useEffect, useRef, useState } from "react";
import { api } from "../../api/client";
import { Package, HeartHandshake, TimerOff, Leaf } from "lucide-react";

function StatCard({ icon, label, value, accent }) {
  return (
    <div className="rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
          {icon}
        </span>
      </div>
      <p className="mt-5 text-3xl font-extrabold text-[color:var(--color-rescue-text)]">{value}</p>
      <p className="mt-1 text-sm font-medium text-[color:var(--color-rescue-text-muted)]">{label}</p>
    </div>
  );
}

function computeStats(donations) {
  const now = Date.now();
  let human = 0, animal = 0, urgent = 0;
  donations.forEach((d) => {
    if (d.beneficiary_type === "human") human++;
    else if (d.beneficiary_type === "animal") animal++;
    if (d.status === "available") {
      const deadline = new Date(d.pickup_deadline).getTime();
      const hoursLeft = (deadline - now) / (1000 * 60 * 60);
      if (hoursLeft > 0 && hoursLeft <= 3) urgent++;
    }
  });
  return {
    total: donations.length,
    human,
    animal,
    urgent,
  };
}

export default function ImpactSection() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    let active = true;
    setError("");
    api.getDonations()
      .then((payload) => {
        if (!active) return;
        setDonations(Array.isArray(payload.data) ? payload.data : []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Could not load impact data.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const stats = computeStats(donations);

  if (loading) {
    return (
      <section className="mt-20">
        <div className="h-8 w-48 rounded bg-[color:var(--color-rescue-accent-soft)] animate-pulse mx-auto" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-3xl bg-[color:var(--color-rescue-surface)] animate-pulse border border-[color:var(--color-rescue-border)]" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-20 rounded-3xl border border-rose-200 bg-rose-50 dark:bg-rose-900/20 p-6 text-center">
        <p className="text-rose-700 dark:text-rose-300 font-semibold text-sm">{error}</p>
      </section>
    );
  }

  return (
    <section className="mt-20">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 bg-[color:var(--color-rescue-accent-soft)] text-[#0F9F76] text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider">
          Live Impact
        </span>
        <h2 className="text-3xl font-extrabold text-[color:var(--color-rescue-text)] tracking-tight mt-4">
          Our Impact Right Now
        </h2>
        <p className="text-[color:var(--color-rescue-text-muted)] font-medium text-sm mt-2 max-w-2xl mx-auto">
          Real-time surplus food currently waiting to be rescued across Dhaka.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Package size={24} className="text-[#0F9F76]" />}
          label="Active Rescues"
          value={stats.total}
          accent="bg-[color:var(--color-rescue-accent-soft)]"
        />
        <StatCard
          icon={<HeartHandshake size={24} className="text-blue-600" />}
          label="Human Food"
          value={stats.human}
          accent="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatCard
          icon={<TimerOff size={24} className="text-amber-600" />}
          label="Expiring Soon"
          value={stats.urgent}
          accent="bg-amber-100 dark:bg-amber-900/30"
        />
        <StatCard
          icon={<Leaf size={24} className="text-emerald-600" />}
          label="Animal Shelters"
          value={stats.animal}
          accent="bg-emerald-100 dark:bg-emerald-900/30"
        />
      </div>
    </section>
  );
}
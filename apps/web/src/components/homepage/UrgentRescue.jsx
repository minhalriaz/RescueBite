import { Clock3 } from "lucide-react";
import FoodRescueCard from "../homepage/FoodRescueCard";
import LoadingSkeleton from "../homepage/LoadingSkeleton";

const URGENT_WINDOW_HOURS = 24;
const LIMIT = 6;

function hoursLeft(deadline) {
  const end = new Date(deadline).getTime();
  return (end - Date.now()) / (1000 * 60 * 60);
}

function computeUrgent(donations) {
  const now = Date.now();
  return (Array.isArray(donations) ? donations : [])
    .filter((d) => d.status === "available")
    .filter((d) => {
      const diff = (new Date(d.pickup_deadline).getTime() - now) / (1000 * 60 * 60);
      return diff > 0 && diff <= URGENT_WINDOW_HOURS;
    })
    .sort((a, b) => new Date(a.pickup_deadline) - new Date(b.pickup_deadline))
    .slice(0, LIMIT);
}

export default function UrgentRescue({ donations = [], loading = false, error = "" }) {
  const urgent = computeUrgent(donations);

  if (loading) {
    return (
      <section className="mb-8">
        <div className="mb-5 flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F9F76]/15 text-[#0F9F76]">
            <Clock3 size={20} />
          </span>
          <h2 className="text-2xl font-extrabold text-[color:var(--color-rescue-text)] tracking-tight">
            ⚡ Needs Rescue Soon
          </h2>
        </div>
        <LoadingSkeleton count={3} />
      </section>
    );
  }

  if (error) {
    return null;
  }

  if (urgent.length === 0) {
    return (
      <section className="mb-8">
        <div className="mb-5 flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F9F76]/15 text-[#0F9F76]">
            <Clock3 size={20} />
          </span>
          <h2 className="text-2xl font-extrabold text-[color:var(--color-rescue-text)] tracking-tight">
            ⚡ Needs Rescue Soon
          </h2>
        </div>
        <p className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] px-5 py-4 text-sm text-[color:var(--color-rescue-text-muted)]">
          No urgent rescues in the next 24 hours right now. Check back soon!
        </p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F9F76]/15 text-[#0F9F76]">
            <Clock3 size={20} />
          </span>
          <h2 className="text-2xl font-extrabold text-[color:var(--color-rescue-text)] tracking-tight">
            ⚡ Needs Rescue Soon
          </h2>
        </div>
        <span className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-rescue-text-muted)]">
          {urgent.length} urgent
        </span>
      </div>

      <p className="mt-1 mb-4 text-sm text-[color:var(--color-rescue-text-muted)]">
        Surplus food expiring soon — nearest deadlines first.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {urgent.map((donation) => {
          const isUrgent = hoursLeft(donation.pickup_deadline) <= 3;
          return (
            <div key={donation.id} className="relative">
              <span
                className={`absolute -top-2 -right-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                  isUrgent
                    ? "bg-rose-500 text-white shadow"
                    : "bg-amber-500 text-amber-950 shadow"
                }`}
              >
                {isUrgent ? "Urgent" : "Soon"}
              </span>
              <FoodRescueCard
                donation={donation}
                onRequest={() => alert(`Request sent to: ${donation.donor_name || "donor"}`)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { Clock3, MapPin, Package } from "lucide-react";
import { timeUntil } from "../../utils/time";

const STATUS_LABELS = {
  available: "Available",
  requested: "Requested",
  collected: "Collected",
  expired: "Expired",
};

const STATUS_COLORS = {
  available: "bg-[color:var(--color-rescue-green)] text-white",
  requested: "bg-amber-400 text-amber-950",
  collected: "bg-blue-500 text-white",
  expired: "bg-rose-500 text-white",
};

export default function FoodRescueCard({ donation, onRequest }) {
  const isAvailable = donation.status === "available";
  const isAnimal = donation.beneficiary_type === "animal";
  const deadline = timeUntil(donation.pickup_deadline);
  const statusColor = STATUS_COLORS[donation.status] || "bg-stone-300 text-stone-700";
  const statusLabel = STATUS_LABELS[donation.status] || donation.status;

  return (
    <article className="flex flex-col h-full rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="relative h-44 overflow-hidden flex items-center justify-center bg-gradient-to-br from-[color:var(--color-rescue-accent-soft)] to-[color:var(--color-rescue-bg)]">
        <span className="text-6xl">{isAnimal ? "🐾" : "🍲"}</span>
        <span className={`absolute top-4 right-4 text-[10px] font-black px-3 py-1.5 rounded-full shadow-md tracking-wider uppercase ${statusColor}`}>
          {statusLabel}
        </span>
        <span className={`absolute top-4 left-4 text-[9px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase ${isAnimal ? "bg-amber-500 text-white" : "bg-blue-600 text-white"}`}>
          {isAnimal ? "🐾 Animal Feed" : "🍲 Human Food"}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-bold text-[color:var(--color-rescue-green)] tracking-wider uppercase">
          {donation.donor_name || "Community Donor"}
        </span>
        <h3 className="font-bold text-[color:var(--color-rescue-text)] text-lg mt-1 line-clamp-2 leading-snug flex-grow">
          {donation.food}
        </h3>

        <div className="mt-4 space-y-2 border-t border-[color:var(--color-rescue-border)] pt-4 text-sm">
          <div className="flex items-center gap-2">
            <Package size={15} className="text-[color:var(--color-rescue-green)] flex-shrink-0" />
            <span className="font-medium text-[color:var(--color-rescue-text-muted)]">Quantity:</span>
            <span className="font-bold text-[color:var(--color-rescue-text)] ml-auto bg-[color:var(--color-rescue-accent-soft)] px-2.5 py-0.5 rounded-lg">
              {donation.quantity}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 size={15} className="text-rose-500 flex-shrink-0" />
            <span className="font-medium text-[color:var(--color-rescue-text-muted)]">Expires:</span>
            <span className="font-bold text-rose-600 ml-auto bg-rose-50/50 dark:bg-rose-900/20 px-2.5 py-0.5 rounded-lg">
              {deadline}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-[color:var(--color-rescue-green)] flex-shrink-0" />
            <span className="font-medium text-[color:var(--color-rescue-text-muted)]">Location:</span>
            <span className="font-semibold text-[color:var(--color-rescue-text)] ml-auto text-xs text-right">
              {donation.address}
            </span>
          </div>
        </div>

        <button
          onClick={onRequest}
          disabled={!isAvailable}
          aria-label={`${isAvailable ? "Request pickup for" : "Not available"} ${donation.food}`}
          className={`w-full mt-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
            isAvailable
              ? "bg-[color:var(--color-rescue-deep)] text-white hover:bg-[color:var(--color-rescue-green)] shadow-md active:scale-95"
              : "bg-[color:var(--color-rescue-accent-soft)] text-[color:var(--color-rescue-text-muted)] cursor-not-allowed"
          }`}
        >
          {isAvailable ? "Request Pickup" : "Claimed / Requested"}
        </button>
      </div>
    </article>
  );
}
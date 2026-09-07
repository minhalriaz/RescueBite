import { Clock3, MapPin, Package } from "lucide-react";
import { timeUntil } from "../../utils/time";
import RescueTimeline from "./RescueTimeline";

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
    <article className="flex flex-col h-full rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="relative h-36 overflow-hidden flex items-center justify-center bg-gradient-to-br from-[color:var(--color-rescue-accent-soft)] to-[color:var(--color-rescue-bg)]">
        <span className="text-4xl">{isAnimal ? "🐾" : "🍲"}</span>
        <span className={`absolute top-3 right-3 text-[9px] font-black px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase ${statusColor}`}>
          {statusLabel}
        </span>
        <span className={`absolute top-3 left-3 text-[8px] font-black px-2 py-0.5 rounded-lg tracking-wider uppercase ${isAnimal ? "bg-amber-500 text-white" : "bg-blue-600 text-white"}`}>
          {isAnimal ? "🐾 Animal Feed" : "🍲 Human Food"}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[10px] font-black text-[color:var(--color-rescue-green)] tracking-wider uppercase">
          {donation.donor_name || "Community Donor"}
        </span>
        <h3 className="font-bold text-[color:var(--color-rescue-text)] text-sm mt-1 line-clamp-2 leading-tight flex-grow">
          {donation.food}
        </h3>

        <div className="mt-3 space-y-1 border-t border-[color:var(--color-rescue-border)] pt-3 text-xs">
          <div className="flex items-center gap-1.5">
            <Package size={13} className="text-[color:var(--color-rescue-green)] flex-shrink-0" />
            <span className="font-medium text-[color:var(--color-rescue-text-muted)]">Qty:</span>
            <span className="font-bold text-[color:var(--color-rescue-text)] ml-auto bg-[color:var(--color-rescue-accent-soft)] px-2 py-0.5 rounded-lg">
              {donation.quantity}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock3 size={13} className="text-rose-500 flex-shrink-0" />
            <span className="font-medium text-[color:var(--color-rescue-text-muted)]">Expires:</span>
            <span className="font-bold text-rose-600 dark:text-rose-300 ml-auto bg-rose-50/50 dark:bg-rose-900/20 px-2 py-0.5 rounded-lg">
              {deadline}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-[color:var(--color-rescue-green)] flex-shrink-0" />
            <span className="font-medium text-[color:var(--color-rescue-text-muted)]">Location:</span>
            <span className="font-semibold text-[color:var(--color-rescue-text)] ml-auto text-[10px] text-right line-clamp-1">
              {donation.address}
            </span>
          </div>
        </div>

        <button
          onClick={onRequest}
          disabled={!isAvailable}
          aria-label={`${isAvailable ? "Request pickup for" : "Not available"} ${donation.food}`}
          className={`w-full mt-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
            isAvailable
              ? "bg-[#0F9F76] text-white hover:bg-[#0C8562] shadow active:scale-95"
              : "bg-[color:var(--color-rescue-accent-soft)] text-[color:var(--color-rescue-text-muted)] cursor-not-allowed"
          }`}
        >
          {isAvailable ? "Request Pickup" : "Claimed / Requested"}
        </button>

        <RescueTimeline status={donation.status} compact />
      </div>
    </article>
  );
}
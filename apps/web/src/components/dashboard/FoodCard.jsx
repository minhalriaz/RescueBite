import { Clock3, MapPin, Utensils } from "lucide-react";
import { timeUntil } from "../../utils/time";

const STATUS_COLORS = {
  available: 'bg-[color:var(--color-rescue-green)] text-white',
  requested: 'bg-amber-400 text-amber-950',
  collected: 'bg-blue-500 text-white',
  expired: 'bg-rose-500 text-white',
};

export default function FoodCard({ donation }) {
  const isAvailable = donation.status === 'available';
  const statusColor = STATUS_COLORS[donation.status] || 'bg-gray-400 text-white';

  return (
    <article className="bg-[color:var(--color-rescue-surface)] rounded-3xl border border-[color:var(--color-rescue-border)] shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      <div className="relative h-52 overflow-hidden flex items-center justify-center bg-gradient-to-br from-[color:var(--color-rescue-accent-soft)] to-[color:var(--color-rescue-bg)]">
        {donation.image ? (
          <img src={donation.image} alt={donation.food} className="w-full h-full object-cover" />
        ) : (
          <span className="text-7xl">{donation.beneficiary_type === 'animal' ? '🐾' : '🍲'}</span>
        )}
        <span className={`absolute top-4 right-4 rounded-full ${statusColor} px-3 py-1.5 text-xs font-bold shadow`}>
          {donation.status}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0F9F76]">
          {donation.beneficiary_type === 'animal' ? 'Animal Feed' : 'Human Food'}
        </p>
        <h3 className="mt-1 text-lg font-bold text-[color:var(--color-rescue-text)]">{donation.food}</h3>
        <div className="mt-4 space-y-3 text-sm">
          <p className="flex items-center gap-2 text-[color:var(--color-rescue-text)]">
            <Utensils size={16} className="text-[#0F9F76]" />
            {donation.quantity}
          </p>
          <p className="flex items-center gap-2 text-[color:var(--color-rescue-text)]">
            <MapPin size={16} className="text-[#0F9F76]" />
            {donation.address}
          </p>
          <p className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <Clock3 size={16} />
            Expires {timeUntil(donation.pickup_deadline)}
          </p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" className="rounded-xl border border-[color:var(--color-rescue-border)] px-3 py-3 text-xs font-bold text-[#0F9F76] transition hover:bg-[color:var(--color-rescue-accent-soft)]">View Details</button>
          <button
            type="button"
            disabled={!isAvailable}
            onClick={() => window.alert(`Pickup request started for ${donation.food}`)}
            className={`rounded-xl px-3 py-3 text-xs font-bold shadow transition ${
              isAvailable
                ? 'bg-[#0F9F76] text-white hover:bg-[#0C8562]'
                : 'bg-[color:var(--color-rescue-accent-soft)] text-[color:var(--color-rescue-text-muted)] cursor-not-allowed'
            }`}
          >
            {isAvailable ? 'Request Pickup' : 'Not Available'}
          </button>
        </div>
      </div>
    </article>
  );
}

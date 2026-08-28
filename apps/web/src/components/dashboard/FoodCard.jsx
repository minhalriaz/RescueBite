import { Clock3, MapPin, Route, Utensils } from "lucide-react";

export default function FoodCard({ donation }) {
  return (
    <article className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <img src={donation.image} alt={donation.title} className="w-full h-full object-cover" />
        <span className="absolute top-4 right-4 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow">
          {donation.status}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{donation.food_type}</p>
        <h3 className="mt-1 text-lg font-bold text-gray-900">{donation.title}</h3>
        <div className="mt-4 space-y-3 text-sm text-gray-600">
          <p className="flex items-center gap-2"><Utensils size={16} className="text-emerald-500" /> {donation.quantity} {donation.unit}</p>
          <p className="flex items-center gap-2"><MapPin size={16} className="text-emerald-500" /> {donation.location}</p>
          <p className="flex items-center gap-2"><Route size={16} className="text-emerald-500" /> {donation.distance} away</p>
          <p className="flex items-center gap-2 text-rose-600"><Clock3 size={16} /> Expires {donation.expiry_time}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" className="rounded-xl border border-emerald-200 px-3 py-3 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50">View Details</button>
          <button type="button" onClick={() => window.alert(`Pickup request started for ${donation.title}`)} className="rounded-xl bg-emerald-500 px-3 py-3 text-xs font-bold text-white shadow transition hover:bg-emerald-600">Request Pickup</button>
        </div>
      </div>
    </article>
  );
}

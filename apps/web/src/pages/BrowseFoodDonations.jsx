import { Search } from "lucide-react";
import { useState } from "react";
import DashboardShell from "../components/dashboard/DashboardShell";
import FoodCard from "../components/dashboard/FoodCard";
import { ngoDonations } from "../data/ngoDonationData";

export default function BrowseFoodDonations() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [foodType, setFoodType] = useState("All food types");
  const [availability, setAvailability] = useState("Available");

  const filteredDonations = ngoDonations.filter((donation) => {
    const matchesSearch = `${donation.title} ${donation.location}`.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location === "All locations" || donation.location.startsWith(location);
    const matchesType = foodType === "All food types" || donation.food_type === foodType;
    const matchesAvailability = availability === "All statuses" || donation.status === availability;
    return matchesSearch && matchesLocation && matchesType && matchesAvailability;
  });

  return (
    <DashboardShell role="ngo">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-600">Find food near you</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">Browse Food Donations</h1>
        </div>
        <p className="text-sm text-gray-500">{filteredDonations.length} donations available</p>
      </div>

      <section className="mt-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-md">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <label className="relative md:col-span-2 lg:col-span-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search donations" className="w-full rounded-xl bg-gray-100 py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400" />
          </label>
          <select value={location} onChange={(event) => setLocation(event.target.value)} className="rounded-xl bg-gray-100 px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-emerald-400">
            <option>All locations</option><option>Dhanmondi</option><option>Mirpur</option>
          </select>
          <select value={foodType} onChange={(event) => setFoodType(event.target.value)} className="rounded-xl bg-gray-100 px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-emerald-400">
            <option>All food types</option><option>Cooked Food</option><option>Bakery</option>
          </select>
          <select value={availability} onChange={(event) => setAvailability(event.target.value)} className="rounded-xl bg-gray-100 px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-emerald-400">
            <option>Available</option><option>All statuses</option>
          </select>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredDonations.map((donation) => <FoodCard key={donation.id} donation={donation} />)}
        {filteredDonations.length === 0 && <p className="rounded-3xl bg-white p-8 text-center text-gray-500 shadow-md md:col-span-2">No donations match these filters.</p>}
      </section>
    </DashboardShell>
  );
}

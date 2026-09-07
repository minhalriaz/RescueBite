import { useState, useEffect, useCallback } from 'react';
import { Search, LoaderCircle } from 'lucide-react';
import DashboardShell from '../components/dashboard/DashboardShell';
import FoodCard from '../components/dashboard/FoodCard';
import { api } from '../api/client';

export default function BrowseFoodDonations() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All locations');
  const [foodType, setFoodType] = useState('All food types');
  const [availability, setAvailability] = useState('Available');
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const payload = await api.getDonations();
      setDonations(Array.isArray(payload.data) ? payload.data : []);
    } catch (err) {
      setError(err.message || 'Could not load donations.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { fetchDonations(); }, 0);
    return () => clearTimeout(timer);
  }, [fetchDonations]);

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = `${donation.food} ${donation.address}`.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location === 'All locations' || donation.address.toLowerCase().includes(location.toLowerCase());
    const matchesType = foodType === 'All food types' || donation.beneficiary_type === foodType.toLowerCase();
    const matchesAvailability = availability === 'All statuses' || donation.status === availability.toLowerCase();
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search donations" className="w-full rounded-xl bg-gray-100 py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400" />
          </label>
          <select value={location} onChange={e => setLocation(e.target.value)} className="rounded-xl bg-gray-100 px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-emerald-400">
            <option>All locations</option><option>Dhanmondi</option><option>Mirpur</option>
          </select>
          <select value={foodType} onChange={e => setFoodType(e.target.value)} className="rounded-xl bg-gray-100 px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-emerald-400">
            <option>All food types</option><option>Human Food</option><option>Animal Feed</option>
          </select>
          <select value={availability} onChange={e => setAvailability(e.target.value)} className="rounded-xl bg-gray-100 px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-emerald-400">
            <option>Available</option><option>All statuses</option>
          </select>
        </div>
      </section>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <LoaderCircle className="animate-spin text-emerald-500" size={32} />
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-900/20 p-4 text-sm text-rose-700 dark:text-rose-300">
          {error} <button onClick={fetchDonations} className="ml-2 font-bold underline">Retry</button>
        </div>
      )}

      {!loading && !error && filteredDonations.length === 0 && (
        <p className="rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-8 text-center text-[color:var(--color-rescue-text-muted)] shadow-md md:col-span-2 mt-6">No donations match these filters.</p>
      )}

      {!loading && !error && filteredDonations.length > 0 && (
        <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredDonations.map(donation => <FoodCard key={donation.id} donation={donation} />)}
        </section>
      )}
    </DashboardShell>
  );
}

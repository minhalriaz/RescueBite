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
          <p className="text-sm font-semibold text-[#0F9F76]">Find food near you</p>
          <h1 className="mt-1 text-3xl font-bold text-[color:var(--color-rescue-text)]">Browse Food Donations</h1>
        </div>
        <p className="text-sm text-[color:var(--color-rescue-text-muted)]">{filteredDonations.length} donations available</p>
      </div>

      <section className="mt-6 rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-4 shadow-md">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <label className="relative md:col-span-2 lg:col-span-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-rescue-text-muted)]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search donations" className="w-full rounded-xl bg-[color:var(--color-rescue-bg)] py-3 pl-10 pr-3 text-sm text-[color:var(--color-rescue-text)] outline-none focus:ring-2 focus:ring-[#0F9F76]" />
          </label>
          <select value={location} onChange={e => setLocation(e.target.value)} className="rounded-xl bg-[color:var(--color-rescue-bg)] px-3 py-3 text-sm text-[color:var(--color-rescue-text)] outline-none focus:ring-2 focus:ring-[#0F9F76]">
            <option>All locations</option><option>Dhanmondi</option><option>Mirpur</option>
          </select>
          <select value={foodType} onChange={e => setFoodType(e.target.value)} className="rounded-xl bg-[color:var(--color-rescue-bg)] px-3 py-3 text-sm text-[color:var(--color-rescue-text)] outline-none focus:ring-2 focus:ring-[#0F9F76]">
            <option>All food types</option><option>Human Food</option><option>Animal Feed</option>
          </select>
          <select value={availability} onChange={e => setAvailability(e.target.value)} className="rounded-xl bg-[color:var(--color-rescue-bg)] px-3 py-3 text-sm text-[color:var(--color-rescue-text)] outline-none focus:ring-2 focus:ring-[#0F9F76]">
            <option>Available</option><option>All statuses</option>
          </select>
        </div>
      </section>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <LoaderCircle className="animate-spin text-[#0F9F76]" size={32} />
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-300">
          {error} <button onClick={fetchDonations} className="ml-2 font-bold underline text-rose-200">Retry</button>
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

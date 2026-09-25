import { useState, useEffect, useCallback } from "react";
import { Search, RefreshCw, SearchX } from "lucide-react";
import DashboardShell from "../components/dashboard/DashboardShell";
import FoodCard from "../components/dashboard/FoodCard";
import { api } from "../api/client";

const FOOD_TYPE_OPTIONS = [
  { label: "All food types", value: "all" },
  { label: "Human Food", value: "human" },
  { label: "Animal Feed", value: "animal" },
];

const STATUS_OPTIONS = [
  { label: "Available", value: "available" },
  { label: "All statuses", value: "all" },
];

export default function BrowseFoodDonations() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [foodType, setFoodType] = useState("all");
  const [availability, setAvailability] = useState("available");
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requesting, setRequesting] = useState(null);

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const payload = await api.getDonations();
      setDonations(Array.isArray(payload.data) ? payload.data : []);
    } catch {
      setError(
        "We could not load the latest food donations right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDonations();
    }, 0);

    return () => clearTimeout(timer);
  }, [fetchDonations]);

  const requestDonation = async (donation) => {
    setRequesting(donation.id);
    setError("");
    try {
      await api.requestDonation(donation.id);
      setDonations((current) => current.filter((item) => item.id !== donation.id));
    } catch (requestError) {
      setError(requestError.message || "Unable to request this donation.");
    } finally {
      setRequesting(null);
    }
  };

  const filteredDonations = donations.filter((donation) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      `${donation.food} ${donation.address}`.toLowerCase().includes(query);
    const matchesLocation =
      location === "All locations" ||
      donation.address?.toLowerCase().includes(location.toLowerCase());
    const matchesType =
      foodType === "all" || donation.beneficiary_type === foodType;
    const matchesAvailability =
      availability === "all" || donation.status === availability;

    return (
      matchesSearch && matchesLocation && matchesType && matchesAvailability
    );
  });

  return (
    <DashboardShell role="ngo">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#0F9F76]">
              Find food near you
            </p>
            <h1 className="mt-1 text-3xl font-bold text-[color:var(--color-rescue-text)]">
              Browse Food Donations
            </h1>
          </div>

          <div className="inline-flex items-center rounded-full border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] px-3 py-1.5 text-sm text-[color:var(--color-rescue-text-muted)] shadow-sm">
            {!loading && !error
              ? `${filteredDonations.length} donation${filteredDonations.length === 1 ? "" : "s"} available`
              : "Loading donations"}
          </div>
        </div>

        <section className="mt-6 rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-4 shadow-md">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <label className="relative md:col-span-2 xl:col-span-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-rescue-text-muted)]"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search donations"
                className="w-full rounded-2xl border border-transparent bg-[color:var(--color-rescue-bg)] py-3 pl-10 pr-3 text-sm text-[color:var(--color-rescue-text)] outline-none transition focus:border-[#0F9F76] focus:ring-2 focus:ring-[#0F9F76]/20"
              />
            </label>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-2xl border border-transparent bg-[color:var(--color-rescue-bg)] px-3 py-3 text-sm text-[color:var(--color-rescue-text)] outline-none transition focus:border-[#0F9F76] focus:ring-2 focus:ring-[#0F9F76]/20"
            >
              <option>All locations</option>
              <option>Dhanmondi</option>
              <option>Mirpur</option>
            </select>

            <select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="rounded-2xl border border-transparent bg-[color:var(--color-rescue-bg)] px-3 py-3 text-sm text-[color:var(--color-rescue-text)] outline-none transition focus:border-[#0F9F76] focus:ring-2 focus:ring-[#0F9F76]/20"
            >
              {FOOD_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="rounded-2xl border border-transparent bg-[color:var(--color-rescue-bg)] px-3 py-3 text-sm text-[color:var(--color-rescue-text)] outline-none transition focus:border-[#0F9F76] focus:ring-2 focus:ring-[#0F9F76]/20"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {loading && (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] shadow-md"
              >
                <div className="h-52 animate-pulse bg-[color:var(--color-rescue-bg)]" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-[color:var(--color-rescue-bg)]" />
                  <div className="h-5 w-2/3 animate-pulse rounded-full bg-[color:var(--color-rescue-bg)]" />
                  <div className="space-y-2 pt-2">
                    <div className="h-4 w-full animate-pulse rounded-full bg-[color:var(--color-rescue-bg)]" />
                    <div className="h-4 w-5/6 animate-pulse rounded-full bg-[color:var(--color-rescue-bg)]" />
                    <div className="h-4 w-2/3 animate-pulse rounded-full bg-[color:var(--color-rescue-bg)]" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="h-11 animate-pulse rounded-xl bg-[color:var(--color-rescue-bg)]" />
                    <div className="h-11 animate-pulse rounded-xl bg-[color:var(--color-rescue-bg)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <RefreshCw className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-[color:var(--color-rescue-text)]">
              Unable to load donations
            </h3>
            <p className="mt-2 text-sm text-[color:var(--color-rescue-text-muted)]">
              {error}
            </p>
            <button
              type="button"
              onClick={fetchDonations}
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#0F9F76] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0C8562]"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredDonations.length === 0 && (
          <div className="mt-6 rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-10 text-center shadow-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0F9F76]/10 text-[#0F9F76]">
              <SearchX className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-[color:var(--color-rescue-text)]">
              No matching donations found
            </h3>
            <p className="mt-2 text-sm text-[color:var(--color-rescue-text-muted)]">
              Try changing your search or filters to see more food donations
              near your organization.
            </p>
          </div>
        )}

        {!loading && !error && filteredDonations.length > 0 && (
          <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredDonations.map((donation) => (
              <FoodCard key={donation.id} donation={donation} onRequest={requestDonation} requesting={requesting === donation.id} />
            ))}
          </section>
        )}
      </div>
    </DashboardShell>
  );
}

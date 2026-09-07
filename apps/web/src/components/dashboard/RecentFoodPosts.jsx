import FoodPostItem from './FoodPostItem';
import { timeUntil } from '../../utils/time';

export default function RecentFoodPosts({ donations = [], loading = false }) {
  if (loading) {
    return (
      <section className="bg-[color:var(--color-rescue-surface)] rounded-3xl border border-[color:var(--color-rescue-border)] shadow-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[color:var(--color-rescue-text)]">Recent Donations</h2>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 p-3 animate-pulse">
              <div className="w-16 h-16 rounded-xl bg-[color:var(--color-rescue-accent-soft)] shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-[color:var(--color-rescue-accent-soft)] rounded w-3/4" />
                <div className="h-3 bg-[color:var(--color-rescue-accent-soft)] rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (donations.length === 0) {
    return (
      <section className="bg-[color:var(--color-rescue-surface)] rounded-3xl border border-[color:var(--color-rescue-border)] shadow-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[color:var(--color-rescue-text)]">Recent Donations</h2>
        </div>
        <div className="py-12 text-center">
          <p className="text-[color:var(--color-rescue-text-muted)] font-medium">No donations yet.</p>
          <p className="text-sm text-[color:var(--color-rescue-text-muted)] mt-1">Post your first surplus food to get started.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[color:var(--color-rescue-surface)] rounded-3xl border border-[color:var(--color-rescue-border)] shadow-md p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-[color:var(--color-rescue-text)]">Recent Donations</h2>
        <a href="/donor/my-donations" className="text-[#0F9F76] hover:text-[#0C8562] font-semibold text-sm">View All</a>
      </div>
      <div className="space-y-2">
        {donations.slice(0, 5).map(donation => (
          <FoodPostItem
            key={donation.id}
            image={null}
            title={donation.food}
            location={donation.address}
            quantity={donation.quantity}
            expiry={timeUntil(donation.pickup_deadline)}
            status={donation.status}
          />
        ))}
      </div>
    </section>
  );
}

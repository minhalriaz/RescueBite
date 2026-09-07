import { useState, useEffect, useCallback } from 'react';
import DashboardShell from '../components/dashboard/DashboardShell';
import { CheckCircle2, Clock3, MapPin, PackageCheck, Truck, LoaderCircle } from 'lucide-react';
import SummaryCard from '../components/dashboard/SummaryCard';
import { api } from '../api/client';
import { timeUntil } from '../utils/time';
import { Link } from 'react-router-dom';

const STATUS_STYLES = {
  pending: 'bg-amber-100/40 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200',
  requested: 'bg-amber-100/40 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200',
  approved: 'bg-blue-100/40 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
  available: 'bg-emerald-100/40 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200',
  collected: 'bg-violet-100/40 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200',
  expired: 'bg-rose-100/40 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200',
};

const STATUS_ICONS = {
  pending: Clock3,
  requested: Clock3,
  approved: Truck,
  available: PackageCheck,
  collected: CheckCircle2,
  expired: Clock3,
};

export default function NGORequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const payload = await api.getRequests();
      setRequests(Array.isArray(payload.data) ? payload.data : []);
    } catch (err) {
      setError(err.message || 'Could not load requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { fetchRequests(); }, 0);
    return () => clearTimeout(timer);
  }, [fetchRequests]);

  const pending = requests.filter(r => r.donation?.status === 'available' || r.donation?.status === 'requested');
  const approved = requests.filter(r => r.donation?.status === 'collected');
  const completed = requests.filter(r => r.donation?.status === 'expired');

  return (
    <DashboardShell role="ngo">
      <p className="text-sm font-semibold text-[#0F9F76]">Pickup coordination</p>
      <h1 className="mt-1 text-3xl font-bold text-[color:var(--color-rescue-text)]">My Pickup Requests</h1>
      <p className="mt-2 text-sm text-[color:var(--color-rescue-text-muted)]">Track your food pickup requests and their current status.</p>

      <section className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard title="Pending" value={String(pending.length)} subtitle="Awaiting pickup" trend="Needs action" color="orange" icon={<Clock3 size={19} />} />
        <SummaryCard title="Approved" value={String(approved.length)} subtitle="Scheduled" trend="In progress" color="blue" icon={<Truck size={19} />} />
        <SummaryCard title="Completed" value={String(completed.length)} subtitle="Delivered" trend="Done" color="emerald" icon={<PackageCheck size={19} />} />
      </section>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <LoaderCircle className="animate-spin text-[#0F9F76]" size={32} />
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-300">
          {error} <button onClick={fetchRequests} className="ml-2 font-bold underline text-rose-200">Retry</button>
        </div>
      )}

      {!loading && !error && requests.length === 0 && (
        <div className="mt-8 rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-12 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-lg font-bold text-[color:var(--color-rescue-text)]">No Pickup Requests Yet</h3>
          <p className="text-sm text-[color:var(--color-rescue-text-muted)] mt-2">New food donations near your area will appear here.</p>
        </div>
      )}

      {!loading && !error && requests.length > 0 && (
        <section className="mt-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div><h2 className="text-2xl font-bold text-[color:var(--color-rescue-text)]">Nearby Food Donations</h2><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">Fresh opportunities close to your organization.</p></div>
            <Link to="/ngo/browse-food" className="text-sm font-semibold text-[#0F9F76] hover:text-[#0C8562]">Browse all</Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {requests.map(request => {
              const donation = request.donation;
              if (!donation) return null;
              const status = donation.status || 'pending';
              const StatusIcon = STATUS_ICONS[status] || Clock3;
              const statusStyle = STATUS_STYLES[status] || 'bg-gray-400 text-white';

              return (
                <article key={request.id} className="flex min-h-[190px] overflow-hidden rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="w-32 shrink-0 bg-[#0F9F76]/10 flex items-center justify-center sm:w-40">
                    <span className="text-5xl">{donation.beneficiary_type === 'animal' ? '🐾' : '🍲'}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-[#0F9F76]">{donation.beneficiary_type}</p>
                        <h2 className="mt-1 text-lg font-bold leading-tight text-[color:var(--color-rescue-text)]">{donation.food}</h2>
                      </div>
                      <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle}`}>
                        <StatusIcon size={12} />
                        {status}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs text-[color:var(--color-rescue-text-muted)]">
                      <p><span className="font-semibold text-[color:var(--color-rescue-text)]">Quantity:</span> {donation.quantity}</p>
                      <p className="flex items-center gap-1.5"><MapPin size={14} className="text-[#0F9F76]" />{donation.address}</p>
                      <p><span className="font-semibold text-[color:var(--color-rescue-text)]">Expires:</span> {timeUntil(donation.pickup_deadline)}</p>
                    </div>
                    <button type="button" className="mt-auto w-fit rounded-xl border border-[#0F9F76]/30 px-3 py-2 text-xs font-bold text-[#0F9F76] transition hover:bg-[#0F9F76]/10">View Details</button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </DashboardShell>
  );
}

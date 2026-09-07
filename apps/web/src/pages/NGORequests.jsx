import { useState, useEffect, useCallback } from 'react';
import DashboardShell from '../components/dashboard/DashboardShell';
import { CheckCircle2, Clock3, MapPin, PackageCheck, Truck, LoaderCircle } from 'lucide-react';
import SummaryCard from '../components/dashboard/SummaryCard';
import { api } from '../api/client';
import { timeUntil } from '../utils/time';

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-700',
  requested: 'bg-amber-100 text-amber-700',
  approved: 'bg-blue-100 text-blue-700',
  available: 'bg-emerald-100 text-emerald-700',
  collected: 'bg-violet-100 text-violet-700',
  expired: 'bg-rose-100 text-rose-700',
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
      <p className="text-sm font-semibold text-emerald-600">Pickup coordination</p>
      <h1 className="mt-1 text-3xl font-bold text-gray-900">My Pickup Requests</h1>
      <p className="mt-2 text-sm text-gray-500">Track your food pickup requests and their current status.</p>

      <section className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard title="Pending" value={String(pending.length)} subtitle="Awaiting pickup" trend="Needs action" color="orange" icon={<Clock3 size={19} />} />
        <SummaryCard title="Approved" value={String(approved.length)} subtitle="Scheduled" trend="In progress" color="blue" icon={<Truck size={19} />} />
        <SummaryCard title="Completed" value={String(completed.length)} subtitle="Delivered" trend="Done" color="emerald" icon={<PackageCheck size={19} />} />
      </section>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <LoaderCircle className="animate-spin text-emerald-500" size={32} />
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error} <button onClick={fetchRequests} className="ml-2 font-bold underline">Retry</button>
        </div>
      )}

      {!loading && !error && requests.length === 0 && (
        <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-12 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-lg font-bold text-gray-900">No Pickup Requests Yet</h3>
          <p className="text-sm text-gray-400 mt-2">New food donations near your area will appear here.</p>
        </div>
      )}

      {!loading && !error && requests.length > 0 && (
        <section className="mt-8 grid w-[calc(100%+1rem)] grid-cols-1 gap-5 md:w-[calc(100%+1.5rem)] md:grid-cols-2 lg:w-[calc(100%+2rem)] xl:grid-cols-3">
          {requests.map(request => {
            const donation = request.donation;
            if (!donation) return null;
            const status = donation.status || 'pending';
            const StatusIcon = STATUS_ICONS[status] || Clock3;
            const statusStyle = STATUS_STYLES[status] || 'bg-gray-100 text-gray-600';

            return (
              <article key={request.id} className="flex min-h-[190px] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <div className="w-32 shrink-0 bg-emerald-50 flex items-center justify-center sm:w-40">
                  <span className="text-5xl">{donation.beneficiary_type === 'animal' ? '🐾' : '🍲'}</span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">{donation.beneficiary_type}</p>
                      <h2 className="mt-1 text-lg font-bold leading-tight text-gray-900">{donation.food}</h2>
                    </div>
                    <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle}`}>
                      <StatusIcon size={12} />
                      {status}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-gray-500">
                    <p><span className="font-semibold text-gray-700">Quantity:</span> {donation.quantity}</p>
                    <p className="flex items-center gap-1.5"><MapPin size={14} className="text-emerald-500" />{donation.address}</p>
                    <p><span className="font-semibold text-gray-700">Expires:</span> {timeUntil(donation.pickup_deadline)}</p>
                  </div>
                  <button type="button" className="mt-auto w-fit rounded-xl border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50">View Details</button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </DashboardShell>
  );
}

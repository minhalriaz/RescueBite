import { useState, useEffect, useCallback } from 'react';
import DashboardShell from '../components/dashboard/DashboardShell';
import HeroCollage from '../components/dashboard/HeroCollage';
import NotificationSection from '../components/dashboard/NotificationSection';
import RecentFoodPosts from '../components/dashboard/RecentFoodPosts';
import StatsSection from '../components/dashboard/StatsSection';
import { api } from '../api/client';
import { isAuthenticated } from '../lib/auth';

export default function DonorDashboard() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ active: 0, completed: 0, pending: 0, ngos_reached: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const payload = await api.getMyDonations();
      setDonations(Array.isArray(payload.data) ? payload.data : []);
      setStats(payload.stats || { active: 0, completed: 0, pending: 0, ngos_reached: 0 });
    } catch (err) {
      setError(err.message || 'Could not load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { fetchData(); }, 0);
    return () => clearTimeout(timer);
  }, [fetchData]);

  return (
    <DashboardShell role="donor">
      <HeroCollage />
      {error && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-900/20 p-4 text-sm text-rose-700 dark:text-rose-300">
          {error}
          <button onClick={fetchData} className="ml-3 font-bold underline">Retry</button>
        </div>
      )}
      <StatsSection stats={stats} loading={loading} />
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
        <div className="xl:col-span-2"><RecentFoodPosts donations={donations} loading={loading} /></div>
        <NotificationSection />
      </section>
    </DashboardShell>
  );
}

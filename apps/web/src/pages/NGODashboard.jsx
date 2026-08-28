import { CheckCircle2, Handshake, Heart, Package } from "lucide-react";
import DashboardShell from "../components/dashboard/DashboardShell";
import HeroCollage from "../components/dashboard/HeroCollage";
import SummaryCard from "../components/dashboard/SummaryCard";
import FoodCard from "../components/dashboard/FoodCard";
import { ngoDonations } from "../data/ngoDonationData";
import { Link } from "react-router-dom";

export default function NGODashboard() {
  return (
    <DashboardShell role="ngo">
      <HeroCollage role="ngo" />
      <section className="grid grid-cols-1 gap-5 mt-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Available Donations" value="18" subtitle="Near your location" trend="Ready" color="emerald" icon={<Package size={22} />} />
        <SummaryCard title="Pending Requests" value="5" subtitle="Awaiting approval" trend="Active" color="blue" icon={<Handshake size={22} />} />
        <SummaryCard title="Completed Pickups" value="12" subtitle="This month" trend="+3" color="violet" icon={<CheckCircle2 size={22} />} />
        <SummaryCard title="Meals Received" value="245" subtitle="This month" trend="+28" color="orange" icon={<Heart size={22} />} />
      </section>
      <section className="mt-10">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div><h2 className="text-2xl font-bold text-gray-900">Nearby Food Donations</h2><p className="mt-1 text-sm text-gray-500">Fresh opportunities close to your organization.</p></div>
          <Link to="/ngo/browse-food" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Browse all</Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{ngoDonations.map((donation) => <FoodCard key={donation.id} donation={donation} />)}</div>
      </section>
    </DashboardShell>
  );
}

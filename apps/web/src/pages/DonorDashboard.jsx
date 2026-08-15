import DashboardShell from "../components/dashboard/DashboardShell";
import HeroCollage from "../components/dashboard/HeroCollage";
import NotificationSection from "../components/dashboard/NotificationSection";
import RecentFoodPosts from "../components/dashboard/RecentFoodPosts";
import StatsSection from "../components/dashboard/StatsSection";

export default function DonorDashboard() {
  return (
    <DashboardShell role="donor">
      <HeroCollage />
      <StatsSection />
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
        <div className="xl:col-span-2"><RecentFoodPosts /></div>
        <NotificationSection />
      </section>
    </DashboardShell>
  );
}

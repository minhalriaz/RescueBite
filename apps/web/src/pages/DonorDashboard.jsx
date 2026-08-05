import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import HeroCollage from "../components/dashboard/HeroCollage";
import StatsSection from "../components/dashboard/StatsSection";
import RecentFoodPosts from "../components/dashboard/RecentFoodPosts";
import NotificationSection from "../components/dashboard/NotificationSection";

export default function DonorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">

        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">

          {/* Hero Section */}
          <HeroCollage />

          {/* Statistics */}
          <StatsSection />

          {/* Bottom Section */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">

            <div className="xl:col-span-2">
              <RecentFoodPosts />
            </div>

            <NotificationSection />

          </section>

        </main>

      </div>

    </div>
  );
}
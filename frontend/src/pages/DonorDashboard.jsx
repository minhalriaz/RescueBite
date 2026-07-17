import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import HeroBanner from "../components/dashboard/HeroBanner";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentFoodPosts from "../components/dashboard/RecentFoodPosts";

import { summaryData } from "../data/donorData";

import {
  Package,
  Clock3,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";

const icons = [
  <Package size={30} />,
  <Clock3 size={30} />,
  <CheckCircle2 size={30} />,
  <HeartHandshake size={30} />,
];

export default function DonorDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">

        {/* Navbar */}
        <Navbar />

        <main className="p-8">

          {/* Hero */}
          <HeroBanner />

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            {summaryData.map((item, index) => (
              <SummaryCard
                key={item.id}
                title={item.title}
                value={item.value}
                icon={icons[index]}
              />
            ))}

          </div>

          {/* Recent Posts */}
          <div className="mt-10">
            <RecentFoodPosts />
          </div>

        </main>

      </div>

    </div>
  );
}

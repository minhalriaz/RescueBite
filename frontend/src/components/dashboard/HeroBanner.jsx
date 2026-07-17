import React from "react";
import { Plus, ArrowRight, HeartHandshake } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-3xl px-8 py-6 text-white shadow-lg">

      <div className="flex flex-col lg:flex-row items-center justify-between">

        {/* Left Content */}
        <div className="max-w-xl">

          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-medium mb-4">
            🌱 RescueBite Donor Dashboard
          </span>

          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
            Reduce Food Waste,
            <br />
            Feed More People
          </h1>

          <p className="mt-3 text-emerald-100">
            Manage your food donations and help communities with
            surplus food.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">

            <button className="flex items-center gap-2 bg-white text-emerald-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition">
              <Plus size={18} />
              Create Food Donation
            </button>

            <button className="flex items-center gap-2 border border-white px-5 py-2.5 rounded-xl hover:bg-white hover:text-emerald-600 transition">
              View All Posts
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Small Stats */}

          <div className="flex gap-8 mt-6">

            <div>
              <h2 className="text-2xl font-bold">3</h2>
              <p className="text-sm text-emerald-100">
                Active
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold">12</h2>
              <p className="text-sm text-emerald-100">
                Completed
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold">48</h2>
              <p className="text-sm text-emerald-100">
                Helped
              </p>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="hidden lg:flex items-center justify-center">

          <div className="w-36 h-36 rounded-full bg-white/10 flex items-center justify-center">

            <HeartHandshake
              size={70}
              className="text-white"
            />

          </div>

        </div>

      </div>

    </section>
  );
}
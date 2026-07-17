import React from "react";

export default function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="text-emerald-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

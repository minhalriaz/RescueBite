import React from "react";

export default function FoodPostCard({
  title,
  location,
  quantity,
  status,
  image,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">

      {/* Image Placeholder */}
      <div className="h-44 bg-emerald-100 flex items-center justify-center text-6xl">
        <img
          src={image}
          alt={title}
          className="w-full h-44 object-cover"
        />
      </div>

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-gray-500">
          📍 {location}
        </p>

        <p className="text-gray-500 mt-1">
          🍽 {quantity}
        </p>

        <span className="inline-block mt-4 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
          {status}
        </span>

        <button className="mt-5 w-full bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition">
          View Details
        </button>

      </div>

    </div>
  );
}

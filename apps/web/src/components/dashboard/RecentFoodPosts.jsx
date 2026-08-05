import FoodPostItem from "./FoodPostItem";

import biryani from "../../assets/food/biryani.jpg";
import khichuri from "../../assets/food/khichuri.jpg";
import bread from "../../assets/food/bread.jpg";

const posts = [
  {
    id: 1,
    image: biryani,
    title: "Chicken Biriyani",
    location: "Dhanmondi, Dhaka",
    quantity: "15 Meals",
    expiry: "Expires in 2 hrs",
    status: "Available",
  },
  {
    id: 2,
    image: khichuri,
    title: "Vegetable Khichuri",
    location: "Mirpur, Dhaka",
    quantity: "20 Meals",
    expiry: "Expires in 3 hrs",
    status: "Available",
  },
  {
    id: 3,
    image: bread,
    title: "Bread & Pastries",
    location: "Gulshan, Dhaka",
    quantity: "25 Items",
    expiry: "Expires in 5 hrs",
    status: "Available",
  },
];

export default function RecentFoodPosts() {
  return (
    <section
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-md
        p-6
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-bold text-gray-800">
          Recent Donations
        </h2>

        <button
          className="
            text-emerald-600
            hover:text-emerald-700
            font-semibold
            text-sm
          "
        >
          View All
        </button>

      </div>

      {/* List */}

      <div className="space-y-2">

        {posts.map((post) => (
          <FoodPostItem
            key={post.id}
            {...post}
          />
        ))}

      </div>
    </section>
  );
}
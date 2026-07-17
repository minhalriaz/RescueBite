import FoodPostCard from "./FoodPostCard";
import { recentPosts } from "../../data/donorData";

export default function RecentFoodPosts() {
  return (
    <section>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Recent Food Posts
        </h2>

        <button className="text-emerald-600 font-semibold">
          View All Posts
        </button>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {recentPosts.map((post) => (
          <FoodPostCard
            key={post.id}
            {...post}
          />
        ))}

      </div>

    </section>
  );
}

import { Search, Bell, Menu } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  return (
    <header className="bg-white h-20 px-6 lg:px-8 flex items-center justify-between border-b border-gray-200 shadow-sm">

      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search donations..."
            className="w-full bg-gray-100 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative hover:text-emerald-600 transition">
          <Bell size={22} />
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-11 h-11 rounded-full border-2 border-emerald-500"
          />

          <div>
            <p className="text-xs text-gray-500">
              Welcome Back
            </p>

            <h3 className="font-semibold">
              Donor
            </h3>
          </div>

        </div>

      </div>

    </header>
  );
}
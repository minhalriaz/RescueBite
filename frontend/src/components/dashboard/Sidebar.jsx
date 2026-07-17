
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  ClipboardList,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Donation",
    icon: PlusCircle,
  },
  {
    title: "My Donations",
    icon: Package,
  },
  {
    title: "Requests",
    icon: ClipboardList,
  },
  {
    title: "Profile",
    icon: User,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0 lg:flex flex-col justify-between`}
    >

      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
            🍕
          </div>

          <div>
            <h1 className="font-bold text-xl text-emerald-600">
              RescueBite
            </h1>

            <p className="text-xs text-gray-400">
              Donor Dashboard
            </p>
          </div>
        </div>

        {/* Navigation */}

        <nav className="mt-8 px-3">

          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${index === 0
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}

      <div className="p-4 border-t">

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition">

          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

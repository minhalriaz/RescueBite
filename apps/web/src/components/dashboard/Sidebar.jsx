import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Bell,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/donor/dashboard",
  },
  {
    title: "Create Donation",
    icon: PlusCircle,
    path: "/donor/create-donation",
  },
  {
    title: "My Donations",
    icon: Package,
    path: "/donor/my-donations",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/donor/notifications",
  },
  {
    title: "Profile",
    icon: User,
    path: "/donor/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/donor/settings",
  },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
}) {

  // Prevent background scrolling on mobile
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-64
          bg-white
          border-r
          border-gray-200
          shadow-sm
          flex
          flex-col
          transition-transform
          duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >

        {/* Logo */}
        <div className="border-b border-gray-100 px-6 py-6">

          <div className="flex items-center">

            <img
              src="/rescuebite-icon.svg"
              alt="RescueBite"
              className="h-11 w-auto"
            />

            <div className="ml-3">
              <h1 className="text-xl font-bold text-emerald-600">
                RescueBite
              </h1>

              <p className="text-xs text-gray-500">
                Donor Dashboard
              </p>
            </div>

            {/* Mobile Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto lg:hidden"
              aria-label="Close Sidebar"
            >
              <X size={22} />
            </button>

          </div>

        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={() => setIsOpen(false)}
                aria-label={item.title}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 ${isActive
                    ? "bg-emerald-500 text-white shadow"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                  }`
                }
              >
                <Icon size={20} />

                <span>
                  {item.title}
                </span>

              </NavLink>
            );

          })}

        </nav>

        {/* Logout */}
        <div className="border-t border-gray-100 p-5">

          <button
            className="w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition"
            aria-label="Logout"
          >
            <LogOut size={20} />

            <span className="font-medium">
              Logout
            </span>

          </button>

        </div>

      </aside>
    </>
  );
}
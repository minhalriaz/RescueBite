import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../../context/NotificationContext";
import { getStoredUser } from "../../lib/auth";
import NotificationDropdown from "../notifications/NotificationDropdown";

export default function Navbar({ toggleSidebar, role = "donor" }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = getStoredUser();
  const {
    notifications,
    unreadCount,
    loading,
    error,
    refreshNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white min-h-20 px-4 md:px-6 lg:px-8 flex items-center justify-between border-b border-gray-200 shadow-sm gap-4">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open navigation"
        >
          <Menu size={24} />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search donations..."
            className="w-full bg-gray-100 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="relative rounded-full p-2 hover:bg-emerald-50 hover:text-emerald-600 transition"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
            aria-expanded={open}
          >
            <Bell size={22} />
            {unreadCount > 0 ? (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            ) : null}
          </button>

          {open ? (
            <NotificationDropdown
              role={role}
              notifications={notifications}
              unreadCount={unreadCount}
              loading={loading}
              error={error}
              onRead={markAsRead}
              onReadAll={markAllAsRead}
              onRetry={refreshNotifications}
              onClose={() => setOpen(false)}
            />
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden h-10 w-10 sm:flex items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-50 font-bold text-emerald-700">
            {(user?.name || role || "U").charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-gray-500">Welcome Back</p>
            <h3 className="font-semibold text-sm">{user?.name || (role === "ngo" ? "NGO" : "Donor")}</h3>
          </div>
        </div>
      </div>
    </header>
  );
}

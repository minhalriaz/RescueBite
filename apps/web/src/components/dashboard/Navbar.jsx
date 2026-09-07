import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../../context/NotificationContext";
import { getStoredUser } from "../../lib/auth";
import NotificationDropdown from "../notifications/NotificationDropdown";
import ThemeToggle from "../ThemeToggle";

export default function Navbar({ toggleSidebar, role = "donor" }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = getStoredUser();
  const roleLabel =
  role === "ngo"
    ? "NGO"
    : role === "volunteer"
      ? "Volunteer"
      : "Donor";
  const searchPlaceholder =
  role === "volunteer"
    ? "Search volunteer opportunities..."
    : role === "ngo"
      ? "Search donation alerts..."
      : "Search donations...";
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
    <header className="bg-[color:var(--color-rescue-surface)] min-h-20 px-4 md:px-6 lg:px-8 flex items-center justify-between border-b border-[color:var(--color-rescue-border)] shadow-sm gap-4">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-[color:var(--color-rescue-accent-soft)]"
          aria-label="Open navigation"
        >
          <Menu size={24} className="text-[color:var(--color-rescue-text)]" />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--color-rescue-text-muted)]" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full bg-[color:var(--color-rescue-bg)] rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#0F9F76] text-sm text-[color:var(--color-rescue-text)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <ThemeToggle />
        {role !== "volunteer" ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="relative rounded-full p-2 hover:bg-[color:var(--color-rescue-accent-soft)] hover:text-[#0F9F76] transition"
              aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
              aria-expanded={open}
            >
              <Bell size={22} className="text-[color:var(--color-rescue-text)]" />
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
        ) : null}

        <div className="flex items-center gap-3">
          <div className="hidden h-10 w-10 sm:flex items-center justify-center rounded-full border-2 border-[#0F9F76] bg-[color:var(--color-rescue-accent-soft)] font-bold text-[#0F9F76]">
            {(user?.name || role || "U").charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-[color:var(--color-rescue-text-muted)]">Welcome Back</p>
            <h3 className="font-semibold text-sm text-[color:var(--color-rescue-text)]">{user?.name || roleLabel}</h3>
          </div>
        </div>
      </div>
    </header>
  );
}

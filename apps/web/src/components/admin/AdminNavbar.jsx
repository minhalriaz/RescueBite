import { Bell, Menu, Search } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { getStoredUser } from "../../lib/auth";

export default function AdminNavbar({ onMenu }) {
  const user = getStoredUser();
  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 border-b border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)]/95 px-4 backdrop-blur md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button onClick={onMenu} className="rounded-lg p-2 hover:bg-[color:var(--color-rescue-accent-soft)] lg:hidden">
          <Menu size={22} className="text-[color:var(--color-rescue-text)]" />
        </button>
        <div className="relative hidden w-full max-w-lg sm:block">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--color-rescue-text-muted)]" />
          <input placeholder="Search admin records..." className="w-full rounded-xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-bg)] py-3 pl-11 pr-4 text-sm text-[color:var(--color-rescue-text)] outline-none focus:border-[#0F9F76]" />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />
        <button className="relative rounded-full p-2.5 hover:bg-[color:var(--color-rescue-accent-soft)]">
          <Bell size={20} className="text-[color:var(--color-rescue-text)]" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#0F9F76]" />
        </button>
        <div className="flex items-center gap-3 border-l border-[color:var(--color-rescue-border)] pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F9F76] text-sm font-black text-white">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-[10px] text-[color:var(--color-rescue-text-muted)]">Administrator</p>
            <p className="text-sm font-bold text-[color:var(--color-rescue-text)]">{user?.name || "Admin"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

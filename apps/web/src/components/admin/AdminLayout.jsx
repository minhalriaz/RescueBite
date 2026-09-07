import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[color:var(--color-rescue-bg)] text-[color:var(--color-rescue-text)]">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <AdminNavbar onMenu={() => setOpen(true)} />
        <main className="mx-auto w-full max-w-[1600px] p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

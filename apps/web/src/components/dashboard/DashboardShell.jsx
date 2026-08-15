import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardShell({ children, role = "donor" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} role={role} />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        <Navbar toggleSidebar={() => setSidebarOpen((open) => !open)} role={role} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

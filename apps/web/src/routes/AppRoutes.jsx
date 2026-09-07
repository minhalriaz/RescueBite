import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "../App";
import { NotificationProvider } from "../context/NotificationContext";
import { ThemeProvider } from "../context/ThemeContext";

import CreateDonation from "../pages/CreateDonation";
import DonorDashboard from "../pages/DonorDashboard";
import LoginPage from "../pages/LoginPage";
import MyDonations from "../pages/MyDonations";

import NGODashboard from "../pages/NGODashboard";
import NGORequests from "../pages/NGORequests";
import BrowseFoodDonations from "../pages/BrowseFoodDonations";

import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import RegisterPage from "../pages/RegisterPage";
import Settings from "../pages/Settings";
import VolunteerDashboard from "../pages/VolunteerDashboard";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/admin/AdminLogin";
import DonationManagement from "../pages/admin/DonationManagement";
import NgoManagement from "../pages/admin/NgoManagement";
import VolunteerManagement from "../pages/admin/VolunteerManagement";
import DonorManagement from "../pages/admin/DonorManagement";
import Reports from "../pages/admin/Reports";
import ActivityLogs from "../pages/admin/ActivityLogs";
import ReportedContent from "../pages/admin/ReportedContent";
import AdminSettings from "../pages/admin/AdminSettings";

import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

export default function AppRoutes() {
  return (
    <Router>
      <ThemeProvider>
        <NotificationProvider>
          <Routes>
          <Route path="/" element={<App />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          {/* Donor Routes */}
          <Route
            path="/donor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donor/create-donation"
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <CreateDonation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donor/my-donations"
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <MyDonations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donor/notifications"
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <Notifications role="donor" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donor/profile"
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <Profile role="donor" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donor/settings"
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <Settings role="donor" />
              </ProtectedRoute>
            }
          />

          {/* NGO Routes */}
          <Route
            path="/ngo/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <NGODashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ngo/browse-food"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <BrowseFoodDonations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ngo/requests"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <NGORequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ngo/notifications"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <Notifications role="ngo" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ngo/profile"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <Profile role="ngo" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ngo/settings"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <Settings role="ngo" />
              </ProtectedRoute>
            }
          />

          {/* Volunteer Routes */}
          <Route
            path="/volunteer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["volunteer"]}>
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/ngos"
            element={
              <AdminProtectedRoute>
                <NgoManagement />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/volunteers"
            element={
              <AdminProtectedRoute>
                <VolunteerManagement />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/donors"
            element={
              <AdminProtectedRoute>
                <DonorManagement />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/donations"
            element={
              <AdminProtectedRoute>
                <DonationManagement />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <AdminProtectedRoute>
                <Reports />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/activity"
            element={
              <AdminProtectedRoute>
                <ActivityLogs />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/reported-content"
            element={
              <AdminProtectedRoute>
                <ReportedContent />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminSettings />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </NotificationProvider>
    </ThemeProvider>
  </Router>
  );
}
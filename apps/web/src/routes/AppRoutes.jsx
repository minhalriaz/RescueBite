import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../App";
import { NotificationProvider } from "../context/NotificationContext";
import CreateDonation from "../pages/CreateDonation";
import DonorDashboard from "../pages/DonorDashboard";
import LoginPage from "../pages/LoginPage";
import MyDonations from "../pages/MyDonations";
import NGODashboard from "../pages/NGODashboard";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import RegisterPage from "../pages/RegisterPage";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Router>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/create-donation" element={<CreateDonation />} />
          <Route path="/donor/my-donations" element={<MyDonations />} />
          <Route path="/donor/notifications" element={<Notifications />} />
          <Route path="/donor/profile" element={<Profile />} />
          <Route path="/donor/settings" element={<Settings />} />

          <Route path="/ngo/dashboard" element={<NGODashboard />} />
          <Route path="/ngo/notifications" element={<Notifications />} />
        </Routes>
      </NotificationProvider>
    </Router>
  );
}

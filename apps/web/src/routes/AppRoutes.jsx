import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "../App";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import DonorDashboard from "../pages/DonorDashboard";
import CreateDonation from "../pages/CreateDonation";
import MyDonations from "../pages/MyDonations";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<App />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/donor/dashboard"
          element={<DonorDashboard />}
        />

        <Route
          path="/donor/create-donation"
          element={<CreateDonation />}
        />

        <Route
          path="/donor/my-donations"
          element={<MyDonations />}
        />

        <Route
          path="/donor/notifications"
          element={<Notifications />}
        />

        <Route
          path="/donor/profile"
          element={<Profile />}
        />

        <Route
          path="/donor/settings"
          element={<Settings />}
        />

      </Routes>
    </Router>
  );
}
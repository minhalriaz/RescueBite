import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}
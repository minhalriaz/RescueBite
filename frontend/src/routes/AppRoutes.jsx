import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* will add login and registration routes here */}
      </Routes>
    </Router>
  );
}
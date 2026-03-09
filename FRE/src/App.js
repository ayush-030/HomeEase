import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import "./App.css";
import Bookservice from "./DashBoard/Customer/Bookservice";
import Mybookings from "./DashBoard/Customer/Mybookings";
import Customerdashboard from "./DashBoard/Customer/Customerdashboard";
import "./Styles/dashboard.css";
// import ProviderDashboard from "./DashBoard/Provider/ProviderDashboard";
// import AdminDashboard from "./DashBoard/Admin/AdminDashboard";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customer-dashboard" element={<Customerdashboard />} />
        <Route path="/book-service" element={<Bookservice />} />
        <Route path="/my-bookings" element={<Mybookings />} />

        {/* <Route path="/provider-dashboard" element={<ProviderDashboard />} /> */}
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
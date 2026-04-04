import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import "./App.css";

import Customerdashboard from "./DashBoard/Customer/Customerdashboard";
import Bookservice from "./DashBoard/Customer/Bookservice";
import Mybookings from "./DashBoard/Customer/Mybookings";

import Providerdashboard from "./DashBoard/Provider/Providerdashboard";
import Servicerequests from "./DashBoard/Provider/Servicerequests";
import Activejobs from "./DashBoard/Provider/Activejobs";
import Completedjobs from "./DashBoard/Provider/Completedjobs";
import Serviceproviders from "./pages/Serviceproviders";
import Providerprofile from "./pages/Providerprofile";

import AdminDashboard from "./DashBoard/Admin/Admindashboard";
import ManageUsers from "./DashBoard/Admin/Manageusers";
import ManageProviders from "./DashBoard/Admin/Manageproviders";
import ManageBookings from "./DashBoard/Admin/Managebookings";

import "./Styles/dashboard.css";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/customer-dashboard" element={<ProtectedRoute><Customerdashboard /></ProtectedRoute>} />
        <Route path="/book-service" element={<Bookservice />} />
        <Route path="/my-bookings" element={<Mybookings />} /> 

        <Route path="/provider-dashboard" element= {<ProtectedRoute><Providerdashboard /></ProtectedRoute>} />
        <Route path="/service-requests" element={<Servicerequests />} />
        <Route path="/active-jobs" element={<Activejobs />} />
        <Route path="/completed-jobs" element={<Completedjobs />} />
        <Route path="/providers-service" element={<Serviceproviders />} />
        <Route path="/provider-profile" element={<Providerprofile />} />

        <Route path="/admin-dashboard" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-providers" element={<ManageProviders />} />
        <Route path="/manage-bookings" element={<ManageBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
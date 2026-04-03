import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CustomerDashboard from "./pages/CustomerDashboard"
import ProviderDashboard from "./pages/ProviderDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import ProviderProfileForm from "./pages/ProviderProfileForm"
import ProviderProfile from "./pages/ProviderProfile"
import BookService from "./pages/BookService"
import CustomerBookings from "./pages/CustomerBookings"
import ProviderReviews from "./pages/ProviderReviews"

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/provider-profile" element={<ProviderProfileForm />} />
        <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/book/:id" element={<BookService />} />
        <Route path="/my-bookings" element={<CustomerBookings />} />
        <Route path="/provider-reviews" element={<ProviderReviews />} />
      </Routes>

    </BrowserRouter>
  )

}

export default App
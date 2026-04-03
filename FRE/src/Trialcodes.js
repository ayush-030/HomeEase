// src
// │
// ├── components
// │   ├── Navbar.js
// │   ├── Footer.js
// │   ├── Hero.js
// │   ├── Howitworks.js
// │   ├── PlatformBenefits.js
// │   ├── Services.js
// │   ├── Sidebar.js
// │   ├── ServiceCard.js
// │   ├── BookingCard.js
// │   └── StatusTracker.js
// │
// ├── pages
// │   ├── Homepage.js
// │   ├── Loginpage.js
// │   ├── Signuppage.js
// │   └── NotFound.js
// │
// ├── dashboards
// │   ├── customer
// │   │   ├── CustomerDashboard.js
// │   │   ├── BookService.js
// │   │   ├── MyBookings.js
// │   │   └── Profile.js
// │   │
// │   ├── provider
// │   │   ├── ProviderDashboard.js
// │   │   ├── ServiceRequests.js
// │   │   ├── ActiveJobs.js
// │   │   └── Earnings.js
// │   │
// │   └── admin
// │       ├── AdminDashboard.js
// │       ├── ManageUsers.js
// │       ├── ManageProviders.js
// │       └── ManageBookings.js
// │
// ├── services
// │   ├── api.js
// │   ├── authService.js
// │   └── bookingService.js
// │
// ├── context
// │   └── AuthContext.js
// │
// ├── utils
// │   └── roleRedirect.js
// │
// ├── styles
// │   └── dashboard.css
// │
// ├── App.js
// └── index.js




import Sidebar from "../../components/Sidebar";
import BookingCard from "../../components/BookingCard";
import { useState, useEffect } from "react";
import { supabase } from "../../Service/supabaseClient


function BookSevice() {
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");


  const [bookings, setBookings] = useState([]); 


  useEffect(() => {


    const fetchBookings = async () => {


      const { data, error } = await supabase
        .from("bookings")
        .select("*");


      if (error) {
        console.log("Error fetching bookings:", error.message);
      } else {
        setBookings(data); // ✅ update state
      }
    };


    fetchBookings();


  }, []);


  return (
    <div className="dashboard-container">


      <Sidebar role="customer" />


      <div className="dashboard-content">


        <h1>My Bookings</h1>


        <div className="bookings-grid">


          {bookings.length === 0 ? (
            <p>No bookings found</p>
          ) : (
            bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}


        </div>


      </div>


    </div>
  );
}


export default BookSevice;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient"; // ✅ ADD THIS

function LoginPage() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const [openRole, setOpenRole] = useState(false);  

  const validateEmail = (email) => {

    const cleanEmail = email.trim().toLowerCase();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      return "Please enter a valid email address";
    }

    const domain = cleanEmail.split("@")[1];

    if (
      domain !== "gmail.com" &&
      domain !== "outlook.com" &&
      domain !== "yahoo.com" &&
      domain !== "homeease.com"
    ) {
      return "Only verified email providers are allowed";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!role) {
      setError("Please select your role");
      return;
    }

    setError("");

    // =========================
    // 🔐 LOGIN
    // =========================
    if (isLogin) {

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !data) {
        setError("Invalid email or password");
        return;
      }

      // 🔁 Redirect based on role
      if (data.role === "customer") {
        navigate("/customer-dashboard");
      }
      else if (data.role === "provider") {
        navigate("/provider-dashboard");
      }
      else if (data.role === "admin") {
        navigate("/admin-dashboard");
      }

    }

    // =========================
    // 📝 SIGNUP
    // =========================
    else {

      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            email: email,
            password: password,
            role: role
          }
        ]);

      if (error) {
        setError(error.message);
      } else {
        alert("Account created successfully!");
        setIsLogin(true); // switch to login
      }

    }

  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>{isLogin ? "Welcome back" : "Create Account"}</h2>

        <p className="login-subtitle">
          {isLogin ? "Sign in to HomeEase" : "Register for HomeEase"}
        </p>

        <form onSubmit={handleSubmit} className="login-form">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          {/* Custom Role Dropdown */}

          <div className="role-dropdown">

            <div
              className="role-selected"
              onClick={() => setOpenRole(!openRole)}
            >
              {role ? role : "Select Role"} ▾
            </div>

            {openRole && (
              <div className="role-options">

                <div onClick={() => {setRole("customer"); setOpenRole(false);}}>
                  Customer
                </div>

                <div onClick={() => {setRole("provider"); setOpenRole(false);}}>
                  Service Provider
                </div>

                <div onClick={() => {setRole("admin"); setOpenRole(false);}}>
                  Admin
                </div>

              </div>
            )}

          </div>

          {error && (
            <p className="error-text">{error}</p>
          )}

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <p className="toggle-text">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            className="toggle-link"
            onClick={()=>setIsLogin(!isLogin)}
          >
            {isLogin ? " Register here" : " Login here"}
          </span>

        </p>

      </div>

    </div>
  );
}

export default LoginPage;


import { Link } from "react-router-dom";
import { useState } from "react";


function Navbar() {


  const [openDropdown, setOpenDropdown] = useState(false);


  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");


  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };


  const closeDropdown = () => {
    setOpenDropdown(false);
  };


  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    window.location.href = "/"; // redirect to homepage
  };


  return (
    <nav className="navbar">
      <div className="nav-container">


        <Link to="/" className="logo">
          Home<span>Ease</span>
        </Link>


        <div className="nav-links">


          <a href="#services">Services</a>
          <a href="#how">How It Works</a>
          <a href="#benefits">Benefits</a>


          {/* 🔹 If NOT logged in */}
          {!userEmail ? (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          ) : (
            <>
              {/* 🔹 Dashboard based on role */}
              <div className="dropdown">


                <button className="dropbtn" onClick={toggleDropdown}>
                  Dashboard ▾
                </button>


                {openDropdown && (
                  <div className="dropdown-content">


                    {userRole === "customer" && (
                      <Link to="/customer-dashboard" onClick={closeDropdown}>
                        Customer Dashboard
                      </Link>
                    )}


                    {userRole === "provider" && (
                      <Link to="/provider-dashboard" onClick={closeDropdown}>
                        Provider Dashboard
                      </Link>
                    )}


                    {userRole === "admin" && (
                      <Link to="/admin-dashboard" onClick={closeDropdown}>
                        Admin Dashboard
                      </Link>
                    )}


                  </div>
                )}


              </div>


              {/* 🔹 Logout button */}
              <button className="login-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}


        </div>


      </div>
    </nav>
  );
}


export default Navbar;


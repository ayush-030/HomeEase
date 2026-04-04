import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ServiceCard from "../../components/ServiceCard";
import BookingCard from "../../components/BookingCard";

import { services } from "../../Service/bookingService";
import { supabase } from "../../Service/supabaseClient";

function CustomerDashboard() {

  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      navigate("/login");
      return;
    }

    fetchBookings();

  }, [navigate]);

  const fetchBookings = async () => {

    const userEmail = localStorage.getItem("userEmail");
    console.log("User Email:", userEmail);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_email", userEmail)
      .order("id", { ascending: false }) 
      .limit(5);
      
      console.log("Bookings:", data);
      if (error) console.log("Error:", error);


    if (error) {
      console.log("Error fetching bookings:", error);
    } else {
      setBookings(data || []);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="dashboard-container">

      <Sidebar role="customer" />

      <div className="dashboard-content">

        <div className="dashboard-header">
          <h1>Customer Dashboard</h1>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <p>Welcome to HomeEase. Book services easily.</p>

      
        <h2>Available Services</h2>

        <div className="services-grid">
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <h2>Recent Bookings</h2>

        <div className="bookings-grid">
          {bookings.length === 0 ? (
            <p>No bookings yet</p>
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

export default CustomerDashboard;


// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../../components/Sidebar";
// import ServiceCard from "../../components/ServiceCard";
// import BookingCard from "../../components/BookingCard";

// import { services } from "../../Service/bookingService";
// import { supabase } from "../../Service/supabaseClient";

// function CustomerDashboard() {

//   const [bookings, setBookings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {

//     const userEmail = localStorage.getItem("userEmail");

//     if (!userEmail) {
//       navigate("/login"); 
//       return;
//     }

//     fetchBookings();

//   }, [navigate]);

//   const fetchBookings = async () => {

//     const userEmail = localStorage.getItem("userEmail");

//     const { data, error } = await supabase
//       .from("bookings")
//       .select("*")
//       .eq("user_email", userEmail);

//     if (error) {
//       console.log("Error:", error);
//     } else {
//       setBookings(data || []);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userRole");
//     navigate("/");  
//   };

//   return (
//     <div className="dashboard-container">

//       <Sidebar role="customer" />

//       <div className="dashboard-content">

//         <div className="dashboard-header">
//           <h1>Customer Dashboard</h1>

//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//         <p>Welcome to HomeEase. Book services easily.</p>
        
//         <h2>Available Services</h2>

//         <div className="services-grid">
//           {services?.map((service) => (
//             <ServiceCard key={service.id} service={service} />
//           ))}
//         </div>

//         \
//         <h2>Recent Bookings</h2>

//         <div className="bookings-grid">
//           {bookings.length === 0 ? (
//             <p>No bookings yet</p>
//           ) : (
//             bookings.map((booking) => (
//               <BookingCard key={booking.id} booking={booking} />
//             ))
//           )}
//         </div>

//       </div>

//     </div>
//   );
// }

// export default CustomerDashboard;
import Sidebar from "../../components/Sidebar";
import BookingCard from "../../components/BookingCard";
// import {services , bookings } from "../../Service/bookingService";
import { useState, useEffect } from "react";
import { supabase } from "../../Service/supabaseClient";

function Mybookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole")

    console.log("User Email:", userEmail);
    console.log("User Role:", userRole);  

    let query = supabase.from("bookings").select("*").eq("user_email", userEmail);;
    if (userRole !== "admin") {
      query = query.eq("user_email", userEmail);
    }
    const { data, error } = await query;
    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      console.log("Fetched data:", data); 
      setBookings(data);
    }
  };

  useEffect(() => {
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

export default Mybookings;
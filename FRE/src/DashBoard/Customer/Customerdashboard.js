import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ServiceCard from "../../components/ServiceCard";
import BookingCard from "../../components/BookingCard";

import { services } from "../../Service/bookingService"; 
import { supabase } from "../../Service/supabaseClient"; 

function CustomerDashboard() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    const userEmail = localStorage.getItem("userEmail");

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_email", userEmail);

    if (error) {
      console.log("Error:", error);
    } else {
      setBookings(data || []);
    }
  };

  return (
    <div className="dashboard-container">

      <Sidebar role="customer" />

      <div className="dashboard-content">

        <h1>Customer Dashboard</h1>
        <p>Welcome to HomeEase. Book services easily.</p>

        <h2>Available Services</h2>

        <div className="services-grid">
          {services.map((service) => (
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
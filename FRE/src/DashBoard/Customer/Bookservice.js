import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import BookingCard from "../../components/BookingCard";
import { services } from "../../Service/bookingService";
import { supabase } from "../../Service/supabaseClient";
import { useNavigate } from "react-router-dom";

function Bookservice() {

  const [selectedService, setSelectedService] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");

  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

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
      console.log("Error fetching bookings:", error.message);
    } else {
      setBookings(data);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("userEmail");

    if (!selectedProvider) {
      alert("Please select a provider first");
      return;
    }
    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          service: selectedService,
          date: date,
          address: address,
          status: "Pending",
          user_email:userEmail,
          provider_email: selectedProvider.providerEmail
        }
      ]);

    if (error) {
      console.error(error);
      alert("Error booking service");
    } else {
      alert("Service booked successfully!");

      // reset form
      setSelectedService("");
      setDate("");
      setAddress("");

      //  refresh bookings instantly
      fetchBookings();
    }
  };

  return (
    <div className="dashboard-container">

      <Sidebar role="customer" />

      <div className="dashboard-content">

        {/* BOOK SERVICE FORM */}
        <h1>Book a Service</h1>

        <form className="booking-form" onSubmit={handleSubmit}>

          <label>Select Service</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">Choose Service</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>

          <label>Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Address</label>
          <input
            type="text"
            placeholder="Enter service address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => {
              if (!selectedService) {
              alert("Please select a service first");
              return;
              }

              navigate(`/providers/${selectedService}`);
            }}
          >
            Choose Provider
          </button>
        
          <button type="submit">Book Service</button>
        </form>

        {/*  BOOKINGS LIST */}
        <h1 style={{ marginTop: "30px" }}>My Bookings</h1>

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

export default Bookservice;


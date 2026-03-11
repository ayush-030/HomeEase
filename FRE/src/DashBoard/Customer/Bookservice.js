import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { services , bookings } from "../../Service/bookingService";

function Bookservice() {

  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      service: selectedService,
      date: date,
      address: address
    };

    console.log("Booking created:", bookingData);

    alert("Service booked successfully!");
  };

  return (
    <div className="dashboard-container">

      <Sidebar role="customer" />

      <div className="dashboard-content">

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

          <button type="submit">Book Service</button>

        </form>

      </div>

    </div>
  );
}

export default Bookservice;
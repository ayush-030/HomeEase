import Sidebar from "../../components/Sidebar";
import ServiceCard from "../../components/ServiceCard";
import BookingCard from "../../components/BookingCard";

import { services, bookings } from "../../Service/bookingService";

function CustomerDashboard() {

  return (
    <div className="dashboard-container">

      <Sidebar />

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

          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}

        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;
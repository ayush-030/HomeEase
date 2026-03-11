import Sidebar from "../../components/Sidebar";
import BookingCard from "../../components/BookingCard";
import {services , bookings } from "../../Service/bookingService";

function Mybookings() {

  return (
    <div className="dashboard-container">

      <Sidebar role="customer" />

      <div className="dashboard-content">

        <h1>My Bookings</h1>

        <div className="bookings-grid">

          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}

        </div>

      </div>

    </div>
  );
}

export default Mybookings;
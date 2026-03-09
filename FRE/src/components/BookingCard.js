import Statustracker from "./Statustracker";

function Bookingcard({ booking }) {

  return (
    <div className="booking-card">

      <h3>{booking.service}</h3>

      <p>Date: {booking.date}</p>

      <Statustracker status={booking.status} />

    </div>
  );
}

export default Bookingcard;
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../../Service/supabaseClient";

function ManageBookings(){

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("Bookings:", data);

    if (!error) {
      setBookings(data || []);
    }
  };

  return(
    <div className="dashboard-container">

      <Sidebar role="admin"/>

      <div className="dashboard-content">

        <h1>Manage Bookings</h1>

        <div className="bookings-grid">
          {bookings.length === 0 ? (
            <p>No bookings found</p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="booking-card">
                <h3>{b.service}</h3>
                <p>User: {b.userEmail}</p>
                <p>Status: {b.status}</p>
                <p>Address: {b.address}</p>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

export default ManageBookings;

// import Sidebar from "../../components/Sidebar";

// function ManageBookings(){

//   return(
//     <div className="dashboard-container">

//       <Sidebar role="admin"/>

//       <div className="dashboard-content">

//         <h1>Manage Bookings</h1>

//         <div className="dashboard-card">
//           <p>All bookings will be managed here</p>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default ManageBookings;

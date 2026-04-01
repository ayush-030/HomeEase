import Sidebar from "../../components/Sidebar";

function ManageBookings(){

  return(
    <div className="dashboard-container">

      <Sidebar role="admin"/>

      <div className="dashboard-content">

        <h1>Manage Bookings</h1>

        <div className="dashboard-card">
          <p>All bookings will be managed here</p>
        </div>

      </div>

    </div>
  );
}

export default ManageBookings;

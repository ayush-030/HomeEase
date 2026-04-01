import Sidebar from "../../components/Sidebar";

function ManageUsers(){

  return(
    <div className="dashboard-container">

      <Sidebar role="admin"/>

      <div className="dashboard-content">

        <h1>Manage Users</h1>

        <div className="dashboard-card">
          <p>User list will be shown here</p>
        </div>

      </div>

    </div>
  );
}

export default ManageUsers;

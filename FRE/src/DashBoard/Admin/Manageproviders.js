import Sidebar from "../../components/Sidebar";

function ManageProviders(){

  return(
    <div className="dashboard-container">

      <Sidebar role="admin"/>

      <div className="dashboard-content">

        <h1>Manage Providers</h1>

        <div className="dashboard-card">
          <p>Provider list will be shown here</p>
        </div>

      </div>

    </div>
  );
}

export default ManageProviders;

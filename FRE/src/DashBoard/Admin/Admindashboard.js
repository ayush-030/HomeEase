import Sidebar from "../../components/Sidebar";

function AdminDashboard(){

  const stats = [
    { id:1, title:"Total Users", value:1},
    { id:2, title:"Service Providers", value:0 },
    { id:3, title:"Total Bookings", value:2 },
  ];

  return (

    <div className="dashboard-container">

      <Sidebar role="admin" />

      <div className="dashboard-content">

        <h1>Admin Dashboard</h1>
        <p>Manage users, providers and bookings.</p>

        <h2>Overview</h2>

        <div className="services-grid">

          {stats.map((item)=>(
            <div key={item.id} className="dashboard-card">

              <h3>{item.title}</h3>
              <p style={{fontSize:"22px", fontWeight:"bold"}}>
                {item.value}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;

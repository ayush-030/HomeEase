import Sidebar from "../../components/Sidebar";

function ProviderDashboard() {

  const requests = [
    { id: 1, service: "Plumbing", customer: "Rahul", location: "Delhi" },
    { id: 2, service: "AC Repair", customer: "Amit", location: "Noida" }
  ];

  const activeJobs = [
    { id: 1, service: "Cleaning", status: "In Progress" },
    { id: 2, service: "Electrical", status: "On the Way" }
  ];

  return (
    <div className="dashboard-container">

      <Sidebar role="provider" />

      <div className="dashboard-content">

        <h1>Provider Dashboard</h1>
        <p>Manage your service requests and active jobs.</p>

        <h2>New Service Requests</h2>

        <div className="services-grid">

          {requests.map((req) => (
            <div key={req.id} className="service-card">

              <h3>{req.service}</h3>
              <p>Customer: {req.customer}</p>
              <p>Location: {req.location}</p>

              <button className="book-btn">Accept</button>
              <button className="book-btn">Reject</button>

            </div>
          ))}

        </div>

        <h2>Active Jobs</h2>

        <div className="bookings-grid">

          {activeJobs.map((job) => (
            <div key={job.id} className="booking-card">

              <h3>{job.service}</h3>
              <p>Status: {job.status}</p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ProviderDashboard;

// import { Link } from "react-router-dom";

// function ProviderDashboard() {

//   return (

//     <div className="dashboard-container">

//       <h1>Provider Dashboard</h1>

//       <p>Manage your service requests and active jobs.</p>

//       <div className="dashboard-cards">

//         <div className="dashboard-card">
//           <h3>Service Requests</h3>
//           <p>View new customer requests.</p>
//           <Link to="/service-requests">
//             <button>View Requests</button>
//           </Link>
//         </div>

//         <div className="dashboard-card">
//           <h3>Active Jobs</h3>
//           <p>See jobs currently assigned to you.</p>
//           <Link to="/active-jobs">
//             <button>View Jobs</button>
//           </Link>
//         </div>

//         <div className="dashboard-card">
//           <h3>Earnings</h3>
//           <p>Track your service earnings.</p>
//           <Link to="/earnings">
//             <button>View Earnings</button>
//           </Link>
//         </div>

//       </div>

//     </div>

//   );

// }

// export default ProviderDashboard;
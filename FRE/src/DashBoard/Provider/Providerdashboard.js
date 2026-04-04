import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback} from "react";
import Sidebar from "../../components/Sidebar";
import { supabase } from "../../Service/supabaseClient";

function ProviderDashboard() {

  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);

  const userEmail = localStorage.getItem("userEmail");

  const fetchProviderData = useCallback(async () => {
   
    const { data: requestsData } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "Pending");

    const { data: jobsData } = await supabase
      .from("bookings")
      .select("*")
      .eq("providerEmail", userEmail)
      .neq("status", "Rejected");

    setRequests(requestsData || []);
    setActiveJobs(jobsData || []);
  }, [userEmail]);

  useEffect(() => {
  if (!userEmail) {
    navigate("/login");
    return;
  }

  fetchProviderData();
}, [navigate, fetchProviderData, userEmail]);

  const handleAccept = async (id) => {

    await supabase
      .from("bookings")
      .update({
        status: "Accepted",
        providerEmail: userEmail   
      })
      .eq("id", id);

    fetchProviderData();
  };
 
  const handleReject = async (id) => {

    await supabase
      .from("bookings")
      .update({
        status: "Rejected"
      })
      .eq("id", id);

    fetchProviderData();
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="dashboard-container">

      <Sidebar role="provider" />

      <div className="dashboard-content">

        <div className="dashboard-header">
          <h1>Provider Dashboard</h1>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <p>Manage your service requests and active jobs.</p>

        
        <h2>New Service Requests</h2>

        <div className="services-grid">
          {requests.length === 0 ? (
            <p>No new requests</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="service-card">

                <h3>{req.service}</h3>
                <p>Customer: {req.user_email}</p>
                <p>Address: {req.address}</p>

                <button
                  className="book-btn"
                  onClick={() => handleAccept(req.id)}
                >
                  Accept
                </button>

                <button
                  className="book-btn"
                  onClick={() => handleReject(req.id)}
                >
                  Reject
                </button>

              </div>
            ))
          )}
        </div>

    
        <h2>Active Jobs</h2>

        <div className="bookings-grid">
          {activeJobs.length === 0 ? (
            <p>No active jobs</p>
          ) : (
            activeJobs.map((job) => (
              <div key={job.id} className="booking-card">

                <h3>{job.service}</h3>
                <p>Status: {job.status}</p>
                <p>Address: {job.address}</p>

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

export default ProviderDashboard;



// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import { supabase } from "../../Service/supabaseClient";

// function ProviderDashboard() {

//   const navigate = useNavigate();

//   const [requests, setRequests] = useState([]);
//   const [activeJobs, setActiveJobs] = useState([]);

//   useEffect(() => {

//     const userEmail = localStorage.getItem("userEmail");

//     if (!userEmail) {
//       navigate("/login");
//       return;
//     }

//     fetchProviderData();
//   }, [navigate]);

//   const fetchProviderData = async () => {

//     const { data: requestsData } = await supabase
//       .from("bookings")
//       .select("*")
//       .eq("status", "Pending");

//     const { data: jobsData } = await supabase
//       .from("bookings")
//       .select("*")
//       .neq("status", "Pending");

//     setRequests(requestsData || []);
//     setActiveJobs(jobsData || []);
//   };

//   const handleAccept = async (id) => {
//     await supabase
//       .from("bookings")
//       .update({ status: "Accepted"})
//       .eq("id", id);

//     fetchProviderData(); 
//   };

//   const handleReject = async (id) => {
//     await supabase
//       .from("bookings")
//       .update({ status: "Rejected" })
//       .eq("id", id);

//     fetchProviderData(); 
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userRole");
//     navigate("/");
//   };

//   return (
//     <div className="dashboard-container">

//       <Sidebar role="provider" />

//       <div className="dashboard-content">

//         <div className="dashboard-header">
//           <h1>Provider Dashboard</h1>

//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//         <p>Manage your service requests and active jobs.</p>

//         <h2>New Service Requests</h2>

//         <div className="services-grid">
//           {requests.length === 0 ? (
//             <p>No new requests</p>
//           ) : (
//             requests.map((req) => (
//               <div key={req.id} className="service-card">

//                 <h3>{req.service}</h3>
//                 <p>Customer: {req.user_email}</p>
//                 <p>Address: {req.address}</p>

//                 <button
//                   className="book-btn"
//                   onClick={() => 
//                   handleAccept(req.id)}
//                 >
//                   Accept
//                 </button>

//                 <button
//                   className="book-btn"
//                   onClick={() => handleReject(req.id)}
//                 >
//                   Reject
//                 </button>

//               </div>
//             ))
//           )}
//         </div>

//         <h2>Active Jobs</h2>

//         <div className="bookings-grid">
//           {activeJobs.length === 0 ? (
//             <p>No active jobs</p>
//           ) : (
//             activeJobs.map((job) => (
//               <div key={job.id} className="booking-card">

//                 <h3>{job.service}</h3>
//                 <p>Status: {job.status}</p>
//                 <p>Address: {job.address}</p>

//               </div>
//             ))
//           )}
//         </div>

//       </div>

//     </div>
//   );
// }

// export default ProviderDashboard;

import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../../Service/supabaseClient";

function Servicerequests(){

  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("Pending")

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const userEmail = localStorage.getItem("userEmail");

    const { data, error} = await supabase
      .from("bookings")
      .select("*")
      .eq("provider_email", userEmail)
      .in("status", ["Pending", "Rejected"]);
    if (error) {
      console.error(error);
    } else {
      setRequests(data || []);
    }
  };

  const handleAccept = async (id) => {
    const {error} = await supabase
      .from("bookings")
      .update({
        status: "Accepted",
      })
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      alert("Job accepted");
      fetchRequests();
    }  
  };

  const handleReject = async (id) => {
    await supabase
      .from("bookings")
      .update({ status: "Rejected" })
      .eq("id", id);

    fetchRequests();
  };

  const filtered = requests.filter(r => r.status === filter);

  return (
    <div className="dashboard-container">
      <Sidebar role="provider" />

      <div className="dashboard-content">

        <h1>Service Requests</h1>

        <div className="filter-tabs">
          <button onClick={() => setFilter("Pending")}>Pending</button>
          <button onClick={() => setFilter("Rejected")}>Rejected</button>
        </div>

        <div className="requests-grid">
          {filtered.length === 0 ? (
            <p>No requests</p>
          ) : (
            filtered.map(req => (
              <div key={req.id} className="dashboard-card">
                <h3>{req.service}</h3>
                <p>{req.address}</p>
                <p>Status: {req.status}</p>

                {req.status === "Pending" && (
                  <div className="request-actions">
                    <button onClick={() => handleAccept(req.id)}>Accept</button>
                    <button onClick={() => handleReject(req.id)}>Reject</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Servicerequests;



// import Sidebar from "../../components/Sidebar";

// function Servicerequests(){

//   const requests = [
//     { id:1, service:"Plumbing", customer:"Rahul", location:"Delhi" },
//     { id:2, service:"AC Repair", customer:"Amit", location:"Noida" }
//   ];

//   return (

//     <div className="dashboard-container">

//       <Sidebar role="provider" />

//       <div className="dashboard-content">

//         <h1>Service Requests</h1>

//         <div className="requests-grid">

//           {requests.map((req)=>(
//             <div key={req.id} className="dashboard-card">

//               <h3>{req.service}</h3>

//               <p><strong>Customer:</strong> {req.customer}</p>
//               <p><strong>Location:</strong> {req.location}</p>

//               <div className="request-actions">
//                 <button className="accept-btn">Accept</button>
//                 <button className="reject-btn">Reject</button>
//               </div>

//             </div>
//           ))}

//         </div>

//       </div>

//     </div>

//   );

// }

// export default Servicerequests;
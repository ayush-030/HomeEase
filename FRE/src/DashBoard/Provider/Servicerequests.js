import Sidebar from "../../components/Sidebar";

function Servicerequests(){

  const requests = [
    { id:1, service:"Plumbing", customer:"Rahul", location:"Delhi" },
    { id:2, service:"AC Repair", customer:"Amit", location:"Noida" }
  ];

  return (

    <div className="dashboard-container">

      <Sidebar role="provider" />

      <div className="dashboard-content">

        <h1>Service Requests</h1>

        <div className="requests-grid">

          {requests.map((req)=>(
            <div key={req.id} className="dashboard-card">

              <h3>{req.service}</h3>

              <p><strong>Customer:</strong> {req.customer}</p>
              <p><strong>Location:</strong> {req.location}</p>

              <div className="request-actions">
                <button className="accept-btn">Accept</button>
                <button className="reject-btn">Reject</button>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>

  );

}

export default Servicerequests;
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../../Service/supabaseClient";

function Activejobs(){

  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("Accepted")

  const fetchJobs = async () => {

    const userEmail = localStorage.getItem("userEmail");
    
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("provider_email", userEmail)
      .in("status", ["Accepted", "Completed"]);

    if (error) {
      console.log(error);
    } else {
      setJobs(data || []);
    }
  };  
useEffect(() => { 
  fetchJobs();
}, []);

  const handleComplete = async (id) => {
    await supabase
      .from("bookings")
      .update({ status: "Completed" })
      .eq("id", id);

    fetchJobs();
  };

  const filtered = jobs.filter(j => j.status === filter);

  return (
    <div className="dashboard-container">
      <Sidebar role="provider" />

      <div className="dashboard-content">

        <h1>Active Jobs</h1>

        <div className="filter-tabs">
          <button onClick={() => setFilter("Accepted")}>Active</button>
          <button onClick={() => setFilter("Completed")}>Completed</button>
        </div>

        <div className="jobs-grid">
          {filtered.length === 0 ? (
            <p>No jobs</p>
          ) : (
            filtered.map(job => (
              <div key={job.id} className="dashboard-card">

                <h3>{job.service}</h3>
                <p>{job.address}</p>
                <p>Status: {job.status}</p>

                {job.status === "Accepted" && (
                  <button onClick={() => handleComplete(job.id)}>
                    Complete
                  </button>
                )}

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Activejobs;


// import Sidebar from "../../components/Sidebar";

// function Activejobs(){

//   const jobs = [
//     { id:1, service:"Cleaning", status:"In Progress" },
//     { id:2, service:"Electrical", status:"On the Way" }
//   ];

//   return (

//     <div className="dashboard-container">

//       <Sidebar role="provider" />

//       <div className="dashboard-content">

//         <h1>Active Jobs</h1>

//         <div className="jobs-grid">

//           {jobs.map((job)=>(
//             <div key={job.id} className="dashboard-card">

//               <h3>{job.service}</h3>
//               <p className="job-status">{job.status}</p>

//             </div>
//           ))}

//         </div>

//       </div>

//     </div>

//   );

// }

// export default Activejobs;
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../../Service/supabaseClient";

function Completedjobs(){

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {

    const userEmail = localStorage.getItem("userEmail");
    const { data ,error } = await supabase
      .from("bookings")
      .select("*")
      .eq("provider_email", userEmail)
      .eq("status", "Completed");

    if (error) {
      console.log(error);
    } else {
      setJobs(data || []);
    }
  };
useEffect(() => {  
  fetchJobs();
}, []);  

  return (
    <div className="dashboard-container">
      <Sidebar role="provider" />

      <div className="dashboard-content">

        <h1>Completed Jobs</h1>

        <div className="jobs-grid">
          {jobs.length === 0 ? (
            <p>No completed jobs</p>
          ) : (
            jobs.map(job => (
              <div key={job.id} className="dashboard-card">
                <h3>{job.service}</h3>
                <p>{job.address}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Completedjobs;

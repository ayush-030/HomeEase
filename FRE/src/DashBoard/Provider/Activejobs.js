import Sidebar from "../../components/Sidebar";

function Activejobs(){

  const jobs = [
    { id:1, service:"Cleaning", status:"In Progress" },
    { id:2, service:"Electrical", status:"On the Way" }
  ];

  return (

    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        <h1>Active Jobs</h1>

        <div className="jobs-grid">

          {jobs.map((job)=>(
            <div key={job.id} className="dashboard-card">

              <h3>{job.service}</h3>
              <p className="job-status">{job.status}</p>

            </div>
          ))}

        </div>

      </div>

    </div>

  );

}

export default Activejobs;
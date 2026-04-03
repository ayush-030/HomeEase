import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../../Service/supabaseClient";

function ManageProviders(){

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "provider");

    console.log("Providers:", data);

    if (!error) {
      setProviders(data || []);
    }
  };

  return(
    <div className="dashboard-container">

      <Sidebar role="admin"/>

      <div className="dashboard-content">

        <h1>Manage Providers</h1>

        <div className="bookings-grid">
          {providers.length === 0 ? (
            <p>No providers found</p>
          ) : (
            providers.map((p) => (
              <div key={p.id} className="booking-card">
                <h3>{p.email}</h3>
                <p>Role: {p.role}</p>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

export default ManageProviders;



// import Sidebar from "../../components/Sidebar";

// function ManageProviders(){

//   return(
//     <div className="dashboard-container">

//       <Sidebar role="admin"/>

//       <div className="dashboard-content">

//         <h1>Manage Providers</h1>

//         <div className="dashboard-card">
//           <p>Provider list will be shown here</p>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default ManageProviders;

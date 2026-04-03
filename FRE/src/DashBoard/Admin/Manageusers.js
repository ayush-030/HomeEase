import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../../Service/supabaseClient";

function ManageUsers(){

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    console.log("Users:", data);

    if (!error) {
      setUsers(data || []);
    }
  };

  return(
    <div className="dashboard-container">

      <Sidebar role="admin"/>

      <div className="dashboard-content">

        <h1>Manage Users</h1>

        <div className="bookings-grid">
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="booking-card">
                <h3>{user.email}</h3>
                <p>Role: {user.role}</p>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

export default ManageUsers;

// import Sidebar from "../../components/Sidebar";

// function ManageUsers(){

//   return(
//     <div className="dashboard-container">

//       <Sidebar role="admin"/>

//       <div className="dashboard-content">

//         <h1>Manage Users</h1>

//         <div className="dashboard-card">
//           <p>User list will be shown here</p>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default ManageUsers;

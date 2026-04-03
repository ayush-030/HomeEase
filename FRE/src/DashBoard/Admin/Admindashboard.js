import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { supabase } from "../../Service/supabaseClient";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    providers: 0,
    bookings: 0
  });

  useEffect(() => {

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      navigate("/login");
      return;
    }

    fetchStats();

  }, [navigate]);

  const fetchStats = async () => {

    const { count: usersCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    const { count: providersCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "provider");

    const { count: bookingsCount } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true });

    setStats({
      users: usersCount || 0,
      providers: providersCount || 0,
      bookings: bookingsCount || 0
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const statsData = [
    { id: 1, title: "Total Users", value: stats.users },
    { id: 2, title: "Service Providers", value: stats.providers },
    { id: 3, title: "Total Bookings", value: stats.bookings },
  ];

  return (
    <div className="dashboard-container">

      <Sidebar role="admin" />

      <div className="dashboard-content">

        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <p>Manage users, providers and bookings.</p>

        <h2>Overview</h2>

        <div className="services-grid">

          {statsData.map((item) => (
            <div key={item.id} className="dashboard-card">

              <h3>{item.title}</h3>

              <p style={{ fontSize: "22px", fontWeight: "bold" }}>
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

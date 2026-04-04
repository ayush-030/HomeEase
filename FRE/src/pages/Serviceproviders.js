import { useEffect, useState } from "react";
import { supabase } from "../Service/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

function Serviceproviders() {

  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();
  const { service } = useParams();

  useEffect(() => {
    const fetchProviders = async () => {
      const { data, error } = await supabase
        .from("providers")
        .select("*")
        .eq("service_type", service);

      if (error) {
        console.error(error);
      } else {
        setProviders(data || []);
      }
    };

    fetchProviders();
  }, [service]);

  return (
    <div className="dashboard-content">

      <h1>Available Providers</h1>

      <div className="services-grid">
        {providers.length === 0 ? (
          <p>No providers available for this service</p>
        ) : (
          providers.map((p) => (
            <div key={p.id} className="service-card">

              <h3>{p.name}</h3>
              <p>Service: {p.service_type}</p>
              <p>Experience: {p.experience}</p>

              <button
                onClick={() => {
                  localStorage.setItem("selectedProvider", JSON.stringify(p));
                  navigate("/bookservice");
                }}
              >
                Select Provider
              </button>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Serviceproviders;

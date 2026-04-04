import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../Service/supabaseClient";

function Providerprofile() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);

  useEffect(() => {

  const fetchProvider = async () => {
    const { data, error } = await supabase
      .from("providers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error fetching provider:", error);
    } else {
      setProvider(data);
    }
  };
    fetchProvider();
  }, [id]);

  const handleBook = async () => {

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          service: provider.service_type,
          address: "User Address", 
          status: "Pending",
          user_email: userEmail,
          provider_email: provider.email
        }
      ]);

    if (error) {
      console.log(error);
      alert("Booking failed");
    } else {
      alert("Booking sent successfully!");

     
      navigate("/customer-dashboard");
    }
  };

 
  if (!provider) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">

      <div className="dashboard-content">

        <h1>{provider.name}</h1>

        <p><strong>Service:</strong> {provider.service_type}</p>
        <p><strong>Experience:</strong> {provider.experience}</p>
        <p><strong>Phone:</strong> {provider.phone}</p>
        <p><strong>Rating:</strong> ⭐ {provider.rating}</p>

        <button onClick={handleBook}>
          Book This Provider
        </button>

      </div>

    </div>
  );
}

export default Providerprofile;
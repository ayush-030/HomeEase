import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function ProviderProfileForm() {

  const navigate = useNavigate()

  const [bio, setBio] = useState("")
  const [experience, setExperience] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [radius, setRadius] = useState(5)

  const user = JSON.parse(localStorage.getItem("user"))

  const detectLocation = () => {

    navigator.geolocation.getCurrentPosition((position) => {

      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)

    })

  }

  const createProfile = async () => {

    try {

      await API.post("/provider/create-profile", {
        user_id: user.id,
        bio: bio,
        experience_years: experience,
        latitude: latitude,
        longitude: longitude,
        service_radius_km: radius
      })

      alert("Profile submitted. Waiting for admin approval.")

      navigate("/provider")

    } catch (error) {

        console.error(error)

        if (error.response?.data?.error) {
          alert(error.response.data.error)
        } else {
          alert("Profile creation failed")
        }
      }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center mt-20">

        <div className="bg-white p-10 rounded-xl shadow w-96">

          <h2 className="text-2xl font-bold mb-6">
            Provider Profile
          </h2>

          <textarea
            placeholder="Service description"
            className="border p-3 rounded w-full mb-4"
            onChange={(e) => setBio(e.target.value)}
          />

          <input
            type="number"
            placeholder="Years of experience"
            className="border p-3 rounded w-full mb-4"
            onChange={(e) => setExperience(e.target.value)}
          />

          <button
            onClick={detectLocation}
            className="bg-gray-300 px-4 py-2 rounded mb-4 w-full"
          >
            Detect My Location
          </button>

          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            className="border p-3 rounded w-full mb-3"
            readOnly
          />

          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            className="border p-3 rounded w-full mb-3"
            readOnly
          />

          <input
            type="number"
            placeholder="Service Radius (km)"
            value={radius}
            className="border p-3 rounded w-full mb-6"
            onChange={(e) => setRadius(e.target.value)}
          />

          <button
            onClick={createProfile}
            className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700"
          >
            Submit Profile
          </button>

        </div>

      </div>

    </div>
  )
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [role, setRole] = useState("CUSTOMER")

  const register = async () => {

    try {

      const res = await API.post("/auth/register", {
        email: email.trim().toLowerCase(),
        full_name: name,
        phone,
        role,
        password,
        address,
        city
      })

      localStorage.setItem("user", JSON.stringify(res.data.user))

      alert("Account created successfully 🎉")

      if (role === "PROVIDER") {
        navigate("/provider-profile")
      } else {
        navigate("/login")
      }

    } catch (error) {

      alert(error.response?.data?.error || "Registration failed")

    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">

      <Navbar />

      <div className="flex justify-center items-center mt-16">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 rounded-lg w-full mb-4"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg w-full mb-4"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            className="border p-3 rounded-lg w-full mb-4"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ✅ NEW FIELDS */}

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg w-full mb-4"
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="City"
            className="border p-3 rounded-lg w-full mb-4"
            onChange={(e) => setCity(e.target.value)}
          />

          <select
            className="border p-3 rounded-lg w-full mb-6"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="CUSTOMER">Customer</option>
            <option value="PROVIDER">Service Provider</option>
          </select>

          <button
            onClick={register}
            className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>

        </div>

      </div>

    </div>
  )
}
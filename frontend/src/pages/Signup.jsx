import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("CUSTOMER")

  const register = async () => {

    try {

      await API.post("/auth/register", {
        email: email,
        full_name: name,
        phone: phone,
        role: role
      })

      alert("Registration successful")

      navigate("/login")

    } catch (error) {

      alert("Registration failed")

    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center items-center mt-20">

        <div className="bg-white p-10 rounded-xl shadow w-96">

          <h2 className="text-2xl font-bold mb-6">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 rounded w-full mb-4"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded w-full mb-4"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            className="border p-3 rounded w-full mb-4"
            onChange={(e) => setPhone(e.target.value)}
          />

          <select
            className="border p-3 rounded w-full mb-6"
            onChange={(e) => setRole(e.target.value)}
          >

            <option value="CUSTOMER">Customer</option>
            <option value="PROVIDER">Service Provider</option>

          </select>

          <button
            onClick={register}
            className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>

        </div>

      </div>

    </div>

  )
}
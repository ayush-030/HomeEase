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
  const [role, setRole] = useState("CUSTOMER")

  const register = async () => {

    try {

      const res = await API.post("/auth/register", {
        email,
        full_name: name,
        phone,
        role,
        password
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
            className="border p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            className="border p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="border p-3 rounded-lg w-full mb-6 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="CUSTOMER">Customer</option>
            <option value="PROVIDER">Service Provider</option>
          </select>

          <button
            onClick={register}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>

      </div>

    </div>
  )
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {

    try {

      // 🔍 Debug log
      console.log("Sending:", email, password)

      const res = await API.post("/auth/login", {
        email: email.trim().toLowerCase(),   // ✅ FIXED
        password: password.trim()
      })

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data.user))

      // Redirect based on role
      if (res.data.user.role === "CUSTOMER") navigate("/customer")
      if (res.data.user.role === "PROVIDER") navigate("/provider")
      if (res.data.user.role === "ADMIN") navigate("/admin")

    } catch (error) {

      console.log("Error:", error.response) // 🔍 Debug

      alert(error.response?.data?.error || "Login failed")

    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">

      <Navbar />

      <div className="flex justify-center items-center mt-20">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Welcome Back 👋
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full mb-6 focus:ring-2 focus:ring-blue-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4 text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>

        </div>

      </div>

    </div>
  )
}
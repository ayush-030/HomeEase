import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function Login() {

  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const login = async () => {

    try {

      const res = await API.get("/auth/users")

      const user = res.data.find(u => u.email === email)

      if (!user) {
        alert("User not found")
        return
      }

      localStorage.setItem("user", JSON.stringify(user))

      if (user.role === "CUSTOMER") navigate("/customer")
      if (user.role === "PROVIDER") navigate("/provider")
      if (user.role === "ADMIN") navigate("/admin")

    } catch (error) {

      alert("Login failed")

    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center items-center mt-20">

        <div className="bg-white p-10 rounded-xl shadow w-96">

          <h2 className="text-2xl font-bold mb-6">
            Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded w-full mb-6"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={login}
            className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  )
}
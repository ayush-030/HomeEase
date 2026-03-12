import { useNavigate } from "react-router-dom"

export default function Navbar() {

  const navigate = useNavigate()

  return (
    <nav className="w-full bg-white shadow-md">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          HomeEase
        </h1>

        {/* Navigation Buttons */}
        <div className="flex gap-6 items-center">

          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-blue-600"
          >
            Services
          </button>

          <button
            onClick={() => navigate("/provider")}
            className="text-gray-600 hover:text-blue-600"
          >
            Provider Dashboard
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </div>

      </div>

    </nav>
  )
}
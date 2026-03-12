import { useNavigate } from "react-router-dom"

export default function Navbar() {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  const logout = () => {

    localStorage.removeItem("user")
    navigate("/")

  }

  return (

    <nav className="w-full bg-white shadow-md">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          HomeEase
        </h1>

        <div className="flex gap-6 items-center">

          {!user && (

            <>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-600 hover:text-blue-600"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </button>
            </>

          )}

          {user && (

            <>
              {user.role === "CUSTOMER" && (
                <button
                  onClick={() => navigate("/customer")}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Dashboard
                </button>
              )}

              {user.role === "PROVIDER" && (
                <button
                  onClick={() => navigate("/provider")}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Provider Dashboard
                </button>
              )}

              {user.role === "ADMIN" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Admin Dashboard
                </button>
              )}

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>

            </>
          )}

        </div>

      </div>

    </nav>
  )
}
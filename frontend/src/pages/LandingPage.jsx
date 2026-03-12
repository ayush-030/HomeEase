import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import { FaBolt, FaBroom, FaTools, FaWrench } from "react-icons/fa"

export default function LandingPage() {

  const navigate = useNavigate()

  const services = [
    { name: "Plumbing", icon: <FaWrench size={28} /> },
    { name: "Electrical", icon: <FaBolt size={28} /> },
    { name: "Cleaning", icon: <FaBroom size={28} /> },
    { name: "Carpentry", icon: <FaTools size={28} /> }
  ]

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      {/* HERO SECTION */}

      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Home Services at Your Doorstep
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Book trusted electricians, plumbers, cleaners and more
        </p>

        <div className="flex justify-center gap-6">

          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-gray-400 px-8 py-3 rounded-lg hover:bg-gray-200"
          >
            Login
          </button>

        </div>

      </div>


      {/* SERVICES */}

      <div className="max-w-6xl mx-auto px-6 py-10">

        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >

              <div className="flex justify-center text-blue-600 mb-3">
                {service.icon}
              </div>

              <p className="font-semibold text-gray-700">
                {service.name}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* HOW IT WORKS */}

      <div className="bg-white py-16">

        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div>
            <h3 className="font-semibold text-xl mb-2">
              1. Choose Service
            </h3>
            <p className="text-gray-500">
              Select the service you need from our platform
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">
              2. Book Appointment
            </h3>
            <p className="text-gray-500">
              Pick a convenient date and time
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">
              3. Get It Done
            </h3>
            <p className="text-gray-500">
              Our professional completes the service at your home
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}
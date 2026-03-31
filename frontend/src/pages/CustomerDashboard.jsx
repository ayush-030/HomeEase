import { useEffect, useState } from "react"
import API from "../services/api"
import ProviderCard from "../components/ProviderCard"
import Navbar from "../components/Navbar"
import ServiceCategories from "../components/ServiceCategories"
import ProviderMap from "../components/ProviderMap"

export default function CustomerDashboard() {

  const [providers, setProviders] = useState([])
  const [category, setCategory] = useState(2)
  const [location, setLocation] = useState(null)

  // ✅ NEW STATES
  const [filter, setFilter] = useState("TOP_RATED")
  const [loading, setLoading] = useState(false)

  // 📍 Detect user location
  const getLocation = () => {

    if (!navigator.geolocation) {
      alert("Geolocation not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },

      (error) => {
        console.error(error)
        alert("Location access denied")
      }

    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  // 🔍 Search providers
  const searchProviders = async () => {

    try {

      if (!location) {
        alert("Detecting your location...")
        return
      }

      setLoading(true)

      const res = await API.get(
        `/provider/search?latitude=${location.latitude}&longitude=${location.longitude}&category_id=${category}`
      )

      let data = res.data

      // 🔥 FILTER LOGIC
      if (filter === "NEARBY") {
        data = data.sort((a, b) => a.distance - b.distance)
      }

      if (filter === "TOP_RATED") {
        data = data.sort((a, b) => b.rating - a.rating)
      }

      setProviders(data)

    } catch (error) {
      console.error("Error fetching providers:", error)
    } finally {
      setLoading(false)
    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HERO */}
        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Book Trusted Local Services
          </h1>

          <p className="text-gray-500 text-lg">
            Electricians, plumbers, cleaners and more at your doorstep
          </p>

        </div>

        {/* LOCATION STATUS */}
        {!location && (
          <p className="text-center text-gray-500 mb-6">
            Detecting your location...
          </p>
        )}

        {/* SERVICE CATEGORIES */}
        <ServiceCategories setCategory={setCategory} />

        {/* ✅ FILTER BUTTONS */}
        <div className="flex justify-center gap-4 mb-6">

          <button
            onClick={() => setFilter("TOP_RATED")}
            className={`px-4 py-2 rounded ${
              filter === "TOP_RATED"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            ⭐ Top Rated
          </button>

          <button
            onClick={() => setFilter("NEARBY")}
            className={`px-4 py-2 rounded ${
              filter === "NEARBY"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            📍 Nearby
          </button>

        </div>

        {/* SEARCH BUTTON */}
        <div className="flex justify-center mb-10">

          <button
            onClick={searchProviders}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Find Providers
          </button>

        </div>

        {/* MAP */}
        {providers.length > 0 && (
          <div className="mb-12">
            <ProviderMap providers={providers} />
          </div>
        )}

        {/* PROVIDERS / LOADING */}
        {loading ? (

          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg animate-pulse">
              Searching best providers for you...
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {providers.length === 0 ? (

              <p className="text-gray-500 text-center col-span-3">
                Click "Find Providers" to see nearby services
              </p>

            ) : (

              providers.map((p) => (
                <ProviderCard key={p.provider_id} provider={p} />
              ))

            )}

          </div>

        )}

      </div>

    </div>
  )
}
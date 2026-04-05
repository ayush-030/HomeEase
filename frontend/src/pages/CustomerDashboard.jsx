import { useEffect, useState } from "react"
import API from "../services/api"
import ProviderCard from "../components/ProviderCard"
import Navbar from "../components/Navbar"
import ServiceCategories from "../components/ServiceCategories"
import ProviderMap from "../components/ProviderMap"

export default function CustomerDashboard() {

  const [allProviders, setAllProviders] = useState([])
  const [providers, setProviders] = useState([])

  const [category, setCategory] = useState(2)
  const [location, setLocation] = useState(null)

  const [filter, setFilter] = useState("ALL") // ✅ default fixed
  const [loading, setLoading] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))

  // ✅ FORMAT NAME
  const formatName = (name) => {
    if (!name) return ""

    // If already has space → just capitalize properly
    if (name.includes(" ")) {
      return name
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    }

    // If no space → try to split intelligently (basic heuristic)
    const mid = Math.floor(name.length / 2)

    const first = name.slice(0, mid)
    const second = name.slice(mid)

    return (
      first.charAt(0).toUpperCase() + first.slice(1).toLowerCase() +
      " " +
      second.charAt(0).toUpperCase() + second.slice(1).toLowerCase()
    )
  }

  // 📍 Detect location
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
      () => alert("Location access denied")
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  // 🔍 Fetch providers (ONLY when button clicked)
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

      setAllProviders(res.data)
      setProviders(res.data)

    } catch (error) {
      console.error("Error fetching providers:", error)
    } finally {
      setLoading(false)
    }
  }

  // 🔥 APPLY FILTER (REAL-TIME)
  useEffect(() => {

    let data = [...allProviders]

    if (filter === "TOP_RATED") {
      data = data
        .filter(p => p.rating > 0 && p.reviews > 0)
        .sort((a, b) => b.rating - a.rating)
    }

    if (filter === "NEARBY") {
      data = data.sort((a, b) => a.distance - b.distance)
    }

    if (filter === "EXPERIENCED") {
      data = data
        .filter(p => p.experience >= 5)
        .sort((a, b) => b.experience - a.experience)
    }

    if (filter === "ALL") {
      data = [...allProviders]
    }

    setProviders(data)

  }, [filter, allProviders])

  return (

    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-10 rounded-2xl mb-10 shadow">

          <h1 className="text-4xl font-bold mb-2">
            Hi {formatName(user?.full_name || user?.email?.split("@")[0])}
          </h1>

          <p className="text-lg opacity-90">
            Book trusted services near you
          </p>

        </div>

        {/* LOCATION */}
        {!location && (
          <p className="text-center text-gray-500 mb-6">
            Detecting your location...
          </p>
        )}

        {/* CATEGORIES */}
        <ServiceCategories setCategory={setCategory} />

        {/* FILTERS */}
        <div className="flex justify-center gap-4 my-8 flex-wrap">

          {[
            { key: "ALL", label: "🔍 All" },
            { key: "TOP_RATED", label: "⭐ Top Rated" },
            { key: "NEARBY", label: "📍 Nearby" },
            { key: "EXPERIENCED", label: "🧠 Experienced" }
          ].map((f) => (

            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                filter === f.key
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {f.label}
            </button>

          ))}

        </div>

        {/* ✅ FIND PROVIDERS BUTTON (KEPT) */}
        <div className="flex justify-center mb-10">

          <button
            onClick={searchProviders}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl shadow-lg transition"
          >
            Find Providers
          </button>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg animate-pulse">
              Finding best providers near you...
            </p>
          </div>

        ) : (

          <>
            {/* PROVIDERS */}
            <div className="mb-12">

              {providers.length === 0 ? (

                <p className="text-center text-gray-500">
                  Click "Find Providers" to see services
                </p>

              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {providers.map((p) => (
                    <ProviderCard key={p.provider_id} provider={p} />
                  ))}

                </div>

              )}

            </div>

            {/* MAP */}
            {providers.length > 0 && (
              <div className="rounded-xl overflow-hidden shadow">
                <ProviderMap providers={providers} />
              </div>
            )}

          </>

        )}

      </div>

    </div>
  )
}
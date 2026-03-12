import { useState } from "react"
import API from "../services/api"
import ProviderCard from "../components/ProviderCard"
import Navbar from "../components/Navbar"
import ServiceCategories from "../components/ServiceCategories"
import ProviderMap from "../components/ProviderMap"

export default function CustomerDashboard() {

  const [providers, setProviders] = useState([])
  const [category, setCategory] = useState(2)

  const searchProviders = async () => {

    try {

      const res = await API.get(
        `/provider/search?latitude=28.6139&longitude=77.2090&category_id=${category}`
      )

      setProviders(res.data)

    } catch (error) {

      console.error("Error fetching providers:", error)

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


        {/* SERVICE CATEGORIES */}

        <ServiceCategories setCategory={setCategory} />


        {/* SEARCH BUTTON */}

        <div className="flex justify-center mb-10">

          <button
            onClick={searchProviders}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Find Providers
          </button>

        </div>


        {/* MAP VIEW */}

        {providers.length > 0 && (

          <div className="mb-12">

            <ProviderMap providers={providers} />

          </div>

        )}


        {/* PROVIDER CARDS */}

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

      </div>

    </div>
  )
}
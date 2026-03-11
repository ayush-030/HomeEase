import { useState } from "react"
import API from "../services/api"
import ProviderCard from "../components/ProviderCard"
import Navbar from "../components/Navbar"
import ServiceCategories from "../components/ServiceCategories"

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
      console.error(error)
    }
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HERO SECTION */}
        <ServiceCategories setCategory={setCategory} />
        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Book Trusted Local Services
          </h1>

          <p className="text-gray-500 text-lg">
            Electricians, plumbers, cleaners and more at your doorstep
          </p>

        </div>


        {/* SEARCH SECTION */}

        <div className="flex justify-center gap-4 mb-12">

          <select
            className="p-3 rounded-lg border border-gray-300 bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option value="1">Plumbing</option>
            <option value="2">Electrical</option>
            <option value="3">Cleaning</option>
            <option value="4">Carpentry</option>

          </select>

          <button
            onClick={searchProviders}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Search
          </button>

        </div>


        {/* PROVIDERS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {providers.length === 0 ? (
            <p className="text-gray-500 text-center col-span-3">
              Click search to find nearby providers
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
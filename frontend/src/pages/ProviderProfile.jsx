import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function ProviderProfile() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    fetchProvider()
  }, [])

  const fetchProvider = async () => {
    const res = await API.get(`/provider/details/${id}`)
    setProvider(res.data)
  }

  if (!provider) return <p className="text-center mt-20">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-xl shadow">

        <h2 className="text-3xl font-bold mb-2">
          {provider.name}
        </h2>

        <p className="text-gray-500 mb-4">
          {provider.bio}
        </p>

        <p className="mb-2">
          ⭐ {provider.rating} ({provider.reviews} reviews)
        </p>

        <p className="mb-6">
          Experience: {provider.experience} years
        </p>

        <button
          onClick={() => navigate(`/book/${id}`)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Book Service
        </button>

      </div>

    </div>
  )
}
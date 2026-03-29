import { useNavigate } from "react-router-dom"

export default function ProviderCard({ provider }) {

  const navigate = useNavigate()

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

      <h3 className="text-xl font-bold mb-1">
        {provider.name}
      </h3>

      <p className="text-gray-500 mb-3">
        {provider.bio}
      </p>

      <p className="text-sm text-gray-600">
        ⭐ {provider.rating || 0} ({provider.reviews || 0} reviews)
      </p>

      <p className="text-sm text-gray-500 mb-4">
        📍 {provider.distance} km away
      </p>

      <button
        onClick={() => navigate(`/provider/${provider.provider_id}`)}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        View Profile
      </button>

    </div>
  )
}
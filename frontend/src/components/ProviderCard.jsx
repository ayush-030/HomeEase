import { useNavigate } from "react-router-dom"

export default function ProviderCard({ provider }) {

  const navigate = useNavigate()

  return (

    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative">

      {/* TOP RATED BADGE */}
      {provider.rating >= 4.5 && (
        <span className="absolute top-3 right-3 bg-green-100 text-green-700 px-2 py-1 text-xs rounded">
          Top Rated
        </span>
      )}

      <h3 className="text-xl font-bold mb-1">
        {provider.name || "Service Provider"}
      </h3>

      <p className="text-gray-500 mb-3">
        {provider.bio}
      </p>

      {/* RATING */}
      <p className="text-sm text-gray-600 mb-1">
        ⭐ {provider.rating || 0} ({provider.reviews || 0} reviews)
      </p>

      {/* EXPERIENCE */}
      <p className="text-sm text-gray-500 mb-1">
        🛠 {provider.experience} years experience
      </p>

      {/* DISTANCE */}
      <p className="text-sm text-gray-500 mb-4">
        📍 {provider.distance} km away
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate(`/provider/${provider.provider_id}`)}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
      >
        View Profile
      </button>

    </div>

  )
}
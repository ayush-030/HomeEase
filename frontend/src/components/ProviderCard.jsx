import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import BookingModal from "./BookingModal"
import API from "../services/api"

export default function ProviderCard({ provider }) {

  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState({ average: 0, count: 0 })

  const fetchRating = async () => {

    try {

      const res = await API.get(`/provider/ratings/${provider.provider_id}`)
      setRating(res.data)

    } catch (error) {

      console.error("Rating fetch failed", error)

    }

  }

  useEffect(() => {
    fetchRating()
  }, [])

  return (

    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

      <h2 className="text-xl font-semibold mb-2">
        Service Provider
      </h2>

      <p className="text-gray-600 mb-2">
        {provider.bio}
      </p>

      <p className="text-sm text-gray-500 mb-2">
        Experience: {provider.experience} years
      </p>

      {/* Rating Section */}

      <div className="flex items-center gap-2 mb-4">

        <FaStar className="text-yellow-500" />

        <p className="text-sm text-gray-700 font-medium">
          {rating.average} ({rating.count} reviews)
        </p>

      </div>

      {/* Booking Button */}

      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Book Service
      </button>

      {/* Booking Modal */}

      {showModal && (
        <BookingModal
          providerId={provider.provider_id}
          closeModal={() => setShowModal(false)}
        />
      )}

    </div>

  )
}
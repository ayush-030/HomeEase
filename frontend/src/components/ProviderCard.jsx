import { useState } from "react"
import BookingModal from "./BookingModal"

export default function ProviderCard({ provider }) {

  const [showModal, setShowModal] = useState(false)

  return (

    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

      <h2 className="text-xl font-semibold mb-2">
        Service Provider
      </h2>

      <p className="text-gray-600 mb-2">
        {provider.bio}
      </p>

      <p className="text-sm text-gray-500 mb-4">
        Experience: {provider.experience} years
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Book Service
      </button>

      {showModal && (
        <BookingModal
          providerId={provider.provider_id}
          closeModal={() => setShowModal(false)}
        />
      )}

    </div>
  )
}
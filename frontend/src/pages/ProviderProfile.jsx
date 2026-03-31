import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function ProviderProfile() {

  const { id } = useParams()

  const [provider, setProvider] = useState(null)

  useEffect(() => {

    const fetchProvider = async () => {

      try {

        const res = await API.get(`/provider/details/${id}`)
        setProvider(res.data)

      } catch (error) {
        console.error(error)
      }

    }

    fetchProvider()

  }, [id])

  if (!provider) {
    return <p className="text-center mt-20">Loading...</p>
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-4xl mx-auto p-10">

        {/* PROFILE HEADER */}
        <div className="bg-white p-8 rounded-xl shadow mb-8">

          <h1 className="text-3xl font-bold mb-2">
            {provider.name}
          </h1>

          <p className="text-gray-600 mb-2">
            {provider.bio}
          </p>

          <p className="text-gray-500 mb-2">
            Experience: {provider.experience} years
          </p>

          <p className="text-lg font-semibold text-yellow-500">
            ⭐ {provider.rating} ({provider.reviews_count} reviews)
          </p>

        </div>

        {/* REVIEWS SECTION */}
        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-2xl font-semibold mb-6">
            Customer Reviews
          </h2>

          {provider.reviews.length === 0 ? (

            <p className="text-gray-500">
              No reviews yet
            </p>

          ) : (

            <div className="space-y-4">

              {provider.reviews.map((r, index) => (

                <div key={index} className="border-b pb-4">

                  <p className="text-yellow-500 text-lg">
                    ⭐ {r.rating}
                  </p>

                  <p className="text-gray-600">
                    {r.comment || "No comment provided"}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  )
}
import { useEffect, useState } from "react"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function ProviderReviews() {

  const [reviews, setReviews] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {

    const fetchReviews = async () => {

      try {

        const statusRes = await API.get(`/provider/status/${user.id}`)
        const providerId = statusRes.data.provider_id

        const res = await API.get(`/provider/reviews/${providerId}`)
        setReviews(res.data)

      } catch (error) {
        console.error(error)
      }

    }

    fetchReviews()

  }, [])

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-4xl mx-auto p-10">

        <h1 className="text-3xl font-bold mb-8">
          Customer Reviews
        </h1>

        {reviews.length === 0 ? (

          <p className="text-gray-500">No reviews yet</p>

        ) : (

          <div className="space-y-6">

            {reviews.map((r, i) => (

              <div key={i} className="bg-white p-6 rounded-xl shadow">

                <p className="text-yellow-500 text-lg">
                  ⭐ {r.rating}
                </p>

                <p className="text-gray-700 mb-2">
                  {r.comment || "No comment"}
                </p>

                <p className="text-sm text-gray-500">
                  — {r.customer_name}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  )
}
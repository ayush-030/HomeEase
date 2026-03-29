import { useEffect, useState } from "react"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function CustomerBookings() {

  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  const fetchBookings = async () => {

    try {

      const res = await API.get(`/booking/customer/${user.id}`)
      setBookings(res.data)

    } catch (error) {
      console.error(error)
    }

  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const submitReview = async () => {

    try {

      await API.post("/review/create", {
        booking_id: selectedBooking.id,
        rating,
        comment
      })

      alert("Review submitted ✅")

      setSelectedBooking(null)
      setRating(0)
      setComment("")

      fetchBookings()

    } catch (error) {
      console.error(error)
      alert("Failed to submit review")
    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto p-10">

        <h1 className="text-3xl font-bold mb-8">
          My Bookings
        </h1>

        <div className="grid gap-6">

          {bookings.length === 0 ? (

            <p className="text-gray-500">No bookings yet</p>

          ) : (

            bookings.map((b) => (

              <div key={b.id} className="bg-white p-6 rounded-xl shadow">

                <p><strong>Provider:</strong> {b.provider_name}</p>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Status:</strong> {b.status}</p>

                {/* SHOW RATE BUTTON */}
                {b.status === "COMPLETED" && !b.review_given && (

                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mt-3"
                  >
                    ⭐ Rate Service
                  </button>

                )}

              </div>

            ))

          )}

        </div>

      </div>

      {/* ⭐ RATING POPUP */}

      {selectedBooking && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

          <div className="bg-white p-8 rounded-xl shadow w-96">

            <h2 className="text-xl font-semibold mb-4">
              Rate Service
            </h2>

            {/* STAR SELECTOR */}

            <div className="flex gap-2 mb-4">

              {[1,2,3,4,5].map((star) => (

                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>

              ))}

            </div>

            <textarea
              placeholder="Write a comment (optional)"
              className="border p-3 w-full mb-4 rounded"
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={submitReview}
              className="bg-blue-600 text-white w-full py-2 rounded"
            >
              Submit Review
            </button>

          </div>

        </div>

      )}

    </div>
  )
}
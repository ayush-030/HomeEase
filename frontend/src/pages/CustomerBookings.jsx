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

      if (rating === 0) {
        alert("Please select a rating")
        return
      }

      await API.post("/review/create", {
        booking_id: selectedBooking.id,
        rating,
        comment
      })

      // ✅ Reset + refresh (no alert now)
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

            <div className="text-center text-gray-500 mt-20">
              <p className="text-lg">No bookings yet</p>
              <p className="text-sm mt-2">
                Book a service to see it here
              </p>
            </div>

          ) : (

            bookings.map((b) => (

              <div
                key={b.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >

                {/* HEADER */}
                <div className="flex justify-between items-center mb-3">

                  <h3 className="text-lg font-semibold">
                    {b.provider_name}
                  </h3>

                  {/* STATUS BADGE */}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${b.status === "PENDING" && "bg-yellow-100 text-yellow-700"}
                    ${b.status === "ACCEPTED" && "bg-green-100 text-green-700"}
                    ${b.status === "COMPLETED" && "bg-blue-100 text-blue-700"}
                    ${b.status === "REJECTED" && "bg-red-100 text-red-700"}
                  `}>
                    {b.status}
                  </span>

                </div>

                {/* DETAILS */}
                <p className="text-gray-500 text-sm mb-1">
                  📅 {b.date}
                </p>

                <p className="text-gray-500 text-sm mb-3">
                  ⏰ {b.time}
                </p>

                {/* RATE BUTTON */}
                {b.status === "COMPLETED" && !b.review_given && (

                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    ⭐ Rate Service
                  </button>

                )}

                {/* REVIEW DONE */}
                {b.review_given && (
                  <p className="text-green-600 text-sm font-medium">
                    ✔ Review Submitted
                  </p>
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

              {[1, 2, 3, 4, 5].map((star) => (

                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-3xl transition ${
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={submitReview}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded transition"
            >
              Submit Review
            </button>

          </div>

        </div>

      )}

    </div>
  )
}
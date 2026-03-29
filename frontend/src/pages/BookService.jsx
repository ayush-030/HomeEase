import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function BookService() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))

  const book = async () => {

    if (!date || !time) {
      alert("Please select date and time")
      return
    }

    try {

      setLoading(true)

      await API.post("/booking/create", {
        customer_id: user?.id,
        provider_id: id,
        booking_date: date,
        booking_time: time
      })

      setShowPopup(true)

    } catch (error) {

      console.error(error)
      alert("Booking failed")

    } finally {
      setLoading(false)
    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">

      <Navbar />

      <div className="flex justify-center items-center mt-20">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Book Service
          </h2>

          <input
            type="date"
            className="border p-3 w-full mb-4 rounded-lg"
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            className="border p-3 w-full mb-6 rounded-lg"
            onChange={(e) => setTime(e.target.value)}
          />

          <button
            onClick={book}
            disabled={loading}
            className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </div>

      </div>

      {/* ✅ CUSTOM POPUP */}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

          <div className="bg-white p-8 rounded-xl shadow-lg text-center w-80">

            <h2 className="text-xl font-semibold mb-3">
              ✅ Booking Requested
            </h2>

            <p className="text-gray-500 mb-6">
              Waiting for provider to accept your request
            </p>

            <button
              onClick={() => {
                setShowPopup(false)
                navigate("/customer")
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              OK
            </button>

          </div>

        </div>
      )}

    </div>
  )
}
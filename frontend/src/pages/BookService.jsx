import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function BookService() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [date, setDate] = useState("")
  const [slots, setSlots] = useState([])
  const [selectedTime, setSelectedTime] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  // 🔥 Fetch slots when date changes
  useEffect(() => {

    const fetchSlots = async () => {

      if (!date) return

      try {

        const res = await API.get(`/booking/available-slots/${id}?date=${date}`)
        setSlots(res.data)

      } catch (error) {
        console.error(error)
      }

    }

    fetchSlots()

  }, [date])

  const bookService = async () => {

    try {

      if (!date || !selectedTime) {
        alert("Please select date and time")
        return
      }

      await API.post("/booking/create", {
        customer_id: user.id,
        provider_id: id,
        category_id: 2,
        booking_date: date,
        booking_time: selectedTime
      })

      alert("Booking requested successfully ✅")

      navigate("/my-bookings")

    } catch (error) {
      console.error(error)
      alert("Booking failed")
    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-xl mx-auto p-10">

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Book Service
          </h2>

          {/* DATE */}
          <input
            type="date"
            className="border p-3 w-full mb-6 rounded"
            onChange={(e) => setDate(e.target.value)}
          />

          {/* TIME SLOTS */}
          {slots.length > 0 && (

            <div className="mb-6">

              <p className="mb-3 font-medium">
                Select Time Slot:
              </p>

              <div className="grid grid-cols-3 gap-3">

                {slots.map((slot, index) => (

                  <button
                    key={index}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-2 rounded border ${
                      selectedTime === slot
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {slot.slice(0,5)}
                  </button>

                ))}

              </div>

            </div>

          )}

          {/* BOOK BUTTON */}
          <button
            onClick={bookService}
            className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>

        </div>

      </div>

    </div>
  )
}
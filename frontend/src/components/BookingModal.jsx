import { useState } from "react"
import API from "../services/api"

export default function BookingModal({ providerId, closeModal }) {

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const customerId = "caf646f4-9554-45f4-8957-78b2bca58a8c"   // your test user
  const categoryId = 2

  const createBooking = async () => {

    await API.post("/booking/create", {
      customer_id: customerId,
      provider_id: providerId,
      category_id: categoryId,
      booking_date: date,
      booking_time: time
    })

    alert("Booking request sent!")
    closeModal()
  }

  return (

    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl w-96">

        <h2 className="text-xl font-bold mb-4">
          Book Service
        </h2>

        <div className="flex flex-col gap-4">

          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            className="border p-2 rounded"
            onChange={(e) => setTime(e.target.value)}
          />

          <button
            onClick={createBooking}
            className="bg-blue-600 text-white py-2 rounded"
          >
            Confirm Booking
          </button>

          <button
            onClick={closeModal}
            className="text-gray-500"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  )
}
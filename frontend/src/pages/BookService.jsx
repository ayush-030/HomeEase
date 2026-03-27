import { useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

export default function BookService() {

  const { id } = useParams()

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  const book = async () => {

    await API.post("/booking/create", {
      customer_id: user.id,
      provider_id: id,
      booking_date: date,
      booking_time: time
    })

    alert("Booking sent!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold mb-6">
          Book Service
        </h2>

        <input
          type="date"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          className="border p-3 w-full mb-6 rounded"
          onChange={(e) => setTime(e.target.value)}
        />

        <button
          onClick={book}
          className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>

      </div>

    </div>
  )
}
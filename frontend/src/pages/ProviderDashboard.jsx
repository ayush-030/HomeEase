import { useEffect, useState } from "react"
import API from "../services/api"

export default function ProviderDashboard() {

  const [bookings, setBookings] = useState([])

  const providerId = "ad174c91-e64f-49ce-9b0b-30cf29ff3762"

  const fetchBookings = async () => {

    const res = await API.get(`/booking/provider/${providerId}`)
    setBookings(res.data)

  }

  const updateStatus = async (id, status) => {

    await API.put(`/booking/update-status/${id}`, { status })
    fetchBookings()

  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Provider Dashboard
      </h1>

      <div className="grid gap-6">

        {bookings.map((b) => (

          <div key={b.id} className="bg-white p-6 rounded-xl shadow">

            <p>Customer: {b.customer_id}</p>
            <p>Date: {b.date}</p>
            <p>Time: {b.time}</p>
            <p>Status: {b.status}</p>

            {b.status === "PENDING" && (

              <div className="flex gap-4 mt-4">

                <button
                  onClick={() => updateStatus(b.id, "ACCEPTED")}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(b.id, "REJECTED")}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  )
}
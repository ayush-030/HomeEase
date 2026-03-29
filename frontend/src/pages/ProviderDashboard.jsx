import { useEffect, useState } from "react"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function ProviderDashboard() {

  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  const fetchBookings = async () => {

    try {

      const res = await API.get(`/booking/provider/${user.id}`)
      setBookings(res.data)

    } catch (error) {

      console.error("Error fetching bookings:", error)

    }

  }

  const checkStatus = async () => {

    try {

      const res = await API.get(`/provider/status/${user.id}`)
      setStatus(res.data.status)

    } catch (error) {

      console.error("Error checking status:", error)

    }

  }

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/booking/update-status/${id}`, { status })
      fetchBookings()

    } catch (error) {

      console.error("Error updating booking:", error)

    }

  }

  useEffect(() => {
    checkStatus()
  }, [])

  useEffect(() => {
    if (status === "APPROVED") {
      fetchBookings()
    }
  }, [status])

  // ⛔ Waiting for approval
  if (status === "PENDING") {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-40">
          <h2 className="text-3xl font-semibold mb-4">
            Waiting for Admin Approval
          </h2>
          <p className="text-gray-500">
            Your provider profile is under review.
          </p>
        </div>
      </div>
    )
  }

  // ⛔ No profile
  if (status === "NOT_CREATED") {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-40">
          <h2 className="text-3xl font-semibold mb-4">
            No Provider Profile Found
          </h2>
          <p className="text-gray-500 mb-6">
            Please create your provider profile first.
          </p>
          <button
            onClick={() => window.location.href = "/provider-profile"}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Create Profile
          </button>
        </div>
      </div>
    )
  }

  // ✅ Dashboard
  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-3xl font-bold mb-8">
          Provider Dashboard
        </h1>

        <div className="grid gap-6">

          {bookings.length === 0 ? (

            <p className="text-gray-500">
              No bookings yet.
            </p>

          ) : (

            bookings.map((b) => (

              <div key={b.id} className="bg-white p-6 rounded-xl shadow">

                {/* CUSTOMER INFO */}
                <h3 className="text-lg font-semibold mb-1">
                  {b.customer_name || "Unknown Customer"}
                </h3>

                <p className="text-sm text-gray-600">
                  📞 {b.customer_phone || "N/A"}
                </p>

                <p className="text-sm text-gray-500 mb-3">
                  📍 {b.customer_address || ""} {b.customer_city || ""}
                </p>

                {/* BOOKING INFO */}
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Time:</strong> {b.time}</p>

                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  <span className={
                    b.status === "PENDING" ? "text-yellow-600" :
                    b.status === "ACCEPTED" ? "text-green-600" :
                    "text-red-600"
                  }>
                    {b.status}
                  </span>
                </p>

                {/* ACTION BUTTONS */}
                {b.status === "PENDING" && (

                  <div className="flex gap-4 mt-4">

                    <button
                      onClick={() => updateStatus(b.id, "ACCEPTED")}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => updateStatus(b.id, "REJECTED")}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>

                  </div>

                )}

                {/* CONTACT AFTER ACCEPT */}
                {b.status === "ACCEPTED" && (

                  <div className="mt-4 p-3 bg-green-50 rounded">

                    <p className="text-green-700 font-medium mb-1">
                      Contact Customer:
                    </p>

                    <p>📞 {b.customer_phone}</p>
                    
                    {/* WhatsApp Button */}
                    
                    <a
                      href={`https://wa.me/91${b.customer_phone?.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 inline-block"
                    >
                      💬 Chat on WhatsApp
                      </a>

                  </div>



                )}

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  )
}
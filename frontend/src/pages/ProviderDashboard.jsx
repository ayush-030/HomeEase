import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function ProviderDashboard() {

  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState("")
  const [rating, setRating] = useState({ average: 0, count: 0 })

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const fetchBookings = async () => {
    try {
      const res = await API.get(`/booking/provider/${user.id}`)
      setBookings(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const checkStatus = async () => {
    try {
      const res = await API.get(`/provider/status/${user.id}`)
      setStatus(res.data.status)

      if (res.data.provider_id) {
        fetchRating(res.data.provider_id)
      }

    } catch (error) {
      console.error(error)
    }
  }

  const fetchRating = async (providerId) => {
    try {
      const res = await API.get(`/provider/ratings/${providerId}`)
      setRating(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/booking/update-status/${id}`, { status })
      fetchBookings()
    } catch (error) {
      console.error(error)
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

  const total = bookings.length
  const pending = bookings.filter(b => b.status === "PENDING").length
  const accepted = bookings.filter(b => b.status === "ACCEPTED").length
  const completed = bookings.filter(b => b.status === "COMPLETED").length

  // ⛔ Waiting
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

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-3xl font-bold mb-6">
          Provider Dashboard
        </h1>

        {/* ⭐ RATING */}
        <div className="bg-white p-6 rounded-xl shadow mb-10 flex justify-between">

          <div>
            <p className="text-gray-500">Your Rating</p>
            <h2 className="text-2xl font-bold text-yellow-500">
              ⭐ {rating.average || 0}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Reviews</p>
            <h2 className="text-2xl font-bold">
              {rating.count || 0}
            </h2>
          </div>

        </div>

        {/* REVIEWS */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/provider-reviews")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            View All Reviews
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

          <StatCard label="Total" value={total} />
          <StatCard label="Pending" value={pending} color="yellow" />
          <StatCard label="Accepted" value={accepted} color="green" />
          <StatCard label="Completed" value={completed} color="blue" />

        </div>

        {/* SECTIONS */}
        <Section title="Pending Requests" bookings={bookings.filter(b => b.status === "PENDING")} updateStatus={updateStatus} navigate={navigate} />
        <Section title="Active Jobs" bookings={bookings.filter(b => b.status === "ACCEPTED")} updateStatus={updateStatus} navigate={navigate} />
        <Section title="Completed Jobs" bookings={bookings.filter(b => b.status === "COMPLETED")} updateStatus={updateStatus} navigate={navigate} />

      </div>

    </div>
  )
}

/* 🔥 STAT CARD */
function StatCard({ label, value, color }) {

  const bg = {
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700"
  }

  return (
    <div className={`p-6 rounded-xl text-center ${bg[color] || "bg-white shadow"}`}>
      <p>{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  )
}

/* 🔥 SECTION */
function Section({ title, bookings, updateStatus, navigate }) {

  if (bookings.length === 0) return null

  return (

    <div className="mb-10">

      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="grid gap-6">

        {bookings.map((b) => (

          <div key={b.id} className="bg-white p-6 rounded-xl shadow">

            <div className="flex justify-between items-center mb-3">

              <p className="font-semibold">
                👤 {b.customer_name}
              </p>

              <span className={`px-3 py-1 rounded-full text-sm
                ${b.status === "PENDING" && "bg-yellow-100 text-yellow-700"}
                ${b.status === "ACCEPTED" && "bg-green-100 text-green-700"}
                ${b.status === "COMPLETED" && "bg-blue-100 text-blue-700"}
              `}>
                {b.status}
              </span>

            </div>

            <p>📞 {b.customer_phone}</p>
            <p>📍 {b.customer_address}, {b.customer_city}</p>
            <p>📅 {b.date} | ⏰ {b.time}</p>

            <div className="flex gap-3 mt-4 flex-wrap">

              {/* PENDING */}
              {b.status === "PENDING" && (
                <>
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
                </>
              )}

              {/* ACCEPTED */}
              {b.status === "ACCEPTED" && (
                <>
                  <button
                    onClick={() => updateStatus(b.id, "COMPLETED")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Complete
                  </button>

                  <a
                    href={`https://wa.me/91${b.customer_phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    WhatsApp
                  </a>

                  {/* 💬 CHAT BUTTON */}
                  <button
                    onClick={() => navigate(`/chat/${b.id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                  >
                    💬 Chat
                  </button>
                </>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}
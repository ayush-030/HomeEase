import { useEffect, useState } from "react"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function AdminDashboard() {

  const [providers, setProviders] = useState([])
  const [stats, setStats] = useState({})

  const fetchProviders = async () => {
    const res = await API.get("/admin/providers")
    setProviders(res.data)
  }

  const fetchStats = async () => {
    const res = await API.get("/admin/stats")
    setStats(res.data)
  }

  const approveProvider = async (id) => {
    await API.put(`/admin/approve-provider/${id}`)
    fetchProviders()
  }

  useEffect(() => {
    fetchProviders()
    fetchStats()
  }, [])

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-3xl font-bold mb-8">
          Admin Dashboard
        </h1>


        {/* STATS */}

        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.users}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">Providers</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.providers}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">Bookings</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.bookings}</p>
          </div>

        </div>


        {/* PROVIDERS */}

        <div className="grid gap-6">

          {providers.map((p) => (

            <div key={p.id} className="bg-white p-6 rounded-xl shadow">

              <p><strong>Provider ID:</strong> {p.id}</p>
              <p><strong>Bio:</strong> {p.bio}</p>
              <p><strong>Experience:</strong> {p.experience}</p>
              <p><strong>Status:</strong> {p.approved ? "Approved" : "Pending"}</p>

              {!p.approved && (

                <button
                  onClick={() => approveProvider(p.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                >
                  Approve Provider
                </button>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}
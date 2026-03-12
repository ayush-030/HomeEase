import { useEffect, useState } from "react"
import API from "../services/api"

export default function AdminDashboard() {

  const [providers, setProviders] = useState([])

  const fetchProviders = async () => {

    const res = await API.get("/admin/providers")
    setProviders(res.data)

  }

  const approveProvider = async (id) => {

    await API.put(`/admin/approve-provider/${id}`)
    fetchProviders()

  }

  useEffect(() => {
    fetchProviders()
  }, [])

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

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
  )
}
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import Navbar from "../components/Navbar"

export default function Chat() {

  const { bookingId } = useParams()

  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  // 🔄 Fetch messages (Polling)
  useEffect(() => {

    const fetchMessages = async () => {
      try {
        const res = await API.get(`/chat/${bookingId}`)
        setMessages(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchMessages()

    const interval = setInterval(fetchMessages, 3000)

    return () => clearInterval(interval)

  }, [bookingId])

  // 📤 Send message
  const sendMessage = async () => {

    if (!text.trim()) return

    try {

      await API.post("/chat/send", {
        booking_id: bookingId,
        sender_id: user.id,
        message: text
      })

      setText("")

    } catch (error) {
      console.error(error)
    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-2xl font-bold mb-6">Chat</h1>

        {/* MESSAGES */}
        <div className="bg-white p-4 rounded-xl h-[400px] overflow-y-auto mb-4 shadow">

          {messages.length === 0 ? (
            <p className="text-gray-500">No messages yet</p>
          ) : (

            messages.map((msg) => (

              <div
                key={msg.id}
                className={`mb-3 ${
                  msg.sender_id === user.id ? "text-right" : "text-left"
                }`}
              >

                <p className="text-sm text-gray-500">
                  {msg.sender_name}
                </p>

                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender_id === user.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.message}
                </div>

              </div>

            ))

          )}

        </div>

        {/* INPUT */}
        <div className="flex gap-3">

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border p-3 rounded-lg"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  )
}
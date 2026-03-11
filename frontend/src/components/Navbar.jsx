export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          HomeEase
        </h1>

        <div className="flex gap-6">

          <button className="text-gray-600 hover:text-blue-600">
            Services
          </button>

          <button className="text-gray-600 hover:text-blue-600">
            Providers
          </button>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Login
          </button>

        </div>

      </div>

    </nav>
  )
}
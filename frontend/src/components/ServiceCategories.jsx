import { FaBolt, FaBroom, FaTools, FaWrench } from "react-icons/fa"

export default function ServiceCategories({ setCategory }) {

  const services = [
    { id: 1, name: "Plumbing", icon: <FaWrench size={28} /> },
    { id: 2, name: "Electrical", icon: <FaBolt size={28} /> },
    { id: 3, name: "Cleaning", icon: <FaBroom size={28} /> },
    { id: 4, name: "Carpentry", icon: <FaTools size={28} /> }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

      {services.map((service) => (

        <div
          key={service.id}
          onClick={() => setCategory(service.id)}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition text-center"
        >

          <div className="flex justify-center text-blue-600 mb-3">
            {service.icon}
          </div>

          <h3 className="font-semibold text-gray-700">
            {service.name}
          </h3>

        </div>

      ))}

    </div>
  )
}
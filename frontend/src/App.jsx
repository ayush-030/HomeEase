import { BrowserRouter, Routes, Route } from "react-router-dom"
import CustomerDashboard from "./pages/CustomerDashboard"
import ProviderDashboard from "./pages/ProviderDashboard"

function App() {
  return (
    <BrowserRouter>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<CustomerDashboard />} />
          <Route path="/provider" element={<ProviderDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
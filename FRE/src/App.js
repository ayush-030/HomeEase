import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import "./App.css";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;















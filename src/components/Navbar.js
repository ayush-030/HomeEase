import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          Home<span>Ease</span>
        </Link>

        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#how">How It Works</a>
          <a href="#benefits">Benefits</a>
          <button className="login-btn">Login</button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
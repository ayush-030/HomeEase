import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

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

          {/* Dashboard Dropdown */}
          <div className="dropdown">

            <button
              className="dropbtn"
              onClick={toggleDropdown}
            >
              Dashboards ▾
            </button>

            {openDropdown && (
              <div className="dropdown-content">

                <Link to="/customer-dashboard" onClick={closeDropdown}>
                  Customer Dashboard
                </Link>

                <Link to="/provider-dashboard" onClick={closeDropdown}>
                  Provider Dashboard
                </Link>

                <Link to="/admin-dashboard" onClick={closeDropdown}>
                  Admin Dashboard
                </Link>

              </div>
            )}

          </div>

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;








// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <Link to="/" className="logo">
//           Home<span>Ease</span>
//         </Link>

//         <div className="nav-links">
//           <a href="#services">Services</a>
//           <a href="#how">How It Works</a>
//           <a href="#benefits">Benefits</a>

//         <div className="dashboard-menu">
//           <span className="dashboard-title">Dashboards ▾</span>
//           <div className="dashboard-dropdown">
//             < Link to="/customer-dashboard">
//               Customer Dashboard
//             </Link>
//             <Link to="/provider-dashboard">
//               Provider Dashboard
//             </Link>
//             <Link to="/admin-dashboard">
//               Admin Dashboard
//             </Link>
//           </div>
//         </div>

//           <Link to="/login">
//              <button className="login-btn">Login</button>
//           </Link>
//         </div>

//       </div>
//     </nav>
//   );
// }

// export default Navbar;
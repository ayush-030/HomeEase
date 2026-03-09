import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="logo">
       Home<span>Ease</span>
      </Link>
    {/* <h2 className="logo">HomeEase</h2> */}
{/*  */}
      <nav className="menu">

        <Link to="/customer-dashboard">Dashboard</Link>
        <Link to="/book-service">Book Service</Link>
        <Link to="/my-bookings">My Bookings</Link>
        <Link to="/profile">Profile</Link>

      </nav>

    </div>
  );
}

export default Sidebar;
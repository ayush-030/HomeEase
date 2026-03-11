import { NavLink , Link} from "react-router-dom";

function Sidebar({ role }) {

  let menu;
  let logoRedirect = "/";  

  if (role === "customer") {
    logoRedirect = "/customer-dashboard";
    menu = (
      <>
        <NavLink className="sidebar-item dashboard-link" to="/customer-dashboard">
          Dashboard
        </NavLink>

        <NavLink className="sidebar-item bookservice-link" to="/book-service">
          Book Service
        </NavLink>

        <NavLink className="sidebar-item bookings-link" to="/my-bookings">
          My Bookings
        </NavLink>
      </>
    );
  }

  else if (role === "provider") {
    logoRedirect = "/provider-dashboard"
    menu = (
      <>
        <NavLink className="sidebar-item dashboard-link" to="/provider-dashboard">
          Dashboard
        </NavLink>

        <NavLink className="sidebar-item requests-link" to="/service-requests">
          Service Requests
        </NavLink>

        <NavLink className="sidebar-item jobs-link" to="/active-jobs">
          Active Jobs
        </NavLink>

        {/* <NavLink className="sidebar-item earnings-link" to="/earnings"> */}
          {/* Earnings */}
        {/* </NavLink> */}
      </>
    );
  }

  return (
    <div className="sidebar">

      <Link to={logoRedirect} className="logo">
       Home<span>Ease</span>
      </Link>

      {/* <h2 className="sidebar-title">HomeEase</h2> */}

      <div className="sidebar-menu">
        {menu}
      </div>

    </div>
  );
}

export default Sidebar;
import { NavLink , Link} from "react-router-dom";

function Sidebar({ role }) {

  let menu;

  if (role === "customer") {
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

      <Link to="/" className="logo">
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

// import { Link } from "react-router-dom";
// 
// function Sidebar({ role }) {
// 
  // let menu;
// 
  // if (role === "customer") {
    // menu = (
      // <>
        {/* <Link to="/customer-dashboard">Dashboard</Link> */}
        {/* <Link to="/book-service">Book Service</Link> */}
        {/* <Link to="/my-bookings">My Bookings</Link> */}
      {/* </> */}
    // );
  // }
// 
  // else if (role === "provider") {
    // menu = (
      // <>
        {/* <Link to="/provider-dashboard">Dashboard</Link> */}
        {/* <Link to="/service-requests">Service Requests</Link> */}
        {/* <Link to="/active-jobs">Active Jobs</Link> */}
      {/* </> */}
    // );
  // }
// 
  // else if (role === "admin") {
    // menu = (
      // <>
        {/* <Link to="/admin-dashboard">Dashboard</Link> */}
        {/* <Link to="/manage-users">Manage Users</Link> */}
        {/* <Link to="/manage-providers">Manage Providers</Link> */}
        {/* <Link to="/manage-bookings">Manage Bookings</Link> */}
      {/* </> */}
    // );
  // }
// 
  // return (
// 
    // <div className="sidebar">
{/*  */}
      {/* <h2>HomeEase</h2> */}
{/*  */}
      {/* {menu} */}
{/*  */}
    {/* </div> */}
// 
  // );
// 
// }
// 
// export default Sidebar;
// 
// 
//-------------------------------------------------------------------------------------------------------------
// import { Link } from "react-router-dom";

// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <Link to="/" className="logo">
//        Home<span>Ease</span>
//       </Link>
//     {/* <h2 className="logo">HomeEase</h2> */}

//       <nav className="menu">

//         <Link to="/customer-dashboard">Dashboard</Link>
//         <Link to="/book-service">Book Service</Link>
//         <Link to="/my-bookings">My Bookings</Link>
//         <Link to="/profile">Profile</Link>

//       </nav>

//     </div>
//   );
// }

// export default Sidebar;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const [openRole, setOpenRole] = useState(false);   // NEW STATE FOR DROPDOWN

  /* email validation with allowed domains */
  const validateEmail = (email) => {

    const cleanEmail = email.trim().toLowerCase();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      return "Please enter a valid email address";
    }

    const domain = cleanEmail.split("@")[1];

    if (
      domain !== "gmail.com" &&
      domain !== "outlook.com" &&
      domain !== "yahoo.com" &&
      domain !== "homeease.com"
    ) {
      return "Only verified email providers are allowed";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!role) {
      setError("Please select your role");
      return;
    }

    setError("");

    if (isLogin) {

      if (role === "customer") {
        navigate("/customer-dashboard");
      }

      else if (role === "provider") {
        navigate("/provider-dashboard");
      }

      else if (role === "admin") {
        navigate("/admin-dashboard");
      }

    } else {
      alert("Registration functionality will be connected to Flask + Supabase later");
    }

  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>{isLogin ? "Welcome back" : "Create Account"}</h2>

        <p className="login-subtitle">
          {isLogin ? "Sign in to HomeEase" : "Register for HomeEase"}
        </p>

        <form onSubmit={handleSubmit} className="login-form">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          {/* Custom Role Dropdown */}

          <div className="role-dropdown">

            <div
              className="role-selected"
              onClick={() => setOpenRole(!openRole)}
            >
              {role ? role : "Select Role"} ▾
            </div>

            {openRole && (
              <div className="role-options">

                <div onClick={() => {setRole("customer"); setOpenRole(false);}}>
                  Customer
                </div>

                <div onClick={() => {setRole("provider"); setOpenRole(false);}}>
                  Service Provider
                </div>

                <div onClick={() => {setRole("admin"); setOpenRole(false);}}>
                  Admin
                </div>

              </div>
            )}

          </div>

          {error && (
            <p className="error-text">{error}</p>
          )}

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <p className="toggle-text">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            className="toggle-link"
            onClick={()=>setIsLogin(!isLogin)}
          >
            {isLogin ? " Register here" : " Login here"}
          </span>

        </p>

      </div>

    </div>
  );
}

export default LoginPage;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// 
// function LoginPage() {
// 
  // const navigate = useNavigate();
// 
  // const [isLogin, setIsLogin] = useState(true);
// 
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  // const [error, setError] = useState("");
// 
  // /* email validation with allowed domains */
  // const validateEmail = (email) => {
// 
    // const cleanEmail = email.trim().toLowerCase();
// 
    // const emailPattern =
      // /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 
    // if (!emailPattern.test(cleanEmail)) {
      // return "Please enter a valid email address";
    // }
// 
    // const domain = cleanEmail.split("@")[1];
// 
    // if (
      // domain !== "gmail.com" &&
      // domain !== "outlook.com" &&
      // domain !== "yahoo.com" &&
      // domain !== "homeease.com"
    // ) {
      // return "Only verified email providers are allowed";
    // }
// 
    // return null;
  // };
// 
  // const handleSubmit = (e) => {
    // e.preventDefault();
// 
    // const emailError = validateEmail(email);
// 
    // if (emailError) {
      // setError(emailError);
      // return;
    // }
// 
    // if (password.length < 6) {
      // setError("Password must be at least 6 characters");
      // return;
    // }
// 
    // if (!role) {
      // setError("Please select your role");
      // return;
    // }
// 
    // setError("");
// 
    // /* simulate login redirect based on role */
// 
    // if (isLogin) {
// 
      // if (role === "customer") {
        // navigate("/customer-dashboard");
      // }
// 
      // else if (role === "provider") {
        // navigate("/provider-dashboard");
      // }
// 
      // else if (role === "admin") {
        // navigate("/admin-dashboard");
      // }
// 
    // } else {
      // alert("Registration functionality will be connected to Flask + Supabase later");
    // }
// 
  // };
// 
  // return (
    // <div className="login-container">
{/*  */}
      {/* <div className="login-card"> */}
{/*  */}
        {/* <h2>{isLogin ? "Welcome back" : "Create Account"}</h2> */}
{/*  */}
        {/* <p className="login-subtitle"> */}
          {/* {isLogin ? "Sign in to HomeEase" : "Register for HomeEase"} */}
        {/* </p> */}
{/*  */}
        {/* <form onSubmit={handleSubmit} className="login-form"> */}
{/*  */}
          {/* <input */}
            // type="email"
            // placeholder="Enter your email"
            // value={email}
            // onChange={(e)=>setEmail(e.target.value)}
            // required
          // />
{/*  */}
          {/* <input */}
            // type="password"
            // placeholder="Enter password"
            // value={password}
            // onChange={(e)=>setPassword(e.target.value)}
            // required
          // />
{/*  */}
          // Role Selection
{/*  */}
{/*  */}
          {/* <select */}
            // value={role}
            // onChange={(e)=>setRole(e.target.value)}
            // required
          // >
            {/* <option value="">Select Role</option> */}
            {/* <option value="customer">Customer</option> */}
            {/* <option value="provider">Service Provider</option> */}
            {/* <option value="admin">Admin</option> */}
          {/* </select> */}
{/*  */}
          {/* {error && ( */}
            // <p className="error-text">{error}</p>
          // )}
{/*  */}
          {/* <button type="submit"> */}
            {/* {isLogin ? "Login" : "Register"} */}
          {/* </button> */}
{/*  */}
        {/* </form> */}
{/*  */}
        {/* <p className="toggle-text"> */}
{/*  */}
          {/* {isLogin */}
            // ? "Don't have an account?"
            // : "Already have an account?"}
{/*  */}
          {/* <span */}
            // className="toggle-link"
            // onClick={()=>setIsLogin(!isLogin)}
          // >
            {/* {isLogin ? " Register here" : " Login here"} */}
          {/* </span> */}
{/*  */}
        {/* </p> */}
{/*  */}
      {/* </div> */}
{/*  */}
    {/* </div> */}
  // );
// }
// 
// export default LoginPage;
// 




















// import { useState } from "react";

// function LoginPage() {

//   const [isLogin, setIsLogin] = useState(true);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   /* email validation with allowed domains */
//   const validateEmail = (email) => {

//     /* remove spaces and convert to lowercase */
//     const cleanEmail = email.trim().toLowerCase();

//     /* check basic email format */
//     const emailPattern =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailPattern.test(cleanEmail)) {
//       return "Please enter a valid email address";
//     }

//     /* extract domain */
//     const domain = cleanEmail.split("@")[1];

//     /* allow only specific domains */
//     if (
//       domain !== "gmail.com" &&
//       domain !== "outlook.com" &&
//       domain !== "yahoo.com" &&
//       domain !== "homeease.com"
//     ) {
//       return "Only verified email providers are allowed";
//     }

//     return null;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const emailError = validateEmail(email);

//     if (emailError) {
//       setError(emailError);
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     setError("");

//     if (isLogin) {
//       alert("Login functionality will be connected to Flask + Supabase later");
//     } else {
//       alert("Registration functionality will be connected to Flask + Supabase later");
//     }
//   };

//   return (
//     <div className="login-container">

//       <div className="login-card">

//         <h2>{isLogin ? "Welcome back" : "Create Account"}</h2>
//         <p className="login-subtitle">
//           {isLogin ? "Sign in to HomeEase" : "Register for HomeEase"}
//         </p>

//         <form onSubmit={handleSubmit} className="login-form">

//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e)=>setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e)=>setPassword(e.target.value)}
//             required
//           />

//           {error && (
//             <p className="error-text">{error}</p>
//           )}

//           <button type="submit">
//             {isLogin ? "Login" : "Register"}
//           </button>

//         </form>

//         <p className="toggle-text">

//           {isLogin
//             ? "Don't have an account?"
//             : "Already have an account?"}

//           <span
//             className="toggle-link"
//             onClick={()=>setIsLogin(!isLogin)}
//           >
//             {isLogin ? " Register here" : " Login here"}
//           </span>

//         </p>

//       </div>

//     </div>
//   );
// }

// export default LoginPage;
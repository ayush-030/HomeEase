import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Service/supabaseClient";

function LoginPage() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");

  const [openRole, setOpenRole] = useState(false);

  const validateEmail = (email) => {
    const cleanEmail = email.trim().toLowerCase();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const handleSubmit = async (e) => {
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

    // ✅ NEW VALIDATION
    if (!isLogin && role === "provider" && (!service || !experience)) {
      setError("Please fill provider details");
      return;
    }

    setError("");

    // ================= LOGIN =================
    if (isLogin) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !data) {
        setError("Invalid email or password");
        return;
      }

      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", data.role);

      if (data.role === "customer") {
        navigate("/customer-dashboard");
      } else if (data.role === "provider") {
        navigate("/provider-dashboard");
      } else if (data.role === "admin") {
        navigate("/admin-dashboard");
      }

    }

    // ================= SIGNUP =================
    else {
      const { error } = await supabase
        .from("users")
        .insert([
          { email: email, password: password, role: role }
        ]);

      if (error) {
        setError(error.message);
        return;
      }

      // ✅ CREATE PROVIDER PROFILE
      if (role === "provider") {
        const { error: providerError } = await supabase
          .from("providers")
          .insert([
            {
              email: email.toLowerCase(),
              name: email.split("@")[0],
              service_type: service,   // ✅ dynamic
              experience: experience   // ✅ dynamic
            }
          ]);

        if (providerError) {
          console.error(providerError);
          setError("Error creating provider profile");
          return;
        }
      }

      alert("Account created successfully!");
      setIsLogin(true);
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

          {/* ROLE DROPDOWN */}
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

          {/* ✅ PROVIDER FIELDS */}
          {!isLogin && role === "provider" && (
            <>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
              >
                <option value="">Select Service</option>
                <option value="Plumbing">Plumbing</option>
                <option value="AC Repair">AC Repair</option>
                <option value="Cleaning">Cleaning</option>
              </select>

              <input
                type="text"
                placeholder="Experience (e.g. 2 years)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </>
          )}

          {error && <p className="error-text">{error}</p>}

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
// import { supabase } from "../Service/supabaseClient";

// function LoginPage() {

//   const navigate = useNavigate();

//   const [isLogin, setIsLogin] = useState(true);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState("");

//   const [service, setService] = useState("");
//   const [experience, setExperience] = useState("");

//   const [openRole, setOpenRole] = useState(false);  

//   const validateEmail = (email) => {

//     const cleanEmail = email.trim().toLowerCase();

//     const emailPattern =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailPattern.test(cleanEmail)) {
//       return "Please enter a valid email address";
//     }

//     const domain = cleanEmail.split("@")[1];

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

//   const handleSubmit = async (e) => {
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

//     if (!role) {
//       setError("Please select your role");
//       return;
//     }
//     if (!isLogin && role === "provider" && (!service || !experience)) {
//       setError("Please fill provider details");
//       return;
//     }
//     setError("");

//     if (isLogin) {
//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("email", email)
//         .eq("password", password)
//         .single();

//       if (error || !data) {
//         setError("Invalid email or password");
//         return;
//       }

//       localStorage.setItem("userEmail", email);
//       localStorage.setItem("userRole", data.role);

//       if (data.role === "customer") {
//         navigate("/customer-dashboard");
//       }
//       else if (data.role === "provider") {
//         navigate("/provider-dashboard");
//       }
//       else if (data.role === "admin") {
//         navigate("/admin-dashboard");
//       }

//     }
//     else {
//       const { error } = await supabase
//         .from("users")
//         .insert([
//           { email: email, password: password, role: role }
//         ]);

//       if (error) {
//         setError(error.message);
//         return
//       } 
//         if (role === "provider") {
//           const {error: ProviderError } = await supabase
//             .from("providers")
//             .insert([
//               {
//                 email: email.toLowerCase(),
//                 name: email.split("@")[0],
//                 service_type: service, 
//                 experience: experience
//               }
//             ]);
//           if (ProviderError) {
//             console.error(ProviderError);
//             alert("Error creating provider profile");
//             return;
//           }
//         }
//         alert("Account created successfullly!");
//         setIsLogin(true);
//       }
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
//           {/* Custom Role Dropdown */}

//           <div className="role-dropdown">

//             <div
//               className="role-selected"
//               onClick={() => setOpenRole(!openRole)}
//             >
//               {role ? role : "Select Role"} ▾
//             </div>

//             {openRole && (
//               <div className="role-options">

//                 <div onClick={() => {setRole("customer"); setOpenRole(false);}}>
//                   Customer
//                 </div>

//                 <div onClick={() => {setRole("provider"); setOpenRole(false);}}>
//                   Service Provider
//                 </div>

//                 <div onClick={() => {setRole("admin"); setOpenRole(false);}}>
//                   Admin
//                 </div>

//               </div>
//             )}
//           </div>

//           {!isLogin && role === "provider" && (
//             <>
//               <select
//                 value={service}
//                 onChange={(e) => setService(e.target.value)}
//                 required
//               >
//                 <option value="">Select Service</option>
//                 <option value="Plumbing">Plumbing</option>
//                 <option value="AC Repair">AC Repair</option>
//                 <option value="Cleaning">Cleaning</option>
//               </select>

//               <input
//                 type="text"
//                 placeholder="Experience (e.g. 2 years)"
//                 value={experience}
//                 onChange={(e) => setExperience(e.target.value)}
//                 required
//               />
//             </>
//           )}

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


// export default LoginPage;

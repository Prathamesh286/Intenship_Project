// import axios from 'axios';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
//       {/* <div className="flex justify-center items-center h-screen bg-gray-100"> */}
//         <div className="border-2 border-orange-500 shadow-lg p-6 w-100 bg-black rounded-lg h-[450px] w-[400px]">
//           {/* <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2> */}
//           {/* <div className='flex justify-center mb-6 mt-7'> */}
//           <h2 className="text-3xl font-bold mb-6 mt-4 text-white text-center">Login</h2>
//           {/* </div> */}
//           <form onSubmit={handleSubmit} >
//             <div className="mb-6">
//               <label className="text-xl block text-gray-100 font-semibold mb-2">Email</label>
//               <input
//                 type="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full py-2 px-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent "
//                 placeholder="Enter Email"
//               />
//             </div>

//             <div className="mb-6">
//               <label className="text-xl block text-gray font-semibold mb-2">Password</label>
//               <input
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full py-2 px-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mt-2"
//                 placeholder="Enter Password"
//               />
//             </div>

//             <div className="mb-4">
//               <button
//                 type="submit"
//                 className="text-xl w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
//               >
//                 Login
//               </button>
//               <p className="text-center mt-4 text-gray">
//                 Don't have an account?{' '}
//                 <Link to="/register" className="text-bold text-blue-500 hover:underline font-medium">
//                   Register
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       {/* </div> */}
//     </div>
//       );
// }

// export default Login;

// src/pages/Login.jsx

import axios from "axios";
import { useState } from "react";                    // React 19 – no need to import React itself
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";     // make sure this file exists

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();               // your context function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // assuming your backend returns { token, user: { role, ... } }
      login(res.data.token, res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      setError(message);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="border-2 border-orange-500 shadow-2xl rounded-xl bg-gray-900/80 backdrop-blur-sm p-8 max-w-md w-full">
        <h2 className="text-4xl font-bold text-center mb-8 text-orange-500">
          Login
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/80 border border-red-600 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl rounded-lg transition transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-400 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
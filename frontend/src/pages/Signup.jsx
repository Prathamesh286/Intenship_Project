// import axios from 'axios';
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom' 

// function Signup () {

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {

//       const response = await axios('http://localhost:5000/api/auth/register', {
       
//         name,
//         email,
//         password

//       })
//       console.log(response)

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">

//         <div className='border-2 border-orange-500 shadow-lg p-6 w-100 bg-black rounded-lg h-[550px] w-[400px]'>
//           <h2 className='text-3xl font-bold mb-6 mt-3 text-white text-center'>Sign up</h2>
//           <form onSubmit={handleSubmit}>
//             <div className='mb-4'>
//               <label className='text-xl block text-gray font-semibold mb-2'>Name</label>
//               <input type="text"
//                 onChange={(e) => setName(e.target.value)}
//                 className='w-full py-2 px-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mt-2' placeholder='Enter Username' />

//             </div>

//             <div className='mb-4'>
//               <label className='text-xl block text-gray font-semibold mb-2'>Email</label>
//               <input type="text"
//                 onChange={(e) => setEmail(e.target.value)}
//                 className='w-full py-2 px-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mt-2' placeholder='Enter email' />

//             </div>

//             <div className='mb-4'>
//               <label className='text-xl block text-gray font-semibold mb-2'>Password</label>
//               <input type="text"
//                 onChange={(e) => setPassword(e.target.value)}
//                 className='w-full py-2 px-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mt-2' placeholder='Enter password' />

//             </div>

//             <div className='mb-4 mt-7'>
//               <button type='submit' className='text-center w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded'>Sign up</button>

//               <p className='text-center mt-4 text-gray'>Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></p>
//             </div>

//           </form>

//         </div>

//       {/* </div> */}
//     </div>
//       )
// }

// export default Signup

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ← this is important

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // ← gets the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Register the user
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      // 2. Automatically log the user in after successful signup
      login(res.data.token, res.data.user);

      // 3. Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="border-2 border-orange-500 shadow-lg p-8 rounded-lg w-full max-w-md bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-8">Create Account</h2>

        {error && (
          <div className="bg-red-900 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold py-4 rounded-lg text-xl transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline font-bold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

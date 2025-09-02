// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login({ setToken  }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       localStorage.setItem("token", data.token);
//       setToken(data.token); // 🔑 update App state
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
//         <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {error && <p className="text-red-600 text-sm">{error}</p>}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="you@example.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="••••••••"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-600">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login({ setToken }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Login failed")
      }

      localStorage.setItem("token", data.token)
      setToken(data.token)
      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Login</h2>
          <p className="text-gray-500 text-sm">Access your account to tailor your resume</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

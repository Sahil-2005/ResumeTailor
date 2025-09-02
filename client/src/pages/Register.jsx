import React, { useState } from "react";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful! Please login.");
      window.location.href = "/login"; // Navigate to login page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-gray-600">
            Join ResumeTailor to tailor your resume with AI
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}
          <div className="grid gap-2">
            <label htmlFor="fullName" className="font-medium">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="John Doe"
              autoComplete="name"
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="new-password"
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

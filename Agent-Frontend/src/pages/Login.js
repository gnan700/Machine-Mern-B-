import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = "https://machine-mern-b-zbgj.onrender.com";
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axios.post(
      `${API_URL}/api/agents/login`, // include backend URL + login endpoint
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    // Save token
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  } catch (error) {
    setError(error.response?.data?.error || "Login failed. Please try again.");
    console.error("Login error:", error.response?.data || error.message);
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login

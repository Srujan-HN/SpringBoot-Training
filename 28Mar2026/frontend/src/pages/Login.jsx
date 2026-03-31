import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/todoService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      localStorage.setItem("token", response.data.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Username</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          No account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

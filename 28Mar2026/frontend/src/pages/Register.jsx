import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/todoService";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h1>
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
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

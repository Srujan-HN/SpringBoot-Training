import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TodoList from "./pages/TodoList";
import CreateTodo from "./pages/CreateTodo";
import EditTodo from "./pages/EditTodo";
import Login from "./pages/Login";
import Register from "./pages/Register";

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex gap-4 items-center shadow">
      {token ? (
        <>
          <Link to="/" className="hover:underline font-medium">Home</Link>
          <Link to="/create" className="hover:underline font-medium">Create</Link>
          <button onClick={handleLogout} className="ml-auto bg-white text-blue-600 px-3 py-1 rounded font-medium hover:bg-blue-50">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="hover:underline font-medium">Login</Link>
          <Link to="/register" className="hover:underline font-medium">Register</Link>
        </>
      )}
    </nav>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><TodoList /></PrivateRoute>} />
      <Route path="/create" element={<PrivateRoute><CreateTodo /></PrivateRoute>} />
      <Route path="/edit/:id" element={<PrivateRoute><EditTodo /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-4xl mx-auto p-6">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

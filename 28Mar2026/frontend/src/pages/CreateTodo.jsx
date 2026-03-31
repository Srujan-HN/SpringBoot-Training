import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../services/todoService";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTodo({ title, description });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Todo</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Title</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Description</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3 mt-2">
          <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded font-medium hover:bg-blue-700 transition">
            Save
          </button>
          <button type="button" onClick={() => navigate("/")} className="bg-gray-200 text-gray-700 py-2 px-6 rounded font-medium hover:bg-gray-300 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

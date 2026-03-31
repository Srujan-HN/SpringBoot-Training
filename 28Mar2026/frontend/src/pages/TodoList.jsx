import { useEffect, useState } from "react";
import { getAllTodos, deleteTodo } from "../services/todoService";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const response = await getAllTodos();
      setTodos(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo List</h1>

      {todos.length === 0 && (
        <p className="text-gray-500">No todos found. Create one!</p>
      )}

      {todos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, i) => (
                <tr key={todo.id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-3 text-gray-700">{i + 1}</td>
                  <td className="px-4 py-3 text-gray-700">{todo.title}</td>
                  <td className="px-4 py-3 text-gray-700">{todo.description}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/edit/${todo.id}`)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

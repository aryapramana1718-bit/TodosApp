import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    await api.post("/todos", { title, description });
    setTitle("");
    setDescription("");
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">My Todos</h2>

        <input
          className="w-full mb-2 px-3 py-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full mb-3 px-3 py-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addTodo}
          className="w-full bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-700"
        >
          Add Todo
        </button>

        <ul className="space-y-2">
          {todos.map((t) => (
            <li key={t.id} className="flex justify-between border p-2 rounded">
              <span>
                <b>{t.title}</b> — {t.description}
              </span>
              <button
                onClick={() => deleteTodo(t.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

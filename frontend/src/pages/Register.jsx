import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/users/register", form);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <input
          className="w-full mb-3 px-4 py-2 border rounded"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <input
          className="w-full mb-3 px-4 py-2 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, useAuth } from "../App";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState("customer");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });
      const data = res.ok ? await res.json() : null;

      if (data?.token) {
        login({ ...data.user, token: data.token, role: data.user.role || role });
        nav("/", { replace: true });
        return;
      }
      login({
        id: 1,
        name: role === "provider" ? "Service Provider" : "Customer",
        email: form.email,
        role,
        token: "demo-token",
      });
      nav("/", { replace: true });
    } catch {
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={submit} className="card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-secondary">Welcome back</h1>

        <div className="flex mb-4 rounded-xl overflow-hidden border">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`w-1/2 px-4 py-2 ${role === "customer" ? "bg-primary text-white" : "bg-white"}`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("provider")}
            className={`w-1/2 px-4 py-2 ${role === "provider" ? "bg-primary text-white" : "bg-white"}`}
          >
            Provider
          </button>
        </div>

        <input
          className="input mb-3"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="input mb-1"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button className="btn btn-primary w-full mt-2">Login</button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}

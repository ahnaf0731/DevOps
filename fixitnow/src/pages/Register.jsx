import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, useAuth } from "../App";

export default function Register() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState("customer");
  const [form, setForm] = useState({ name: "", email: "", password: "", contactNo: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });
      const data = res.ok ? await res.json() : null;

      if (data?.token) {
        login({ ...data.user, token: data.token });
        nav("/", { replace: true });
        return;
      }
     
      login({
        id: 1,
        name: form.name,
        email: form.email,
        role,
        token: "demo-token",
      });
      nav("/", { replace: true });
    } catch {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={submit} className="card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-secondary">Create your account</h1>

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
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="input mb-3"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="input mb-3"
          placeholder="Contact Number"
          value={form.contactNo}
          onChange={(e) => setForm({ ...form, contactNo: e.target.value })}
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

        <button className="btn btn-primary w-full mt-2">Create Account</button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

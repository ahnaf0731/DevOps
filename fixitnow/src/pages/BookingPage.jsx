import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL, useAuth } from "../App";

export default function BookingPage() {
  const loc = useLocation();
  const nav = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState(loc.state?.service || null);
  const [form, setForm] = useState({
    date: "",
    time: "",
    addressLine1: "",
    city: "",
    district: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!service && loc.state?.serviceId) {
      fetch(`${API_BASE_URL}/services/${loc.state.serviceId}`)
        .then((r) => r.json())
        .then((s) => setService(s))
        .catch(() => {});
    }
  }, [loc.state, service]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {hrf
      const payload = {
        bookingDate: form.date,
        status: "PENDING",
        serId: service?.id,
        customerId: user?.id || 1,
        details: form.description,
        address: {
          line1: form.addressLine1,
          city: form.city,
          district: form.district,
          country: "Sri Lanka",
          postalCode: "00000",
        },
      };

      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token ? `Bearer ${user.token}` : undefined,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create booking");

      nav("/dashboard", { replace: true });
    } catch (err) {
      nav("/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Confirm Your Booking</h1>
        {service && (
          <p className="text-gray-600 mt-1">
            Service: <span className="font-medium">{service.title}</span> • LKR{" "}
            {Number(service.price ?? 0).toLocaleString()}
          </p>
        )}

        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submit}>
          <div>
            <label className="text-sm text-gray-600">Date</label>
            <input
              type="date"
              required
              className="input mt-1"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Time</label>
            <input
              type="time"
              required
              className="input mt-1"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Address Line 1</label>
            <input
              required
              className="input mt-1"
              placeholder="No. 12, Main Street"
              value={form.addressLine1}
              onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">City</label>
            <input
              required
              className="input mt-1"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">District</label>
            <input
              required
              className="input mt-1"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Additional details</label>
            <textarea
              rows={4}
              className="input mt-1"
              placeholder="Describe the issue or request…"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={loading}
              className="btn btn-primary disabled:opacity-60"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

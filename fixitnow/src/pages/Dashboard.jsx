import { useEffect, useState } from "react";
import { API_BASE_URL, useAuth } from "../App";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`${API_BASE_URL}/bookings/me`, {
          headers: { Authorization: user?.token ? `Bearer ${user.token}` : undefined },
        });
        if (!r.ok) throw new Error();
        const data = await r.json();
        setBookings(data);
      } catch {
        setBookings([
          { bookId: 101, serviceTitle: "Plumbing", status: "PENDING", bookingDate: "2025-08-22" },
          
        ]);
      }

      if (user?.role === "provider") {
        try {
          const rs = await fetch(`${API_BASE_URL}/services/provider/${user.id}`);
          if (!rs.ok) throw new Error();
          setServices(await rs.json());
        } catch {
          setServices([{ id: 1, title: "Electrical Inspection", price: 2500 }]);
        }
      }
    };
    load();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link to="/profile" className="btn btn-primary">Manage Profile</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="card p-6">
          <h2 className="font-semibold mb-3">My Bookings</h2>
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.bookId} className="border rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{b.serviceTitle ?? b.service?.title ?? "Service"}</p>
                  <p className="text-gray-500 text-sm">{b.bookingDate}</p>
                </div>
                <span
                  className={`badge ${
                    (b.status ?? "").toUpperCase() === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            ))}
            {!bookings.length && <p className="text-gray-500 text-sm">No bookings yet.</p>}
          </div>
        </section>

        <section className="card p-6">
          <h2 className="font-semibold mb-3">
            {user?.role === "provider" ? "My Services" : "Profile"}
          </h2>

          {user?.role === "provider" ? (
            <div className="space-y-3">
              {services.map((s) => (
                <div key={s.id ?? s.serId} className="border rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{s.title}</p>
                    <p className="text-gray-500 text-sm">LKR {Number(s.price ?? 0).toLocaleString()}</p>
                  </div>
                  <button className="text-secondary hover:underline text-sm">Edit</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">Name:</span> {user?.name ?? "Customer"}</p>
              <p><span className="text-gray-500">Email:</span> {user?.email ?? "-"}</p>
              <p><span className="text-gray-500">Role:</span> {user?.role ?? "-"}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

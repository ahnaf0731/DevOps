import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../App";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    if (pathname !== "/") nav("/");
  };

  const link = (to, label) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg hover:bg-white/10 ${
        pathname === to ? "bg-white/10 text-white" : "text-white/90"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-40 bg-secondary text-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-primary">Fix</span>
          <span className="text-white">It</span>
          <span className="text-accent">Now</span>
        </Link>

        <div className="flex items-center gap-2">
          {link("/", "Home")}
          {link("/services", "Services")}
          {user && link("/dashboard", "Dashboard")}
          {user && link("/profile", "Profile")}

          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline ml-2 text-white border-white/40 hover:bg-white/10">
                Login
              </Link>
              <Link to="/register" className="btn ml-1 bg-primary text-white hover:opacity-90">
                Register
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-outline ml-2 text-white border-white/40 hover:bg-white/10">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* subtle color strip */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-secondary" />
    </nav>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import BookingPage from "./pages/BookingPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";


export const API_BASE_URL = process.env.VITE_API_BASE_URL || "/api";


const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, role, token }

  useEffect(() => {
    const saved = localStorage.getItem("fixit_auth");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (payload) => {
    setUser(payload);
    localStorage.setItem("fixit_auth", JSON.stringify(payload));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fixit_auth");
  };

  const value = useMemo(() => ({ user, login, logout, setUser }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/booking"
              element={
                <PrivateRoute>
                  <BookingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

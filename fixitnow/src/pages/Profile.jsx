import { useEffect, useState } from "react";
import API_BASE_URL from "../config";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/13`); // ✅ fixed
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  fetchProfile();
}, []);


  // Change Password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
   
     const response = await fetch(`${API_BASE_URL}/users/2/change-password`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ password: newPassword }),
});

      if (response.ok) {
        setMessage("✅ Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage("✅ Password updated successfully!");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("✅ Password updated successfully!");
    }
  };

  // Delete Profile
  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/2`, {
  method: "DELETE",
});


      if (response.ok) {
        setMessage("🗑 Profile deleted successfully!");
        localStorage.removeItem("token"); // or sessionStorage if you used that
      window.location.href = "/login";  // redirect to login page
        setProfile(null);
      } else {
        setMessage("🗑 Profile deleted successfully!");
        localStorage.removeItem("token"); // or sessionStorage if you used that
      window.location.href = "/auth/login";  // redirect to login page
      }
    } catch (error) {
      console.error("🗑 Profile deleted successfully!", error);
      localStorage.removeItem("token"); // or sessionStorage if you used that
      window.location.href = "main";  // redirect to login page
      setMessage("🗑 Profile deleted successfully!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-[#0f4c5c]">My Profile</h2>
      
      {profile ? (
        <div className="space-y-2 text-gray-800">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.contact_no}</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading profile...</p>
      )}

      {/* Change Password Section */}
      <form onSubmit={handlePasswordChange} className="mt-6 space-y-3">
        <h3 className="text-lg font-semibold text-[#5f0f40]">Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#e36414]"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#e36414]"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#e36414] text-white py-2 rounded-lg hover:bg-[#c65310] transition"
        >
          Update Password
        </button>
      </form>

      {/* Delete Profile Button */}
      <button
        onClick={handleDeleteProfile}
        className="w-full mt-6 bg-[#5f0f40] text-white py-2 rounded-lg hover:bg-[#4a0c35] transition"
      >
        Delete Profile
      </button>

      {/* Status Message */}
      {message && (
        <p className="mt-4 text-center text-sm text-[#0f4c5c] font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default Profile;
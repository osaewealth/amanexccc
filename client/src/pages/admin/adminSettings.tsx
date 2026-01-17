import { useEffect, useState } from "react";
import api from "@/services/api";

export default function AdminSettings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  useEffect(() => {
    api.get("/admin/profile/")
      .then(res => {
        setUsername(res.data.username);
        setEmail(res.data.email);
      })
      .catch(() => {
        setProfileError("Failed to load profile");
      });
  }, []);

  /* ---------------- PROFILE UPDATE ---------------- */
  const updateProfile = async () => {
    setProfileError("");
    setLoadingProfile(true);

    try {
      await api.put("/admin/profile/", { username, email });
      alert("Profile updated successfully");
    } catch (err: any) {
      setProfileError(
        err?.response?.data?.error || "Failed to update profile"
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  /* ---------------- PASSWORD CHANGE ---------------- */
  const changePassword = async () => {
    setPasswordError("");

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("All password fields are required");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    setLoadingPassword(true);

    try {
      await api.post("/admin/change-password/", {
        current_password: currentPassword,
        new_password: newPassword,
      });

      alert("Password changed successfully. Please log in again.");

      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    } catch (err: any) {
      setPasswordError(
        err?.response?.data?.error ||
        "Failed to change password"
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="max-w-xl space-y-10">
      <h1 className="text-2xl font-bold">Admin Settings</h1>

      {/* -------- PROFILE -------- */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="font-semibold">Profile</h2>

        {profileError && (
          <p className="text-red-500 text-sm">{profileError}</p>
        )}

        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          className="input"
        />

        {/* <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="input"
        /> */}

        <button
          onClick={updateProfile}
          disabled={loadingProfile}
          className="btn-primary"
        >
          {loadingProfile ? "Saving..." : "Save Profile"}
        </button>
      </div>

      {/* -------- PASSWORD -------- */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="font-semibold">Change Password</h2>

        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          className="input"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="input"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={e => setConfirmNewPassword(e.target.value)}
          className="input"
        />

        <button
          onClick={changePassword}
          disabled={loadingPassword}
          className="btn-primary"
        >
          {loadingPassword ? "Changing..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
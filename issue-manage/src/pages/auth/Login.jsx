import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchWithAuth } from "../../api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const validate = () => {
    if (!form.email.includes("@")) return "Enter valid email";
    if (form.password.length < 6) return "Password must be 6+ chars";
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);

    try {
      const res = await fetchWithAuth("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      // 🔥 Role from where user came
      const selectedRole = location.state?.role || null;

      // 🔐 VALID EMAIL + PASSWORD PAIRS
      const validUsers = {
        "superadmin@resolvegrid.com": { password: "Superadmin@123!", role: "SUPERADMIN", path: "/superadmin" },
        "admin@resolvegrid.com": { password: "Admin@123!", role: "ADMIN", path: "/admin" },
        "agent@resolvegrid.com": { password: "Agent@123!", role: "AGENT", path: "/agent" },
        "manager@resolvegrid.com": { password: "Manager@123!", role: "MANAGER", path: "/manager" },
        "user@resolvegrid.com": { password: "User@123!", role: "USER", path: "/user" }
      };

      const user = validUsers[form.email];

      // ❌ INVALID EMAIL
      if (!user) {
        return alert("Invalid email");
      }

      // ❌ WRONG PASSWORD
      if (user.password !== form.password) {
        return alert("Wrong password");
      }

      // 🚫 ROLE RESTRICTION
      if (selectedRole && user.role !== selectedRole) {
        return alert(`Use ${selectedRole} email only`);
      }

      // ✅ SUCCESS LOGIN
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      localStorage.setItem("role", user.role);

      navigate(user.path);

    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORGOT PASSWORD (DUMMY) ================= */
  const handleReset = () => {
    if (!form.email.includes("@")) {
      return alert("Enter your email first");
    }
    if (newPassword.length < 6) {
      return alert("Password must be 6+ chars");
    }

    localStorage.setItem(`pwd_${form.email}`, newPassword);

    alert("Password updated ✅ (dummy)");
    setShowReset(false);
    setNewPassword("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        {!showReset ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              style={styles.input}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button style={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p
              style={{ ...styles.link, marginTop: 10, textAlign: "center" }}
              onClick={() => setShowReset(true)}
            >
              Forgot Password?
            </p>
          </form>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="New Password"
              style={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button style={styles.button} onClick={handleReset}>
              Reset Password
            </button>

            <p
              style={{ ...styles.link, marginTop: 10, textAlign: "center" }}
              onClick={() => setShowReset(false)}
            >
              Back to Login
            </p>
          </>
        )}

        <p style={styles.switch}>
          Don’t have account?{" "}
          <span onClick={() => navigate("/signup")} style={styles.link}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

/* styles unchanged */
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9"
  },
  card: {
    width: "320px",
    padding: "30px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  switch: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "13px"
  },
  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "600"
  }
};
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../api"; // ✅ IMPORT YOUR API

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.email.includes("@")) return "Enter valid email";
    if (form.password.length < 6) return "Password must be 6+ chars";
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      alert(validationError);
      return;
    }

    setLoading(true);

    try {
      // ✅ REAL API CALL
      const res = await fetchWithAuth("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      // ✅ SAVE TOKEN (VERY IMPORTANT)
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      // ✅ NAVIGATE AFTER LOGIN
      navigate("/user");

    } catch {
      alert("Backend not connected ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

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
        </form>

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

/* SAME STYLES */
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
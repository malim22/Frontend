import { useState, useEffect } from "react"; import { useNavigate } from "react-router-dom";
import { createUser, getDepartments } from "../../api";
export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // ✅ ADD THIS HERE (RIGHT AFTER STATE)
  useEffect(() => {
    getDepartments()
      .then((res) => {
        console.log("Departments loaded:", res);
      })
      .catch(() => { });
  }, []);

  const validate = () => {
    if (form.name.length < 3) return "Name must be 3+ chars";
    if (!form.email.includes("@")) return "Enter valid email";
    if (form.password.length < 6) return "Password must be 6+ chars";
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      alert(validationError);
      return;
    }

    setLoading(true);

    try {
      await createUser({
        name: form.name,
        email: form.email,
        password: form.password
      });

      // 🔥 FORCE SUCCESS (backend not needed)
      alert("Account created successfully ✅ (dummy mode)");
      navigate("/login");

    } catch {
      alert("Backend not connected ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            style={styles.input}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

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
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p style={styles.switch}>
          Already have account?{" "}
          <span onClick={() => navigate("/login")} style={styles.link}>
            Login
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
    background: "#16a34a",
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
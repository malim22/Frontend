import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { getDashboardData} from "../../api";

const DashboardHome = ({ addLog }) => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    customer: "",
    module: "",
    priority: "Low",
    slaHours: ""
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboardData();
        if (data && Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        }
      } catch {
        // NO ERROR BREAK
      }
    };
    load();
  }, []);

  
  const resolveTicket = (ticket) => {
    setTickets((prev) =>
      prev.filter((t) => t.id !== ticket.id)
    );

    addLog?.("TICKET_RESOLVED", ticket.id, "Agent Dashboard");
  };

  const getColor = (p) => {
    switch (p) {
      case "Critical":
        return "#ef4444";
      case "High":
        return "#f97316";
      case "Medium":
        return "#eab308";
      default:
        return "#22c55e";
    }
  };

  const filtered = tickets.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div>
          <h2>Agent Dashboard</h2>
          <p style={{ color: "#666" }}>Manage tickets efficiently</p>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div style={styles.headerBtns}>
          <button
            style={styles.smallPickBtn}
            onClick={() => navigate("/agent/queue")}
          >
            Pick
          </button>

          <button
            style={styles.smallViewBtn}
            onClick={() => navigate("/agent/tickets")}
          >
            View
          </button>
        </div>
      </div>

      <input
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.grid}>
        <div style={styles.card}>Total<br /><b>{tickets.length}</b></div>
        <div style={styles.card}>Critical<br /><b>{tickets.filter(t => t.priority === "Critical").length}</b></div>
        <div style={styles.card}>High<br /><b>{tickets.filter(t => t.priority === "High").length}</b></div>
        <div style={styles.card}>Resolved<br /><b>0</b></div>
      </div>

      <div style={styles.form}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={styles.input}
        />

        <input
          placeholder="Customer"
          value={form.customer}
          onChange={(e) => setForm({ ...form, customer: e.target.value })}
          style={styles.input}
        />

        <input
          placeholder="Module"
          value={form.module}
          onChange={(e) => setForm({ ...form, module: e.target.value })}
          style={styles.input}
        />

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          style={styles.input}
        >
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        
      </div>

      <div style={styles.list}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>No tickets found</div>
        ) : (
          filtered.map((t) => (
            <div key={t.id} style={styles.cardBox}>

              <div style={styles.row}>
                <b>{t.id}</b>
                <span style={{
                  background: getColor(t.priority),
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: 8,
                  fontSize: 12
                }}>
                  {t.priority}
                </span>
              </div>

              <h4 style={{ margin: "6px 0" }}>{t.title}</h4>

              <div style={styles.meta}>
                Created: {t.created}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  type="button"
                  style={styles.pickMainBtn}
                  onClick={() => navigate("/agent/queue")}
                >
                  Pick a Ticket
                </button>

                <button
                  type="button"
                  style={styles.viewMainBtn}
                  onClick={() => navigate("/agent/tickets")}
                >
                  View aTicket
                </button>

                <button
                  style={styles.resolveBtn}
                  onClick={() => resolveTicket(t)}
                >
                  Resolve
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default DashboardHome;

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: 20,
    fontFamily: "sans-serif",
    background: "#f4f6fb",
    minHeight: "100vh"
  },
  header: { marginBottom: 10 },
  search: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    marginBottom: 10
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 10,
    marginBottom: 10
  },
  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 10,
    marginBottom: 20
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd"
  },
  btn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  },
  list: { display: "grid", gap: 10 },
  cardBox: {
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  row: { display: "flex", justifyContent: "space-between" },
  meta: { fontSize: 12, color: "#666", marginTop: 4 },
  resolveBtn: {
    marginTop: 10,
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer"
  },
  empty: { textAlign: "center", color: "#777" },

  headerBtns: {
    display: "flex",
    gap: 8
  },

  smallPickBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(37,99,235,0.3)",
    transition: "0.2s"
  },

  smallViewBtn: {
    background: "#9333ea",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(147,51,234,0.3)",
    transition: "0.2s"
  }
};
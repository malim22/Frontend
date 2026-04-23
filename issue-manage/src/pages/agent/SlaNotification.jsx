import React, { useState, useEffect } from "react";

// ✅ ADD THIS IMPORT
// ✅ ADD THIS
import { getNotifications } from "../../api";
const SlaNotification = () => {
  const [tickets, setTickets] = useState([
    {
      id: "TKT-9205",
      priority: "Critical",
      title: "System outage: Database connection lost",
      assignedTo: "Alex Mercer",
      timeLeft: "19 minutes left"
    },
    {
      id: "TKT-9201",
      priority: "Critical",
      title: "Payment gateway failing on checkout",
      assignedTo: "Unassigned",
      timeLeft: "about 1 hour left"
    },
    {
      id: "TKT-9202",
      priority: "High",
      title: "Cannot reset password via email link",
      assignedTo: "Alex Mercer",
      timeLeft: "about 4 hours left"
    }
  ]);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const [form, setForm] = useState({
    id: "",
    priority: "Medium",
    title: "",
    assignedTo: "",
    timeLeft: ""
  });

  // ✅ 🔥 API FETCH (ONLY ADDITION)
  useEffect(() => {
    const loadSlaTickets = async () => {
      try {
        const res = await getNotifications();
        const data = res?.data || res;

        if (Array.isArray(data)) {
          setTickets(
            data.map((n) => ({
              id: n.ticketId || n.id,
              priority:
                n.priority === "P1"
                  ? "Critical"
                  : n.priority === "P2"
                    ? "High"
                    : n.priority === "P3"
                      ? "Medium"
                      : "Low",
              title: n.message,
              assignedTo: n.assignedTo || "Unassigned",
              timeLeft: n.slaTime || "N/A",
            }))
          );
        }
      } catch (err) {
        console.log("SLA API error:", err);
      }
    };

    loadSlaTickets();
  }, []);

  const addTicket = (e) => {
    e.preventDefault();

    if (!form.id || !form.title) return;

    setTickets((prev) => [
      {
        ...form
      },
      ...prev
    ]);

    setForm({
      id: "",
      priority: "Medium",
      title: "",
      assignedTo: "",
      timeLeft: ""
    });
  };

  const filtered = tickets.filter((t) => {
    return (
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      (priorityFilter ? t.priority === priorityFilter : true)
    );
  });

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div>
          <h2>SLA Alerts</h2>
          <p style={{ fontSize: 12, color: "#666" }}>
            Tickets near or past SLA deadline
          </p>
        </div>
      </div>

      <form style={styles.form} onSubmit={addTicket}>
        <input
          placeholder="Ticket ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          style={styles.input}
        />

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={styles.input}
        />

        <input
          placeholder="Assigned To"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
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

        <input
          placeholder="Time Left"
          value={form.timeLeft}
          onChange={(e) => setForm({ ...form, timeLeft: e.target.value })}
          style={styles.input}
        />

        <button style={styles.btn} type="submit">
          Add SLA Ticket
        </button>
      </form>

      <div style={styles.filters}>
        <input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={styles.input}
        >
          <option value="">All Priority</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div style={styles.list}>
        {filtered.map((t) => (
          <div key={t.id} style={styles.card}>
            <div style={styles.top}>
              <h4>{t.id}</h4>
              <span style={styles.badge}>{t.priority}</span>
            </div>

            <p style={{ margin: "5px 0" }}>{t.title}</p>

            <div style={styles.bottom}>
              <span>Assigned: {t.assignedTo}</span>
              <span style={{ color: "red" }}>{t.timeLeft}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SlaNotification;

/* ================= STYLES ================= */
// ❌ NOTHING TOUCHED
const styles = {
  page: {
    padding: 16,
    fontFamily: "sans-serif",
    background: "#f4f6fb",
    minHeight: "100vh"
  },
  header: {
    marginBottom: 10
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 8,
    marginBottom: 10
  },
  filters: {
    display: "flex",
    gap: 8,
    marginBottom: 15
  },
  input: {
    padding: 8,
    border: "1px solid #ddd",
    borderRadius: 8
  },
  btn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8
  },
  list: {
    display: "grid",
    gap: 10
  },
  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  top: {
    display: "flex",
    justifyContent: "space-between"
  },
  badge: {
    background: "#fee2e2",
    padding: "3px 8px",
    borderRadius: 10,
    fontSize: 12
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    marginTop: 5
  }
};
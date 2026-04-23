import React, { useState, useEffect } from "react";

// ✅ ADD THIS IMPORT
// ✅ ADD THIS
import { getTicketQueue } from "../../api";

const TicketQueue = () => {
  const [tickets, setTickets] = useState([
    {
      id: "TKT-9201",
      priority: "Critical",
      title: "Payment gateway failing on checkout",
      from: "Sarah Jenkins",
      category: "Billing",
      sla: 1,
      created: 1,
      status: "Unassigned"
    },
    {
      id: "TKT-9202",
      priority: "High",
      title: "Cannot reset password via email link",
      from: "Michael Chang",
      category: "Access",
      sla: 4,
      created: 2,
      status: "Unassigned"
    },
    {
      id: "TKT-9203",
      priority: "Medium",
      title: "Update billing address in invoice",
      from: "Elena Rostova",
      category: "Billing",
      sla: 24,
      created: 5,
      status: "Unassigned"
    }
  ]);

  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("priority");

  // ✅ 🔥 API FETCH (ONLY ADDITION)
  useEffect(() => {
  const loadQueue = async () => {
    try {
      const res = await getTicketQueue();
      const data = res?.data || res;

      if (Array.isArray(data)) {
        setTickets(
          data.map((t) => ({
            id: t.id,
            priority:
              t.priority === "P1"
                ? "Critical"
                : t.priority === "P2"
                ? "High"
                : t.priority === "P3"
                ? "Medium"
                : "Low",
            title: t.title,
            from: t.userName || "Unknown",
            category: t.categoryName,
            sla: t.slaHours || 0,
            created: t.createdHours || 0,
            status: t.status || "Unassigned",
          }))
        );
      }
    } catch (err) {
      console.log("Queue API error:", err);
    }
  };

  loadQueue();
}, []);

  /* ✅ PICK TICKET (API READY) */
  const pickTicket = (id) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: "Picked" } : t
      )
    );
  };

  /* ✅ SORT LOGIC */
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === "priority") {
      const order = { Critical: 1, High: 2, Medium: 3, Low: 4 };
      return order[a.priority] - order[b.priority];
    }

    if (sortBy === "sla") {
      return a.sla - b.sla;
    }

    if (sortBy === "newest") {
      return a.created - b.created;
    }

    return 0;
  });

  /* FILTER */
  const filtered = sortedTickets.filter(
    t =>
      t.title.toLowerCase().includes(filter.toLowerCase()) ||
      t.id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div>
          <h2>Ticket Queue</h2>
          <p style={styles.sub}>
            Unassigned tickets require your attention
          </p>
        </div>

        <input
          placeholder="Search tickets..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.search}
        />
      </div>

      <div style={styles.toolbar}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.select}
        >
          <option value="priority">Sort by Priority</option>
          <option value="sla">Sort by SLA</option>
          <option value="newest">Sort by Newest</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filtered.map(ticket => (
          <div key={ticket.id} style={styles.card}>

            <div style={styles.row}>
              <b>{ticket.id}</b>
              <span style={styles.badge(ticket.priority)}>
                {ticket.priority}
              </span>
            </div>

            <h4>{ticket.title}</h4>

            <p>From: {ticket.from}</p>
            <p>Category: {ticket.category}</p>
            <p>SLA: {ticket.sla}h</p>

            <div style={styles.footer}>
              <span style={styles.status(ticket.status)}>
                {ticket.status}
              </span>

              <button
                style={styles.btn}
                onClick={() => pickTicket(ticket.id)}
              >
                Pick Ticket
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketQueue;

/* ================= STYLES ================= */
// ❌ NOTHING TOUCHED
const styles = {
  page: {
    padding: 20,
    fontFamily: "sans-serif",
    background: "#f4f6fb",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  sub: { margin: 0, fontSize: 12, color: "#666" },

  search: {
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 8
  },

  toolbar: {
    marginTop: 10,
    marginBottom: 10
  },

  select: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ddd"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 12
  },

  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 12
  },

  row: {
    display: "flex",
    justifyContent: "space-between"
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10
  },

  btn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6
  },

  badge: (p) => ({
    fontSize: 11,
    padding: "3px 8px",
    borderRadius: 6,
    background:
      p === "Critical"
        ? "#fee2e2"
        : p === "High"
        ? "#fde68a"
        : "#e0e7ff"
  }),

  status: (s) => ({
    fontSize: 11,
    padding: "3px 8px",
    borderRadius: 6,
    background: s === "Picked" ? "#dcfce7" : "#f3f4f6"
  })
};
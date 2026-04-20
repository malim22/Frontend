import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// ✅ ADD THIS IMPORT
import { getTicketQueue } from "../../api";

const MyTickets = () => {
  const location = useLocation();

  const [tickets, setTickets] = useState(() => {
    const newTicket = location.state?.newTicket;

    const defaultTickets = [
      {
        id: "TKT-9202",
        title: "Cannot reset password via email link",
        desc: "The password reset link says expired...",
        priority: "High",
        status: "Open",
        user: "Michael Chang",
        created: "4 hours ago"
      },
      {
        id: "TKT-9204",
        title: "Dashboard loading very slowly on mobile",
        desc: "Takes 15+ seconds to load dashboard...",
        priority: "Medium",
        status: "In Progress",
        user: "David Smith",
        created: "14 hours ago"
      },
      {
        id: "TKT-9205",
        title: "System outage: Database connection lost",
        desc: "Complete failure on all US-East replicas...",
        priority: "Critical",
        status: "Open",
        user: "System Alert",
        created: "21 min ago"
      },
      {
        id: "TKT-9207",
        title: "API Rate limit unexpectedly reached",
        desc: "429 errors despite normal usage...",
        priority: "High",
        status: "Resolved",
        user: "Lisa Chen",
        created: "Closed"
      }
    ];

    if (newTicket) {
      return [
        {
          ...newTicket,
          desc: newTicket.title,
          status: "Open",
          user: newTicket.customer
        },
        ...defaultTickets
      ];
    }

    return defaultTickets;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // ✅ 🔥 API FETCH (ONLY ADDITION)
  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await getTicketQueue();
        if (data) {
          setTickets(data);
        }
      } catch (err) {
        console.log("API error:", err);
      }
    };

    loadTickets();
  }, []);

  /* ===== FILTER LOGIC ===== */
  const filtered = tickets.filter(t => {
    return (
      (t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "All" ? true : t.status === statusFilter) &&
      (priorityFilter === "All" ? true : t.priority === priorityFilter)
    );
  });

  /* ===== STATUS ACTION (API READY) ===== */
  const updateStatus = (id, status) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status } : t
      )
    );
  };

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div>
          <h2>My Tickets</h2>
          <p style={styles.sub}>
            You have {tickets.filter(t => t.status !== "Resolved").length} active tickets assigned to you
          </p>
        </div>

        <input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      <div style={styles.filters}>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="All">All Priority</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
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
            <p style={styles.desc}>{ticket.desc}</p>

            <p style={styles.meta}>From: {ticket.user}</p>
            <p style={styles.meta}>Created: {ticket.created}</p>

            <div style={styles.footer}>
              <span style={styles.status(ticket.status)}>
                {ticket.status}
              </span>

              <div style={{ display: "flex", gap: 5 }}>
                <button
                  style={styles.btnBlue}
                  onClick={() => updateStatus(ticket.id, "In Progress")}
                >
                  Start
                </button>

                <button
                  style={styles.btnGreen}
                  onClick={() => updateStatus(ticket.id, "Resolved")}
                >
                  Resolve
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;

/* ================= STYLES ================= */
// ❌ NOTHING TOUCHED BELOW
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
  sub: { fontSize: 12, color: "#666", margin: 0 },
  search: {
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 8,
    width: 220
  },
  filters: {
    display: "flex",
    gap: 10,
    margin: "12px 0"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 12
  },
  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  row: {
    display: "flex",
    justifyContent: "space-between"
  },
  desc: {
    fontSize: 12,
    color: "#555"
  },
  meta: {
    fontSize: 11,
    color: "#777",
    margin: "3px 0"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
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
    background:
      s === "Resolved"
        ? "#dcfce7"
        : s === "In Progress"
        ? "#dbeafe"
        : "#f3f4f6"
  }),
  btnBlue: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "5px 8px",
    borderRadius: 6,
    fontSize: 11
  },
  btnGreen: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "5px 8px",
    borderRadius: 6,
    fontSize: 11
  }
};
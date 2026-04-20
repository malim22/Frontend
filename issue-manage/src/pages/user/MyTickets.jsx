import { useEffect, useState } from "react";
import { getMyTickets } from "../../api";
import { useNavigate } from "react-router-dom";

export default function MyTickets() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyTickets()
      .then((data) => {
        const formatted = (data || []).map((t) => [
          t.ticketId || t.id,
          t.title,
          t.categoryName || "General",
          t.status,
          t.createdAt ? t.createdAt.slice(0, 10) : "Date",
        ]);
        setTickets(formatted);
      })
      .catch((err) => console.error(err));
  }, []);
  

  const filtered = tickets.filter((t) => {
  const title = (t[1] || "").toString().toLowerCase();
  const matchesStatus = statusFilter === "All" || t[3] === statusFilter;
  const matchesSearch = title.includes(searchTerm.toLowerCase());

  return matchesStatus && matchesSearch;
});
  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .hover-glow:hover {
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
            transform: translateY(-3px);
            transition: all 0.3s ease;
          }

          /* ✅ FIX CURSOR LOCALLY */
          button { cursor: pointer; }
          input, textarea { cursor: text; }
        `}
      </style>

      <h1 style={styles.title}>My Tickets</h1>
      <p style={styles.subtitle}>All complaints you have submitted</p>

      <div style={styles.topBar}>
        <button
          style={styles.primaryBtn}
          className="hover-glow"
          onClick={() => navigate("/user/new")}
        >
          + New Ticket
        </button>
      </div>

      <div style={styles.cards}>
        {[
          { title: "Total submitted", value: tickets.length },
          {
            title: "Open / In Progress",
            value: tickets.filter(
              (t) => t[3] === "Open" || t[3] === "In Progress"
            ).length,
          },
          {
            title: "Resolved this month",
            value: tickets.filter((t) => t[3] === "Resolved").length,
          },
        ].map((card, i) => (
          <Card key={i} title={card.title} value={card.value} delay={i * 0.1} />
        ))}
      </div>

      <div style={styles.filterRow}>
        <input
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.search}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.select}
        >
          <option>All</option>
          <option>Resolved</option>
          <option>In Progress</option>
          <option>Pending</option>
          <option>Closed</option>
          <option>Escalated</option>
          <option>Open</option>
        </select>
      </div>

      <div style={styles.tableBox}>
        {filtered.map((t, i) => (
          <div
            key={i}
            className="hover-glow"
            style={{
              ...styles.row,
              animation: "slideIn 0.4s ease forwards",
              animationDelay: `${i * 0.05}s`,
              cursor: "pointer", // ✅ FIX HERE
            }}
          >
            <div>
              <p style={styles.ticketTitle}>{t[1]}</p>
              <span style={styles.ticketId}>
                {t[0]} • {t[2]}
              </span>
            </div>

            <div style={styles.right}>
              <span style={getStatusStyle(t[3])}>{t[3]}</span>
              <span style={styles.date}>{t[4]}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <span>
          Showing 1 to {filtered.length} of {tickets.length} tickets
        </span>
        <div>
          <button style={styles.pageBtn}>Prev</button>
          <button style={styles.pageBtn}>Next</button>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, delay = 0 }) {
  return (
    <div
      style={{
        ...styles.card,
        animation: "slideIn 0.4s ease forwards",
        animationDelay: `${delay}s`,
        cursor: "default", // ✅ keep normal
      }}
      className="hover-glow"
    >
      <h2>{value}</h2>
      <p style={{ color: "#64748b" }}>{title}</p>
    </div>
  );
}

function getStatusStyle(status) {
  const map = {
    Resolved: ["#dcfce7", "#16a34a"],
    "In Progress": ["#fef3c7", "#d97706"],
    Pending: ["#dbeafe", "#2563eb"],
    Closed: ["#e5e7eb", "#6b7280"],
    Escalated: ["#fee2e2", "#dc2626"],
    Open: ["#dbeafe", "#2563eb"],
  };

  return {
    background: map[status]?.[0] || "#eee",
    color: map[status]?.[1] || "#333",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  };
}

const styles = {
  container: {
    padding: "20px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  title: { fontSize: "28px", marginBottom: "5px" },
  subtitle: { color: "#64748b", marginBottom: "15px", fontSize: "16px" },
  topBar: { display: "flex", justifyContent: "flex-end", marginBottom: "10px" },
  primaryBtn: {
    background: "#2563eb",
    color: "white",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  cards: { display: "flex", gap: "20px", marginBottom: "20px" },
  card: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "14px",
  },
  filterRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  search: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "60%",
    fontSize: "14px",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    cursor: "pointer",
    fontSize: "14px",
  },
  tableBox: {
    background: "white",
    borderRadius: "16px",
    padding: "10px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    borderBottom: "1px solid #eee",
    alignItems: "center",
  },
  ticketTitle: { fontWeight: "600", fontSize: "14px" },
  ticketId: { fontSize: "12px", color: "#94a3b8" },
  right: { display: "flex", gap: "15px", alignItems: "center" },
  date: { fontSize: "12px", color: "#64748b" },
  footer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
  },
  pageBtn: {
    padding: "6px 10px",
    marginLeft: "5px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
};
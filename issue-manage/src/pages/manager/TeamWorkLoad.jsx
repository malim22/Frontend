import { useState, useEffect } from "react";
import { getTeamWorkload } from "../../api";
export default function TeamWorkload() {

  const [queue, setQueue] = useState([
    { id: "T-1246", priority: "High", status: "Open" }
  ]);

  // ✅ API STATE (no error because used)
  const [apiData, setApiData] = useState(null);

  // ✅ API CALL (SAFE)
  useEffect(() => {
    getTeamWorkload()
      .then((res) => {
        setApiData(res);

        // ✅ real backend mapping
        if (res?.queue) {
          setQueue(res.queue);
        }
      })
      .catch(() => { });
  }, []);

  const handleAssign = (id) => {
    setQueue(queue.filter(item => item.id !== id));
    alert(`Ticket ${id} Assigned`);
  };

  const changePriority = (id) => {
    setQueue(queue.map(item =>
      item.id === id
        ? { ...item, priority: item.priority === "High" ? "Low" : "High" }
        : item
    ));
  };

  const changeStatus = (id) => {
    setQueue(queue.map(item =>
      item.id === id
        ? { ...item, status: item.status === "Open" ? "Closed" : "Open" }
        : item
    ));
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <h2 style={styles.title}>Team Workload</h2>

      {/* ✅ ALERT (uses API safely) */}
      <div style={styles.alert}>
        {apiData?.queueCount ?? queue.length} unassigned tickets
      </div>

      {/* TEAM CARDS */}
      <div style={styles.grid}>

        <Card name="Mike Chen" role="Senior Agent" open={8} critical={2} resolved={24} load="Heavy" width="80%" />
        <Card name="Sarah Johnson" role="Agent" open={5} critical={1} resolved={18} load="Active" width="60%" />
        <Card name="Alex Kim" role="Agent" open={3} critical={0} resolved={15} load="Available" width="30%" />

      </div>

      {/* QUEUE */}
      <div style={styles.queue}>
        <h3 style={{ marginBottom: 10 }}>Unassigned Queue</h3>

        {queue.map((item) => (
          <div key={item.id} style={styles.row}>

            <span>{item.id}</span>

            <span
              style={styles.badge(item.priority)}
              onClick={() => changePriority(item.id)}
            >
              {item.priority}
            </span>

            <span
              style={styles.status(item.status)}
              onClick={() => changeStatus(item.id)}
            >
              {item.status}
            </span>

            <button
              style={styles.btn}
              onClick={() => handleAssign(item.id)}
            >
              Assign
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

/* 🔹 REUSABLE CARD */
const Card = ({ name, role, open, critical, resolved, load, width }) => (
  <div style={styles.card}>
    <h4 style={{ margin: 0 }}>{name}</h4>
    <p style={styles.sub}>{role}</p>

    <div style={styles.stats}>
      <span>Open: {open}</span>
      <span style={{ color: "red" }}>Critical: {critical}</span>
      <span style={{ color: "green" }}>Done: {resolved}</span>
    </div>

    <div style={styles.bar}>
      <div style={{ ...styles.fill, width }}></div>
    </div>

    <small style={styles.load}>{load}</small>
  </div>
);

/* ================= CLEAN UI ================= */
const styles = {
  page: {
    padding: 16,
    fontFamily: "sans-serif",
    background: "#f4f6fb",
    minHeight: "100vh"
  },

  title: {
    marginBottom: 10
  },

  alert: {
    background: "#fff7ed",
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 15
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
    marginBottom: 15
  },

  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },

  sub: {
    fontSize: 12,
    color: "#666",
    margin: "2px 0 8px"
  },

  stats: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    marginBottom: 6
  },

  bar: {
    height: 6,
    background: "#eee",
    borderRadius: 6,
    overflow: "hidden"
  },

  fill: {
    height: "100%",
    background: "#2563eb"
  },

  load: {
    fontSize: 11,
    color: "#888"
  },

  queue: {
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #eee",
    fontSize: 13
  },

  btn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer"
  },

  badge: (p) => ({
    fontSize: 11,
    padding: "3px 8px",
    borderRadius: 6,
    background: p === "High" ? "#fee2e2" : "#dcfce7"
  }),

  status: (s) => ({
    fontSize: 11,
    padding: "3px 8px",
    borderRadius: 6,
    background: s === "Open" ? "#dbeafe" : "#e5e7eb"
  })
};
import React, { useEffect, useState } from "react";
import { getDashboardData } from "../../api"; // ✅ ONLY ADD

export default function Dashboard() {

  const [apiData, setApiData] = useState(null); // ✅ ONLY ADD

  // ✅ FETCH FROM BACKEND (SAFE)
  useEffect(() => {
    getDashboardData()
      .then((res) => {
        setApiData(res);
      })
      .catch(() => {});
  }, []);

  const categories = [
    { name: "Technical Issues", count: 18, width: 80 },
    { name: "Billing & Payments", count: 12, width: 60 },
    { name: "Account Access", count: 8, width: 40 },
    { name: "Feature Requests", count: 4, width: 20 },
  ];

  const team = [
    { name: "Mike Chen", active: 8, width: 70 },
    { name: "Sarah Johnson", active: 5, width: 50 },
    { name: "Alex Kim", active: 3, width: 30 },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dashboard</h2>

      {/* TOP CARDS */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h1>{apiData?.openTickets ?? 42}</h1>
          <p>Open Tickets</p>
          <span style={styles.green}>↑ 12%</span>
        </div>

        <div style={styles.card}>
          <h1>{apiData?.resolvedToday ?? 18}</h1>
          <p>Resolved Today</p>
          <span style={styles.green}>↑ 8%</span>
        </div>

        <div style={styles.card}>
          <h1>{apiData?.slaBreaches ?? 2}</h1>
          <p>SLA Breaches</p>
          <span style={styles.red}>↓ 15%</span>
        </div>

        <div style={styles.card}>
          <h1>{apiData?.avgResolution ?? "4.2h"}</h1>
          <p>Avg Resolution</p>
          <span style={styles.red}>↓ 5%</span>
        </div>
      </div>

      {/* SECTION 1 */}
      <div style={styles.bottom}>
        {/* TICKETS */}
        <div style={styles.box}>
          <h3>Longest Open Tickets</h3>

          {[
            { title: "Payment processing not working", id: "#T-1247", type: "urgent" },
            { title: "Unable to reset password", id: "#T-1198", type: "high" },
            { title: "Dashboard data not loading", id: "#T-1089", type: "high" },
            { title: "Email notifications delayed", id: "#T-1056", type: "medium" },
          ].map((t, i) => (
            <div key={i} style={styles.ticketItem}>
              <div>
                <p>{t.title}</p>
                <small>{t.id}</small>
              </div>
              <span style={badgeStyle(t.type)}>{t.type}</span>
            </div>
          ))}
        </div>

        {/* SLA */}
        <div style={styles.box}>
          <h3>SLA Compliance</h3>

          {[
            { label: "Overall", value: 92 },
            { label: "Response Time", value: 95 },
            { label: "Resolution Time", value: 88 },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <div style={styles.row}>
                <p>{item.label}</p>
                <span>{item.value}%</span>
              </div>
              <div style={styles.bar}>
                <div style={{ ...styles.fill, width: `${item.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 */}
      <div style={styles.bottom}>
        {/* CATEGORY */}
        <div style={styles.box}>
          <h3>Tickets by Category</h3>

          {categories.map((item, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <div style={styles.row}>
                <p>{item.name}</p>
                <span>{item.count}</span>
              </div>
              <div style={styles.bar}>
                <div style={{ ...styles.fillBlue, width: `${item.width}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* TEAM */}
        <div style={styles.box}>
          <h3>Team Summary</h3>

          {team.map((member, i) => {
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <div key={i} style={{ marginBottom: "15px" }}>
                <div style={styles.teamRow}>
                  <div style={styles.avatar}>{initials}</div>
                  <div>
                    <p>{member.name}</p>
                    <small>{member.active} active</small>
                  </div>
                </div>

                <div style={styles.bar}>
                  <div style={{ ...styles.fillGreen, width: `${member.width}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: "20px",
    fontFamily: "sans-serif",
    background: "#f8fafc",
    minHeight: "100vh",
  },

  heading: {
    marginBottom: "20px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "0.3s",
    cursor: "pointer",
  },

  bottom: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  box: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  ticketItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
  },

  bar: {
    height: "8px",
    background: "#e2e8f0",
    borderRadius: "5px",
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    background: "#2563eb",
  },

  fillBlue: {
    height: "100%",
    background: "#3b82f6",
  },

  fillGreen: {
    height: "100%",
    background: "#10b981",
  },

  teamRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  green: {
    color: "green",
  },

  red: {
    color: "red",
  },
};

/* BADGE STYLE FUNCTION */
const badgeStyle = (type) => {
  const map = {
    urgent: { background: "#fee2e2", color: "#dc2626" },
    high: { background: "#fef3c7", color: "#d97706" },
    medium: { background: "#dbeafe", color: "#2563eb" },
  };

  return {
    padding: "5px 10px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "bold",
    ...map[type],
  };
};
import { useState, useEffect } from "react";
import { getDashboardData } from "../../api"; // ✅ SAME AS ESCALATIONS

export default function Notifications() {
  const [readAll, setReadAll] = useState(false);

  // ✅ DEFAULT SAFE DATA (WILL SHOW EVEN IF API FAILS)
  const [notifications, setNotifications] = useState([
    {
      title: "🔴 SLA Breach Alert",
      desc: "Ticket T-1247 has breached SLA by 2 hours.",
      time: "15 min ago",
      unread: true,
    },
    {
      title: "🔴 SLA Breach Alert",
      desc: "Ticket T-1240 breached SLA. No agent assigned.",
      time: "1 hr ago",
      unread: true,
    },
    {
      title: "🟠 SLA Warning",
      desc: "Ticket T-1246 will breach in 30 mins.",
      time: "2 hrs ago",
      unread: true,
    },
    {
      title: "🔔 Unassigned Alert",
      desc: "3 high-priority tickets need assignment.",
      time: "3 hrs ago",
      unread: false,
    },
    {
      title: "💬 Agent Update",
      desc: "Mike updated ticket T-1247.",
      time: "4 hrs ago",
      unread: false,
    },
  ]);

  // ✅ OPTIONAL API STATE (SAFE)
  const [_apiData, setApiData] = useState(null);
  // ✅ SAFE API CALL (WILL NOT BREAK UI)
  useEffect(() => {
    getDashboardData()
      .then((res) => {
        setApiData(res);

        // ONLY UPDATE IF API HAS DATA
        if (res && Array.isArray(res.notifications)) {
          setNotifications(res.notifications);
        }
      })
      .catch(() => {
        // ❌ NO ERROR BREAK
        // UI WILL CONTINUE USING DEFAULT DATA
      });
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>Notifications</h2>
          <p style={styles.sub}>{unreadCount} unread</p>
        </div>

        <button style={styles.btn} onClick={() => setReadAll(true)}>
          Mark all read
        </button>
      </div>

      {/* LIST */}
      <div style={styles.list}>
        {notifications.map((n, i) => (
          <div
            key={i}
            style={{
              ...styles.card,
              background: n.unread && !readAll ? "#eff6ff" : "#fff",
            }}
          >
            <div
              style={{
                ...styles.dot,
                background:
                  n.unread && !readAll ? "#2563eb" : "#cbd5e1",
              }}
            />

            <div style={styles.content}>
              <div style={styles.top}>
                <h4 style={styles.title}>{n.title}</h4>
                <span style={styles.time}>{n.time}</span>
              </div>

              <p style={styles.desc}>{n.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ================= STYLES (UNCHANGED) ================= */
const styles = {
  page: {
    padding: 16,
    fontFamily: "sans-serif",
    background: "#f4f6fb",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },

  sub: {
    fontSize: 12,
    color: "#666"
  },

  btn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },

  card: {
    display: "flex",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    alignItems: "flex-start"
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    marginTop: 6
  },

  content: {
    flex: 1
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    margin: 0,
    fontSize: 14
  },

  desc: {
    margin: "4px 0",
    fontSize: 12,
    color: "#555"
  },

  time: {
    fontSize: 11,
    color: "#999"
  }
};
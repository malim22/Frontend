import React, { useState, useEffect } from 'react'; // ✅ ADDED
import { fetchWithAuth } from "../../api";
const Notifications = ({ auditLogs }) => {

  const [logs, setLogs] = useState(auditLogs || []); // ✅ API STATE

  // ✅ LOAD FROM BACKEND
  /* ✅ LOAD FROM BACKEND */
useEffect(() => {
  const loadNotifications = async () => {
    try {
      // 🔥 REAL API FROM YOUR TABLE
      const data = await fetchWithAuth("/admin/audit/ALL/ALL");

      if (Array.isArray(data)) {
        setLogs(data);
      } else if (Array.isArray(data?.data)) {
        setLogs(data.data);
      } else {
        setLogs([]);
      }

    } catch (err) {
      console.log("Audit API error:", err);
      setLogs(auditLogs || []);
    }
  };

  loadNotifications();
}, [auditLogs]);

  return (
    <div style={styles.container} className="fade-in">
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>System Notifications</h2>
        <p style={styles.subTitle}>Track real-time system alerts and activity logs</p>
      </div>

      {/* List */}
      <div style={styles.listContainer}>
        {logs.length > 0 ? (
          logs.map((log) => (
            <div
              key={log.id}
              style={{
                ...styles.card,
                borderLeft: `6px solid ${
                  log.action === 'CREATE'
                    ? '#10b981'
                    : log.action === 'DELETE'
                    ? '#ef4444'
                    : '#3b82f6'
                }`,
              }}
            >
              <div
                style={{
                  ...styles.iconBox,
                  background:
                    log.action === 'CREATE'
                      ? '#ecfdf5'
                      : log.action === 'DELETE'
                      ? '#fef2f2'
                      : '#eff6ff',
                }}
              >
                {log.action === 'CREATE'
                  ? '➕'
                  : log.action === 'DELETE'
                  ? '🗑️'
                  : '📝'}
              </div>

              <div style={styles.details}>
                <div style={styles.topRow}>
                  <span
                    style={{
                      ...styles.actionTag,
                      color:
                        log.action === 'CREATE'
                          ? '#10b981'
                          : log.action === 'DELETE'
                          ? '#ef4444'
                          : '#3b82f6',
                    }}
                  >
                    {log.action} ALERT
                  </span>
                  <span style={styles.timeTxt}>{log.time}</span>
                </div>

                <p style={styles.message}>
                  <strong>{log.user}</strong> performed a{' '}
                  <strong>{log.action}</strong> action on{' '}
                  <strong>{log.target}</strong> in the{' '}
                  <strong>{log.module}</strong> module.
                </p>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.emptyBox}>
            <div style={styles.emptyIcon}>🔔</div>
            <h3 style={styles.emptyTitle}>No notifications yet</h3>
            <p style={styles.emptyText}>
              System activity alerts will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= MODERN STYLES ================= */
const styles = {
  container: {
    animation: 'fadeIn 0.4s ease',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '10px',
  },

  header: {
    marginBottom: '25px',
    padding: '20px',
    background: 'linear-gradient(135deg,#0f172a,#1e293b)',
    borderRadius: '16px',
    color: 'white',
  },

  title: {
    margin: 0,
    fontWeight: '900',
    fontSize: '26px',
  },

  subTitle: {
    margin: '5px 0 0',
    color: '#cbd5e1',
    fontSize: '14px',
  },

  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
    transition: '0.2s',
  },

  iconBox: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },

  details: {
    flex: 1,
  },

  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },

  actionTag: {
    fontSize: '11px',
    fontWeight: '900',
    letterSpacing: '0.8px',
  },

  timeTxt: {
    fontSize: '12px',
    color: '#94a3b8',
  },

  message: {
    margin: 0,
    fontSize: '14px',
    color: '#334155',
    lineHeight: '1.5',
  },

  emptyBox: {
    textAlign: 'center',
    padding: '70px 20px',
    background: 'white',
    borderRadius: '18px',
    border: '2px dashed #cbd5e1',
  },

  emptyIcon: {
    fontSize: '50px',
    opacity: 0.3,
  },

  emptyTitle: {
    margin: '10px 0',
    color: '#0f172a',
  },

  emptyText: {
    color: '#94a3b8',
  },
};

export default Notifications;
import React, { useState, useEffect } from "react";
import { getAuditLogs } from "../../api";const AuditLogs = ({ auditLogs = [] }) => {

  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");

  const [logs, setLogs] = useState(auditLogs); // ✅ LOCAL STATE

  /* ✅ LOAD FROM BACKEND */
  useEffect(() => {
  const loadLogs = async () => {
    try {
      const res = await getAuditLogs();
      const data = res?.data || res;

      if (Array.isArray(data)) {
        setLogs(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadLogs();
}, []); 

  const filtered = logs.filter((l) => {
    return (
      l.user.toLowerCase().includes(search.toLowerCase()) &&
      (userFilter ? l.user === userFilter : true) &&
      (actionFilter ? l.action === actionFilter : true) &&
      (moduleFilter ? l.module === moduleFilter : true)
    );
  });

  const exportLogs = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_logs.json";
    a.click();
  };

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Audit Logs</h2>
          <p style={styles.sub}>Track all system activities and changes</p>
        </div>

        <button style={styles.exportBtn} onClick={exportLogs}>
          Export Logs
        </button>
      </div>

      <div style={styles.filterCard}>
        <input placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} style={styles.input} />
        <input placeholder="User" value={userFilter} onChange={(e) => setUserFilter(e.target.value)} style={styles.input} />
        <input placeholder="Action" value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} style={styles.input} />
        <input placeholder="Module" value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} style={styles.input} />
      </div>

      <div style={styles.card}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>No logs found</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Action</th>
                <th>Module</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td>{l.time}</td>
                  <td>{l.user}</td>
                  <td>{l.action}</td>
                  <td>{l.module}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default AuditLogs;

/* styles unchanged */
const styles = {
  page: { padding: 18, fontFamily: "sans-serif", background: "#f4f6fb", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: 14 },
  title: { margin: 0 },
  sub: { margin: 0, fontSize: 12, color: "#666" },
  exportBtn: { background: "#2563eb", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8 },
  filterCard: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, background: "#fff", padding: 12, borderRadius: 12, marginBottom: 12 },
  input: { padding: 8, border: "1px solid #ddd", borderRadius: 8 },
  card: { background: "#fff", borderRadius: 12, padding: 10 },
  table: { width: "100%", borderCollapse: "collapse" },
  empty: { textAlign: "center", padding: 20, color: "#777" }
};
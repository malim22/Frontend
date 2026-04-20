import React, { useState, useEffect } from 'react';
import { getDashboardData } from "../../api"; // ✅ ADDED

const Dashboard = ({ users = [], departments = [], auditLogs = [] }) => {

  // ✅ LOCAL STATE (fallback safe)
  const [data, setData] = useState({
    users,
    departments,
    auditLogs
  });

  /* ✅ LOAD FROM BACKEND */
  useEffect(() => {
  const loadData = async () => {
    try {
      const res = await getDashboardData();

      // ✅ SAFE CHECK (handles object safely)
      if (res) {
        setData({
          users: Array.isArray(res.users) ? res.users : [],
          departments: Array.isArray(res.departments) ? res.departments : [],
          auditLogs: Array.isArray(res.auditLogs) ? res.auditLogs : []
        });
      }

    } catch (err) {
      console.error(err);
    }
  };

  loadData();
}, []);
  return (
    <div style={styles.container}>

      {/* STATS */}
      <div style={styles.stats}>

        <div style={{ ...styles.card, borderLeft: '6px solid #2563eb' }}>
          <span style={styles.label}>Users</span>
          <h2 style={styles.number}>{data.users.length}</h2>
        </div>

        <div style={{ ...styles.card, borderLeft: '6px solid #9333ea' }}>
          <span style={styles.label}>Departments</span>
          <h2 style={styles.number}>{data.departments.length}</h2>
        </div>

        <div style={{ ...styles.card, borderLeft: '6px solid #f59e0b' }}>
          <span style={styles.label}>Audit Logs</span>
          <h2 style={styles.number}>{data.auditLogs.length}</h2>
        </div>

      </div>

      {/* TABLE */}
      <div style={styles.tableBox}>
        <div style={styles.tableHeader}>
          Manual Support Overview
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Requester</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="4" style={styles.empty}>
                Ticket tracking is manual.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

const styles = {
  container: {
    animation: 'fadeIn 0.3s ease',
    padding: '10px'
  },

  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },

  card: {
    background: 'white',
    padding: '22px',
    borderRadius: '16px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
    transition: '0.2s ease'
  },

  label: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '600'
  },

  number: {
    margin: '10px 0 0',
    fontSize: '28px',
    fontWeight: '800',
    color: '#0f172a'
  },

  tableBox: {
    background: 'white',
    borderRadius: '16px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
  },

  tableHeader: {
    padding: '18px',
    fontWeight: '800',
    borderBottom: '1px solid #f1f5f9',
    background: '#f8fafc'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },

  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#94a3b8',
    fontSize: '14px'
  }
};

export default Dashboard;
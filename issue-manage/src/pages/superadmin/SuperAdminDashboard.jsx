import React from 'react';
import { Link } from 'react-router-dom';

const SuperAdminDashboard = ({ admins = [], depts = [], users = [] }) => {

  const adminCount = admins.length;
  const managerCount = users.filter(u => u.role === 'MANAGER').length;
  const agentCount = users.filter(u => u.role === 'AGENT').length;
  const normalUserCount = users.filter(u => u.role === 'USER').length;
  const totalUsersCount = adminCount + managerCount + agentCount + normalUserCount;

  const activeDepts = depts.filter(d => d.status === 'ACTIVE').length;
  const inactiveDepts = depts.filter(d => d.status === 'INACTIVE').length;
  const totalTeamsCount = depts.reduce((acc, d) => acc + Number(d.teams || 0), 0);

  return (
    <div className="content-area" style={{ padding: "20px" }}>
      
      <h2 className="page-title" style={{ fontSize: '26px', fontWeight: "700", color: "#0f172a" }}>
        Dashboard Overview
      </h2>

      <p className="page-subtitle" style={{ marginBottom: '32px', color: "#64748b" }}>
        Complete system visibility and key metrics
      </p>

      <div className="grid-2x2" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px"
      }}>

        {/* USERS */}
        <div className="stat-card" style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="icon-box" style={{
              background: '#e0f2fe',
              color: '#0ea5e9',
              borderRadius: "12px",
              padding: "10px"
            }}>👥</div>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>↗</span>
          </div>

          <h2 style={{ fontSize: '30px', margin: "10px 0", color: "#0f172a" }}>
            {totalUsersCount}
          </h2>

          <p style={{ color: '#64748b', fontSize: '13px' }}>Total Users</p>

          <div style={{ fontSize: '12px', marginTop: "10px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Admins</span> <strong>{adminCount}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Managers</span> <strong>{managerCount}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Agents</span> <strong>{agentCount}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Users</span> <strong>{normalUserCount}</strong>
            </div>
          </div>
        </div>

        {/* DEPARTMENTS */}
        <div className="stat-card" style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
        }}>
          <div className="icon-box" style={{
            background: '#f3e8ff',
            color: '#c026d3',
            borderRadius: "12px",
            padding: "10px"
          }}>🏢</div>

          <h2 style={{ fontSize: '30px', margin: "10px 0" }}>{depts.length}</h2>
          <p style={{ color: "#64748b", fontSize: "13px" }}>Total Departments</p>

          <div style={{ fontSize: '12px', marginTop: "10px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Active</span> <strong>{activeDepts}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Inactive</span> <strong>{inactiveDepts}</strong>
            </div>
          </div>
        </div>

        {/* TEAMS */}
        <div className="stat-card" style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
        }}>
          <div className="icon-box" style={{
            background: '#dcfce7',
            color: '#16a34a',
            borderRadius: "12px",
            padding: "10px"
          }}>🧑‍🤝‍🧑</div>

          <h2 style={{ fontSize: '30px', margin: "10px 0" }}>{totalTeamsCount}</h2>
          <p style={{ color: "#64748b", fontSize: "13px" }}>Total Teams</p>
        </div>

        {/* HEALTH */}
        <div className="stat-card" style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
        }}>
          <div className="icon-box" style={{
            background: '#dcfce7',
            color: '#16a34a',
            borderRadius: "12px",
            padding: "10px"
          }}>📈</div>

          <h2 style={{ fontSize: '30px', margin: "10px 0" }}>98.5%</h2>
          <p style={{ color: "#64748b", fontSize: "13px" }}>System Health</p>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="grid-actions" style={{
        marginTop: "40px",
        display: "flex",
        gap: "15px",
        flexWrap: "wrap"
      }}>

        <div className="action-card">
          <Link to="/superadmin/admins">
            <button style={{
              padding: "12px 18px",
              borderRadius: "10px",
              background: "#3b82f6",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(59,130,246,0.3)"
            }}>
              Manage Admins
            </button>
          </Link>
        </div>

        <div className="action-card">
          <Link to="/superadmin/departments">
            <button style={{
              padding: "12px 18px",
              borderRadius: "10px",
              background: "#9333ea",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(147,51,234,0.3)"
            }}>
              Manage Departments
            </button>
          </Link>
        </div>

        <div className="action-card">
          <Link to="/superadmin/system">
            <button style={{
              padding: "12px 18px",
              borderRadius: "10px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(22,163,74,0.3)"
            }}>
              System Settings
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminDashboard;
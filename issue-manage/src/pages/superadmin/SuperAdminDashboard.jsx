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
    <div className="content-area">

      {/* ✅ ADDED CLEAN GLOBAL STYLING */}
      <style>{`
        .content-area {
          padding: 25px;
          background: #f1f5f9;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .page-subtitle {
          color: #64748b;
          margin-bottom: 30px;
        }

        .grid-2x2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        /* ✨ hover lift + glow */
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        /* subtle glowing border */
        .stat-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 18px;
          padding: 1px;
          background: linear-gradient(120deg, transparent, rgba(59,130,246,0.3), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: 0.3s;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .icon-box {
          border-radius: 12px;
          padding: 10px;
          font-size: 18px;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          margin: 12px 0;
          color: #0f172a;
        }

        .stat-label {
          font-size: 13px;
          color: #64748b;
        }

        .stat-breakdown {
          margin-top: 10px;
          font-size: 12px;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        /* ACTION BUTTONS */
        .grid-actions {
          margin-top: 40px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 12px 18px;
          border-radius: 12px;
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .action-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 25px rgba(0,0,0,0.2);
        }

        .blue { background: #3b82f6; box-shadow: 0 6px 15px rgba(59,130,246,0.35); }
        .purple { background: #9333ea; box-shadow: 0 6px 15px rgba(147,51,234,0.35); }
        .green { background: #16a34a; box-shadow: 0 6px 15px rgba(22,163,74,0.35); }

      `}</style>

      <h2 className="page-title">Dashboard Overview</h2>

      <p className="page-subtitle">
        Complete system visibility and key metrics
      </p>

      <div className="grid-2x2">

        {/* USERS */}
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="icon-box" style={{ background: '#e0f2fe', color: '#0ea5e9' }}>👥</div>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>↗</span>
          </div>

          <div className="stat-number">{totalUsersCount}</div>
          <div className="stat-label">Total Users</div>

          <div className="stat-breakdown">
            <div className="stat-row"><span>Admins</span><strong>{adminCount}</strong></div>
            <div className="stat-row"><span>Managers</span><strong>{managerCount}</strong></div>
            <div className="stat-row"><span>Agents</span><strong>{agentCount}</strong></div>
            <div className="stat-row"><span>Users</span><strong>{normalUserCount}</strong></div>
          </div>
        </div>

        {/* DEPARTMENTS */}
        <div className="stat-card">
          <div className="icon-box" style={{ background: '#f3e8ff', color: '#c026d3' }}>🏢</div>

          <div className="stat-number">{depts.length}</div>
          <div className="stat-label">Total Departments</div>

          <div className="stat-breakdown">
            <div className="stat-row"><span>Active</span><strong>{activeDepts}</strong></div>
            <div className="stat-row"><span>Inactive</span><strong>{inactiveDepts}</strong></div>
          </div>
        </div>

        {/* TEAMS */}
        <div className="stat-card">
          <div className="icon-box" style={{ background: '#dcfce7', color: '#16a34a' }}>🧑‍🤝‍🧑</div>

          <div className="stat-number">{totalTeamsCount}</div>
          <div className="stat-label">Total Teams</div>
        </div>

        {/* HEALTH */}
        <div className="stat-card">
          <div className="icon-box" style={{ background: '#dcfce7', color: '#16a34a' }}>📈</div>

          <div className="stat-number">98.5%</div>
          <div className="stat-label">System Health</div>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="grid-actions">

        <Link to="/superadmin/admins">
          <button className="action-btn blue">Manage Admins</button>
        </Link>

        <Link to="/superadmin/departments">
          <button className="action-btn purple">Manage Departments</button>
        </Link>

        <Link to="/superadmin/system">
          <button className="action-btn green">System Settings</button>
        </Link>

      </div>

    </div>
  );
};

export default SuperAdminDashboard;
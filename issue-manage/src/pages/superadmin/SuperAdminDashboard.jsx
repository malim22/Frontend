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
      <h2 className="page-title" style={{ fontSize: '24px' }}>Dashboard Overview</h2>
      <p className="page-subtitle" style={{ marginBottom: '32px' }}>Complete system visibility and key metrics</p>

      <div className="grid-2x2">
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="icon-box" style={{ background: '#e0f2fe', color: '#0ea5e9' }}>👥</div>
            <span style={{ color: '#10b981', fontSize: '20px', fontWeight: 'bold' }}>↗</span>
          </div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '28px', color: '#0f172a' }}>{totalUsersCount}</h2>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 24px 0' }}>Total Users</p>

          <div style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Admins</span> <strong>{adminCount}</strong>
          </div>
          <div style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Managers</span> <strong>{managerCount}</strong>
          </div>
          <div style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Agents</span> <strong>{agentCount}</strong>
          </div>
          <div style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Users</span> <strong>{normalUserCount}</strong>
          </div>
        </div>

        <div className="stat-card" style={{ background: '#fff', border: '1px solid #f1f5f9' }}>
          <div className="icon-box" style={{ background: '#f3e8ff', color: '#c026d3' }}>🏢</div>
          <h2 style={{ fontSize: '28px' }}>{depts.length}</h2>
          <p>Total Departments</p>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Active</span> <strong>{activeDepts}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Inactive</span> <strong>{inactiveDepts}</strong>
          </div>
        </div>

        <div className="stat-card" style={{ background: '#fff', border: '1px solid #f1f5f9' }}>
          <div className="icon-box" style={{ background: '#dcfce7', color: '#16a34a' }}>🧑‍🤝‍🧑</div>
          <h2 style={{ fontSize: '28px' }}>{totalTeamsCount}</h2>
          <p>Total Teams</p>
        </div>

        <div className="stat-card" style={{ background: '#fff', border: '1px solid #f1f5f9' }}>
          <div className="icon-box" style={{ background: '#dcfce7', color: '#16a34a' }}>📈</div>
          <h2 style={{ fontSize: '28px' }}>98.5%</h2>
          <p>System Health</p>
        </div>
      </div>

      {/* ❗ FIXED LINKS (IMPORTANT) */}
      <div className="grid-actions">
        <div className="action-card bg-blue-gradient">
          <Link to="/superadmin/admins"><button>Manage Admins</button></Link>
        </div>

        <div className="action-card bg-purple-gradient">
          <Link to="/superadmin/departments"><button>Manage Departments</button></Link>
        </div>

        <div className="action-card bg-green-gradient">
          <Link to="/superadmin/system"><button>System Settings</button></Link>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
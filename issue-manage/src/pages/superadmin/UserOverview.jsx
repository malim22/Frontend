import React, { useState } from 'react';

const UserOverview = ({ users = [], setUsers, addLog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'ACTIVE').length;
  const lockedUsers = users.filter(u => u.status === 'LOCKED').length;
  const pendingUsers = users.filter(u => u.status === 'PENDING').length;

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All Statuses' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getInitials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const getAvatarColor = (name = '') => {
    const colors = ['#2563eb', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b'];
    return colors[name.length % colors.length];
  };

  const getRoleBadgeStyle = (role) => {
    switch(role) {
      case 'ADMIN': return { background: '#eff6ff', color: '#2563eb' };
      case 'MANAGER': return { background: '#f3e8ff', color: '#9333ea' };
      case 'AGENT': return { background: '#e0f2fe', color: '#0284c7' };
      case 'USER': return { background: '#fef3c7', color: '#d97706' };
      default: return { background: '#f1f5f9', color: '#64748b' };
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'ACTIVE': return { background: '#dcfce7', color: '#16a34a' };
      case 'LOCKED': return { background: '#fee2e2', color: '#dc2626' };
      case 'PENDING': return { background: '#fef3c7', color: '#d97706' };
      default: return { background: '#f1f5f9', color: '#64748b' };
    }
  };

  const toggleStatus = (id, currentStatus, email) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));

    // ✅ safe usage (no ESLint error + no crash)
    addLog?.(
      `ACCOUNT ${newStatus}`,
      `User: ${email}`,
      `Status manually changed to ${newStatus}`
    );
  };

  return (
    <div className="content-area">
      <style>{`
        .content-area {
          padding: 20px;
          background: #f8fafc;
          min-height: 100vh;
        }

        .grid-2x2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .icon-box {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .search-wrapper {
          position: relative;
        }

        .search-wrapper svg {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          color: #94a3b8;
        }

        .search-wrapper input,
        .search-wrapper select {
          width: 100%;
          padding: 10px 10px 10px 36px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          outline: none;
        }

        .table-container {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 14px;
          text-align: left;
        }

        th {
          background: #f1f5f9;
          font-size: 12px;
          color: #64748b;
        }

        tr:not(:last-child) {
          border-bottom: 1px solid #f1f5f9;
        }

        .avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin-right: 10px;
        }

        .badge {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
        }
      `}</style>

      <h2>User Overview</h2>

      {/* Stats */}
      <div className="grid-2x2">
        <div className="stat-card">Total: {totalUsers}</div>
        <div className="stat-card">Active: {activeUsers}</div>
        <div className="stat-card">Locked: {lockedUsers}</div>
        <div className="stat-card">Pending: {pendingUsers}</div>
      </div>

      {/* Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        <input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option>All Roles</option>
          <option>ADMIN</option>
          <option>MANAGER</option>
          <option>AGENT</option>
          <option>USER</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Statuses</option>
          <option>ACTIVE</option>
          <option>LOCKED</option>
          <option>PENDING</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>USER</th>
              <th>ROLE</th>
              <th>DEPARTMENT</th>
              <th>STATUS</th>
              <th>LAST ACTIVE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="avatar-circle" style={{ backgroundColor: getAvatarColor(u.name) }}>
                        {getInitials(u.name)}
                      </div>
                      <div>
                        <strong>{u.name}</strong><br/>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge" style={getRoleBadgeStyle(u.role)}>{u.role}</span></td>
                  <td>{u.dept}</td>
                  <td><span className="badge" style={getStatusBadgeStyle(u.status)}>{u.status}</span></td>
                  <td>{u.lastActive}</td>
                  <td>
                    <button onClick={() => toggleStatus(u.id, u.status, u.email)}>
                      {u.status === 'ACTIVE' ? 'Lock' : 'Unlock'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOverview;
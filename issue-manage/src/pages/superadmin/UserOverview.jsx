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
    switch (role) {
      case 'ADMIN': return { background: '#eff6ff', color: '#2563eb' };
      case 'MANAGER': return { background: '#f3e8ff', color: '#9333ea' };
      case 'AGENT': return { background: '#e0f2fe', color: '#0284c7' };
      case 'USER': return { background: '#fef3c7', color: '#d97706' };
      default: return { background: '#f1f5f9', color: '#64748b' };
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
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
    padding: 24px;
    background: linear-gradient(135deg, #f8fafc, #eef2ff);
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 20px;
  }

  .grid-2x2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: #fff;
    border-radius: 16px;
    padding: 22px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
    font-weight: 600;
    font-size: 15px;
    color: #334155;
    transition: all 0.25s ease;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  }

  /* FILTERS */
  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
  }

  input, select {
    width: 100%;
    padding: 11px 14px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    background: #fff;
    font-size: 14px;
    transition: 0.25s;
  }

  input:focus, select:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }

  /* TABLE */
  .table-container {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 16px;
    text-align: left;
  }

  th {
    background: #f1f5f9;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    letter-spacing: 0.5px;
  }

  tr:not(:last-child) {
    border-bottom: 1px solid #f1f5f9;
  }

  tr:hover {
    background: #f8fafc;
    transition: 0.2s;
  }

  /* USER CELL */
  .avatar-circle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    margin-right: 12px;
    font-size: 14px;
  }

  /* BADGES */
  .badge {
    padding: 5px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
  }

  /* BUTTON */
  button {
    padding: 6px 12px;
    border-radius: 8px;
    border: none;
    background: #3b82f6;
    color: white;
    cursor: pointer;
    font-size: 12px;
    transition: 0.25s;
    box-shadow: 0 5px 12px rgba(59,130,246,0.25);
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 18px rgba(59,130,246,0.35);
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
                        <strong>{u.name}</strong><br />
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
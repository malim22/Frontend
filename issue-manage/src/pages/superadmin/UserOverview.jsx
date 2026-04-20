import React, { useState } from 'react';

const UserOverview = ({ users, setUsers, addLog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'ACTIVE').length;
  const lockedUsers = users.filter(u => u.status === 'LOCKED').length;
  const pendingUsers = users.filter(u => u.status === 'PENDING').length;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All Statuses' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name) => {
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
    addLog(`ACCOUNT ${newStatus}`, `User: ${email}`, `Status manually changed to ${newStatus}`);
  };

  return (
    <div className="content-area">
      <div style={{ marginBottom: '24px' }}>
        <h2 className="page-title" style={{ fontSize: '24px', margin: 0 }}>User Overview</h2>
        <p className="page-subtitle" style={{ margin: 0 }}>View and manage all user accounts across the system</p>
      </div>

      <div className="grid-2x2">
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#eff6ff', color: '#3b82f6', marginBottom: 0 }}>👥</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{totalUsers}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Total Users</p></div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#dcfce7', color: '#16a34a', marginBottom: 0 }}>🔓</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{activeUsers}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Active</p></div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#fee2e2', color: '#dc2626', marginBottom: 0 }}>🔒</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{lockedUsers}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Locked</p></div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#fef3c7', color: '#d97706', marginBottom: 0 }}>👤</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{pendingUsers}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Pending</p></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        <div className="search-wrapper" style={{ margin: 0 }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="search-wrapper" style={{ margin: 0 }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid #e5e7eb', borderRadius: '8px', outline: 'none', appearance: 'none', background: '#fff' }}>
            <option value="All Roles">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="AGENT">Agent</option>
            <option value="USER">User</option>
          </select>
        </div>

        <div className="search-wrapper" style={{ margin: 0 }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid #e5e7eb', borderRadius: '8px', outline: 'none', appearance: 'none', background: '#fff' }}>
            <option value="All Statuses">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="LOCKED">Locked</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

      </div>

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
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No users found matching your filters.</td></tr>
            ) : (
              filteredUsers.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="avatar-circle" style={{ backgroundColor: getAvatarColor(u.name) }}>{getInitials(u.name)}</div>
                      <div><strong style={{ color: '#0f172a' }}>{u.name}</strong><br/><span style={{ fontSize: '12px', color: '#64748b' }}>{u.email}</span></div>
                    </div>
                  </td>
                  <td><span className="badge" style={getRoleBadgeStyle(u.role)}>{u.role}</span></td>
                  <td>{u.dept}</td>
                  <td><span className="badge" style={getStatusBadgeStyle(u.status)}>{u.status}</span></td>
                  <td style={{ color: '#64748b', fontSize: '13px' }}>{u.lastActive}</td>
                  <td>
                    <button 
                      onClick={() => toggleStatus(u.id, u.status, u.email)}
                      style={{ color: u.status === 'ACTIVE' ? '#ef4444' : '#10b981', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {u.status === 'ACTIVE' ? '🔒 Lock' : '🔓 Unlock'}
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
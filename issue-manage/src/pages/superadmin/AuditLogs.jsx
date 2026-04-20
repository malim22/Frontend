import React, { useState } from 'react';

const AuditLogs = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All Actions');

  const totalLogs = logs.length;
  const createdLogs = logs.filter(l => l.action.includes('CREATED') || l.action.includes('ADDED')).length;
  const modifiedLogs = logs.filter(l => l.action.includes('CHANGED') || l.action.includes('EDITED') || l.action.includes('UPDATED')).length;
  const securityEvents = logs.filter(l => l.action.includes('LOCKED') || l.action.includes('LOGIN') || l.action.includes('DELETED')).length;

  const filteredLogs = logs.filter(log => {
    const searchString = `${log.user} ${log.action} ${log.resource} ${log.details}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'All Actions' || log.action.includes(actionFilter);
    return matchesSearch && matchesAction;
  });

  const getInitials = (name) => {
    if (!name || name === 'System') return 'SY';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name) => {
    if (name === 'System') return '#64748b';
    const colors = ['#2563eb', '#c026d3', '#ea580c', '#059669'];
    return colors[name.length % colors.length];
  };

  const getActionBadgeStyle = (action) => {
    if (action.includes('CREATED') || action.includes('ACTIVE')) return { background: '#dcfce7', color: '#16a34a' }; 
    if (action.includes('CHANGED') || action.includes('EDITED')) return { background: '#eff6ff', color: '#2563eb' }; 
    if (action.includes('LOCKED') || action.includes('DELETED') || action.includes('INACTIVE')) return { background: '#ffedd5', color: '#ea580c' }; 
    return { background: '#f1f5f9', color: '#64748b' }; 
  };

  const handleExport = () => {
    alert("Exporting logs to CSV format...");
  };

  return (
    <div className="content-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 className="page-title" style={{ fontSize: '24px', margin: 0 }}>Audit Logs</h2>
          <p className="page-subtitle" style={{ margin: 0 }}>Complete system activity trail and security monitoring</p>
        </div>
        <button className="btn-primary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Logs
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#eff6ff', color: '#3b82f6', marginBottom: 0 }}>📄</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{totalLogs}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Total Logs</p></div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#dcfce7', color: '#16a34a', marginBottom: 0 }}>📄</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{createdLogs}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Created</p></div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#eff6ff', color: '#3b82f6', marginBottom: 0 }}>📄</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{modifiedLogs}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Modified</p></div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#ffedd5', color: '#ea580c', marginBottom: 0 }}>📄</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{securityEvents}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Security Events</p></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div className="search-wrapper" style={{ margin: 0 }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search logs by user, action, or resource..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="search-wrapper" style={{ margin: 0 }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid #e5e7eb', borderRadius: '8px', outline: 'none', appearance: 'none', background: '#fff' }}>
            <option value="All Actions">All Actions</option>
            <option value="CREATED">Created</option>
            <option value="CHANGED">Changed / Edited</option>
            <option value="LOCKED">Locked / Disabled</option>
            <option value="DELETED">Deleted</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table style={{ minWidth: '800px' }}>
          <thead>
            <tr>
              <th>TIMESTAMP</th>
              <th>USER</th>
              <th>ACTION</th>
              <th>RESOURCE</th>
              <th>DETAILS</th>
              <th>IP ADDRESS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No logs found.</td></tr>
            ) : (
              filteredLogs.map(log => (
                <tr key={log.id}>
                  <td style={{ color: '#64748b', fontSize: '13px' }}>{log.time}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="avatar-circle" style={{ backgroundColor: getAvatarColor(log.user), width: '28px', height: '28px', fontSize: '11px', marginRight: '8px' }}>
                        {getInitials(log.user)}
                      </div>
                      <strong style={{ color: '#0f172a' }}>{log.user}</strong>
                    </div>
                  </td>
                  <td><span className="badge" style={getActionBadgeStyle(log.action)}>{log.action}</span></td>
                  <td style={{ fontSize: '13px', color: '#334155' }}>{log.resource}</td>
                  <td style={{ fontSize: '13px', color: '#475569' }}>{log.details}</td>
                  <td style={{ fontSize: '12px', color: '#94a3b8' }}>{log.ipAddress || '192.168.1.45'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#eff6ff', color: '#1e40af', fontSize: '12px', borderTop: '1px solid #bfdbfe' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <div>
            <strong style={{ display: 'block', fontSize: '14px', marginBottom: '2px' }}>Audit Log Retention</strong>
            All audit logs are retained for 90 days for compliance purposes. Super admins can export logs for external archiving. Critical security events are permanently stored.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
import React, { useState } from 'react';

const AdminManagement = ({ admins, setAdmins, addLog }) => {
  const [showModal, setShowModal] = useState(false);
  // privileges साठी आता array [] वापरला आहे जेणेकरून अनेक ऑप्शन्स निवडता येतील
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', privileges: [] });
  const [searchTerm, setSearchTerm] = useState('');

  // स्टॅट्स मोजण्यासाठी
  const totalAdmins = admins.length;
  const activeAdmins = admins.filter(a => a.status === 'ACTIVE').length;
  const inactiveAdmins = admins.filter(a => a.status === 'INACTIVE').length;

  // सर्च फिल्टर
  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // चेकबॉक्सवर क्लिक केल्यावर प्रिव्हिलेज ॲड/रिमूव्ह करण्यासाठी लॉजिक
  const handleCheckboxChange = (privilege) => {
    setNewAdmin(prev => {
      if (prev.privileges.includes(privilege)) {
        // जर आधीच सिलेक्ट असेल तर काढून टाका
        return { ...prev, privileges: prev.privileges.filter(p => p !== privilege) };
      } else {
        // नसेल तर ॲड करा
        return { ...prev, privileges: [...prev.privileges, privilege] };
      }
    });
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    if (newAdmin.privileges.length === 0) {
      alert("Please select at least one privilege.");
      return;
    }
    const adminObj = {
      id: Date.now(),
      name: newAdmin.name,
      email: newAdmin.email,
      privileges: newAdmin.privileges, // सिलेक्ट केलेले सर्व प्रिव्हिलेजेस
      status: 'ACTIVE',
      lastLogin: new Date().toLocaleString()
    };
    setAdmins([adminObj, ...admins]);
    addLog('ADMIN CREATED', `User: ${newAdmin.email}`, 'New admin account created');
    setShowModal(false);
    setNewAdmin({ name: '', email: '', privileges: [] });
  };

  const toggleStatus = (id, currentStatus, email) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setAdmins(admins.map(a => a.id === id ? { ...a, status: newStatus } : a));
    addLog(`ADMIN ${newStatus}`, `Admin: ${email}`, `Status changed to ${newStatus}`);
  };

  const deleteAdmin = (id, email) => {
    if (window.confirm(`Are you sure you want to delete ${email}?`)) {
      setAdmins(admins.filter(a => a.id !== id));
      addLog('ADMIN DELETED', `Admin: ${email}`, 'Admin account deleted permanently');
    }
  };

  const getAvatarColor = (name) => {
    const colors = ['#2563eb', '#c026d3', '#059669', '#ea580c', '#4f46e5'];
    return colors[name.length % colors.length];
  };

  return (
    <div className="content-area">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 className="page-title" style={{ fontSize: '20px', margin: 0 }}>Admin Management</h2>
          <p className="page-subtitle" style={{ margin: 0 }}>Create, view, and manage administrator accounts</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Create Admin</button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#eff6ff', color: '#3b82f6', marginBottom: 0 }}>🛡️</div>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{totalAdmins}</h2>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Total Admins</p>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#dcfce7', color: '#16a34a', marginBottom: 0 }}>✅</div>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{activeAdmins}</h2>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Active</p>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#f1f5f9', color: '#64748b', marginBottom: 0 }}>ⓧ</div>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{inactiveAdmins}</h2>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Inactive</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-wrapper">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Search admins by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {/* Admin Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr><th>ADMIN</th><th>PRIVILEGES</th><th>STATUS</th><th>LAST LOGIN</th><th>ACTIONS</th></tr>
          </thead>
          <tbody>
            {filteredAdmins.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No admins found.</td></tr>
            ) : (
              filteredAdmins.map(admin => (
                <tr key={admin.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="avatar-circle" style={{ backgroundColor: getAvatarColor(admin.name) }}>{getInitials(admin.name)}</div>
                      <div><strong style={{ color: '#0f172a' }}>{admin.name}</strong><br/><span style={{ fontSize: '12px', color: '#64748b' }}>{admin.email}</span></div>
                    </div>
                  </td>
                  <td>
                    {admin.privileges.map((p, index) => (<span key={index} className="privilege-badge">{p}</span>))}
                  </td>
                  <td>
                    <span className="badge" style={{ background: admin.status === 'ACTIVE' ? '#dcfce7' : '#f1f5f9', color: admin.status === 'ACTIVE' ? '#16a34a' : '#64748b' }}>
                      {admin.status}
                    </span>
                  </td>
                  <td style={{ color: '#64748b', fontSize: '13px' }}>{admin.lastLogin}</td>
                  <td>
                    <button onClick={() => toggleStatus(admin.id, admin.status, admin.email)} style={{ color: admin.status === 'ACTIVE' ? '#ea580c' : '#10b981', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '500', marginRight: '16px' }}>{admin.status === 'ACTIVE' ? 'Disable' : 'Enable'}</button>
                    <button onClick={() => deleteAdmin(admin.id, admin.email)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE ADMIN MODAL (तुमच्या फोटोप्रमाणे अपडेट केलेला) */}
      {showModal && (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-content" style={{ padding: '32px', maxWidth: '400px', borderRadius: '12px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '20px', color: '#0f172a' }}>Create New Admin</h3>
            
            <form onSubmit={handleCreateAdmin}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#475569', fontWeight: '500' }}>Full Name</label>
                <input required type="text" placeholder="Enter full name" style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', outline: 'none' }} value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#475569', fontWeight: '500' }}>Email Address</label>
                <input required type="email" placeholder="admin@resolvegrid.com" style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', outline: 'none' }} value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontSize: '12px', color: '#475569', fontWeight: '500' }}>Privileges</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['USER MANAGEMENT', 'DEPARTMENT MANAGEMENT', 'SYSTEM CONFIG', 'AUDIT LOGS'].map(priv => (
                    <label key={priv} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={newAdmin.privileges.includes(priv)} 
                        onChange={() => handleCheckboxChange(priv)} 
                        style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2563eb' }} 
                      />
                      {priv}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#475569', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', background: '#2563eb', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>Create Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
import React, { useState, useEffect } from 'react';

const AdminManagement = ({
  admins = [],
  setAdmins = () => { },
  addLog = () => { }
}) => {

  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', privileges: [] });
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ FIX: no empty block
  useEffect(() => {
    try {
      const saved = localStorage.getItem("admins");
      if (saved && typeof setAdmins === "function") {
        setAdmins(JSON.parse(saved));
      }
    } catch (err) {
      console.warn("localStorage load failed", err);
    }
  }, [setAdmins]);

  useEffect(() => {
    try {
      localStorage.setItem("admins", JSON.stringify(admins));
    } catch (err) {
      console.warn("localStorage save failed", err);
    }
  }, [admins]);

  const totalAdmins = admins.length;
  const activeAdmins = admins.filter(a => a.status === 'ACTIVE').length;
  const inactiveAdmins = admins.filter(a => a.status === 'INACTIVE').length;

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ NOW USED → no eslint error
  const getInitials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const getAvatarColor = (name = '') => {
    const colors = ['#2563eb', '#c026d3', '#059669', '#ea580c'];
    return colors[name.length % colors.length];
  };

  const handleCheckboxChange = (privilege) => {
    setNewAdmin(prev => ({
      ...prev,
      privileges: prev.privileges.includes(privilege)
        ? prev.privileges.filter(p => p !== privilege)
        : [...prev.privileges, privilege]
    }));
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();

    if (!newAdmin.name || !newAdmin.email) {
      alert("Fill all fields");
      return;
    }

    if (newAdmin.privileges.length === 0) {
      alert("Select privilege");
      return;
    }

    const adminObj = {
      id: Date.now(),
      name: newAdmin.name,
      email: newAdmin.email,
      privileges: newAdmin.privileges,
      status: 'ACTIVE',
      lastLogin: new Date().toLocaleString()
    };

    setAdmins(prev => [adminObj, ...prev]);
    addLog('ADMIN CREATED', newAdmin.email, 'Created');

    setShowModal(false);
    setNewAdmin({ name: '', email: '', privileges: [] });
  };

  const toggleStatus = (id, status, email) => {
    const newStatus = status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setAdmins(admins.map(a => a.id === id ? { ...a, status: newStatus } : a));
    addLog('STATUS CHANGE', email, newStatus);
  };

  const deleteAdmin = (id, email) => {
    if (window.confirm("Delete?")) {
      setAdmins(admins.filter(a => a.id !== id));
      addLog('DELETE', email, 'Deleted');
    }
  };

  return (
    <div className="content-area">

      {/* ✅ CLEAN STYLING */}
      <style>{`
  .content-area {
    padding: 30px;
    background: #f4f7fb;
    min-height: 100vh;
    font-family: Inter, system-ui, -apple-system, sans-serif;
    color: #1e293b;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.3px;
  }

  /* ---------- STATS CARDS ---------- */
  .stats {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
  }

  .card {
    background: #fff;
    padding: 20px 22px;
    border-radius: 16px;
    min-width: 150px;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    gap: 6px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
    border: 1px solid #eef2f7;
    transition: all 0.25s ease;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.08);
  }

  /* ---------- SEARCH ---------- */
  input {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    font-size: 14px;
    width: 260px;
    margin-bottom: 18px;
    transition: 0.2s ease;
  }

  input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    outline: none;
  }

  /* ---------- TABLE ---------- */
  .table-container {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #eef2f7;
    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    background: #f8fafc;
  }

  th, td {
    padding: 16px 18px;
  }

  td {
    font-size: 14px;
    color: #334155;
  }

  tr {
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.2s ease;
  }

  tr:hover {
    background: #f9fbff;
  }

  /* ---------- USER CELL ---------- */
  td:first-child {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 12px; /* softer square instead of circle = modern */
    font-size: 13px;
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ---------- BUTTONS ---------- */
  button {
    font-size: 13px;
    padding: 7px 12px;
    border-radius: 8px;
    border: none;
    margin-right: 6px;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  button:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }

  .primary-btn {
    background: #2563eb;
    color: #fff;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 14px;
  }

  .primary-btn:hover {
    background: #1d4ed8;
  }

  /* ---------- MODAL ---------- */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    background: #fff;
    padding: 26px;
    border-radius: 18px;
    width: 380px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    animation: slideUp 0.25s ease;
  }

  .modal input {
    width: 100%;
  }

  .modal button[type="submit"] {
    background: #2563eb;
    color: white;
  }

  .modal button[type="button"] {
    background: #e2e8f0;
  }

  label {
    font-size: 13px;
    color: #475569;
  }

  /* ---------- ANIMATION ---------- */
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`}</style>
      {/* HEADER */}
      <div className="header">
        <h2>Admin Management</h2>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + Create Admin
        </button>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="card">Total: {totalAdmins}</div>
        <div className="card">Active: {activeAdmins}</div>
        <div className="card">Inactive: {inactiveAdmins}</div>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: 10, marginBottom: 15 }}
      />

      {/* TABLE */}
      <div className="table-container">
        <table>
          <tbody>
            {filteredAdmins.length === 0 ? (
              <tr><td>No admins</td></tr>
            ) : (
              filteredAdmins.map(a => (
                <tr key={a.id}>
                  <td style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      className="avatar"
                      style={{ background: getAvatarColor(a.name) }}
                    >
                      {getInitials(a.name)}
                    </div>
                    {a.name}
                  </td>
                  <td>{a.email}</td>
                  <td>{a.status}</td>
                  <td>
                    <button onClick={() => toggleStatus(a.id, a.status, a.email)}>Toggle</button>
                    <button onClick={() => deleteAdmin(a.id, a.email)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <form onSubmit={handleCreateAdmin} className="modal">
            <input
              placeholder="Name"
              value={newAdmin.name}
              onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })}
            />
            <input
              placeholder="Email"
              value={newAdmin.email}
              onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
            />

            {['USER MANAGEMENT', 'SYSTEM CONFIG'].map(p => (
              <label key={p}>
                <input
                  type="checkbox"
                  checked={newAdmin.privileges.includes(p)}
                  onChange={() => handleCheckboxChange(p)}
                />
                {p}
              </label>
            ))}

            <button type="submit">Create</button>
            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminManagement;
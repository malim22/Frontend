import React, { useState, useEffect } from 'react';

const AdminManagement = ({
  admins = [],
  setAdmins = () => {},
  addLog = () => {}
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
          padding: 20px;
          background: #f8fafc;
          min-height: 100vh;
          font-family: sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .stats {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .card {
          background: white;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .table-container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          border-bottom: 1px solid #eee;
        }

        tr:hover {
          background: #f1f5f9;
        }

        .avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 10px;
        }

        button {
          cursor: pointer;
        }

        .primary-btn {
          background: #2563eb;
          color: white;
          padding: 10px 15px;
          border-radius: 8px;
          border: none;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 12px;
          width: 350px;
          display: flex;
          flex-direction: column;
          gap: 10px;
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
        onChange={(e)=>setSearchTerm(e.target.value)}
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
                    <button onClick={()=>toggleStatus(a.id,a.status,a.email)}>Toggle</button>
                    <button onClick={()=>deleteAdmin(a.id,a.email)}>Delete</button>
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
              onChange={e=>setNewAdmin({...newAdmin,name:e.target.value})}
            />
            <input
              placeholder="Email"
              value={newAdmin.email}
              onChange={e=>setNewAdmin({...newAdmin,email:e.target.value})}
            />

            {['USER MANAGEMENT','SYSTEM CONFIG'].map(p=>(
              <label key={p}>
                <input
                  type="checkbox"
                  checked={newAdmin.privileges.includes(p)}
                  onChange={()=>handleCheckboxChange(p)}
                />
                {p}
              </label>
            ))}

            <button type="submit">Create</button>
            <button type="button" onClick={()=>setShowModal(false)}>Cancel</button>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminManagement;
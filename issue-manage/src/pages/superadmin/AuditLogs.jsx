import React, { useState, useEffect } from "react";

const AdminManagement = (props) => {

  // ✅ FIX: initialize from localStorage (NO setState in effect)
  const [admins, setAdmins] = useState(() => {
    try {
      const saved = localStorage.getItem("admins");
      return saved ? JSON.parse(saved) : (props.admins || []);
    } catch {
      return props.admins || [];
    }
  });

  const addLog = props.addLog || (() => {});
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", privileges: [] });
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ ONLY SAVE (no setState here)
  useEffect(() => {
    localStorage.setItem("admins", JSON.stringify(admins));
  }, [admins]);

  const totalAdmins = admins.length;
  const activeAdmins = admins.filter(a => a.status === "ACTIVE").length;
  const inactiveAdmins = admins.filter(a => a.status === "INACTIVE").length;

  const filteredAdmins = admins.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name = "") =>
    name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  const getAvatarColor = (name = "") => {
    const colors = ["#2563eb", "#c026d3", "#059669", "#ea580c"];
    return colors[name.length % colors.length];
  };

  const handleCheckboxChange = (priv) => {
    setNewAdmin(prev => ({
      ...prev,
      privileges: prev.privileges.includes(priv)
        ? prev.privileges.filter(p => p !== priv)
        : [...prev.privileges, priv]
    }));
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();

    if (!newAdmin.name || !newAdmin.email) return alert("Fill all fields");
    if (newAdmin.privileges.length === 0) return alert("Select privilege");

    const obj = {
      id: Date.now(),
      name: newAdmin.name,
      email: newAdmin.email,
      privileges: newAdmin.privileges,
      status: "ACTIVE",
      lastLogin: new Date().toLocaleString()
    };

    setAdmins(prev => [obj, ...prev]);
    addLog("ADMIN CREATED", newAdmin.email, "created");

    setShowModal(false);
    setNewAdmin({ name: "", email: "", privileges: [] });
  };

  const toggleStatus = (id, status, email) => {
    const newStatus = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setAdmins(admins.map(a => a.id === id ? { ...a, status: newStatus } : a));
    addLog("STATUS", email, newStatus);
  };

  const deleteAdmin = (id, email) => {
    if (window.confirm("Delete?")) {
      setAdmins(admins.filter(a => a.id !== id));
      addLog("DELETE", email, "deleted");
    }
  };

  return (
    <div className="admin-page">

      {/* ✅ STYLING */}
      <style>{`
        .admin-page {
          padding: 20px;
          background: #f8fafc;
          min-height: 100vh;
          font-family: sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .card-box {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.05);
        }

        input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          margin-bottom: 15px;
          width: 250px;
        }

        table {
          width: 100%;
          background: white;
          border-radius: 10px;
          overflow: hidden;
        }

        td {
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
          margin-right: 10px;
        }

        button {
          margin-right: 5px;
          cursor: pointer;
        }

        .btn {
          background: #2563eb;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
        }

        .modal-bg {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>

      <div className="header">
        <h2>Admin Management</h2>
        <button className="btn" onClick={() => setShowModal(true)}>
          + Create
        </button>
      </div>

      <div className="card-box">
        <div className="card">Total: {totalAdmins}</div>
        <div className="card">Active: {activeAdmins}</div>
        <div className="card">Inactive: {inactiveAdmins}</div>
      </div>

      <input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
      />

      <table>
        <tbody>
          {filteredAdmins.length === 0 ? (
            <tr><td>No admins</td></tr>
          ) : (
            filteredAdmins.map(a => (
              <tr key={a.id}>
                <td style={{ display: "flex", alignItems: "center" }}>
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

      {showModal && (
        <div className="modal-bg">
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

            {["USER MANAGEMENT","SYSTEM CONFIG"].map(p=>(
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
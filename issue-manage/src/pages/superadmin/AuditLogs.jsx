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

  const addLog = props.addLog || (() => { });
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
    padding: 28px;
    background: #f4f7fb;
    min-height: 100vh;
    font-family: Inter, system-ui, -apple-system, sans-serif;
    color: #1e293b;
  }

  /* ---------- HEADER ---------- */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
  }

  .header h2 {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.3px;
  }

  /* ---------- BUTTON ---------- */
  .btn {
    background: #2563eb;
    color: white;
    padding: 10px 16px;
    border-radius: 10px;
    border: none;
    font-size: 14px;
    font-weight: 500;
    transition: 0.2s ease;
  }

  .btn:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  /* ---------- CARDS ---------- */
  .card-box {
    display: flex;
    gap: 18px;
    margin-bottom: 24px;
  }

  .card {
    background: #fff;
    padding: 18px 20px;
    border-radius: 14px;
    min-width: 140px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    gap: 6px;
    border: 1px solid #eaeef4;
    box-shadow: 0 6px 18px rgba(0,0,0,0.05);
    transition: 0.25s ease;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.08);
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
  table {
    width: 100%;
    background: #fff;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #eaeef4;
    box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  }

  td {
    padding: 16px 18px;
    border-bottom: 1px solid #f1f5f9;
    font-size: 14px;
    color: #334155;
  }

  tr {
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
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ---------- ACTION BUTTONS ---------- */
  td button {
    font-size: 13px;
    padding: 6px 10px;
    border-radius: 8px;
    border: none;
    margin-right: 6px;
    background: #e2e8f0;
    transition: 0.2s ease;
  }

  td button:hover {
    background: #cbd5f5;
  }

  /* ---------- MODAL ---------- */
  .modal-bg {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #fff;
    padding: 24px;
    border-radius: 16px;
    width: 360px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  }

  .modal input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin: 0;
  cursor: pointer;
}

/* FIX MODAL BUTTONS */
.modal button {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;
}
 .modal button[type="submit"]:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}


  /* CANCEL BUTTON */
.modal button[type="button"] {
  background: #e2e8f0;
  color: #334155;
}
  .modal button[type="button"]:hover {
  background: #cbd5e1;
}

  label {
    font-size: 13px;
    color: #475569;
  }
    /* FIX CHECKBOX ALIGNMENT */
.modal label {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
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
        onChange={(e) => setSearchTerm(e.target.value)}
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
                  <button onClick={() => toggleStatus(a.id, a.status, a.email)}>Toggle</button>
                  <button onClick={() => deleteAdmin(a.id, a.email)}>Delete</button>
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
              onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })}
            />
            <input
              placeholder="Email"
              value={newAdmin.email}
              onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
            />

            {["USER MANAGEMENT", "SYSTEM CONFIG"].map(p => (
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
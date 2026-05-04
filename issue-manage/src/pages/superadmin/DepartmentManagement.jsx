import React, { useState } from 'react';

const DepartmentManagement = ({ depts = [], setDepts}) => {
  const [showModal, setShowModal] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', desc: '', teams: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const totalDepts = depts.length;
  const activeDepts = depts.filter(d => d.status === 'ACTIVE').length;
  const totalTeams = depts.reduce((acc, d) => acc + Number(d.teams || 0), 0);
  const totalMembers = depts.reduce((acc, d) => acc + Number(d.members || 0), 0);

  const filteredDepts = depts.filter(dept =>
    (dept.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dept.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ SAFE ID (no React warning)
  const generateId = () => crypto.randomUUID();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newDept.name) return;

    if (isEditing) {
      setDepts(depts.map(d => d.id === editingId ? {
        ...d,
        name: newDept.name,
        description: newDept.desc,
        teams: newDept.teams
      } : d));
    } else {
      const deptObj = {
        id: generateId(),
        name: newDept.name,
        description: newDept.desc,
        teams: newDept.teams,
        members: 0,
        status: 'ACTIVE',
        created: new Date().toLocaleDateString('en-GB')
      };
      setDepts([deptObj, ...depts]);
    }

    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
    setNewDept({ name: '', desc: '', teams: 0 });
  };

  const openEditModal = (dept) => {
    setIsEditing(true);
    setEditingId(dept.id);
    setNewDept({ name: dept.name, desc: dept.description, teams: dept.teams });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
    setNewDept({ name: '', desc: '', teams: 0 });
  };

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setDepts(depts.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  return (
    <div className="content-area">
      <style>{`
  .content-area {
    padding: 28px;
    background: #f4f7fb;
    min-height: 100vh;
    font-family: Inter, system-ui, -apple-system, sans-serif;
    color: #1e293b;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    letter-spacing: -0.3px;
  }

  /* ---------- GRID ---------- */
  .grid {
    display: grid;
    gap: 20px;
    margin-top: 20px;
  }

  /* ---------- CARDS ---------- */
  .card {
    background: #ffffff;
    padding: 20px 22px;
    border-radius: 16px;
    border: 1px solid #eaeef4;
    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
    transition: all 0.25s ease;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(0,0,0,0.08);
  }

  .card h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .card p {
    font-size: 14px;
    color: #475569;
    margin: 2px 0;
  }

  /* ---------- SEARCH ---------- */
  input, textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    font-size: 14px;
    transition: 0.2s ease;
  }

  input:focus, textarea:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    outline: none;
  }

  textarea {
    resize: none;
    min-height: 80px;
  }

  /* ---------- BUTTONS ---------- */
  button {
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 500;
    margin-right: 6px;
    transition: all 0.2s ease;
  }

  button:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }

  .primary {
    background: #2563eb;
    color: #fff;
  }

  .primary:hover {
    background: #1d4ed8;
  }

  /* ---------- STATUS STYLE ---------- */
  .card p:nth-child(3) {
    font-weight: 500;
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
    animation: fadeIn 0.25s ease;
  }

  .modal-overlay .card {
    width: 380px;
    animation: slideUp 0.25s ease;
  }

  /* ---------- ANIMATIONS ---------- */
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

  @keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
  }

  /* ---------- ADD BUTTON ---------- */
  .content-area > button.primary {
    margin-top: 20px;
    padding: 10px 16px;
    margin-bottom: 25px;
    border-radius: 10px;
    font-size: 14px;
  }
    .grid:first-of-type {
  margin-bottom: 25px;
}
`}</style>

      <h2>Department Management</h2>

      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))'}}>
        <div className="card">Total: {totalDepts}</div>
        <div className="card">Active: {activeDepts}</div>
        <div className="card">Teams: {totalTeams}</div>
        <div className="card">Members: {totalMembers}</div>
      </div>

      <input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
      />

      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))'}}>
        {filteredDepts.length === 0 ? (
          <div>No departments found</div>
        ) : (
          filteredDepts.map(dept => (
            <div key={dept.id} className="card">
              <h3>{dept.name}</h3>
              <p>{dept.description}</p>
              <p>Status: {dept.status}</p>
              <button onClick={()=>toggleStatus(dept.id, dept.status)}>Toggle</button>
              <button onClick={()=>openEditModal(dept)}>Edit</button>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <form className="card" onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              value={newDept.name}
              onChange={e=>setNewDept({...newDept,name:e.target.value})}
            />
            <textarea
              placeholder="Description"
              value={newDept.desc}
              onChange={e=>setNewDept({...newDept,desc:e.target.value})}
            />
            <input
              type="number"
              value={newDept.teams}
              onChange={e=>setNewDept({...newDept,teams:e.target.value})}
            />
            <button type="submit" className="primary">
              {isEditing ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </form>
        </div>
      )}

      <button className="primary" onClick={()=>setShowModal(true)}>+ Add Dept</button>
    </div>
  );
};

export default DepartmentManagement;
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
        .content-area { padding:20px; background:#f8fafc; min-height:100vh; font-family:Arial; }
        .card { background:#fff; padding:20px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.05);}
        input, textarea { width:100%; padding:10px; border-radius:8px; border:1px solid #ccc; margin-bottom:10px;}
        button { cursor:pointer; border:none; border-radius:6px; padding:8px 12px; }
        .primary { background:#2563eb; color:#fff; }
        .grid { display:grid; gap:20px; margin-top:20px; }
        .modal-overlay {
          position:fixed;
          top:0; left:0; right:0; bottom:0;
          background:rgba(0,0,0,0.5);
          display:flex;
          align-items:center;
          justify-content:center;
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
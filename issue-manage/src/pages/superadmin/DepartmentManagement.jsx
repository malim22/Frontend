import React, { useState } from 'react';

const DepartmentManagement = ({ depts, setDepts, addLog }) => {
  const [showModal, setShowModal] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', desc: '', teams: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const totalDepts = depts.length; 
  const activeDepts = depts.filter(d => d.status === 'ACTIVE').length; 
  const totalTeams = depts.reduce((acc, d) => acc + Number(d.teams), 0); 
  const totalMembers = depts.reduce((acc, d) => acc + Number(d.members), 0); 

  const filteredDepts = depts.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setDepts(depts.map(d => d.id === editingId ? {
        ...d,
        name: newDept.name,
        description: newDept.desc,
        teams: newDept.teams
      } : d));
      addLog('DEPARTMENT EDITED', `Dept: ${newDept.name}`, 'Department details manually updated');
    } else {
      const deptObj = {
        id: Date.now(),
        name: newDept.name,
        description: newDept.desc,
        teams: newDept.teams,
        members: 0,
        status: 'ACTIVE',
        created: new Date().toLocaleDateString('en-GB') 
      };
      setDepts([deptObj, ...depts]);
      addLog('DEPARTMENT CREATED', `Dept: ${newDept.name}`, 'New department added');
    }
    
    closeModal();
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

  const toggleStatus = (id, currentStatus, name) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setDepts(depts.map(d => d.id === id ? { ...d, status: newStatus } : d));
    addLog(`DEPARTMENT ${newStatus}`, `Dept: ${name}`, `Status changed to ${newStatus}`);
  };

  return (
    <div className="content-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 className="page-title" style={{ fontSize: '24px', margin: 0 }}>Department Management</h2>
          <p className="page-subtitle" style={{ margin: 0 }}>Create, view, and manage organizational departments</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Create Department</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#f3e8ff', color: '#c026d3', marginBottom: 0 }}>🏢</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{totalDepts}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Total Departments</p></div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#dcfce7', color: '#16a34a', marginBottom: 0 }}>✅</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{activeDepts}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Active</p></div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#eff6ff', color: '#3b82f6', marginBottom: 0 }}>🏛️</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{totalTeams}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Total Teams</p></div>
        </div>
        <div className="stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div className="icon-box" style={{ background: '#ffedd5', color: '#ea580c', marginBottom: 0 }}>🧑‍🤝‍🧑</div>
          <div><h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{totalMembers}</h2><p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Total Members</p></div>
        </div>
      </div>

      <div className="search-wrapper">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Search departments by name or description..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {filteredDepts.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', width: '100%', gridColumn: '1 / -1' }}>No departments found.</div>
        ) : (
          filteredDepts.map(dept => (
            <div key={dept.id} style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="icon-box" style={{ background: '#f3e8ff', color: '#c026d3', width: '40px', height: '40px', fontSize: '20px', marginBottom: 0 }}>🏢</div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#0f172a' }}>{dept.name}</h3>
                    <span className="badge" style={{ background: dept.status === 'ACTIVE' ? '#dcfce7' : '#f1f5f9', color: dept.status === 'ACTIVE' ? '#16a34a' : '#64748b', margin: 0 }}>{dept.status}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => openEditModal(dept)} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
                  title="Edit Department"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>

              </div>
              <p style={{ color: '#475569', fontSize: '14px', margin: '16px 0 24px 0', lineHeight: '1.5' }}>{dept.description}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '48px', marginBottom: '24px' }}>
                <div><span style={{ fontSize: '12px', color: '#64748b' }}>Teams</span><h3 style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#0f172a' }}>{dept.teams}</h3></div>
                <div><span style={{ fontSize: '12px', color: '#64748b' }}>Members</span><h3 style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#0f172a' }}>{dept.members}</h3></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Created: {dept.created}</span>
                <button onClick={() => toggleStatus(dept.id, dept.status, dept.name)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px', color: dept.status === 'ACTIVE' ? '#ef4444' : '#10b981' }}>
                  {dept.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-content" style={{ padding: '32px', maxWidth: '450px', borderRadius: '12px', background: '#fff' }}>
            
            <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '22px', color: '#0f172a', textAlign: 'center' }}>
              {isEditing ? 'Edit Department' : 'Create Department'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#475569', fontWeight: '500', textAlign: 'center' }}>Department Name</label>
                <input required type="text" placeholder="e.g. Finance" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', outline: 'none' }} value={newDept.name} onChange={e => setNewDept({...newDept, name: e.target.value})} />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#475569', fontWeight: '500', textAlign: 'center' }}>Description</label>
                <textarea required placeholder="What does this department do?" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', outline: 'none', minHeight: '100px', fontFamily: 'inherit', resize: 'vertical' }} value={newDept.desc} onChange={e => setNewDept({...newDept, desc: e.target.value})} />
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#475569', fontWeight: '500', textAlign: 'center' }}>Teams Count</label>
                <input required type="number" min="0" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', outline: 'none' }} value={newDept.teams} onChange={e => setNewDept({...newDept, teams: e.target.value})} />
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <button type="button" onClick={closeModal} style={{ flex: 1, padding: '12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#475569', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', background: '#2563eb', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                  {isEditing ? 'Save Changes' : 'Create Dept'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;
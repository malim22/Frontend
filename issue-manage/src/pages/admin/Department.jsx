import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../api"; // ✅ ADDED

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const [selectedDeptId, setSelectedDeptId] = useState(null);

  const [deptName, setDeptName] = useState("");

  const [teamForm, setTeamForm] = useState({
    name: "",
    members: 0
  });

  /* ✅ LOAD FROM BACKEND */
  /* ✅ LOAD FROM BACKEND */
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchWithAuth("/admin/departments");
        // if API returns raw array
        if (Array.isArray(data)) {
          setDepartments(data);
        }

        // if API returns wrapped object like { data: [...] }
        else if (Array.isArray(data?.data)) {
          setDepartments(data.data);
        }

      } catch (err) {
        console.error("Departments API error:", err);
      }
    };

    loadDepartments();
  }, []);
  /* ---------------- ADD DEPARTMENT ---------------- */
  const handleAddDept = async (e) => {
    e.preventDefault();

    if (!deptName.trim()) return;

    try {
      const newDept = await fetchWithAuth("/admin/departments/create", {
        method: "POST",
        body: JSON.stringify({ name: deptName })
      });

      setDepartments([
        ...departments,
        newDept || {
          id: Date.now(),
          name: deptName,
          teams: []
        }
      ]);
    } catch (err) {
      console.error(err);
    }

    setDeptName("");
    setShowDeptModal(false);
  };

  /* ---------------- ADD TEAM ---------------- */
  const handleAddTeam = async (e) => {
    e.preventDefault();

    if (!teamForm.name || selectedDeptId === null) return;

    try {
      const newTeam = await fetchWithAuth("/admin/teams/create", {
        method: "POST",
        body: JSON.stringify({
          name: teamForm.name,
          members: teamForm.members,
          departmentId: selectedDeptId
        })
      });

      setDepartments(
        departments.map((dept) => {
          if (dept.id === selectedDeptId) {
            return {
              ...dept,
              teams: [
                ...dept.teams,
                newTeam || {
                  name: teamForm.name,
                  members: Math.max(0, Number(teamForm.members || 0))
                }
              ]
            };
          }
          return dept;
        })
      );
    } catch (err) {
      console.error(err);
    }

    setTeamForm({ name: "", members: 0 });
    setShowTeamModal(false);
    setSelectedDeptId(null);
  };

  /* ---------------- DELETE DEPT ---------------- */
  const deleteDept = async (id) => {
    try {
      await fetchWithAuth(`/admin/departments/${id}`, {
        method: "DELETE"
      });

      setDepartments(departments.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2>Departments & Teams</h2>
          <p>Manage organizational structure</p>
        </div>

        <div style={styles.actions}>
          <button style={styles.btn} onClick={() => setShowDeptModal(true)}>
            + Add Department
          </button>
        </div>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {departments.length === 0 && (
          <div style={styles.empty}>No departments created yet</div>
        )}

        {departments.map((dept) => (
          <div key={dept.id} style={styles.card}>

            <div style={styles.cardTop}>
              <h3 style={{ margin: 0 }}>{dept.name}</h3>
              <span style={styles.badge}>
                {dept.teams?.length || 0} Teams
              </span>
            </div>

            <div style={styles.teamList}>
              {dept.teams?.map((t, i) => (
                <div key={i} style={styles.teamRow}>
                  <span>{t.name}</span>
                  <span>{t.members}</span>
                </div>
              ))}
            </div>

            <div style={styles.cardActions}>
              <button
                style={styles.smallBtn}
                onClick={() => {
                  setSelectedDeptId(dept.id);
                  setShowTeamModal(true);
                }}
              >
                + Team
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteDept(dept.id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ---------------- DEPT MODAL ---------------- */}
      {showDeptModal && (
        <div style={styles.modal}>
          <form style={styles.form} onSubmit={handleAddDept}>
            <h3>Add Department</h3>

            <input
              placeholder="Department name"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              style={styles.input}
            />

            <button style={styles.btn}>Save</button>

            <button
              type="button"
              onClick={() => setShowDeptModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* ---------------- TEAM MODAL ---------------- */}
      {showTeamModal && (
        <div style={styles.modal}>
          <form style={styles.form} onSubmit={handleAddTeam}>
            <h3>Add Team</h3>

            <input
              placeholder="Team name"
              value={teamForm.name}
              onChange={(e) =>
                setTeamForm({ ...teamForm, name: e.target.value })
              }
              style={styles.input}
            />

            <input
              type="number"
              min="0"
              placeholder="Members"
              value={teamForm.members}
              onChange={(e) =>
                setTeamForm({
                  ...teamForm,
                  members: Math.max(0, Number(e.target.value))
                })
              }
              style={styles.input}
            />

            <button style={styles.btn}>Add Team</button>

            <button
              type="button"
              onClick={() => setShowTeamModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

export default Departments;

/* styles untouched */
const styles = {
  page: {
    padding: 16,
    fontFamily: "sans-serif",
    background: "#f6f7fb",
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15
  },
  actions: { display: "flex", gap: 8 },
  btn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  badge: {
    fontSize: 11,
    background: "#e0e7ff",
    padding: "3px 8px",
    borderRadius: 10
  },
  teamList: { marginTop: 10 },
  teamRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    padding: "4px 0"
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10
  },
  smallBtn: {
    fontSize: 11,
    padding: "5px 8px",
    background: "#dbeafe",
    border: "none",
    borderRadius: 6
  },
  deleteBtn: {
    fontSize: 11,
    padding: "5px 8px",
    background: "#fee2e2",
    border: "none",
    borderRadius: 6
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    background: "#fff",
    padding: 16,
    borderRadius: 10,
    width: 280,
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  input: {
    padding: 8,
    border: "1px solid #ddd",
    borderRadius: 6
  },
  empty: {
    gridColumn: "1/-1",
    textAlign: "center",
    color: "#777"
  }
};
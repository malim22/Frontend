import React, { useState, useEffect } from "react"; // ✅ ADDED
import { fetchWithAuth } from "../../api"; // ✅ ADDED

const SLASettings = () => {
  const [slas, setSlas] = useState([
    { id: 1, level: "P1", label: "Critical", response: 30, resolution: 4 },
    { id: 2, level: "P2", label: "High", response: 60, resolution: 8 },
    { id: 3, level: "P3", label: "Medium", response: 240, resolution: 24 },
    { id: 4, level: "P4", label: "Low", response: 480, resolution: 48 }
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  // ✅ LOAD SLA FROM BACKEND
  /* ✅ LOAD SLA FROM BACKEND */
  useEffect(() => {
    const loadSLA = async () => {
      try {
        const data = await fetchWithAuth("/admin/sla"); // ✅ FIXED

        if (Array.isArray(data)) {
          setSlas(data);
        } else if (Array.isArray(data?.data)) {
          setSlas(data.data);
        }

      } catch (err) {
        console.log("Using default SLA data", err);
      }
    };

    loadSLA();
  }, []);

  /* ---------------- EDIT ---------------- */
  const handleEdit = (sla) => {
    setEditData({ ...sla });
    setEditMode(true);
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    setSlas(
      slas.map((s) => (s.id === editData.id ? editData : s))
    );

    fetchWithAuth(`/admin/sla/update/${editData.id}`, {
      method: "PUT",
      body: JSON.stringify(editData)
    }).catch((err) => {
      console.log("SLA update failed:", err);
    });

    setEditMode(false);
    setEditData(null);
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2>SLA Settings</h2>
          <p>Configure Service Level Agreement parameters</p>
        </div>
      </div>

      {/* SLA CARDS */}
      <div style={styles.grid}>
        {slas.map((sla) => (
          <div key={sla.id} style={styles.card}>

            <h3>{sla.level} - {sla.label}</h3>

            <p>Response: {sla.response} min</p>
            <p>Resolution: {sla.resolution} h</p>

            <button
              style={styles.btn}
              onClick={() => handleEdit(sla)}
            >
              Edit
            </button>

          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editMode && editData && (
        <div style={styles.modal}>
          <div style={styles.form}>

            <h3>Edit SLA Parameters</h3>

            <input
              value={editData.level}
              disabled
              style={styles.input}
            />

            <input
              value={editData.label}
              onChange={(e) =>
                setEditData({ ...editData, label: e.target.value })
              }
              placeholder="Label"
              style={styles.input}
            />

            <input
              type="number"
              min="0"
              value={editData.response}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  response: Math.max(0, Number(e.target.value))
                })
              }
              placeholder="Response (min)"
              style={styles.input}
            />

            <input
              type="number"
              min="0"
              value={editData.resolution}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  resolution: Math.max(0, Number(e.target.value))
                })
              }
              placeholder="Resolution (hours)"
              style={styles.input}
            />

            <div style={styles.row}>
              <button style={styles.btn} onClick={handleSave}>
                Save Changes
              </button>

              <button
                style={styles.cancel}
                onClick={() => {
                  setEditMode(false);
                  setEditData(null);
                }}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SLASettings;

/* ================= MODERN UI ================= */
const styles = {
  page: {
    padding: 16,
    fontFamily: "sans-serif",
    background: "#f6f7fb",
    minHeight: "100vh"
  },

  header: {
    marginBottom: 15
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12
  },

  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },

  btn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    marginTop: 8,
    cursor: "pointer"
  },

  cancel: {
    background: "#eee",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer"
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

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10
  }
};
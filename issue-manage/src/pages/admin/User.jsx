import React, { useState, useEffect } from "react"; // ✅ ADDED
import { fetchWithAuth } from "../../api"; // ✅ ADDED

const User = ({ addLog }) => {
  const [users, setUsers] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    dept: "",
    team: "",
    status: "Active"
  });

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  // ✅ LOAD USERS FROM BACKEND (FIXED API ONLY)
  useEffect(() => {
  const loadUsers = async () => {
    try {
      // 🔥 REAL API FROM YOUR TABLE
      const data = await fetchWithAuth("/api/admin/users");

      setUsers(Array.isArray(data) ? data : data?.data || []);

    } catch (err) {
      console.log("Users API error:", err);
    }
  };

  loadUsers();
}, []);
  /* ---------------- SAVE USER ---------------- */
  const handleSave = async (e) => {
    e.preventDefault();

    if (!form.name || !form.role || !form.dept || !form.team) return;

    try {
      if (editingId !== null) {
        // ✅ UPDATE API
        await fetchWithAuth(`/api/admin/users/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(form)
        });

        setUsers(users.map(u =>
          u.id === editingId ? { ...u, ...form } : u
        ));

        addLog?.("USER_UPDATED", form.name, "User Management");

      } else {
        // ✅ CREATE API
        const res = await fetchWithAuth("/api/admin/users", {
          method: "POST",
          body: JSON.stringify(form)
        });

        setUsers([...users, res?.data || res]);

        addLog?.("USER_CREATED", form.name, "User Management");
      }
    } catch (err) {
      console.log(err);
    }

    setForm({ name: "", role: "", dept: "", team: "", status: "Active" });
    setEditingId(null);
    setShowForm(false);
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user.id);
    setShowForm(true);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    const user = users.find(u => u.id === id);

    try {
      // ✅ DELETE API
      await fetchWithAuth(`/api/admin/users/${id}`, {
        method: "DELETE"
      });

      setUsers(users.filter(u => u.id !== id));

      addLog?.("USER_DELETED", user?.name || "Unknown", "User Management");
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- FILTER ---------------- */
  const filtered = users.filter((u) => {
    return (
      (u.name || "").toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter ? u.role === roleFilter : true) &&
      (deptFilter ? u.dept === deptFilter : true)
    );
  });

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h2>User Management</h2>

        <button
          style={styles.btn}
          onClick={() => {
            setForm({ name: "", role: "", dept: "", team: "", status: "Active" });
            setEditingId(null);
            setShowForm(true);
          }}
        >
          + Create User
        </button>
      </div>

      <div style={styles.filters}>
        <input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select style={styles.input} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">Role</option>
          <option value="Admin">Admin</option>
          <option value="Agent">Agent</option>
          <option value="Manager">Manager</option>
        </select>

        <select style={styles.input} onChange={(e) => setDeptFilter(e.target.value)}>
          <option value="">Department</option>
          <option value="IT">IT</option>
          <option value="Facilities">Facilities</option>
        </select>
      </div>

      <div style={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Dept</th>
              <th>Team</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>{u.dept}</td>
                <td>{u.team}</td>
                <td>{u.status}</td>

                <td>
                  <button onClick={() => handleEdit(u)}>Edit</button>
                  <button onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={styles.modal}>
          <form onSubmit={handleSave} style={styles.form}>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={styles.input}
            />

            <input
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={styles.input}
            />

            <input
              placeholder="Department"
              value={form.dept}
              onChange={(e) => setForm({ ...form, dept: e.target.value })}
              style={styles.input}
            />

            <input
              placeholder="Team"
              value={form.team}
              onChange={(e) => setForm({ ...form, team: e.target.value })}
              style={styles.input}
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              style={styles.input}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button type="submit" style={styles.btn}>Save</button>

            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>

          </form>
        </div>
      )}

    </div>
  );
};

export default User;

/* styles unchanged */
const styles = {
  page: { padding: 15, fontFamily: "sans-serif", background: "#f5f6fa" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: 10 },
  btn: { background: "#2563eb", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6 },
  filters: { display: "flex", gap: 8, marginBottom: 10 },
  input: { padding: 8, border: "1px solid #ddd", borderRadius: 6, flex: 1 },
  table: { background: "#fff", padding: 10, borderRadius: 10 },
  modal: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center" },
  form: { background: "#fff", padding: 20, borderRadius: 10, width: 300, display: "flex", flexDirection: "column", gap: 8 }
};
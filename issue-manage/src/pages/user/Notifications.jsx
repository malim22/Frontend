import { useState, useEffect } from "react"; // ✅ added useEffect
import { getNotifications } from "../../api";

export default function Notifications() {
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState("");
  const [notifications, setNotifications] = useState([]);

  // ✅ FETCH FROM API
  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();

      const data = res?.data || res; // ✅ handle real backend response

      const formatted = data.map((n) => ({
        id: n.ticketId || n.id,
        message: n.message,
        date: n.createdAt
          ? new Date(n.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })
          : "",
        category: n.categoryName,
        status: n.status,
        priority:
          n.priority === "H"
            ? "High"
            : n.priority === "M"
            ? "Medium"
            : n.priority === "L"
            ? "Low"
            : "Critical",
        desc: n.description,
        assigned: n.assignedTo || "Support Team",
        opened: n.createdAt
          ? new Date(n.createdAt).toLocaleDateString("en-GB")
          : "",
        resolved: n.resolvedAt
          ? new Date(n.resolvedAt).toLocaleDateString("en-GB")
          : null,
        comments: n.comments || [],
        read: n.read || false,
      }));

      setNotifications(formatted);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  fetchNotifications();
}, []);

  // Add comment (UNCHANGED)
  const handleAddComment = () => {
    if (!comment) return;
    const updatedSelected = { 
      ...selected, 
      comments: [...selected.comments, { name: "You", role: "User", text: comment, time: "Now" }],
      read: true,
    };
    setSelected(updatedSelected);
    setNotifications(notifications.map(n => n.id === selected.id ? updatedSelected : n));
    setComment("");
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    if (selected) setSelected({ ...selected, read: true });
  };

  const getSlideStyle = (delay = 0) => ({
    animation: `slideIn 0.4s forwards`,
    animationDelay: `${delay}s`,
    opacity: 0,
  });

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .hover-glow:hover {
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
          transform: translateY(-3px);
          transition: all 0.3s ease;
        }

        input.hover-glow:focus,
        textarea.hover-glow:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
        }

        /* ✅ FIX CURSOR CLEANLY */
        body {
          cursor: default;
        }

        button {
          cursor: pointer;
        }

        input, textarea {
          cursor: text;
        }
      `}</style>

      {selected ? (
        <>
          <button className="hover-glow" style={styles.backButton} onClick={() => setSelected(null)}>
            ← Back
          </button>

          <h1 style={styles.heading}>{selected.message}</h1>

          <span style={{ ...styles.status, ...getSlideStyle(0.1) }}>{selected.status}</span>
          <p style={{ ...styles.desc, ...getSlideStyle(0.15) }}>{selected.desc}</p>
          <p style={{ ...styles.meta, ...getSlideStyle(0.2) }}>
            Submitted {selected.opened} · {selected.category} · {selected.priority} priority · {selected.id}
          </p>

          <h3 style={{ ...styles.subHeading, ...getSlideStyle(0.25) }}>Comments</h3>
          {selected.comments.length === 0 && <p style={getSlideStyle(0.3)}>No comments yet</p>}
          {selected.comments.map((c, i) => (
            <div key={i} style={{ ...styles.comment, ...getSlideStyle(0.35 + i * 0.05) }}>
              <strong>{c.name}</strong> ({c.role})
              <p>{c.text}</p>
              <small style={styles.date}>{c.time}</small>
            </div>
          ))}

          <div style={{ ...styles.addComment, ...getSlideStyle(0.35 + selected.comments.length * 0.05) }}>
            <input placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} className="hover-glow" style={styles.input} />
            <button onClick={handleAddComment} className="hover-glow" style={styles.submitBtn}>Send</button>
          </div>

          <div style={{ ...styles.details, ...getSlideStyle(0.4) }}>
            <p><b>Status:</b> {selected.status}</p>
            <p><b>Priority:</b> {selected.priority}</p>
            <p><b>Category:</b> {selected.category}</p>
            <p><b>Assigned:</b> {selected.assigned}</p>
            <p><b>Opened:</b> {selected.opened}</p>
            {selected.resolved && <p><b>Resolved:</b> {selected.resolved}</p>}
          </div>

          <button className="hover-glow" style={{ ...styles.markAllBtn, ...getSlideStyle(0.45) }} onClick={markAllAsRead}>
            Mark all as read
          </button>
        </>
      ) : (
        <>
          <h1 style={styles.heading}>Notifications</h1>

          <div style={{ ...styles.header, ...getSlideStyle(0.05) }}>
            <button className="hover-glow" style={styles.markAllBtn} onClick={markAllAsRead}>Mark all as read</button>
          </div>

          {notifications.map((n, i) => (
            <div
              key={n.id}
              className="hover-glow"
              style={{ ...styles.card, opacity: n.read ? 0.6 : 1, ...getSlideStyle(0.1 + i * 0.05) }}
              onClick={() => setSelected(n)}
            >
              <p>{n.message}</p>
              <small style={styles.date}>{n.date} · {n.category}</small>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    background: "#f8fafc",
    minHeight: "100vh",
  },
  heading: { fontSize: 28, marginBottom: 15 },
  subHeading: { marginTop: 20, marginBottom: 10 },
  header: { display: "flex", justifyContent: "flex-end", marginBottom: 10 },
  backButton: {
    marginBottom: 15,
    padding: "8px 16px",
    borderRadius: 9999,
    border: "1px solid #2563eb",
    background: "white",
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: 14,
  },
  markAllBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: 500,
  },
  card: {
    background: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    cursor: "pointer",
    boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  },
  status: {
    background: "#16a34a20",
    color: "#16a34a",
    padding: "5px 10px",
    borderRadius: 6,
    display: "inline-block",
    marginTop: 10,
  },
  desc: { marginTop: 10 },
  meta: { fontSize: 12, color: "#666" },
  date: { fontSize: 12, color: "#64748b" },
  comment: {
    background: "#f9fafb",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  addComment: { display: "flex", gap: 10, marginTop: 10 },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  submitBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
  },
  details: {
    marginTop: 20,
    background: "white",
    padding: 15,
    borderRadius: 10,
  },
};
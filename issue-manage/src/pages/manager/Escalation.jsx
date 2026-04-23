import { useState, useEffect } from "react";
import { getDashboardData } from "../../api"; // ✅ ONLY ADD (you can replace later with real escalation API)

export default function Escalations() {
  const [tickets, setTickets] = useState([
    {
      id: "T-1247",
      title: "Payment processing not working for multiple transactions",
      agent: "Mike Chen",
      user: "John Smith",
      duration: "12 days",
      priority: "High",
      notes: [],
      description:
        "Customer reports that payment processing has been failing consistently for the past 3 days.",
    },
    {
      id: "T-1240",
      title: "Integration not syncing data - Critical business impact",
      agent: "Unassigned",
      user: "Rachel Green",
      duration: "5 days",
      priority: "Urgent",
      notes: [],
      description:
        "Third-party CRM integration has stopped syncing data.",
    },
  ]);

  // ✅ API STATE
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();

      // ✅ handle real backend response
      const data = res?.data || res;

      setApiData(data);
    } catch (err) {
      console.error("Dashboard API error:", err);
    }
  };

  fetchDashboard();
}, []);
  const agents = ["Mike Chen", "Sarah Johnson", "Alex Kim"];

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState("");

  const [priorityModal, setPriorityModal] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("");

  const [noteModal, setNoteModal] = useState(null);
  const [noteText, setNoteText] = useState("");

  const handleReassign = () => {
    const updated = tickets.map((t) =>
      t.id === selectedTicket.id ? { ...t, agent: selectedAgent } : t
    );
    setTickets(updated);
    setSelectedTicket(null);
    setSelectedAgent("");
  };

  const handlePriorityChange = () => {
    const updated = tickets.map((t) =>
      t.id === priorityModal.id
        ? { ...t, priority: selectedPriority }
        : t
    );
    setTickets(updated);
    setPriorityModal(null);
    setSelectedPriority("");
  };

  const handleAddNote = () => {
    const updated = tickets.map((t) =>
      t.id === noteModal.id
        ? { ...t, notes: [...t.notes, noteText] }
        : t
    );
    setTickets(updated);
    setNoteModal(null);
    setNoteText("");
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(37, 99, 235, 0.2);
            transition: 0.3s;
          }
        `}
      </style>

      <h2 style={styles.title}>Escalations</h2>

      <div style={styles.alert}>
        ⚠ {apiData?.breachedCount ?? 2} tickets have breached SLA and require immediate attention
      </div>

      {tickets.map((ticket, i) => (
        <div
          key={ticket.id}
          className="hover-card"
          style={{
            ...styles.card,
            animation: "fadeUp 0.4s ease",
            animationDelay: `${i * 0.05}s`,
          }}
        >
          <div style={styles.header}>
            <h3 style={{ margin: 0 }}>
              {ticket.title}
              <span style={styles.ticketId}> #{ticket.id}</span>
            </h3>
          </div>

          <div style={styles.badges}>
            <span style={getPriorityStyle(ticket.priority)}>
              {ticket.priority}
            </span>
            <span style={styles.sla}>SLA Breach</span>
          </div>

          <div style={styles.info}>
            <div>
              <p style={styles.label}>SUBMITTED BY</p>
              <p>{ticket.user}</p>
            </div>

            <div>
              <p style={styles.label}>ASSIGNED AGENT</p>
              <p style={ticket.agent === "Unassigned" ? styles.unassigned : {}}>
                {ticket.agent}
              </p>
            </div>

            <div>
              <p style={styles.label}>OPEN DURATION</p>
              <p>{ticket.duration}</p>
            </div>
          </div>

          <div style={styles.desc}>{ticket.description}</div>

          {ticket.notes.length > 0 && (
            <div style={styles.notes}>
              <p style={styles.label}>NOTES</p>
              <ul>
                {ticket.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={styles.actions}>
            <button style={styles.primaryBtn} onClick={() => setSelectedTicket(ticket)}>
              Reassign
            </button>

            <button style={styles.warnBtn} onClick={() => setPriorityModal(ticket)}>
              Change Priority
            </button>

            <button style={styles.grayBtn} onClick={() => setNoteModal(ticket)}>
              Add Note
            </button>

            <span style={styles.link}>View Full Ticket</span>
          </div>
        </div>
      ))}

      {selectedTicket && (
        <Modal>
          <h3>Reassign #{selectedTicket.id}</h3>
          <select onChange={(e) => setSelectedAgent(e.target.value)}>
            <option>Select Agent</option>
            {agents.map((a, i) => <option key={i}>{a}</option>)}
          </select>

          <div style={styles.modalActions}>
            <button style={styles.grayBtn} onClick={() => setSelectedTicket(null)}>Cancel</button>
            <button style={styles.primaryBtn} onClick={handleReassign} disabled={!selectedAgent}>Confirm</button>
          </div>
        </Modal>
      )}

      {priorityModal && (
        <Modal>
          <h3>Change Priority #{priorityModal.id}</h3>
          <select onChange={(e) => setSelectedPriority(e.target.value)}>
            <option>Select Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>

          <div style={styles.modalActions}>
            <button style={styles.grayBtn} onClick={() => setPriorityModal(null)}>Cancel</button>
            <button style={styles.warnBtn} onClick={handlePriorityChange} disabled={!selectedPriority}>Save</button>
          </div>
        </Modal>
      )}

      {noteModal && (
        <Modal>
          <h3>Add Note #{noteModal.id}</h3>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            style={styles.textarea}
          />

          <div style={styles.modalActions}>
            <button style={styles.grayBtn} onClick={() => setNoteModal(null)}>Cancel</button>
            <button style={styles.primaryBtn} onClick={handleAddNote} disabled={!noteText}>Add</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>{children}</div>
    </div>
  );
}

/* ===== STYLES (UNCHANGED) ===== */
const styles = { /* SAME AS YOUR CODE (UNCHANGED) */
  
  container: {
    padding: 20,
    fontFamily: "sans-serif",
    background: "#f4f6fb",
    minHeight: "100vh"
  },

  title: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: "600"
  },

  alert: {
    background: "#fff7ed",
    color: "#d97706",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20
  },

  card: {
    background: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    border: "1px solid #eee"
  },

  header: {
    marginBottom: 10
  },

  ticketId: {
    color: "#888",
    fontSize: 13,
    marginLeft: 6
  },

  badges: {
    display: "flex",
    gap: 10,
    marginBottom: 10
  },

  sla: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "4px 8px",
    borderRadius: 8,
    fontSize: 12
  },

  info: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    fontSize: 13
  },

  label: {
    fontSize: 11,
    color: "#777"
  },

  unassigned: {
    color: "#dc2626",
    fontWeight: "600"
  },

  desc: {
    fontSize: 13,
    color: "#444",
    marginBottom: 10
  },

  notes: {
    background: "#f9fafb",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 13
  },

  actions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap"
  },

  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer"
  },

  warnBtn: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer"
  },

  grayBtn: {
    background: "#e5e7eb",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer"
  },

  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontSize: 13
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    background: "#fff",
    padding: 16,
    borderRadius: 10,
    width: 280
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10
  },

  textarea: {
    width: "100%",
    height: 70,
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ddd"
  }
  }
 

function getPriorityStyle(priority) {
  const map = {
    Low: ["#dcfce7", "#16a34a"],
    Medium: ["#dbeafe", "#2563eb"],
    High: ["#fef3c7", "#d97706"],
    Urgent: ["#fee2e2", "#dc2626"],
  };

  return {
    background: map[priority]?.[0],
    color: map[priority]?.[1],
    padding: "5px 10px",
    borderRadius: "10px",
    fontSize: "12px",
  };
}

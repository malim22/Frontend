import { useState, useEffect } from "react";
import { getTicketQueue } from "../../api"; // ✅ API ADDED

export default function Tickets() {

  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");

  const [tickets, setTickets] = useState([
    {
      id: "T-1247",
      title: "Payment processing not working",
      user: "John Smith",
      agent: "Mike Chen",
      category: "Billing",
      priority: "Urgent",
      status: "Escalated",
      sla: "Breach (2h)",
    },
    {
      id: "T-1246",
      title: "Cannot access dashboard after login",
      user: "Emma Davis",
      agent: "Unassigned",
      category: "Technical",
      priority: "High",
      status: "Open",
      sla: "1h 20m",
    },
    {
      id: "T-1245",
      title: "Email notifications not received",
      user: "Michael Brown",
      agent: "Sarah Johnson",
      category: "Technical",
      priority: "Medium",
      status: "In Progress",
      sla: "2h 45m",
    },
    {
      id: "T-1244",
      title: "How to export data from reports?",
      user: "Lisa Wang",
      agent: "Alex Kim",
      category: "Support",
      priority: "Low",
      status: "Pending",
      sla: "4h 10m",
    },
  ]);

  // ✅ API STATE (NO ERROR — USED BELOW)
  // const [apiData, setApiData] = useState(null);

 useEffect(() => {
  getTicketQueue()
    .then((res) => {
      if (res) {
        setTickets(res); // ✅ USE API DATA
      }
    })
    .catch((err) => console.error(err));
}, []);

  const [viewTicket, setViewTicket] = useState(null);
  const [reassignTicket, setReassignTicket] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState("");

  const agents = ["Mike Chen", "Sarah Johnson", "Alex Kim"];

  const filteredTickets = tickets.filter((t) => {
    return (
      (statusFilter === "All Status" || t.status === statusFilter) &&
      (priorityFilter === "All Priority" || t.priority === priorityFilter)
    );
  });

  const handleReassign = () => {
    setTickets(
      tickets.map((t) =>
        t.id === reassignTicket.id ? { ...t, agent: selectedAgent } : t
      )
    );
    setReassignTicket(null);
    setSelectedAgent("");
  };

  return (
    <div className="container">

      <h2 className="title">
       🎫 Department Tickets
      </h2>

      {/* FILTERS */}
      <div className="filters">
        <div className="left">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Escalated</option>
            <option>Pending</option>
          </select>

          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option>All Priority</option>
            <option>Urgent</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <span className="clear" onClick={() => {
          setStatusFilter("All Status");
          setPriorityFilter("All Priority");
        }}>
          Clear Filters
        </span>
      </div>

      {/* TABLE */}
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>User</th>
              <th>Agent</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>SLA</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td className="titleCell">{t.title}</td>
                <td>{t.user}</td>
                <td className={t.agent === "Unassigned" ? "unassigned" : ""}>
                  {t.agent}
                </td>
                <td>{t.category}</td>

                <td>
                  <span className={`badge priority ${t.priority.toLowerCase()}`}>
                    {t.priority}
                  </span>
                </td>

                <td>
                  <span className={`badge status ${t.status.replace(" ", "").toLowerCase()}`}>
                    {t.status}
                  </span>
                </td>

                <td className={t.sla.includes("Breach") ? "breach" : ""}>
                  {t.sla}
                </td>

                <td className="actions">
                  <span onClick={() => setReassignTicket(t)}>🔁</span>
                  <span onClick={() => setViewTicket(t)}>👁</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {viewTicket && (
        <div className="modalOverlay">
          <div className="modal">
            <h3>{viewTicket.title}</h3>
            <p><b>ID:</b> {viewTicket.id}</p>
            <p><b>User:</b> {viewTicket.user}</p>
            <p><b>Agent:</b> {viewTicket.agent}</p>
            <p><b>Status:</b> {viewTicket.status}</p>

            <button onClick={() => setViewTicket(null)}>Close</button>
          </div>
        </div>
      )}

      {/* REASSIGN MODAL */}
      {reassignTicket && (
        <div className="modalOverlay">
          <div className="modal">
            <h3>Reassign {reassignTicket.id}</h3>

            <select onChange={(e) => setSelectedAgent(e.target.value)}>
              <option>Select Agent</option>
              {agents.map((a, i) => (
                <option key={i}>{a}</option>
              ))}
            </select>

            <div className="modalActions">
              <button onClick={() => setReassignTicket(null)}>Cancel</button>
              <button onClick={handleReassign} disabled={!selectedAgent}>
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style>{`
        /* YOUR ORIGINAL STYLES UNTOUCHED */
        .container {
          padding: 20px;
          background: #f8fafc;
          min-height: 100vh;
          font-family: sans-serif;
        }

        .title { margin-bottom: 15px; }

        .filters {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        select {
          padding: 8px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .clear { color: #2563eb; cursor: pointer; }

        .tableWrap {
          overflow-x: auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        table { width: 100%; border-collapse: collapse; }

        th {
          background: #f1f5f9;
          padding: 12px;
          text-align: left;
        }

        td {
          padding: 12px;
          border-top: 1px solid #eee;
        }

        tr:hover { background: #f9fafb; }

        .titleCell { max-width: 200px; }

        .unassigned {
          color: #dc2626;
          font-weight: bold;
        }

        .badge {
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
        }

        .priority.urgent { background:#fee2e2; color:#dc2626 }
        .priority.high { background:#fef3c7; color:#d97706 }
        .priority.medium { background:#dbeafe; color:#2563eb }
        .priority.low { background:#dcfce7; color:#16a34a }

        .status.open { background:#dbeafe }
        .status.inprogress { background:#fef3c7 }
        .status.escalated { background:#fee2e2 }
        .status.pending { background:#e5e7eb }

        .breach { color: red; font-weight: bold; }

        .actions span {
          cursor: pointer;
          margin-right: 10px;
          font-size: 16px;
        }

        .modalOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 12px;
          width: 300px;
        }

        .modalActions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        button {
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          background: #2563eb;
          color: white;
        }
      `}</style>
    </div>
  );
}
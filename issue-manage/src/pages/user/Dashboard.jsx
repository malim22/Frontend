import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // ✅ added
import { getMyTickets } from "../../api"; // ✅ added

export default function Dashboard({ globalSearch = "" }) {
  {
    const navigate = useNavigate();

    const [tickets, setTickets] = useState([]); // ✅ replaced static data

    // ✅ FETCH DATA FROM API
    useEffect(() => {
      const fetchTickets = async () => {
        try {
          const res = await getMyTickets();

          // map backend → UI format (no UI change)
          const formatted = res.map((t) => ({
            id: t.ticketId || t.id,
            title: t.title,
            priority:
              t.priority === "H"
                ? "High"
                : t.priority === "M"
                  ? "Medium"
                  : t.priority === "L"
                    ? "Low"
                    : "Critical",
            status: t.status,
            date: new Date(t.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            }),
          }));

          setTickets(formatted);
        } catch (err) {
          console.error("Error fetching tickets:", err);
        }
      };

      fetchTickets();
    }, []);

    return (
      <div className="dashboard-container">
        <style>{`
        /* ====== BASE ====== */
.dashboard-container * {
  user-select: none !important;
  caret-color: transparent !important;
}

input, textarea {
  user-select: text !important;
  caret-color: auto !important;
  cursor: text !important;
}

button, .link {
  cursor: pointer !important;
}

        .dashboard-container {
          padding: 20px;
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: Arial, sans-serif;
          cursor: default;
          animation: fadeIn 0.6s ease;
        }

        h1 {
          font-size: 28px;
          margin-bottom: 5px;
        }

        p.subtitle {
          font-size: 16px;
          color: #64748b;
          margin-bottom: 20px;
        }

        .card-container {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }

        .card {
          flex: 1;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          cursor: default;
          animation: slideIn 0.4s ease forwards;
        }

        .card:hover {
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
          transform: translateY(-3px);
        }

        .card-title {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .card-sub {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 5px;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .table-header .link {
          font-size: 14px;
          color: #2563eb;
          cursor: pointer;
        }

        .table-box {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #eee;
          transition: all 0.3s ease;
          cursor: default;
          animation: slideIn 0.4s ease forwards;
        }

        .row:hover {
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.2);
          transform: translateY(-2px);
        }

        .ticket-title {
          font-weight: 600;
          font-size: 14px;
        }

        .ticket-id {
          font-size: 12px;
          color: #94a3b8;
        }

        .ticket-right {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .ticket-date {
          font-size: 12px;
          color: #64748b;
        }

        .priority-high { color: #dc2626; font-weight: 600; }
        .priority-medium { color: #f59e0b; font-weight: 600; }
        .priority-low { color: #16a34a; font-weight: 600; }

        .status-resolved { background: #dcfce7; color: #16a34a; padding: 6px 10px; border-radius: 20px; font-size: 12px; }
        .status-inprogress { background: #fef3c7; color: #d97706; padding: 6px 10px; border-radius: 20px; font-size: 12px; }
        .status-pending { background: #dbeafe; color: #2563eb; padding: 6px 10px; border-radius: 20px; font-size: 12px; }
        .status-closed { background: #e5e7eb; color: #6b7280; padding: 6px 10px; border-radius: 20px; font-size: 12px; }
        .status-escalated { background: #fee2e2; color: #dc2626; padding: 6px 10px; border-radius: 20px; font-size: 12px; }

        .actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 12px 18px;
          border-radius: 10px;
          border: none;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background-color: #2563eb;
          color: white;
          cursor: pointer;
        }

        .btn-secondary {
          background-color: #e2e8f0;
          cursor: pointer;
        }

        .btn:hover {
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
          transform: translateY(-3px);
        }

        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

        <h1>Dashboard Overview</h1>
        <p className="subtitle">Overview of your tickets and recent activity</p>

        <div className="card-container">
          <div className="card">
            <p className="card-title">Total Submitted</p>
            <h2>{tickets.length}</h2> {/* ✅ dynamic */}
            <p className="card-sub">All time tickets</p>
          </div>
          <div className="card">
            <p className="card-title">Pending / In Progress</p>
            <h2>
              {tickets.filter(t => t.status === "Pending" || t.status === "In Progress").length}
            </h2>
            <p className="card-sub">Live tickets</p>
          </div>
          <div className="card">
            <p className="card-title">Resolved This Month</p>
            <h2>
              {tickets.filter(t => t.status === "Resolved").length}
            </h2>
            <p className="card-sub">Current month</p>
          </div>
        </div>

        <div className="table-header">
          <h2>My Recent Tickets</h2>
          <span className="link" onClick={() => navigate("/user/tickets")}>View all</span>
        </div>

        <div className="table-box">
          {tickets
            .filter((t) =>
              t.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
              t.id.toLowerCase().includes(globalSearch.toLowerCase())
            )
            .map((t, i) => (
              <div key={t.id} className="row" style={{ animationDelay: `${i * 0.1}s` }}>
                <div>
                  <p className="ticket-title">{t.title}</p>
                  <span className="ticket-id">{t.id}</span>
                </div>
                <div className="ticket-right">
                  <span className={`priority-${t.priority.toLowerCase()}`}>{t.priority}</span>
                  <span className={`status-${t.status.replace(/\s/g, '').toLowerCase()}`}>{t.status}</span>
                  <span className="ticket-date">{t.date}</span>
                </div>
              </div>
            ))}
        </div>

        <div className="actions">
          <button className="btn btn-primary" onClick={() => navigate("/user/new")}>+ Create New Ticket</button>
          <button className="btn btn-secondary" onClick={() => navigate("/user/kb")}>Browse Knowledge Base</button>
        </div>
      </div>
    );
  }
}
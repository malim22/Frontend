import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";

/* ================= HOMEPAGE ================= */
import HomePage from "./pages/HomePage";

/* ================= USER ================= */
import Dashboard from "./pages/user/Dashboard";
import MyTickets from "./pages/user/MyTickets";
import NewTicket from "./pages/user/NewTicket";
import KnowledgeBase from "./pages/user/KnowledgeBase";
import Notifications from "./pages/user/Notifications";

/* ================= AGENT ================= */
import AgentDashboard from "./pages/agent/DashboardHome";
import TicketQueue from "./pages/agent/TicketQueue";
import AgentMyTickets from "./pages/agent/MyTicket";
import SlaNotification from "./pages/agent/SlaNotification";

/* ================= ADMIN ================= */
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/User";
import Departments from "./pages/admin/Department";
import SLASettings from "./pages/admin/SLASettings";
import AuditLogs from "./pages/admin/AuditLogs";
import AdminNotification from "./pages/admin/Notification";

/* ================= MANAGER ================= */
import ManagerDashboard from "./pages/manager/Dashboard";
import Escalation from "./pages/manager/Escalation";
import ManagerNotification from "./pages/manager/Notification";
import TeamWorkLoad from "./pages/manager/TeamWorkLoad";
import ManagerTickets from "./pages/manager/Ticket";

/* ================= SUPER ADMIN ================= */
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import AdminManagement from "./pages/superadmin/AdminManagement";
import DepartmentManagement from "./pages/superadmin/DepartmentManagement";
import SuperAuditLogs from "./pages/superadmin/AuditLogs";
import SuperNotifications from "./pages/superadmin/Notifications";
import SystemControl from "./pages/superadmin/SystemControl";
import UserOverview from "./pages/superadmin/UserOverview";

/* ================= AUTH ================= */
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

/* ================= LAYOUT ================= */
function Layout() {
  const [open, setOpen] = useState(null);
  const [hovered, setHovered] = useState(null);

  const getStyle = (id) => ({
    ...styles.subLink,
    ...(hovered === id ? styles.subLinkHover : {})
  });

  return (
    <div style={styles.app}>

      {/* ================= SIDEBAR ================= */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>⚡ ResolveGrid</h2>

        <Link to="/" style={styles.link}>🏠 Home</Link>

        {/* USER */}
        <div>
          <div style={styles.menu} onClick={() => setOpen(open === "user" ? null : "user")}>
            👤 User
          </div>

          {open === "user" && (
            <div style={styles.dropdown}>
              <Link to="/user" style={getStyle("u1")} onMouseEnter={() => setHovered("u1")} onMouseLeave={() => setHovered(null)}>Dashboard</Link>
              <Link to="/user/tickets" style={getStyle("u2")} onMouseEnter={() => setHovered("u2")} onMouseLeave={() => setHovered(null)}>Tickets</Link>
              <Link to="/user/new" style={getStyle("u3")} onMouseEnter={() => setHovered("u3")} onMouseLeave={() => setHovered(null)}>New Ticket</Link>
              <Link to="/user/kb" style={getStyle("u4")} onMouseEnter={() => setHovered("u4")} onMouseLeave={() => setHovered(null)}>KB</Link>
              <Link to="/user/notifications" style={getStyle("u5")} onMouseEnter={() => setHovered("u5")} onMouseLeave={() => setHovered(null)}>Notifications</Link>
            </div>
          )}
        </div>

        {/* AGENT */}
        <div>
          <div style={styles.menu} onClick={() => setOpen(open === "agent" ? null : "agent")}>
            🧑‍💻 Agent
          </div>

          {open === "agent" && (
            <div style={styles.dropdown}>
              <Link to="/agent" style={getStyle("a1")} onMouseEnter={() => setHovered("a1")} onMouseLeave={() => setHovered(null)}>Dashboard</Link>
              <Link to="/agent/queue" style={getStyle("a2")} onMouseEnter={() => setHovered("a2")} onMouseLeave={() => setHovered(null)}>Queue</Link>
              <Link to="/agent/tickets" style={getStyle("a3")} onMouseEnter={() => setHovered("a3")} onMouseLeave={() => setHovered(null)}>My Tickets</Link>
              <Link to="/agent/sla" style={getStyle("a4")} onMouseEnter={() => setHovered("a4")} onMouseLeave={() => setHovered(null)}>SLA</Link>
            </div>
          )}
        </div>

        {/* ADMIN */}
        <div>
          <div style={styles.menu} onClick={() => setOpen(open === "admin" ? null : "admin")}>
            🛠️ Admin
          </div>

          {open === "admin" && (
            <div style={styles.dropdown}>
              <Link to="/admin" style={getStyle("ad1")} onMouseEnter={() => setHovered("ad1")} onMouseLeave={() => setHovered(null)}>Dashboard</Link>
              <Link to="/admin/users" style={getStyle("ad2")} onMouseEnter={() => setHovered("ad2")} onMouseLeave={() => setHovered(null)}>Users</Link>
              <Link to="/admin/departments" style={getStyle("ad3")} onMouseEnter={() => setHovered("ad3")} onMouseLeave={() => setHovered(null)}>Departments</Link>
              <Link to="/admin/sla" style={getStyle("ad4")} onMouseEnter={() => setHovered("ad4")} onMouseLeave={() => setHovered(null)}>SLA</Link>
              <Link to="/admin/logs" style={getStyle("ad5")} onMouseEnter={() => setHovered("ad5")} onMouseLeave={() => setHovered(null)}>Logs</Link>
            </div>
          )}
        </div>

        {/* MANAGER */}
        <div>
          <div style={styles.menu} onClick={() => setOpen(open === "manager" ? null : "manager")}>
            📊 Manager
          </div>

          {open === "manager" && (
            <div style={styles.dropdown}>
              <Link to="/manager" style={getStyle("m1")} onMouseEnter={() => setHovered("m1")} onMouseLeave={() => setHovered(null)}>Dashboard</Link>
              <Link to="/manager/escalation" style={getStyle("m2")} onMouseEnter={() => setHovered("m2")} onMouseLeave={() => setHovered(null)}>Escalation</Link>
              <Link to="/manager/team" style={getStyle("m3")} onMouseEnter={() => setHovered("m3")} onMouseLeave={() => setHovered(null)}>Team</Link>
              <Link to="/manager/tickets" style={getStyle("m4")} onMouseEnter={() => setHovered("m4")} onMouseLeave={() => setHovered(null)}>Tickets</Link>
            </div>
          )}
        </div>

        {/* SUPER ADMIN */}
        <div>
          <div style={styles.menu} onClick={() => setOpen(open === "superadmin" ? null : "superadmin")}>
            👑 Super Admin
          </div>

          {open === "superadmin" && (
            <div style={styles.dropdown}>
              <Link to="/superadmin" style={getStyle("s1")} onMouseEnter={() => setHovered("s1")} onMouseLeave={() => setHovered(null)}>Dashboard</Link>
              <Link to="/superadmin/admins" style={getStyle("s2")} onMouseEnter={() => setHovered("s2")} onMouseLeave={() => setHovered(null)}>Admin Mgmt</Link>
              <Link to="/superadmin/departments" style={getStyle("s3")} onMouseEnter={() => setHovered("s3")} onMouseLeave={() => setHovered(null)}>Departments</Link>
              <Link to="/superadmin/users" style={getStyle("s4")} onMouseEnter={() => setHovered("s4")} onMouseLeave={() => setHovered(null)}>Users</Link>
              <Link to="/superadmin/system" style={getStyle("s5")} onMouseEnter={() => setHovered("s5")} onMouseLeave={() => setHovered(null)}>System</Link>
              <Link to="/superadmin/logs" style={getStyle("s6")} onMouseEnter={() => setHovered("s6")} onMouseLeave={() => setHovered(null)}>Logs</Link>
              <Link to="/superadmin/notifications" style={getStyle("s7")} onMouseEnter={() => setHovered("s7")} onMouseLeave={() => setHovered(null)}>Notifications</Link>
            </div>
          )}
        </div>

      </div>

      <div style={styles.content}>
        <Outlet />
      </div>

    </div>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>

          <Route path="user">
            <Route index element={<Dashboard />} />
            <Route path="tickets" element={<MyTickets />} />
            <Route path="new" element={<NewTicket />} />
            <Route path="kb" element={<KnowledgeBase />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          <Route path="agent">
            <Route index element={<AgentDashboard />} />
            <Route path="queue" element={<TicketQueue />} />
            <Route path="tickets" element={<AgentMyTickets />} />
            <Route path="sla" element={<SlaNotification />} />
          </Route>

          <Route path="admin">
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="departments" element={<Departments />} />
            <Route path="sla" element={<SLASettings />} />
            <Route path="logs" element={<AuditLogs />} />
            <Route path="notifications" element={<AdminNotification />} />
          </Route>

          <Route path="manager">
            <Route index element={<ManagerDashboard />} />
            <Route path="escalation" element={<Escalation />} />
            <Route path="team" element={<TeamWorkLoad />} />
            <Route path="tickets" element={<ManagerTickets />} />
            <Route path="notifications" element={<ManagerNotification />} />
          </Route>

          <Route path="superadmin">
            <Route index element={<SuperAdminDashboard />} />
            <Route path="admins" element={<AdminManagement />} />
            <Route path="departments" element={<DepartmentManagement />} />
            <Route path="users" element={<UserOverview />} />
            <Route path="system" element={<SystemControl />} />
            <Route path="logs" element={<SuperAuditLogs />} />
            <Route path="notifications" element={<SuperNotifications />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

/* ================= STYLE (ONLY SUBMENU UPGRADED) ================= */
const styles = {
  app: { display: "flex", height: "100vh" },

  sidebar: {
    width: "250px",
    background: "#0f172a",
    color: "white",
    padding: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  logo: { marginBottom: "10px" },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "6px"
  },

  menu: {
    padding: "10px",
    background: "#1e293b",
    marginTop: "10px",
    cursor: "pointer",
    borderRadius: "6px"
  },

  dropdown: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 0 8px 12px",
    marginTop: "6px",
    borderLeft: "2px solid rgba(56,189,248,0.35)",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
    backdropFilter: "blur(6px)"
  },

  subLink: {
    padding: "9px 12px",
    borderRadius: "10px",
    fontSize: "13.5px",
    textDecoration: "none",
    color: "#cbd5e1",
    background: "transparent",
    transition: "all 0.25s ease",
    display: "block",
    letterSpacing: "0.4px",
    fontWeight: "500",
  },

  subLinkHover: {
    background: "rgba(56,189,248,0.15)",
    color: "#38bdf8",
    transform: "translateX(8px)",
    boxShadow: "0 0 18px rgba(56,189,248,0.45)",
    borderRadius: "12px",
    transition: "all 0.2s ease",
  },
  content: {
    flex: 1,
    padding: 20
  }
};
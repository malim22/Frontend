import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { useState } from "react";

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

/* ================= SUPER ADMIN (YOUR FILES) ================= */
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import AdminManagement from "./pages/superadmin/AdminManagement";
import DepartmentManagement from "./pages/superadmin/DepartmentManagement";
import SuperAuditLogs from "./pages/superadmin/AuditLogs";
import SuperNotifications from "./pages/superadmin/Notifications";
import SystemControl from "./pages/superadmin/SystemControl";
import UserOverview from "./pages/superadmin/UserOverview";

// ================== LOGIN/REGISTER (EXTRA) ==================
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

/* ================= LAYOUT ================= */
function Layout({ globalSearch, setGlobalSearch }) {
  return (
    <div style={styles.app}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>⚡ ResolveGrid</h2>

        <Link to="/" style={styles.link}>🏠 Home</Link>
        <Link to="/user" style={styles.link}>👤 User</Link>
        <Link to="/agent" style={styles.link}>🧑‍💻 Agent</Link>
        <Link to="/admin" style={styles.link}>🛠️ Admin</Link>
        <Link to="/manager" style={styles.link}>📊 Manager</Link>

        {/* ✅ ONLY ADDED */}
        <Link to="/superadmin" style={styles.link}>👑 Super Admin</Link>

        <Link to="/user/notifications" style={styles.link}>🔔 Notifications</Link>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={styles.topBar}>
          <input
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search tickets, users, KB..."
            style={styles.searchInput}
          />
        </div>

        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/* ================= USER ================= */
function UserLayout() {
  return (
    <>
      <div style={styles.subnav}>
        <Link to="/user" style={styles.subLink}>📊 Dashboard</Link>
        <Link to="/user/tickets" style={styles.subLink}>🎫 Tickets</Link>
        <Link to="/user/new" style={styles.subLink}>➕ New</Link>
        <Link to="/user/kb" style={styles.subLink}>📚 KB</Link>
        <Link to="/user/notifications" style={styles.subLink}>🔔 Notifications</Link>
      </div>
      <Outlet />
    </>
  );
}

/* ================= AGENT ================= */
function AgentLayout() {
  return (
    <>
      <div style={styles.subnav}>
        <Link to="/agent" style={styles.subLink}>📊 Dashboard</Link>
        <Link to="/agent/queue" style={styles.subLink}>📥 Queue</Link>
        <Link to="/agent/tickets" style={styles.subLink}>🎫 My Tickets</Link>
        <Link to="/agent/sla" style={styles.subLink}>⏱️ SLA</Link>
      </div>
      <Outlet />
    </>
  );
}

/* ================= ADMIN ================= */
function AdminLayout() {
  return (
    <>
      <div style={styles.subnav}>
        <Link to="/admin" style={styles.subLink}>📊 Dashboard</Link>
        <Link to="/admin/users" style={styles.subLink}>👥 Users</Link>
        <Link to="/admin/departments" style={styles.subLink}>🏢 Departments</Link>
        <Link to="/admin/sla" style={styles.subLink}>⏱️ SLA</Link>
        <Link to="/admin/logs" style={styles.subLink}>📜 Logs</Link>
      </div>
      <Outlet />
    </>
  );
}

/* ================= MANAGER ================= */
function ManagerLayout() {
  return (
    <>
      <div style={styles.subnav}>
        <Link to="/manager" style={styles.subLink}>📊 Dashboard</Link>
        <Link to="/manager/escalation" style={styles.subLink}>⚠️ Escalation</Link>
        <Link to="/manager/team" style={styles.subLink}>👥 Team</Link>
        <Link to="/manager/tickets" style={styles.subLink}>🎫 Tickets</Link>
      </div>
      <Outlet />
    </>
  );
}

/* ================= SUPER ADMIN LAYOUT (ADDED) ================= */
function SuperAdminLayout() {
  return (
    <>
      <div style={styles.subnav}>
        <Link to="/superadmin" style={styles.subLink}>📊 Dashboard</Link>
        <Link to="/superadmin/admins" style={styles.subLink}>🛠️ Admin Mgmt</Link>
        <Link to="/superadmin/departments" style={styles.subLink}>🏢 Departments</Link>
        <Link to="/superadmin/users" style={styles.subLink}>👥 Users</Link>
        <Link to="/superadmin/system" style={styles.subLink}>⚙️ System</Link>
        <Link to="/superadmin/logs" style={styles.subLink}>📜 Logs</Link>
        <Link to="/superadmin/notifications" style={styles.subLink}>🔔 Notifications</Link>
      </div>
      <Outlet />
    </>
  );
}

/* ================= APP ================= */
export default function App() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [globalSearch, setGlobalSearch] = useState("");

  const addLog = (action, target, module) => {
    setAuditLogs((prev) => [
      {
        id: Date.now(),
        action,
        target,
        module,
        user: "Admin",
        time: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout globalSearch={globalSearch} setGlobalSearch={setGlobalSearch} />}>

          {/* USER */}
          <Route path="user" element={<UserLayout />}>
            <Route index element={<Dashboard globalSearch={globalSearch} />} />
            <Route path="tickets" element={<MyTickets globalSearch={globalSearch} />} />
            <Route path="new" element={<NewTicket />} />
            <Route path="kb" element={<KnowledgeBase />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* AGENT */}
          <Route path="agent" element={<AgentLayout />}>
            <Route index element={<AgentDashboard />} />
            <Route path="queue" element={<TicketQueue />} />
            <Route path="tickets" element={<AgentMyTickets />} />
            <Route path="sla" element={<SlaNotification />} />
          </Route>

          {/* ADMIN */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard users={users} departments={departments} auditLogs={auditLogs} />} />
            <Route path="users" element={<Users users={users} setUsers={setUsers} addLog={addLog} />} />
            <Route path="departments" element={<Departments departments={departments} setDepartments={setDepartments} addLog={addLog} />} />
            <Route path="sla" element={<SLASettings addLog={addLog} />} />
            <Route path="logs" element={<AuditLogs auditLogs={auditLogs} />} />
            <Route path="notifications" element={<AdminNotification />} />
          </Route>

          {/* MANAGER */}
          <Route path="manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="escalation" element={<Escalation />} />
            <Route path="team" element={<TeamWorkLoad />} />
            <Route path="tickets" element={<ManagerTickets />} />
            <Route path="notifications" element={<ManagerNotification />} />
          </Route>

          {/* ✅ SUPER ADMIN (FULL FIX) */}
          <Route path="superadmin" element={<SuperAdminLayout />}>

            {/* Dashboard */}
            <Route
              index
              element={
                <SuperAdminDashboard
                  users={users}
                  departments={departments}
                  auditLogs={auditLogs}
                />
              }
            />

            {/* Other Pages */}
            <Route path="admins" element={<AdminManagement />} />
            <Route path="departments" element={<DepartmentManagement />} />
            <Route path="users" element={<UserOverview />} />
            <Route path="system" element={<SystemControl />} />
            <Route path="logs" element={<SuperAuditLogs />} />
            <Route path="notifications" element={<SuperNotifications />} />



            {/* ✅ SAFETY (IMPORTANT) */}
            <Route path="*" element={<div>Page Not Found</div>} />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

/* ================= STYLES ================= */
const styles = {
  app: { display: "flex", height: "100vh", background: "#f8fafc" },
  sidebar: {
    width: "240px",
    background: "linear-gradient(180deg, #020617, #0f172a)",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.3)"
  },
  logo: { marginBottom: "20px", fontSize: "20px", letterSpacing: "1px" },
  link: {
    color: "#cbd5e1",
    padding: "10px",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "0.3s",
  },
  content: { flex: 1, padding: "25px", overflow: "auto" },
  subnav: { display: "flex", gap: "10px", marginBottom: "20px" },
  subLink: {
    padding: "7px 12px",
    background: "#e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    textDecoration: "none"
  },
  topBar: {
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  searchInput: {
    width: "50%",
    padding: "10px 15px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    outline: "none",
  },
};
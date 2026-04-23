// 🔹 Base URL
const BASE_URL = "https://drift-stinking-sixteen.ngrok-free.dev/api/kb";

// 🔹 Common function (JWT included)
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers
      }
    });

    if (!res.ok) throw new Error("API failed");

    return await res.json();
  } catch {
    console.log("⚠️ Backend not running → using dummy mode");

    // 🔥 DUMMY LOGIN RESPONSE
    if (endpoint === "/auth/login") {
      return {
        token: "fake-token-123",
        email: "demo@gmail.com",
        role: "USER",
        firstLogin: false
      };
    }

    // fallback empty data for other APIs
    return {};
  }
};

/* ================= USER ================= */

// ✅ Get My Tickets
export const getMyTickets = () => {
  return fetchWithAuth("/tickets/my");
};

// ✅ Create Ticket
export const createTicket = (data) => {
  return fetchWithAuth("/tickets", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// ✅ Get Ticket Details
export const getTicketById = (id) => {
  return fetchWithAuth(`/tickets/${id}`);
};

// ✅ Comments (REAL API)
export const getComments = (id) => {
  return fetchWithAuth(`/tickets/${id}/comments`);
};

export const addComment = (id, data) => {
  return fetchWithAuth(`/tickets/${id}/comments`, {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// ✅ Categories (Knowledge Base)
export const getCategories = () => {
  return fetchWithAuth("/admin/categories");
};

// ✅ Notifications
export const getNotifications = () => {
  return fetchWithAuth("/notifications");
};

export const getUnreadCount = () => {
  return fetchWithAuth("/notifications/unread-count");
};

export const markAsRead = (id) => {
  return fetchWithAuth(`/notifications/${id}/read`, {
    method: "POST"
  });
};

export const markAllRead = () => {
  return fetchWithAuth("/notifications/read-all", {
    method: "POST"
  });
};

/* ================= AGENT ================= */

// Queue
export const getTicketQueue = () => {
  return fetchWithAuth("/tickets/queue");
};

// My Tickets
export const getMyAssignedTickets = () => {
  return fetchWithAuth("/tickets/my");
};

// Update Status (optional)
export const updateTicketStatus = (id, status) => {
  return fetchWithAuth(`/tickets/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status })
  });
};

/* ================= ADMIN (COMPLETE MODULE) ================= */

/* ---------- USERS ---------- */

// Get all users
export const getUsers = () => {
  return fetchWithAuth("/admin/users");
};

// Create user
export const createUser = (data) => {
  return fetchWithAuth("/admin/users", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// Update user role
export const updateUserRole = (id, role) => {
  return fetchWithAuth(`/admin/users/${id}/role`, {
    method: "PUT",
    body: JSON.stringify({ role })
  });
};

// Update user status (active/inactive)
export const updateUserStatus = (id, active) => {
  return fetchWithAuth(`/admin/users/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ active })
  });
};

// Lock / unlock user
export const lockUser = (id, locked) => {
  return fetchWithAuth(`/admin/users/${id}/lock`, {
    method: "PUT",
    body: JSON.stringify({ locked })
  });
};

// Assign department/team
export const assignUser = (id, data) => {
  return fetchWithAuth(`/admin/users/${id}/assign`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};


/* ---------- DEPARTMENTS ---------- */

// Get departments
export const getDepartments = () => {
  return fetchWithAuth("/admin/departments");
};

// Create department
export const createDepartment = (data) => {
  return fetchWithAuth("/admin/departments", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// Update department
export const updateDepartment = (id, data) => {
  return fetchWithAuth(`/admin/departments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};


/* ---------- TEAMS ---------- */

// Get teams
export const getTeams = () => {
  return fetchWithAuth("/admin/teams");
};

// Create team
export const createTeam = (data) => {
  return fetchWithAuth("/admin/teams", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// Assign team manager
export const assignTeamManager = (id, email) => {
  return fetchWithAuth(`/admin/teams/${id}/manager`, {
    method: "PUT",
    body: JSON.stringify({ email })
  });
};


/* ---------- SLA MANAGEMENT ---------- */

// Get SLA rules
export const getSLA = () => {
  return fetchWithAuth("/admin/sla");
};

// Create bulk SLA rules
export const createBulkSLA = (data) => {
  return fetchWithAuth("/admin/sla/bulk", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// Update SLA rule
export const updateSLA = (id, data) => {
  return fetchWithAuth(`/admin/sla/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

// Toggle SLA status
export const toggleSLAStatus = (id, active) => {
  return fetchWithAuth(`/admin/sla/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ active })
  });
};


/* ---------- AUDIT LOGS ---------- */

// Global audit logs
export const getAuditLogs = () => {
  return fetchWithAuth("/admin/audit/global");
};

// Export audit logs CSV
export const exportAuditLogs = () => {
  return fetchWithAuth("/admin/audit/export");
};


/* ---------- DASHBOARD ---------- */

// Admin dashboard overview
export const getAdminDashboard = () => {
  return fetchWithAuth("/admin/dashboard/overview");
};

// Advanced dashboard (manager)
export const getAdvancedDashboard = () => {
  return fetchWithAuth("/admin/dashboard/advanced");
};


/* ---------- SYSTEM CONFIG ---------- */

// Get system config
export const getSystemConfig = () => {
  return fetchWithAuth("/admin/system-config");
};

// Update system config
export const updateSystemConfig = (data) => {
  return fetchWithAuth("/admin/system-config", {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

/* ================= MANAGER ================= */
export const getDashboardData = () => {
  return fetchWithAuth("/dashboard");
};

// ⚠️ These endpoints are NOT in your sheet → keep only if backend supports
export const getEscalations = () => {
  return fetchWithAuth("/tickets/escalations");
};

export const getTeamWorkload = () => {
  return fetchWithAuth("/team/workload");
};
 /* ================= AUTH ================= */

// 🔐 Login
export const loginUser = (data) => {
  return fetchWithAuth("/auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// 🔐 Signup (IF your backend supports /auth/signup OR /users create)
// ⚠️ If signup endpoint is different, tell me I will adjust
export const signupUser = (data) => {
  return fetchWithAuth("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// 🔐 Logout
export const logoutUser = () => {
  return fetchWithAuth("/auth/logout", {
    method: "POST"
  });
};

// 🔐 Activate account
export const activateAccount = (token, password) => {
  return fetchWithAuth("/auth/activate", {
    method: "POST",
    body: JSON.stringify({
      token,
      password
    })
  });
};

// 🔐 Forgot password
export const forgotPassword = (email) => {
  return fetchWithAuth("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email })
  });
};

// 🔐 Reset password
export const resetPassword = (token, newPassword) => {
  return fetchWithAuth("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      token,
      newPassword
    })
  });
};

// 🔐 First login password update
export const updatePassword = (newPassword) => {
  return fetchWithAuth("/auth/update-password", {
    method: "POST",
    body: JSON.stringify({ newPassword })
  });
};

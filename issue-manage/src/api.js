// 🔹 Base URL
const BASE_URL = "https://unadorned-heap-elitism.ngrok-free.dev/api";

// 🔹 Common function (JWT included)
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return res.json();
};


// Ticket APIs
export const getMyTickets = () => {
  return fetchWithAuth("/tickets/my");
};

export const createTicket = (data) => {
  return fetchWithAuth("/tickets", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

export const getTicketById = (id) => {
  return fetchWithAuth(`/tickets/${id}`);
};

// Notification API

export const getNotifications = () => {
  return fetchWithAuth("/notifications");
};


//Knowledge Base API
export const getArticles = () => {
  return fetchWithAuth("/kb");
};

// Dashboard API
export const getDashboardData = () => {
  return fetchWithAuth("/dashboard");
};
/* ================= AGENT ================= */

export const getTicketQueue = () => {
  return fetchWithAuth("/tickets/queue");
};

export const updateTicketStatus = (id, status) => {
  return fetchWithAuth(`/tickets/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status })
  });
};

/* ================= ADMIN ================= */

export const getUsers = () => {
  return fetchWithAuth("/users");
};

export const createUser = (data) => {
  return fetchWithAuth("/users", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

export const getDepartments = () => {
  return fetchWithAuth("/departments");
};

export const createDepartment = (data) => {
  return fetchWithAuth("/departments", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

export const getAuditLogs = () => {
  return fetchWithAuth("/logs");
};

/* ================= MANAGER ================= */

export const getEscalations = () => {
  return fetchWithAuth("/tickets/escalations");
};

export const getTeamWorkload = () => {
  return fetchWithAuth("/team/workload");
};

/* ================= USER DASHBOARD ================= */

// 🔹 Get My Tickets
// export const getMyTickets = () => {
//   return fetchWithAuth("/tickets/my");
// };

// 🔹 Get Ticket Details
export const getTicketDetails = (id) => {
  return fetchWithAuth(`/tickets/${id}`);
};

// 🔹 Get Notifications (⚠️ confirm backend)
export const getUserNotifications = () => {
  return fetchWithAuth("/notifications");
};

// 🔹 User Dashboard Summary (⚠️ only if backend supports)
export const getUserDashboard = () => {
  return fetchWithAuth("/dashboard");
};
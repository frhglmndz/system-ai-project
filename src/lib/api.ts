// API Service Layer
// Centralized API calls to your Node.js/Express backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('auth_token');

// Generic fetch wrapper
async function fetchAPI(endpoint: string, options: RequestInit = {}, timeoutMs = 12000) {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timed out. Backend at ${API_URL} not reachable.`);
    }
    throw new Error(err.message || 'Network error. Check your backend server.');
  } finally {
    clearTimeout(timeout);
  }
}

// Authentication API
export const authAPI = {
  register: (data: { email: string; password: string; firstName: string; lastName: string; role: string }) =>
    fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  
  login: (email: string, password: string) =>
    fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  
  getCurrentUser: () => fetchAPI('/auth/me'),
  
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
  },
};

// Profile API
export const profileAPI = {
  get: () => fetchAPI('/profile'),
  update: (data: any) => fetchAPI('/profile', { method: 'PUT', body: JSON.stringify(data) }),
};

// Patient API
export const patientAPI = {
  getAll: () => fetchAPI('/patients'),
  getById: (id: string) => fetchAPI(`/patients/${id}`),
  update: (id: string, data: any) => fetchAPI(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// Recovery Plans API
export const recoveryPlanAPI = {
  getAll: () => fetchAPI('/recovery-plans'),
  create: (data: any) => fetchAPI('/recovery-plans', { method: 'POST', body: JSON.stringify(data) }),
};

// Medication API
export const medicationAPI = {
  getAll: () => fetchAPI('/medications'),
  create: (data: any) => fetchAPI('/medications', { method: 'POST', body: JSON.stringify(data) }),
  markCompleted: (id: string) => fetchAPI(`/medications/${id}/complete`, { method: 'PUT' }),
};

// Appointment API
export const appointmentAPI = {
  getAll: () => fetchAPI('/appointments'),
  create: (data: any) => fetchAPI('/appointments', { method: 'POST', body: JSON.stringify(data) }),
};

// Vitals API
export const vitalsAPI = {
  getAll: () => fetchAPI('/vitals'),
  create: (data: any) => fetchAPI('/vitals', { method: 'POST', body: JSON.stringify(data) }),
};

// Symptoms API
export const symptomsAPI = {
  getAll: () => fetchAPI('/symptoms'),
  create: (data: any) => fetchAPI('/symptoms', { method: 'POST', body: JSON.stringify(data) }),
};

// Health Tips API
export const healthTipsAPI = {
  getAll: () => fetchAPI('/health-tips'),
  save: (id: string) => fetchAPI(`/health-tips/${id}/save`, { method: 'POST' }),
  getSaved: () => fetchAPI('/health-tips/saved'),
};

// Chat API (AI Assistant)
export const chatAPI = {
  getMessages: () => fetchAPI('/chat/messages'),
  sendMessage: (message: string) => fetchAPI('/chat/send', { method: 'POST', body: JSON.stringify({ message }) }),
};

// Alerts API
export const alertsAPI = {
  getAll: () => fetchAPI('/alerts'),
  resolve: (id: string) => fetchAPI(`/alerts/${id}/resolve`, { method: 'PUT' }),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => fetchAPI('/notifications'),
  markRead: (id: string) => fetchAPI(`/notifications/${id}/read`, { method: 'PUT' }),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => fetchAPI('/dashboard/stats'),
  getDoctorStats: () => fetchAPI('/dashboard/doctor-stats'),
};

// Unified API object for convenience
export const api = {
  setToken: (token: string | null) => {
    if (token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');
  },
  register: (email: string, password: string, firstName: string, lastName: string) =>
    authAPI.register({ email, password, firstName, lastName, role: 'patient' }),
  login: authAPI.login,
  getCurrentUser: authAPI.getCurrentUser,
  logout: authAPI.logout,
  getProfile: profileAPI.get,
  updateProfile: profileAPI.update,
  getMedications: medicationAPI.getAll,
  completeMedication: medicationAPI.markCompleted,
  getAppointments: appointmentAPI.getAll,
  getVitals: vitalsAPI.getAll,
  recordVitals: vitalsAPI.create,
  getSymptoms: symptomsAPI.getAll,
  recordSymptom: symptomsAPI.create,
  getHealthTips: healthTipsAPI.getAll,
  getSavedHealthTips: healthTipsAPI.getSaved,
  saveHealthTip: healthTipsAPI.save,
  getChatMessages: chatAPI.getMessages,
  sendChatMessage: chatAPI.sendMessage,
  getDashboardStats: dashboardAPI.getStats,
  getNotifications: notificationsAPI.getAll,
  markNotificationRead: notificationsAPI.markRead,
  getRecoveryPlans: recoveryPlanAPI.getAll,
};

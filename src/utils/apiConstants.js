// apiConstants.js
export const BASE_URL = "https://pidash.microwebstudios.com";

// Endpoints
export const ENDPOINTS = {
  //Authentication APIs
  LOGIN: "/api/auth/login",
  GET_USER_PROFILE: "/api/auth/me",
  LOGOUT: "/api/auth/logout",
  REGISTER: "/api/auth/register",
  REFRESH_TOKEN: "/api/auth/refresh-token",

  // Chat Management APIs
  CHAT_SAVE: "/api/chat",
  CHAT_HISTORY: (sessionId) => `/api/chat/conversation/${sessionId}`,
  CHAT_FIRST_PER_SESSION: "/api/chat/first-per-session",

  // Lead Management APIs
  ALL_LEADS: "/api/leads",
  GET_LEAD_COUNT_BY_STATUS: "/api/leads/count-by-status",
  GET_LEAD_COUNT_BY_INSURANCE_TYPE: "/api/leads/count-by-insurance",
  LEAD_BY_ID: (sessionId) => `/api/leads/${sessionId}`,
  UPDATE_LEAD_STATUS: (leadId) => `/api/leads/${leadId}/status`,
  DELETE_LEAD: (leadId) => `/api/leads/${leadId}`,
};

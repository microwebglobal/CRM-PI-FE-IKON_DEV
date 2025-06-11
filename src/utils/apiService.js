// apiService.js
import api from "./api";
import { ENDPOINTS } from "./apiConstants";

const ChatService = {
  saveChatMessage: (chatDTO) => {
    return api.post(ENDPOINTS.CHAT_SAVE, chatDTO);
  },

  getChatHistory: (sessionId) => {
    return api.get(ENDPOINTS.CHAT_HISTORY(sessionId));
  },

  getFirstChatPerSession: () => {
    return api.get(ENDPOINTS.CHAT_FIRST_PER_SESSION);
  },
};

const authService = {
  login: (credentials) => {
    return api.post(ENDPOINTS.LOGIN, credentials);
  },

  getUserProfile: () => {
    return api.get(ENDPOINTS.GET_USER_PROFILE);
  },
};

const leadService = {
  getAllLeads: () => {
    return api.get(ENDPOINTS.ALL_LEADS);
  },

  getLeadCountByStatus: () => {
    return api.get(ENDPOINTS.GET_LEAD_COUNT_BY_STATUS);
  },

  getLeadCountByInsuranceType: () => {
    return api.get(ENDPOINTS.GET_LEAD_COUNT_BY_INSURANCE_TYPE);
  },

  updateLeadStatus: (leadId, status) => {
    return api.put(`${ENDPOINTS.UPDATE_LEAD_STATUS(leadId)}?status=${status}`);
  },
  deleteLead: (leadId) => {
    return api.delete(ENDPOINTS.DELETE_LEAD(leadId));
  },
};

export default { ChatService, authService, leadService };

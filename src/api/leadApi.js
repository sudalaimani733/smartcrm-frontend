import axiosClient from './axiosClient';

export const getAllLeads = () => axiosClient.get('/leads');
export const getLeadById = (id) => axiosClient.get(`/leads/${id}`);
export const createLead = (data) => axiosClient.post('/leads', data);
export const updateLeadStatus = (id, status) => axiosClient.put(`/leads/${id}/status?status=${status}`);
export const recordLeadActivity = (id) => axiosClient.put(`/leads/${id}/activity`);
export const filterLeads = (status, score) => {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (score) params.append('score', score);
  return axiosClient.get(`/leads/filter?${params.toString()}`);
};
export const deleteLead = (id) => axiosClient.delete(`/leads/${id}`);
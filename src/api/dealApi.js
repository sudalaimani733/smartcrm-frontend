import axiosClient from './axiosClient';

export const getAllDeals = () => axiosClient.get('/deals');
export const createDeal = (data) => axiosClient.post('/deals', data);
export const convertLeadToDeal = (leadId, data) => axiosClient.post(`/deals/convert-from-lead/${leadId}`, data);
export const updateDealStage = (id, stage) => axiosClient.put(`/deals/${id}/stage?stage=${stage}`);
export const getPipeline = () => axiosClient.get('/deals/pipeline');
export const deleteDeal = (id) => axiosClient.delete(`/deals/${id}`);
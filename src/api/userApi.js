import axiosClient from './axiosClient';

// We'll reuse this for Leads/Deals assignment dropdowns too
export const getAllUsers = () => axiosClient.get('/users');
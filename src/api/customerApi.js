import axiosClient from './axiosClient';

export const getAllCustomers = () => axiosClient.get('/customers');
export const getCustomerById = (id) => axiosClient.get(`/customers/${id}`);
export const createCustomer = (data) => axiosClient.post('/customers', data);
export const updateCustomer = (id, data) => axiosClient.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => axiosClient.delete(`/customers/${id}`);
export const searchCustomers = (name) => axiosClient.get(`/customers/search?name=${name}`);
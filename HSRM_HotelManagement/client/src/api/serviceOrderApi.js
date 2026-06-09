import apiClient from './apiClient';
export const getAll = () => apiClient.get('/service-orders');
export const getById = (id) => apiClient.get(`/service-orders/${id}`);
export const create = (data) => apiClient.post('/service-orders', data);
export const update = (id, data) => apiClient.put(`/service-orders/${id}`, data);
export const remove = (id) => apiClient.delete(`/service-orders/${id}`);

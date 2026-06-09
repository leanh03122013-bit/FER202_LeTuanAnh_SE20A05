import apiClient from './apiClient';
export const getAll = () => apiClient.get('/audit-logs');
export const getById = (id) => apiClient.get(`/audit-logs/${id}`);
export const create = (data) => apiClient.post('/audit-logs', data);
export const update = (id, data) => apiClient.put(`/audit-logs/${id}`, data);
export const remove = (id) => apiClient.delete(`/audit-logs/${id}`);

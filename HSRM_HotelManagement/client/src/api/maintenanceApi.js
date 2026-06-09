import apiClient from './apiClient';
export const getAll = () => apiClient.get('/maintenance');
export const getById = (id) => apiClient.get(`/maintenance/${id}`);
export const create = (data) => apiClient.post('/maintenance', data);
export const update = (id, data) => apiClient.put(`/maintenance/${id}`, data);
export const remove = (id) => apiClient.delete(`/maintenance/${id}`);

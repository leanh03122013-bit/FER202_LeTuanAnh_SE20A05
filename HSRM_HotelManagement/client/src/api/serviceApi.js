import apiClient from './apiClient';
export const getAll = () => apiClient.get('/services');
export const getById = (id) => apiClient.get(`/services/${id}`);
export const create = (data) => apiClient.post('/services', data);
export const update = (id, data) => apiClient.put(`/services/${id}`, data);
export const remove = (id) => apiClient.delete(`/services/${id}`);

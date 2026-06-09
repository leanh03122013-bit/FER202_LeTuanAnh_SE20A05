import apiClient from './apiClient';
export const getAll = () => apiClient.get('/guests');
export const getById = (id) => apiClient.get(`/guests/${id}`);
export const create = (data) => apiClient.post('/guests', data);
export const update = (id, data) => apiClient.put(`/guests/${id}`, data);
export const remove = (id) => apiClient.delete(`/guests/${id}`);

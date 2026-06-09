import apiClient from './apiClient';
export const getAll = () => apiClient.get('/users');
export const getById = (id) => apiClient.get(`/users/${id}`);
export const create = (data) => apiClient.post('/users', data);
export const update = (id, data) => apiClient.put(`/users/${id}`, data);
export const remove = (id) => apiClient.delete(`/users/${id}`);

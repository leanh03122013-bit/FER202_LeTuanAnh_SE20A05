import apiClient from './apiClient';
export const getAll = () => apiClient.get('/checkins');
export const getById = (id) => apiClient.get(`/checkins/${id}`);
export const create = (data) => apiClient.post('/checkins', data);
export const update = (id, data) => apiClient.put(`/checkins/${id}`, data);
export const remove = (id) => apiClient.delete(`/checkins/${id}`);

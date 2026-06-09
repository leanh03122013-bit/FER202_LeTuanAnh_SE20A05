import apiClient from './apiClient';
export const getAll = () => apiClient.get('/room-types');
export const getById = (id) => apiClient.get(`/room-types/${id}`);
export const create = (data) => apiClient.post('/room-types', data);
export const update = (id, data) => apiClient.put(`/room-types/${id}`, data);
export const remove = (id) => apiClient.delete(`/room-types/${id}`);

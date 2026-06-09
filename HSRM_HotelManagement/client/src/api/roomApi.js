import apiClient from './apiClient';
export const getAll = () => apiClient.get('/rooms');
export const getById = (id) => apiClient.get(`/rooms/${id}`);
export const create = (data) => apiClient.post('/rooms', data);
export const update = (id, data) => apiClient.put(`/rooms/${id}`, data);
export const remove = (id) => apiClient.delete(`/rooms/${id}`);

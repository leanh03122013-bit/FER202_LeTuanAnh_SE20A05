import apiClient from './apiClient';
export const getAll = () => apiClient.get('/reservations');
export const getById = (id) => apiClient.get(`/reservations/${id}`);
export const create = (data) => apiClient.post('/reservations', data);
export const update = (id, data) => apiClient.put(`/reservations/${id}`, data);
export const remove = (id) => apiClient.delete(`/reservations/${id}`);
export const confirm = (id) => apiClient.patch(`/reservations/${id}/confirm`);
export const cancel = (id) => apiClient.patch(`/reservations/${id}/cancel`);
export const getAvailableRooms = (params) => apiClient.get('/reservations/available-rooms', { params });

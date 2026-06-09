import apiClient from './apiClient';
export const getAll = () => apiClient.get('/invoices');
export const getById = (id) => apiClient.get(`/invoices/${id}`);
export const create = (data) => apiClient.post('/invoices', data);
export const update = (id, data) => apiClient.put(`/invoices/${id}`, data);
export const remove = (id) => apiClient.delete(`/invoices/${id}`);
export const calculate = (reservationId) => apiClient.get(`/invoices/calculate/${reservationId}`);
export const pay = (id, data) => apiClient.patch(`/invoices/${id}/pay`, data);

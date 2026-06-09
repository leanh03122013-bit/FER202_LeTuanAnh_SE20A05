import apiClient from './apiClient';
export const login = (data) => apiClient.post('/auth/login', data);
export const register = (data) => apiClient.post('/auth/register', data);
export const getProfile = () => apiClient.get('/auth/profile');

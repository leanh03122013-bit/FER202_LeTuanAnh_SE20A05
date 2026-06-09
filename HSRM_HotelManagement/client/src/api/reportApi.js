import apiClient from './apiClient';
export const getDashboard = () => apiClient.get('/reports/dashboard');
export const getMonthlyRevenue = () => apiClient.get('/reports/monthly-revenue');

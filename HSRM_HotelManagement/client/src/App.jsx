import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import AdminRooms from './pages/Admin/Rooms';
import Services from './pages/Admin/Services';
import Reports from './pages/Admin/Reports';
import AuditLogs from './pages/Admin/AuditLogs';
import Reservations from './pages/Receptionist/Reservations';
import CheckIn from './pages/Receptionist/CheckIn';
import Billing from './pages/Receptionist/Billing';
import CustomerRooms from './pages/Customer/Rooms';
import MyBookings from './pages/Customer/MyBookings';
import ServiceOrder from './pages/Customer/ServiceOrder';
import HousekeepingRooms from './pages/Housekeeping/Rooms';
import Maintenance from './pages/Housekeeping/Maintenance';
import ServiceOrders from './pages/ServiceStaff/Orders';

export default function App() {
  return <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="admin/dashboard" element={<Dashboard />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/rooms" element={<AdminRooms />} />
        <Route path="admin/services" element={<Services />} />
        <Route path="admin/reports" element={<Reports />} />
        <Route path="admin/audit-logs" element={<AuditLogs />} />
        <Route path="receptionist/reservations" element={<Reservations />} />
        <Route path="receptionist/checkin" element={<CheckIn />} />
        <Route path="receptionist/billing" element={<Billing />} />
        <Route path="customer/rooms" element={<CustomerRooms />} />
        <Route path="customer/bookings" element={<MyBookings />} />
        <Route path="customer/services" element={<ServiceOrder />} />
        <Route path="housekeeping/rooms" element={<HousekeepingRooms />} />
        <Route path="housekeeping/maintenance" element={<Maintenance />} />
        <Route path="service/orders" element={<ServiceOrders />} />
      </Route>
    </Routes>
  </AuthProvider>;
}

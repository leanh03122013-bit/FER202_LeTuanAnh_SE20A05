import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
export default function Sidebar() {
  const { user, logout } = useAuth();
  return <aside className="sidebar">
    <h2>HSRM Hotel</h2>
    <p>{user?.full_name || 'Guest'}</p>
    <Link to="/admin/dashboard">Admin Dashboard</Link>
    <Link to="/receptionist/reservations">Reservations</Link>
    <Link to="/customer/rooms">Customer Rooms</Link>
    <Link to="/service/orders">Service Orders</Link>
    <Link to="/housekeeping/rooms">Housekeeping</Link>
    <button onClick={logout}>Logout</button>
  </aside>;
}

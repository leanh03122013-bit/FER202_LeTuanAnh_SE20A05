import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth';
export default function MainLayout() {
  const { user, loading } = useAuth();
  if (loading) return <div className="content">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <div className="app-layout"><Sidebar /><main className="content"><Outlet /></main></div>;
}

import useFetch from '../../hooks/useFetch';
import * as reportApi from '../../api/reportApi';
import StatCard from '../../components/Admin/StatCard';

export default function Dashboard() {
  const { data, loading } = useFetch(reportApi.getDashboard);
  if (loading) return <p>Loading dashboard...</p>;
  const totalRooms = data.room_status?.reduce((s, x) => s + x.total, 0) || 0;
  return <>
    <h1>Admin Dashboard</h1>
    <div className="grid">
      <StatCard title="Total Rooms" value={totalRooms} />
      <StatCard title="Paid Revenue" value={data.revenue || 0} />
      <StatCard title="Room Status Types" value={data.room_status?.length || 0} />
      <StatCard title="Service Order Status" value={data.service_order_status?.length || 0} />
    </div>
  </>;
}

import useFetch from '../../hooks/useFetch';
import * as api from '../../api/reservationApi';

export default function MyBookings() {
  const { data, loading, error } = useFetch(api.getAll);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <><h1>My Bookings</h1><div className="card"><pre>{JSON.stringify(data, null, 2)}</pre></div></>;
}

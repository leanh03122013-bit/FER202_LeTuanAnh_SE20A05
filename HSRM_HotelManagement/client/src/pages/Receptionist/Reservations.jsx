import useFetch from '../../hooks/useFetch';
import * as api from '../../api/reservationApi';
import ReservationTable from '../../components/Receptionist/ReservationTable';

export default function Reservations() {
  const { data, loading, error } = useFetch(api.getAll);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <><h1>Reservations</h1><div className="card"><ReservationTable data={data} /></div></>;
}

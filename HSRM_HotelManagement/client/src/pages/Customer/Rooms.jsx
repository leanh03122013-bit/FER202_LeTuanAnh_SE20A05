import useFetch from '../../hooks/useFetch';
import * as api from '../../api/roomApi';
import RoomCard from '../../components/Customer/RoomCard';

export default function Rooms() {
  const { data, loading, error } = useFetch(api.getAll);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <><h1>Available Rooms</h1><div className="card"><div className="grid">{data.map(room => <RoomCard key={room.room_id} room={room} />)}</div></div></>;
}

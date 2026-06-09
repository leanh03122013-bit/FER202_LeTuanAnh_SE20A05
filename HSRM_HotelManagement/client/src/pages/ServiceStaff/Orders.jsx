import useFetch from '../../hooks/useFetch';
import * as api from '../../api/serviceOrderApi';
import ServiceOrderTable from '../../components/ServiceStaff/ServiceOrderTable';

export default function Orders() {
  const { data, loading, error } = useFetch(api.getAll);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <><h1>Service Orders</h1><div className="card"><ServiceOrderTable data={data} /></div></>;
}

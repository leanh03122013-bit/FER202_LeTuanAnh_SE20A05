import { useEffect, useState } from 'react';
export default function useFetch(fetcher) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reload = () => fetcher().then(res => setData(res.data.data)).catch(err => setError(err.message)).finally(() => setLoading(false));
  useEffect(() => { reload(); }, []);
  return { data, loading, error, reload };
}

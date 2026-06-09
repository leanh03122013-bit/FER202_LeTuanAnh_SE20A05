import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('admin@hsrm.com');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try { await login(email, password); navigate('/admin/dashboard'); }
    catch (err) { setMessage(err.response?.data?.message || err.message); }
  };

  return <div className="content" style={{ maxWidth: 420, margin: '70px auto' }}>
    <div className="card">
      <h1>HSRM Login</h1>
      <form onSubmit={submit}>
        <label>Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  </div>;
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInAdmin } from '../../auth/services/authService.js';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInAdmin(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-screen">
      <form className="admin-login-card" onSubmit={submit}>
        <span className="admin-login-mascot">🦸</span>
        <h1>Nara Admin</h1>
        <p>Login guru/admin untuk mengelola soal dan melihat hasil siswa.</p>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email admin" required />
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" required />
        {error ? <div className="admin-alert">{error}</div> : null}
        <button type="submit" disabled={loading}>{loading ? 'Masuk...' : 'Masuk Admin'}</button>
      </form>
    </div>
  );
}

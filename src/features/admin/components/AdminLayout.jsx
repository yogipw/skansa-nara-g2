import { NavLink, useNavigate } from 'react-router-dom';
import { signOutAdmin } from '../../auth/services/authService.js';

export default function AdminLayout({ title, children }) {
  const navigate = useNavigate();
  async function logout() {
    await signOutAdmin();
    navigate('/admin/login', { replace: true });
  }
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span>🦸</span><div><strong>Nara Admin</strong><small>SKANSA Games</small></div></div>
        <nav>
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/chapters">Bab</NavLink>
          <NavLink to="/admin/questions">Soal</NavLink>
          <NavLink to="/admin/minigames">Mini Game</NavLink>
          <NavLink to="/admin/results">Hasil Siswa</NavLink>
        </nav>
        <button className="admin-logout" type="button" onClick={logout}>Keluar</button>
      </aside>
      <main className="admin-main">
        <header className="admin-header"><div><p>SMK Negeri 1 Kongbeng</p><h1>{title}</h1></div><span>Generasi Siaga Narkotika</span></header>
        {children}
      </main>
    </div>
  );
}

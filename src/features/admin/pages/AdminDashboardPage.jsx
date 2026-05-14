import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout.jsx';
import StatCard from '../components/StatCard.jsx';
import { getDashboardStats } from '../services/adminService.js';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardStats().then(setStats).catch((err) => setError(err.message));
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {error ? <div className="admin-alert">{error}</div> : null}
      {!stats ? <div className="admin-panel">Memuat statistik...</div> : (
        <>
          <section className="admin-grid stats">
            <StatCard label="Total pemain" value={stats.totalPlayers} />
            <StatCard label="Rata-rata skor" value={stats.averageScore} accent="var(--pink)" />
            <StatCard label="Rata-rata akurasi" value={`${stats.averageAccuracy}%`} accent="var(--green)" />
            <StatCard label="Benar / Salah" value={`${stats.totalCorrect} / ${stats.totalWrong}`} accent="var(--orange)" />
          </section>
          <section className="admin-grid two">
            <div className="admin-panel">
              <h2>Soal Paling Sering Salah</h2>
              <p className="admin-big-text">{stats.mostMissedQuestion}</p>
            </div>
            <div className="admin-panel">
              <h2>Bab Terlemah</h2>
              <p className="admin-big-text">{stats.weakestChapter}</p>
            </div>
          </section>
          <section className="admin-panel">
            <h2>Leaderboard Top 10</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Nama</th><th>Kelas</th><th>Skor</th><th>Akurasi</th><th>Rank</th></tr></thead>
                <tbody>{stats.leaderboard.map((row) => <tr key={row.id}><td>{row.player_name}</td><td>{row.class_name}</td><td>{row.score}</td><td>{Math.round(row.accuracy)}%</td><td>{row.rank_label}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </AdminLayout>
  );
}

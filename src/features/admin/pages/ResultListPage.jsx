import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';
import { deleteGameSession, exportResultsToCSV, getGameSessions } from '../services/adminService.js';

export default function ResultListPage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [error, setError] = useState('');

  async function load() {
    setRows(await getGameSessions());
  }

  useEffect(() => { load().catch((err) => setError(err.message)); }, []);

  const filtered = useMemo(() => rows.filter((row) => {
    const matchesName = row.player_name.toLowerCase().includes(search.toLowerCase());
    const matchesClass = !classFilter || row.class_name.toLowerCase().includes(classFilter.toLowerCase());
    const playedAt = new Date(row.created_at);
    const matchesFrom = !dateFrom || playedAt >= new Date(`${dateFrom}T00:00:00`);
    const matchesTo = !dateTo || playedAt <= new Date(`${dateTo}T23:59:59`);
    return matchesName && matchesClass && matchesFrom && matchesTo;
  }), [rows, search, classFilter, dateFrom, dateTo]);

  async function removeSession(row) {
    const confirmed = window.confirm(`Hapus hasil testing milik ${row.player_name}? Jawaban quiz dan mini game ikut terhapus.`);
    if (!confirmed) return;
    setError('');
    try {
      await deleteGameSession(row.id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AdminLayout title="Hasil Siswa">
      {error ? <div className="admin-alert">{error}</div> : null}
      <section className="admin-panel">
        <div className="admin-toolbar">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nama..." />
          <input value={classFilter} onChange={(event) => setClassFilter(event.target.value)} placeholder="Filter kelas..." />
          <input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} aria-label="Tanggal mulai" />
          <input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} aria-label="Tanggal akhir" />
          <button type="button" onClick={() => exportResultsToCSV(filtered)}>Export CSV</button>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Nama</th><th>Kelas</th><th>Skor</th><th>Akurasi</th><th>Benar</th><th>Salah</th><th>Rank</th><th>Tanggal</th><th>Aksi</th></tr></thead>
            <tbody>{filtered.map((row) => <tr key={row.id}><td>{row.player_name}</td><td>{row.class_name}</td><td>{row.score}</td><td>{Math.round(row.accuracy)}%</td><td>{row.correct_count}</td><td>{row.wrong_count}</td><td>{row.rank_label}</td><td>{new Date(row.created_at).toLocaleString('id-ID')}</td><td><Link to={`/admin/results/${row.id}`}>Detail</Link><button className="danger" type="button" onClick={() => removeSession(row)}>Hapus</button></td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}

import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/AdminLayout.jsx';
import { getMiniGameItems, saveMiniGameItem, toggleMiniGameStatus } from '../services/adminService.js';

const emptyItem = { round_number: 1, statement_text: '', correct_answer: 'mitos', explanation: '', order_number: 0, is_active: true };

function toMiniGamePayload(form) {
  return {
    round_number: Number(form.round_number),
    statement_text: form.statement_text,
    correct_answer: form.correct_answer,
    explanation: form.explanation,
    order_number: Number(form.order_number),
    is_active: form.is_active,
  };
}

export default function MiniGameManagerPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyItem);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  async function load() {
    setItems(await getMiniGameItems());
  }

  useEffect(() => { load().catch((err) => setError(err.message)); }, []);

  const filtered = useMemo(() => items.filter((item) => {
    const term = search.toLowerCase();
    return item.statement_text.toLowerCase().includes(term)
      || (item.explanation || '').toLowerCase().includes(term)
      || item.correct_answer.toLowerCase().includes(term);
  }), [items, search]);

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      await saveMiniGameItem(toMiniGamePayload(form), editingId);
      setForm(emptyItem);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  function edit(item) {
    setEditingId(item.id);
    setForm({
      round_number: item.round_number ?? 1,
      statement_text: item.statement_text || '',
      correct_answer: item.correct_answer || 'mitos',
      explanation: item.explanation || '',
      order_number: item.order_number ?? 0,
      is_active: item.is_active,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyItem);
  }

  async function toggleStatus(item) {
    setError('');
    try {
      await toggleMiniGameStatus(item.id, !item.is_active);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AdminLayout title="Manajemen Mini Game">
      {error ? <div className="admin-alert">{error}</div> : null}
      <section className="admin-panel">
        <h2>{editingId ? 'Edit Statement' : 'Tambah Statement'}</h2>
        <form className="admin-form minigame-admin-form" onSubmit={submit}>
          <textarea className="mini-field-statement" value={form.statement_text} onChange={(event) => setForm({ ...form, statement_text: event.target.value })} placeholder="Statement" required />
          <input type="number" value={form.round_number} onChange={(event) => setForm({ ...form, round_number: event.target.value })} placeholder="Round" min="1" />
          <select value={form.correct_answer} onChange={(event) => setForm({ ...form, correct_answer: event.target.value })}><option value="mitos">Mitos</option><option value="fakta">Fakta</option></select>
          <input type="number" value={form.order_number} onChange={(event) => setForm({ ...form, order_number: event.target.value })} placeholder="Urutan" />
          <textarea className="mini-field-explanation" value={form.explanation} onChange={(event) => setForm({ ...form, explanation: event.target.value })} placeholder="Explanation" />
          <div className="admin-form-actions">
            <button type="submit">{editingId ? 'Simpan Perubahan' : 'Tambah Mini Game'}</button>
            {editingId ? <button type="button" className="secondary" onClick={cancelEdit}>Batal</button> : null}
          </div>
        </form>
      </section>
      <section className="admin-panel">
        <div className="admin-toolbar"><h2>Daftar Statement</h2><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari statement..." /></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Round</th><th>Statement</th><th>Jawaban</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>{filtered.map((item) => <tr key={item.id}><td>{item.round_number}</td><td>{item.statement_text}</td><td>{item.correct_answer}</td><td>{item.is_active ? 'Aktif' : 'Nonaktif'}</td><td><button type="button" onClick={() => edit(item)}>Edit</button><button type="button" onClick={() => toggleStatus(item)}>{item.is_active ? 'Nonaktifkan' : 'Aktifkan'}</button></td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}

import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/AdminLayout.jsx';
import { getChapters, saveChapter, toggleChapterStatus } from '../services/adminService.js';

const emptyChapter = { title: '', description: '', emoji: '📘', order_number: 0, is_active: true };

export default function ChapterManagerPage() {
  const [chapters, setChapters] = useState([]);
  const [form, setForm] = useState(emptyChapter);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  async function load() {
    setChapters(await getChapters());
  }

  useEffect(() => { load().catch((err) => setError(err.message)); }, []);

  const filtered = useMemo(() => chapters.filter((chapter) => {
    const term = search.toLowerCase();
    return chapter.title.toLowerCase().includes(term) || (chapter.description || '').toLowerCase().includes(term);
  }), [chapters, search]);

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      await saveChapter({ ...form, order_number: Number(form.order_number) }, editingId);
      setForm(emptyChapter);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  function edit(chapter) {
    setEditingId(chapter.id);
    setForm({
      title: chapter.title || '',
      description: chapter.description || '',
      emoji: chapter.emoji || '',
      order_number: chapter.order_number ?? 0,
      is_active: chapter.is_active,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyChapter);
  }

  return (
    <AdminLayout title="Manajemen Bab">
      {error ? <div className="admin-alert">{error}</div> : null}
      <section className="admin-panel">
        <h2>{editingId ? 'Edit Bab' : 'Tambah Bab'}</h2>
        <form className="admin-form grid" onSubmit={submit}>
          <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Judul bab" required />
          <input value={form.emoji} onChange={(event) => setForm({ ...form, emoji: event.target.value })} placeholder="Emoji" />
          <input type="number" value={form.order_number} onChange={(event) => setForm({ ...form, order_number: event.target.value })} placeholder="Urutan" />
          <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Deskripsi singkat" />
          <button type="submit">{editingId ? 'Simpan Perubahan' : 'Tambah Bab'}</button>
          {editingId ? <button type="button" className="secondary" onClick={cancelEdit}>Batal</button> : null}
        </form>
      </section>
      <section className="admin-panel">
        <div className="admin-toolbar"><h2>Daftar Bab</h2><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari bab..." /></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Urutan</th><th>Emoji</th><th>Judul</th><th>Deskripsi</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>{filtered.map((chapter) => (
              <tr key={chapter.id}>
                <td>{chapter.order_number}</td>
                <td>{chapter.emoji}</td>
                <td>{chapter.title}</td>
                <td>{chapter.description}</td>
                <td>{chapter.is_active ? 'Aktif' : 'Nonaktif'}</td>
                <td>
                  <button type="button" onClick={() => edit(chapter)}>Edit</button>
                  <button type="button" onClick={() => toggleChapterStatus(chapter.id, !chapter.is_active).then(load)}>{chapter.is_active ? 'Nonaktifkan' : 'Aktifkan'}</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}

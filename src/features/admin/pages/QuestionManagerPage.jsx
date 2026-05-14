import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/AdminLayout.jsx';
import { getChapters, getQuestions, saveQuestion, toggleQuestionStatus } from '../services/adminService.js';

const emptyQuestion = { chapter_id: '', emoji: '💊', question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: 0, explanation: '', difficulty: 'normal', points: 10, order_number: 0, is_active: true };

function toQuestionPayload(form) {
  return {
    chapter_id: form.chapter_id,
    emoji: form.emoji,
    question_text: form.question_text,
    option_a: form.option_a,
    option_b: form.option_b,
    option_c: form.option_c,
    option_d: form.option_d,
    correct_option: Number(form.correct_option),
    explanation: form.explanation,
    difficulty: form.difficulty,
    points: Number(form.points),
    order_number: Number(form.order_number),
    is_active: form.is_active,
  };
}

export default function QuestionManagerPage() {
  const [questions, setQuestions] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [form, setForm] = useState(emptyQuestion);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  async function load() {
    const [chapterRows, questionRows] = await Promise.all([getChapters(), getQuestions()]);
    setChapters(chapterRows);
    setQuestions(questionRows);
    if (!form.chapter_id && chapterRows[0]) setForm((current) => ({ ...current, chapter_id: chapterRows[0].id }));
  }

  useEffect(() => { load().catch((err) => setError(err.message)); }, []);

  const filtered = useMemo(() => questions.filter((question) => question.question_text.toLowerCase().includes(search.toLowerCase())), [questions, search]);

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      await saveQuestion(toQuestionPayload(form), editingId);
      setForm({ ...emptyQuestion, chapter_id: chapters[0]?.id || '' });
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  function edit(question) {
    setEditingId(question.id);
    setForm({
      chapter_id: question.chapter_id || '',
      emoji: question.emoji || '',
      question_text: question.question_text || '',
      option_a: question.option_a || '',
      option_b: question.option_b || '',
      option_c: question.option_c || '',
      option_d: question.option_d || '',
      correct_option: question.correct_option ?? 0,
      explanation: question.explanation || '',
      difficulty: question.difficulty || 'normal',
      points: question.points ?? 10,
      order_number: question.order_number ?? 0,
      is_active: question.is_active,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function toggleStatus(question) {
    setError('');
    try {
      await toggleQuestionStatus(question.id, !question.is_active);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AdminLayout title="Manajemen Soal">
      {error ? <div className="admin-alert">{error}</div> : null}
      <section className="admin-panel">
        <h2>{editingId ? 'Edit Soal' : 'Tambah Soal'}</h2>
        <form className="admin-form grid" onSubmit={submit}>
          <select value={form.chapter_id} onChange={(event) => setForm({ ...form, chapter_id: event.target.value })}>{chapters.map((chapter) => <option key={chapter.id} value={chapter.id}>{chapter.emoji} {chapter.title}</option>)}</select>
          <input value={form.emoji} onChange={(event) => setForm({ ...form, emoji: event.target.value })} placeholder="Emoji" />
          <textarea value={form.question_text} onChange={(event) => setForm({ ...form, question_text: event.target.value })} placeholder="Pertanyaan" required />
          {['a', 'b', 'c', 'd'].map((key) => <input key={key} value={form[`option_${key}`]} onChange={(event) => setForm({ ...form, [`option_${key}`]: event.target.value })} placeholder={`Opsi ${key.toUpperCase()}`} required />)}
          <select value={form.correct_option} onChange={(event) => setForm({ ...form, correct_option: event.target.value })}><option value="0">A benar</option><option value="1">B benar</option><option value="2">C benar</option><option value="3">D benar</option></select>
          <input type="number" value={form.points} onChange={(event) => setForm({ ...form, points: event.target.value })} placeholder="Poin" min="0" />
          <input type="number" value={form.order_number} onChange={(event) => setForm({ ...form, order_number: event.target.value })} placeholder="Urutan" />
          <textarea value={form.explanation} onChange={(event) => setForm({ ...form, explanation: event.target.value })} placeholder="Explanation/fact" />
          <button type="submit">{editingId ? 'Simpan Perubahan' : 'Tambah Soal'}</button>
          {editingId ? <button type="button" className="secondary" onClick={() => { setEditingId(null); setForm({ ...emptyQuestion, chapter_id: chapters[0]?.id || '' }); }}>Batal</button> : null}
        </form>
      </section>
      <section className="admin-panel">
        <div className="admin-toolbar"><h2>Daftar Soal</h2><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari soal..." /></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Bab</th><th>Pertanyaan</th><th>Benar</th><th>Poin</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>{filtered.map((question) => <tr key={question.id}><td>{question.chapter?.title}</td><td>{question.question_text}</td><td>{String.fromCharCode(65 + question.correct_option)}</td><td>{question.points}</td><td>{question.is_active ? 'Aktif' : 'Nonaktif'}</td><td><button type="button" onClick={() => edit(question)}>Edit</button><button type="button" onClick={() => toggleStatus(question)}>{question.is_active ? 'Nonaktifkan' : 'Aktifkan'}</button></td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}

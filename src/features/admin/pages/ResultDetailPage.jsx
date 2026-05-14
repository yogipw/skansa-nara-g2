import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';
import { getGameSessionDetail } from '../services/adminService.js';

const letters = ['A', 'B', 'C', 'D'];

export default function ResultDetailPage() {
  const { sessionId } = useParams();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { getGameSessionDetail(sessionId).then(setDetail).catch((err) => setError(err.message)); }, [sessionId]);

  return (
    <AdminLayout title="Detail Hasil">
      {error ? <div className="admin-alert">{error}</div> : null}
      {!detail ? <div className="admin-panel">Memuat detail...</div> : (
        <>
          <section className="admin-grid stats">
            <div className="admin-stat"><span>Nama</span><strong>{detail.session.player_name}</strong></div>
            <div className="admin-stat"><span>Kelas</span><strong>{detail.session.class_name}</strong></div>
            <div className="admin-stat"><span>Skor</span><strong>{detail.session.score}</strong></div>
            <div className="admin-stat"><span>Akurasi</span><strong>{Math.round(detail.session.accuracy)}%</strong></div>
          </section>
          <section className="admin-panel">
            <h2>Jawaban Quiz</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>No</th><th>Bab</th><th>Pertanyaan</th><th>Jawaban Siswa</th><th>Jawaban Benar</th><th>Status</th><th>Poin</th></tr></thead>
                <tbody>{detail.answers.map((row, index) => <tr key={row.id}><td>{index + 1}</td><td>{row.chapter_title_snapshot}</td><td>{row.question_text_snapshot}</td><td>{letters[row.selected_option]}</td><td>{letters[row.correct_option_snapshot]}</td><td>{row.is_correct ? 'Benar' : 'Salah'}</td><td>{row.score_gained}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
          <section className="admin-panel">
            <h2>Jawaban Mini Game</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Statement</th><th>Jawaban Siswa</th><th>Jawaban Benar</th><th>Status</th><th>Poin</th></tr></thead>
                <tbody>{detail.miniAnswers.map((row) => <tr key={row.id}><td>{row.statement_text_snapshot}</td><td>{row.selected_answer}</td><td>{row.correct_answer_snapshot}</td><td>{row.is_correct ? 'Benar' : 'Salah'}</td><td>{row.score_gained}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </AdminLayout>
  );
}

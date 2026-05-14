# PRD — SKANSA Nara Games Admin Edition

## 1. Ringkasan Produk

**SKANSA Nara Games Admin Edition** adalah pengembangan dari game edukasi anti-narkoba berbasis vanilla HTML, CSS, dan JavaScript menjadi aplikasi web modern berbasis **React + Supabase**.

Project lama sudah memiliki style game yang kuat: colorful, interaktif, edukatif, memiliki quiz, mini game, rank, sertifikat, animasi, dan share WhatsApp. Karena itu, pengembangan tidak boleh mengubah rasa utama game. Fokus utama pengembangan adalah mengganti “mesin belakang” aplikasi agar data soal, hasil siswa, statistik, dan admin panel bisa berjalan dinamis.

Produk akhir memiliki dua sisi utama:

```text
Student Game  = tampilan game untuk siswa
Admin Panel   = dashboard untuk admin/guru mengelola soal dan melihat statistik
```

---

## 2. Latar Belakang

Project saat ini menggunakan struktur sederhana:

```text
index.html
style.css
script.js
README.md
```

Data seperti soal, fakta, tips, mini game, quote, rank, dan aturan game masih hardcoded di `script.js`. Akibatnya, client/admin tidak bisa mengubah soal sendiri tanpa membuka kode dan deploy ulang.

Client menginginkan fitur agar admin/guru bisa:

1. Login sebagai admin.
2. Melihat statistik hasil siswa.
3. Melihat jawaban benar dan salah.
4. Melihat soal mana yang paling sering salah.
5. Menambah, mengedit, menghapus, dan menonaktifkan soal.
6. Mengatur bab/materi.
7. Mengatur konten game tanpa mengubah kode.

Karena kebutuhan ini, aplikasi perlu dimigrasikan dari static game menjadi web app dengan database.

---

## 3. Tujuan Produk

### 3.1 Tujuan Utama

- Mempertahankan style dan pengalaman bermain dari versi lama.
- Mengubah project menjadi React + Supabase.
- Memindahkan data hardcoded ke database.
- Menambahkan admin dashboard.
- Menambahkan sistem login admin sederhana.
- Menyimpan hasil permainan siswa ke database.
- Menyimpan detail jawaban siswa per soal.
- Menampilkan statistik benar/salah untuk admin.
- Membuat soal dan bab bisa dikelola admin.
- Membuat sistem tetap aman tanpa menyimpan password admin di frontend.

### 3.2 Tujuan Teknis

- Menggunakan React + Vite untuk frontend.
- Menggunakan Supabase untuk database dan authentication.
- Menggunakan Supabase Auth untuk login admin sederhana.
- Menggunakan Supabase Row Level Security untuk proteksi data.
- Memecah kode lama menjadi komponen React yang modular.
- Menghindari satu file JavaScript besar.
- Menyediakan SQL schema dan seed data.
- Menyediakan dokumentasi setup di README.

---

## 4. Non-Goals

Fitur berikut tidak wajib untuk MVP:

- Mobile app native.
- Payment system.
- Multi-tenant school system.
- Real-time multiplayer.
- AI-generated question.
- Advanced teacher role management.
- Register akun admin dari UI.
- Forgot password flow.
- Redesign total student game.
- Mengganti identitas visual game lama.
- Menghapus style lama dan membuat desain baru dari nol.

---

## 5. Prinsip Pengembangan

### 5.1 Student Game Harus Tetap Sama Secara Visual

Student-facing game tidak boleh diredesign besar-besaran.

Yang harus dipertahankan:

- Warna utama.
- Layout utama.
- Style card dan button.
- Animasi.
- Flow game.
- Copywriting fun dan edukatif.
- Karakter/identitas Nara.
- Mini game mitos/fakta.
- Sistem skor.
- Sistem streak.
- Sistem rank.
- Sertifikat.
- WhatsApp share.
- Efek confetti/fireworks bila ada.
- Sound effect bila ada.

React migration harus dilakukan sebagai **refactor**, bukan redesign.

### 5.2 CSS Lama Dipakai Ulang

File `style.css` lama harus dipertahankan semaksimal mungkin.

Di React, CSS lama dapat dipindah menjadi:

```text
src/styles/legacy-game.css
```

Lalu diimport dari entry app:

```js
import './styles/legacy-game.css';
```

Class HTML lama harus dikonversi ke JSX menggunakan `className`, bukan diganti total.

Contoh:

```html
<div class="game-card">
```

menjadi:

```jsx
<div className="game-card">
```

### 5.3 Admin Panel Boleh Punya Style Baru

Admin dashboard boleh dibuat lebih rapi, modern, dan profesional. Style admin tidak harus sama dengan student game.

Namun student game tetap harus mempertahankan style lama.

### 5.4 Data Harus Dinamis

Data yang awalnya hardcoded harus dipindahkan ke Supabase:

- Chapters/bab.
- Questions/soal.
- Mini game items.
- Facts.
- Tips.
- Quotes.
- Rank settings jika memungkinkan.
- Game settings.

### 5.5 Hasil Lama Harus Tetap Valid Walau Soal Diedit

Karena admin bisa mengedit soal, jawaban siswa harus menyimpan snapshot soal saat sesi berlangsung.

Jangan hanya menyimpan `question_id`.

Wajib menyimpan:

- Teks soal saat dijawab.
- Opsi A/B/C/D saat dijawab.
- Jawaban benar saat dijawab.
- Bab saat dijawab.
- Jawaban siswa.
- Status benar/salah.

Tujuannya agar riwayat hasil siswa tetap valid walaupun soal diedit setelahnya.

---

## 6. Target Pengguna

### 6.1 Siswa

Siswa menggunakan halaman game.

Kebutuhan siswa:

- Membuka game dari link.
- Mengisi nama.
- Mengisi kelas.
- Membaca fakta/tips edukatif.
- Bermain quiz.
- Bermain mini game.
- Melihat skor akhir.
- Melihat rank.
- Melihat sertifikat.
- Share hasil ke WhatsApp.

### 6.2 Admin/Guru

Admin/guru menggunakan dashboard.

Kebutuhan admin:

- Login dengan email dan password default.
- Melihat dashboard statistik.
- Melihat daftar siswa yang sudah bermain.
- Melihat detail jawaban benar/salah.
- Melihat performa per soal.
- Melihat performa per bab.
- Menambah soal.
- Mengedit soal.
- Menonaktifkan soal.
- Menghapus soal jika perlu.
- Mengelola bab.
- Export hasil siswa ke CSV.

---

## 7. Tech Stack

### 7.1 Frontend

Gunakan:

```text
React
Vite
React Router
TanStack Query
React Hook Form
Recharts
Supabase JS v2
```

Opsional:

```text
Tailwind CSS
shadcn/ui untuk admin dashboard
```

Catatan:

- Untuk student game, jangan bergantung pada desain shadcn jika itu mengubah style lama.
- shadcn/ui lebih cocok untuk admin dashboard.

### 7.2 Backend dan Database

Gunakan:

```text
Supabase
Supabase Postgres
Supabase Auth
Supabase Row Level Security
```

### 7.3 Deployment

Opsi deployment:

```text
Vercel
Netlify
Coolify
VPS dengan Docker
```

Untuk MVP, Vercel/Netlify paling cepat.

Untuk self-hosting, gunakan Coolify.

---

## 8. Strategi Auth Admin

### 8.1 Konsep MVP

Admin login dibuat sederhana.

Tidak perlu sistem register, multi-role kompleks, atau forgot password.

Gunakan:

```text
Supabase Auth single admin account
```

Artinya:

- Hanya ada satu akun admin default.
- Email dan password dibuat manual di Supabase dashboard.
- Tidak ada halaman register.
- Tidak ada fitur create admin dari UI.
- Password tidak boleh disimpan di kode React.
- Login tetap divalidasi oleh Supabase Auth.

Contoh akun default:

```text
Email    : admin@skansa.local
Password : ditentukan manual oleh owner/client di Supabase dashboard
```

Email boleh ditulis sebagai konfigurasi admin, tetapi password tidak boleh pernah dimasukkan ke repository.

### 8.2 Yang Tidak Boleh Dilakukan

Jangan membuat login seperti ini di frontend:

```js
const ADMIN_EMAIL = 'admin@skansa.local';
const ADMIN_PASSWORD = 'admin123';
```

Alasan:

- Kode React bisa dibaca dari browser.
- Password bisa ditemukan lewat DevTools.
- Tidak aman untuk client.

### 8.3 Protected Route

Semua route `/admin/*` harus dilindungi.

Jika belum login:

```text
/admin/* -> redirect ke /admin/login
```

Jika sudah login:

```text
/admin/login -> redirect ke /admin
```

### 8.4 Admin Authorization

Untuk MVP, admin dikenali dari email login.

Contoh admin email:

```text
admin@skansa.local
```

Di RLS policy Supabase, gunakan pengecekan email dari JWT:

```sql
auth.jwt() ->> 'email' = 'admin@skansa.local'
```

Jika nanti butuh multi-admin, baru tambahkan tabel `profiles` atau `admin_users`.

### 8.5 Signup

Signup harus dimatikan atau tidak diekspos dari UI.

UI hanya menyediakan:

```text
Email
Password
Login button
```

Tidak ada tombol register.

---

## 9. Routing

### 9.1 Public / Student Routes

```text
/                   Landing page game
/play               Halaman bermain utama
/result/:sessionId  Halaman hasil akhir siswa
```

### 9.2 Admin Routes

```text
/admin/login               Login admin
/admin                     Dashboard admin
/admin/questions           Manajemen soal
/admin/questions/new       Tambah soal
/admin/questions/:id/edit  Edit soal
/admin/chapters            Manajemen bab
/admin/results             Daftar hasil siswa
/admin/results/:sessionId  Detail hasil siswa
/admin/minigames           Manajemen mini game
/admin/content             Manajemen facts, tips, quotes
/admin/settings            Game settings
```

### 9.3 MVP Routes

Untuk versi awal, minimal implementasikan:

```text
/
/play
/result/:sessionId
/admin/login
/admin
/admin/questions
/admin/results
/admin/results/:sessionId
```

---

## 10. Struktur Folder yang Direkomendasikan

```text
src/
  app/
    App.jsx
    router.jsx

  lib/
    supabaseClient.js
    env.js

  features/
    game/
      pages/
        LandingPage.jsx
        PlayPage.jsx
        ResultPage.jsx
      components/
        PlayerForm.jsx
        FactCard.jsx
        TipCard.jsx
        QuestionCard.jsx
        AnswerOption.jsx
        MiniGameModal.jsx
        ProgressBar.jsx
        RankBadge.jsx
        CertificateCard.jsx
      hooks/
        useGameEngine.js
      services/
        gameService.js
      utils/
        scoring.js
        rank.js
        effects.js
        audio.js
        share.js
      data/
        fallbackData.js

    admin/
      pages/
        AdminLoginPage.jsx
        AdminDashboardPage.jsx
        QuestionManagerPage.jsx
        ChapterManagerPage.jsx
        ResultListPage.jsx
        ResultDetailPage.jsx
        MiniGameManagerPage.jsx
        ContentManagerPage.jsx
        SettingsPage.jsx
      components/
        AdminLayout.jsx
        StatCard.jsx
        ResultTable.jsx
        QuestionTable.jsx
        QuestionForm.jsx
        ChapterForm.jsx
        AccuracyChart.jsx
        LeaderboardTable.jsx
      services/
        adminService.js

    auth/
      components/
        ProtectedRoute.jsx
      hooks/
        useSession.js
      services/
        authService.js

  styles/
    index.css
    legacy-game.css
```

---

## 11. Database Schema

### 11.1 chapters

Menyimpan bab/materi.

```sql
create table chapters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  emoji text,
  order_number int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

Aturan:

- Bab bersifat dinamis.
- Admin bisa tambah/edit/nonaktifkan bab.
- Student hanya melihat bab aktif.
- Urutan mengikuti `order_number`.

---

### 11.2 questions

Menyimpan soal kuis.

```sql
create table questions (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid references chapters(id) on delete set null,
  emoji text,
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option int not null check (correct_option between 0 and 3),
  explanation text,
  difficulty text default 'normal',
  points int not null default 10,
  order_number int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

Mapping opsi:

```text
0 = A
1 = B
2 = C
3 = D
```

---

### 11.3 mini_game_items

Menyimpan data mini game mitos/fakta.

```sql
create table mini_game_items (
  id uuid primary key default gen_random_uuid(),
  round_number int not null default 1,
  statement_text text not null,
  correct_answer text not null check (correct_answer in ('mitos', 'fakta')),
  explanation text,
  order_number int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 11.4 game_settings

Menyimpan aturan game.

```sql
create table game_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'default',
  questions_per_chapter int not null default 4,
  max_chapters_per_game int not null default 4,
  randomize_questions boolean not null default false,
  randomize_options boolean not null default false,
  points_correct int not null default 10,
  points_wrong int not null default 0,
  streak_bonus_enabled boolean not null default true,
  streak_bonus_every int not null default 3,
  streak_bonus_points int not null default 5,
  mini_game_enabled boolean not null default true,
  mini_game_interval int not null default 4,
  mini_game_points int not null default 5,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

Default MVP:

```text
questions_per_chapter = 4
max_chapters_per_game = 4
points_correct = 10
points_wrong = 0
streak_bonus_enabled = true
streak_bonus_every = 3
streak_bonus_points = 5
mini_game_enabled = true
mini_game_interval = 4
mini_game_points = 5
```

---

### 11.5 game_sessions

Menyimpan hasil akhir siswa.

```sql
create table game_sessions (
  id uuid primary key default gen_random_uuid(),
  player_name text not null,
  class_name text,
  score int not null default 0,
  max_possible_score int not null default 0,
  correct_count int not null default 0,
  wrong_count int not null default 0,
  total_questions int not null default 0,
  accuracy numeric not null default 0,
  best_streak int not null default 0,
  mini_game_score int not null default 0,
  mini_game_correct_count int not null default 0,
  rank_label text,
  started_at timestamptz,
  finished_at timestamptz default now(),
  created_at timestamptz default now()
);
```

---

### 11.6 answer_logs

Menyimpan detail jawaban kuis siswa.

```sql
create table answer_logs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references game_sessions(id) on delete cascade,
  question_id uuid references questions(id) on delete set null,
  chapter_id uuid references chapters(id) on delete set null,
  chapter_title_snapshot text,
  question_text_snapshot text not null,
  option_a_snapshot text,
  option_b_snapshot text,
  option_c_snapshot text,
  option_d_snapshot text,
  selected_option int not null,
  correct_option_snapshot int not null,
  is_correct boolean not null,
  score_gained int not null default 0,
  answered_at timestamptz default now()
);
```

Snapshot wajib digunakan agar histori tidak rusak ketika soal diedit.

---

### 11.7 mini_game_answer_logs

Menyimpan detail jawaban mini game siswa.

```sql
create table mini_game_answer_logs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references game_sessions(id) on delete cascade,
  mini_game_item_id uuid references mini_game_items(id) on delete set null,
  statement_text_snapshot text not null,
  selected_answer text not null,
  correct_answer_snapshot text not null,
  is_correct boolean not null,
  score_gained int not null default 0,
  answered_at timestamptz default now()
);
```

---

### 11.8 facts

Menyimpan fakta edukatif.

```sql
create table facts (
  id uuid primary key default gen_random_uuid(),
  icon text,
  emoji text,
  title text not null,
  stat text,
  stat_context text,
  body text,
  color text,
  order_number int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 11.9 tips

Menyimpan tips/skenario edukatif.

```sql
create table tips (
  id uuid primary key default gen_random_uuid(),
  icon text,
  title text not null,
  subtitle text,
  response text,
  body text,
  order_number int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 11.10 quotes

Menyimpan quote hasil akhir.

```sql
create table quotes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  author text,
  min_accuracy numeric default 0,
  max_accuracy numeric default 100,
  order_number int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 11.11 ranks

Menyimpan rank berdasarkan akurasi.

```sql
create table ranks (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  min_accuracy numeric not null,
  max_accuracy numeric not null,
  description text,
  emoji text,
  order_number int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

Default rank:

```text
90-100 = Legenda Nara
75-89  = Garda Muda
60-74  = Pejuang Sehat
40-59  = Perlu Latihan
0-39   = Pemula
```

---

## 12. Row Level Security

### 12.1 Prinsip RLS

RLS wajib aktif untuk tabel penting.

Public/siswa boleh:

```text
SELECT active chapters
SELECT active questions
SELECT active mini_game_items
SELECT active facts
SELECT active tips
SELECT active ranks
INSERT game_sessions
INSERT answer_logs
INSERT mini_game_answer_logs
```

Public/siswa tidak boleh:

```text
UPDATE questions
DELETE questions
SELECT semua hasil siswa
SELECT semua answer_logs
UPDATE game_sessions
DELETE game_sessions
```

Admin boleh:

```text
CRUD chapters
CRUD questions
CRUD mini_game_items
CRUD facts
CRUD tips
CRUD quotes
CRUD ranks
SELECT semua game_sessions
SELECT semua answer_logs
SELECT semua mini_game_answer_logs
```

### 12.2 Helper Function Admin

Gunakan helper function di Supabase SQL:

```sql
create or replace function is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'admin@skansa.local';
$$;
```

Catatan:

- Ganti `admin@skansa.local` dengan email admin asli.
- Email admin boleh diketahui.
- Password admin tidak boleh pernah disimpan di repository.

### 12.3 Contoh Policy

Contoh untuk `questions`:

```sql
alter table questions enable row level security;

create policy "Public can read active questions"
on questions
for select
using (is_active = true);

create policy "Admin can manage questions"
on questions
for all
using (is_admin())
with check (is_admin());
```

Contoh untuk `game_sessions`:

```sql
alter table game_sessions enable row level security;

create policy "Public can insert game sessions"
on game_sessions
for insert
with check (true);

create policy "Admin can read game sessions"
on game_sessions
for select
using (is_admin());
```

Contoh untuk `answer_logs`:

```sql
alter table answer_logs enable row level security;

create policy "Public can insert answer logs"
on answer_logs
for insert
with check (true);

create policy "Admin can read answer logs"
on answer_logs
for select
using (is_admin());
```

---

## 13. Strategi Bab dan Soal Dinamis

Bab tidak fix di code.

Bab diambil dari tabel `chapters`.

Aturan MVP:

```text
Ambil bab aktif berdasarkan order_number
Maksimal bab per game mengikuti game_settings.max_chapters_per_game
Ambil soal aktif per bab mengikuti game_settings.questions_per_chapter
```

Default:

```text
4 bab aktif
4 soal per bab
Total normal = 16 soal
```

Jika admin menambah bab ke-5, sistem tidak otomatis membuat game terlalu panjang. Sistem tetap mengambil maksimal 4 bab berdasarkan setting.

Di masa depan, bisa dibuat game mode:

```text
Mode Singkat = 3 bab x 3 soal
Mode Normal  = 4 bab x 4 soal
Mode Lengkap = semua bab x 4 soal
```

Untuk MVP, cukup satu default mode.

---

## 14. Sistem Scoring

### 14.1 Prinsip

Rank harus berdasarkan akurasi, bukan skor mentah.

Alasan:

- Jumlah soal bisa berubah.
- Bab bisa bertambah.
- Soal bisa dinamis.
- Skor mentah tidak selalu adil dibandingkan antar sesi.
- Akurasi lebih stabil untuk rank.

### 14.2 Formula Default

```text
baseScore = correctCount * points_correct
wrongScore = wrongCount * points_wrong
streakBonus = floor(bestStreak / streak_bonus_every) * streak_bonus_points
miniGameScore = miniGameCorrectCount * mini_game_points

totalScore = baseScore + wrongScore + streakBonus + miniGameScore
accuracy = correctCount / totalQuestions * 100
```

Default:

```text
Benar quiz        = +10
Salah quiz        = 0
Mini game benar   = +5
Streak bonus      = +5 setiap 3 jawaban benar berturut-turut
Rank              = berdasarkan akurasi
```

### 14.3 Rank Default

```text
90-100% = Legenda Nara
75-89%  = Garda Muda
60-74%  = Pejuang Sehat
40-59%  = Perlu Latihan
0-39%   = Pemula
```

### 14.4 Max Possible Score

Simpan `max_possible_score` di `game_sessions`.

Tujuannya agar admin bisa memahami skor berdasarkan aturan game saat sesi itu berlangsung.

---

## 15. Flow Student Game

### 15.1 Landing

Siswa membuka `/`.

Tampilkan intro game seperti versi lama.

CTA:

```text
Mulai Main
```

### 15.2 Input Identitas

Sebelum bermain, siswa mengisi:

```text
Nama
Kelas
```

Validasi:

- Nama wajib.
- Kelas optional tapi sangat disarankan.
- Jangan minta login siswa.

### 15.3 Start Game

Saat game dimulai:

1. Fetch `game_settings` aktif.
2. Fetch `chapters` aktif.
3. Fetch `questions` aktif per bab.
4. Fetch `mini_game_items` aktif.
5. Susun daftar soal.
6. Freeze daftar soal di state game.
7. Jangan fetch ulang soal di tengah permainan.

### 15.4 Answer Question

Saat siswa menjawab:

1. Cek benar/salah.
2. Update score.
3. Update correct/wrong count.
4. Update streak.
5. Simpan jawaban ke state lokal sementara.
6. Tampilkan feedback dan explanation/fact.
7. Lanjut ke soal berikutnya.

### 15.5 Mini Game

Mini game muncul sesuai `mini_game_interval`.

Default:

```text
Mini game muncul setelah soal ke-4 dan ke-8
```

Jika jumlah soal berubah, gunakan aturan interval dari setting.

### 15.6 Finish Game

Saat game selesai:

1. Hitung skor akhir.
2. Hitung akurasi.
3. Tentukan rank.
4. Insert ke `game_sessions`.
5. Insert semua `answer_logs`.
6. Insert semua `mini_game_answer_logs`.
7. Redirect ke `/result/:sessionId`.

### 15.7 Result Page

Tampilkan:

- Nama siswa.
- Kelas.
- Skor.
- Akurasi.
- Benar.
- Salah.
- Streak terbaik.
- Mini game score.
- Rank.
- Quote.
- Certificate.
- Share WhatsApp.

Result page harus tetap mempertahankan style lama.

---

## 16. Flow Admin

### 16.1 Login Admin

Route:

```text
/admin/login
```

Field:

```text
Email
Password
```

Action:

- Login menggunakan Supabase Auth.
- Jika sukses, redirect ke `/admin`.
- Jika gagal, tampilkan error.

Tidak ada tombol register.

### 16.2 Dashboard Admin

Route:

```text
/admin
```

Tampilkan stat cards:

```text
Total pemain
Rata-rata skor
Rata-rata akurasi
Total jawaban benar
Total jawaban salah
Soal paling sering salah
Bab paling lemah
```

Tampilkan chart:

```text
Jumlah pemain per hari
Akurasi per bab
Distribusi rank
```

Tampilkan leaderboard:

```text
Top 10 siswa berdasarkan akurasi/skor
```

### 16.3 Result List

Route:

```text
/admin/results
```

Tabel kolom:

```text
Nama
Kelas
Skor
Akurasi
Benar
Salah
Rank
Tanggal main
Action detail
```

Filter:

```text
Tanggal
Kelas
Rank
Search nama
```

Action:

```text
View detail
Export CSV
```

### 16.4 Result Detail

Route:

```text
/admin/results/:sessionId
```

Tampilkan ringkasan:

```text
Nama
Kelas
Skor
Akurasi
Benar
Salah
Rank
Started at
Finished at
```

Tampilkan detail jawaban:

```text
Nomor
Bab
Pertanyaan
Jawaban siswa
Jawaban benar
Status benar/salah
Score gained
Explanation
```

### 16.5 Question Manager

Route:

```text
/admin/questions
```

Fitur:

- Lihat daftar soal.
- Search soal.
- Filter bab.
- Filter status aktif/nonaktif.
- Tambah soal.
- Edit soal.
- Nonaktifkan soal.
- Hapus soal jika diperlukan.

Kolom tabel:

```text
Bab
Pertanyaan
Jawaban benar
Poin
Status
Urutan
Action
```

### 16.6 Question Form

Field:

```text
Bab
Emoji
Pertanyaan
Opsi A
Opsi B
Opsi C
Opsi D
Jawaban benar
Explanation/fact
Difficulty
Points
Order number
Status aktif
```

Validasi:

- Pertanyaan wajib.
- Semua opsi wajib.
- Jawaban benar wajib 0-3.
- Bab wajib dipilih.
- Points minimal 0.

### 16.7 Chapter Manager

Route:

```text
/admin/chapters
```

Fitur:

- Tambah bab.
- Edit bab.
- Urutkan bab.
- Aktif/nonaktifkan bab.

Field:

```text
Title
Description
Emoji
Order number
Status aktif
```

### 16.8 Mini Game Manager

Route:

```text
/admin/minigames
```

Fitur:

- Tambah statement.
- Edit statement.
- Pilih jawaban benar: mitos/fakta.
- Tambah explanation.
- Aktif/nonaktifkan.

### 16.9 Content Manager

Route:

```text
/admin/content
```

Fitur untuk mengelola:

```text
Facts
Tips
Quotes
Ranks
```

Untuk MVP, fitur ini boleh ditunda jika waktu terbatas.

---

## 17. Admin Dashboard Statistik

### 17.1 Statistik Utama

Wajib ada:

```text
Total sessions
Average score
Average accuracy
Total correct answers
Total wrong answers
Most missed question
Weakest chapter
```

### 17.2 Statistik Per Soal

Untuk setiap soal:

```text
Question text
Total answered
Correct count
Wrong count
Accuracy percentage
Most selected wrong option
```

### 17.3 Statistik Per Bab

Untuk setiap bab:

```text
Chapter title
Total answered
Correct count
Wrong count
Accuracy percentage
```

### 17.4 Leaderboard

Tampilkan:

```text
Nama
Kelas
Skor
Akurasi
Rank
Tanggal
```

Sort default:

```text
Akurasi tertinggi, lalu skor tertinggi
```

---

## 18. Export CSV

Admin bisa export hasil siswa.

Minimal CSV berisi:

```text
Nama
Kelas
Skor
Max Possible Score
Akurasi
Benar
Salah
Streak Terbaik
Mini Game Score
Rank
Tanggal Main
```

Untuk versi lanjutan, export detail jawaban per siswa.

---

## 19. Supabase Services

### 19.1 gameService.js

Berisi fungsi untuk student game:

```js
getActiveGameSettings()
getActiveChapters()
getQuestionsForGame()
getActiveMiniGameItems()
getActiveFacts()
getActiveTips()
createGameSession(payload)
createAnswerLogs(payload)
createMiniGameAnswerLogs(payload)
getResultBySessionId(sessionId)
```

### 19.2 adminService.js

Berisi fungsi untuk admin:

```js
getDashboardStats()
getGameSessions(filters)
getGameSessionDetail(sessionId)
getQuestions(filters)
createQuestion(payload)
updateQuestion(id, payload)
deleteQuestion(id)
toggleQuestionStatus(id, isActive)
getChapters()
createChapter(payload)
updateChapter(id, payload)
getMiniGameItems()
createMiniGameItem(payload)
updateMiniGameItem(id, payload)
exportResultsToCSV(filters)
```

### 19.3 authService.js

Berisi fungsi auth admin:

```js
signInAdmin(email, password)
signOutAdmin()
getCurrentSession()
onAuthStateChange(callback)
```

---

## 20. Game Engine Hook

Buat hook:

```text
useGameEngine
```

State yang perlu dikelola:

```text
playerName
className
questions
miniGameItems
currentQuestionIndex
score
correctCount
wrongCount
streak
bestStreak
selectedAnswers
miniGameAnswers
startedAt
isFinished
```

Function:

```text
startGame(player)
answerQuestion(selectedOption)
answerMiniGame(selectedAnswer)
goToNextQuestion()
finishGame()
resetGame()
```

Hook ini bertanggung jawab pada logic game, bukan styling.

UI component hanya render data dari hook.

---

## 21. Migration Strategy dari Project Lama

### 21.1 Phase 1 — Setup React

Buat React + Vite project di folder yang sama atau branch baru.

Install dependency:

```bash
npm install @supabase/supabase-js react-router-dom @tanstack/react-query react-hook-form recharts
```

Jika pakai Tailwind/shadcn untuk admin, setup belakangan.

### 21.2 Phase 2 — Pindahkan Style Lama

- Ambil `style.css` lama.
- Pindahkan ke `src/styles/legacy-game.css`.
- Import di app.
- Jangan ubah class styling besar-besaran.

### 21.3 Phase 3 — Convert HTML ke React Components

Pecah `index.html` menjadi:

```text
LandingPage.jsx
PlayPage.jsx
ResultPage.jsx
QuestionCard.jsx
MiniGameModal.jsx
CertificateCard.jsx
```

Gunakan `className` yang sama dari HTML lama.

### 21.4 Phase 4 — Pindahkan Logic Lama

Ambil logic dari `script.js` dan pisahkan menjadi:

```text
useGameEngine.js
scoring.js
rank.js
effects.js
audio.js
share.js
```

Jangan ubah behavior utama sebelum game berhasil berjalan seperti versi lama.

### 21.5 Phase 5 — Data Lokal Sementara

Sebelum Supabase aktif, pindahkan data lama ke:

```text
src/features/game/data/fallbackData.js
```

Pastikan game berjalan dulu dengan data lokal.

### 21.6 Phase 6 — Setup Supabase

- Buat project Supabase.
- Buat tabel sesuai schema.
- Aktifkan RLS.
- Buat admin user di Supabase Auth.
- Seed data dari data lama.

### 21.7 Phase 7 — Connect Game ke Supabase

Ganti data lokal menjadi data dari Supabase:

```text
fallbackData.js -> Supabase fetch
```

Tetap sediakan fallback data untuk development jika Supabase belum terhubung.

### 21.8 Phase 8 — Admin Dashboard

Buat admin route dan dashboard:

```text
/admin/login
/admin
/admin/questions
/admin/results
/admin/results/:sessionId
```

### 21.9 Phase 9 — Polish

Tambahkan:

```text
Loading state
Error state
Empty state
CSV export
Responsive admin layout
Better form validation
```

---

## 22. Environment Variables

Gunakan `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_EMAIL=admin@skansa.local
```

Catatan:

- `VITE_ADMIN_EMAIL` bukan secret.
- Jangan pernah simpan admin password di `.env` frontend.
- Jangan commit `.env`.
- Sediakan `.env.example`.

Contoh `.env.example`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_ADMIN_EMAIL=admin@skansa.local
```

---

## 23. README Requirements

README harus menjelaskan:

1. Deskripsi project.
2. Tech stack.
3. Cara install.
4. Cara menjalankan development server.
5. Cara setup Supabase.
6. Cara membuat admin user.
7. Cara menjalankan SQL schema.
8. Cara seed data.
9. Cara deploy.
10. Akun admin tidak disimpan di repo.

Contoh command:

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## 24. Acceptance Criteria MVP

MVP dianggap selesai jika:

### Student Game

- Game bisa dibuka dari `/`.
- Siswa bisa input nama dan kelas.
- Game tampil mirip versi lama.
- Style utama tidak berubah besar.
- Soal diambil dari Supabase.
- Mini game tetap berjalan.
- Skor dihitung dengan benar.
- Rank muncul di hasil akhir.
- Sertifikat muncul.
- Share WhatsApp tetap ada.
- Hasil siswa tersimpan ke `game_sessions`.
- Jawaban siswa tersimpan ke `answer_logs`.

### Admin

- Admin bisa login dari `/admin/login`.
- Password tidak ada di frontend code.
- `/admin/*` tidak bisa dibuka tanpa login.
- Admin bisa melihat dashboard statistik.
- Admin bisa melihat daftar hasil siswa.
- Admin bisa melihat detail jawaban siswa.
- Admin bisa tambah soal.
- Admin bisa edit soal.
- Admin bisa menonaktifkan soal.
- Admin bisa melihat soal yang paling sering salah.
- Admin bisa export CSV hasil siswa.

### Database/Security

- RLS aktif.
- Public hanya bisa baca konten aktif.
- Public bisa insert hasil game.
- Public tidak bisa membaca semua hasil siswa.
- Admin bisa CRUD soal.
- Admin bisa membaca semua hasil siswa.

---

## 25. Nice-to-Have Features

Setelah MVP selesai, fitur berikut bisa ditambahkan:

```text
Leaderboard per kelas
Filter statistik per tanggal
Filter statistik per kelas
Game mode singkat/normal/lengkap
QR code untuk link game
Cetak sertifikat
Export detail jawaban ke CSV
Import soal dari CSV
Duplikasi soal
Bank soal per kategori
Preview soal sebelum publish
Dark mode admin
Multi admin
Teacher role
```

---

## 26. Instruksi Khusus untuk AI Agent

Agent harus mengikuti aturan ini:

```text
1. Baca PRD.md, README.md, dan file project lama sebelum mulai bekerja.
2. Jangan redesign student game.
3. Pertahankan style, class CSS, animasi, flow, rank, certificate, dan share WhatsApp dari versi lama.
4. Migrasi ke React secara bertahap.
5. Jangan membuat satu file App.jsx raksasa.
6. Pisahkan logic game ke hook dan utils.
7. Pisahkan Supabase query ke service file.
8. Jangan menyimpan admin password di frontend code.
9. Gunakan Supabase Auth untuk login admin.
10. Gunakan RLS untuk proteksi database.
11. Public user tidak perlu login.
12. Siswa hanya input nama dan kelas.
13. Simpan snapshot soal di answer_logs.
14. Rank harus berdasarkan akurasi, bukan skor mentah.
15. Update README setelah implementasi.
16. Jalankan build sebelum menyatakan selesai.
17. Jangan mengubah file yang tidak relevan.
18. Jangan menambahkan dependency tanpa alasan jelas.
19. Jika ada perubahan besar, buat plan singkat dulu.
20. Selesaikan satu task kecil per tahap.
```

---

## 27. Suggested Agent Workflow

```text
1. Inspect existing index.html, style.css, and script.js.
2. Identify all hardcoded data arrays.
3. Create React + Vite structure.
4. Move old CSS into legacy-game.css.
5. Convert landing UI to React.
6. Convert play/quiz UI to React.
7. Convert result/certificate UI to React.
8. Move game logic into useGameEngine.
9. Move scoring/rank/share/effects/audio into utils.
10. Use fallbackData.js first.
11. Verify game visually matches old version.
12. Add Supabase client.
13. Add SQL schema files.
14. Add seed data from old hardcoded arrays.
15. Fetch questions/content from Supabase.
16. Insert game session and answer logs.
17. Add admin login.
18. Add protected admin layout.
19. Add dashboard stats.
20. Add question CRUD.
21. Add result list and result detail.
22. Add CSV export.
23. Update README.
24. Run lint/build.
25. Summarize changes.
```

---

## 28. SQL File Organization

Direkomendasikan membuat folder:

```text
supabase/
  schema.sql
  policies.sql
  seed.sql
```

Isi:

```text
schema.sql   = create tables
policies.sql = RLS policies
seed.sql     = initial chapters, questions, mini games, ranks, settings
```

---

## 29. Development Notes

### 29.1 Jangan Hapus Data Lama Terlalu Cepat

Sebelum Supabase connect sempurna, simpan data lama di fallback file.

```text
src/features/game/data/fallbackData.js
```

Ini berguna agar game tetap bisa dites tanpa database.

### 29.2 Jangan Fetch Soal Berulang di Tengah Game

Saat game dimulai, generate question set sekali.

Setelah itu, gunakan data yang sudah difreeze di state.

Alasan:

- Jika admin edit soal saat siswa sedang main, game tidak berubah mendadak.
- Snapshot jawaban lebih konsisten.

### 29.3 Soft Delete Lebih Aman daripada Hard Delete

Untuk soal, bab, facts, tips, dan mini game, gunakan `is_active = false` daripada langsung delete.

Hard delete boleh disediakan untuk admin, tetapi default action sebaiknya nonaktifkan.

---

## 30. Risiko dan Mitigasi

### Risiko 1 — Style game berubah saat migrasi React

Mitigasi:

- Pakai CSS lama.
- Pertahankan className lama.
- Convert HTML ke JSX tanpa redesign.
- Bandingkan tampilan lama vs baru.

### Risiko 2 — Password admin bocor

Mitigasi:

- Jangan hardcode password.
- Gunakan Supabase Auth.
- Buat admin user dari Supabase dashboard.

### Risiko 3 — Data hasil lama berubah setelah soal diedit

Mitigasi:

- Simpan snapshot soal dan jawaban benar di answer_logs.

### Risiko 4 — Jumlah soal berubah membuat ranking tidak adil

Mitigasi:

- Rank berdasarkan akurasi.
- Simpan total_questions dan max_possible_score per session.

### Risiko 5 — Public bisa baca hasil siswa

Mitigasi:

- Aktifkan RLS.
- Public hanya boleh insert hasil.
- Select hasil hanya untuk admin.

---

## 31. Prioritas Implementasi

### Priority 0 — Wajib

```text
React migration
Style game lama tetap sama
Supabase schema
Admin login sederhana
Question fetch dari Supabase
Game session save
Answer logs save
Admin result list
Admin result detail
Question CRUD
RLS dasar
```

### Priority 1 — Penting

```text
Dashboard stats
Chapter CRUD
CSV export
Mini game CRUD
Filter result by class/date
```

### Priority 2 — Lanjutan

```text
Content manager facts/tips/quotes
Rank manager
Game settings manager
Import soal CSV
Leaderboard per kelas
QR code
```

---

## 32. Definition of Done

Project dianggap selesai untuk MVP jika:

1. Student game berjalan di React.
2. Tampilan student game tetap sangat mirip versi lama.
3. Soal berasal dari Supabase.
4. Admin bisa login.
5. Admin bisa CRUD soal.
6. Hasil siswa tersimpan.
7. Detail jawaban siswa tersimpan.
8. Admin bisa melihat statistik benar/salah.
9. Admin bisa melihat detail jawaban per siswa.
10. RLS sudah aktif.
11. Password admin tidak ada di repository.
12. Build berhasil tanpa error.
13. README sudah diperbarui.
14. SQL schema, policies, dan seed tersedia.

---

## 33. Prompt Ringkas untuk Agent

Gunakan prompt ini jika agent butuh instruksi singkat:

```text
Upgrade this existing vanilla HTML/CSS/JS educational quiz game into a React + Supabase app.

Keep the student game visually identical to the old version. Do not redesign the game UI. Preserve the existing CSS style, animations, flow, scoring, rank screen, certificate, mini games, and WhatsApp share behavior.

Use React + Vite for the frontend and Supabase for database/auth. Public students do not log in; they only enter name and class. Admin login uses one default Supabase Auth email/password account. Do not store the admin password in frontend code.

Move hardcoded chapters, questions, mini game items, facts, tips, quotes, ranks, and game settings into Supabase. Fetch active content for the student game. Save game_sessions and answer_logs when the game finishes. Store snapshots of question text, options, correct answer, and chapter in answer_logs.

Add admin routes for login, dashboard, question CRUD, result list, and result detail. Protect /admin routes. Use RLS so public users can only read active game content and insert their own game results, while only the admin can manage content and read all results.

Keep code modular. Do not create one giant App.jsx. Add README setup instructions and SQL schema/policies/seed files.
```

---

## 34. Catatan Akhir

Strategi utama project ini adalah:

```text
Style lama tetap dipertahankan.
Mesin data diganti dengan React + Supabase.
Admin dashboard ditambahkan sebagai fitur baru.
```

Dengan strategi ini, siswa tetap merasakan game yang sama, sementara client/guru mendapatkan fitur profesional untuk mengelola soal dan melihat statistik hasil belajar.


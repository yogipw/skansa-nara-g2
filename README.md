# SKANSA Nara Games Admin Edition

Game edukasi anti-narkotika untuk siswa SMK Negeri 1 Kongbeng, sekarang dimigrasikan ke React + Supabase dengan admin panel untuk guru.

Student game tetap mempertahankan rasa versi lama: colorful, interaktif, Nara sebagai maskot, quiz, mini game Mitos/Fakta, rank, sertifikat, dan share WhatsApp. Admin panel ditambahkan untuk mengelola soal, mini game, dan melihat hasil siswa.

## Tech Stack

- React + Vite
- React Router
- React Hook Form-ready forms
- Recharts-ready dashboard dependency
- Supabase JS v2
- Supabase Auth + Postgres + RLS
- CSS lama tetap dipakai lewat `src/styles/legacy-game.css`

## Struktur Penting

```text
src/
  app/
  lib/
  features/
    game/
    admin/
    auth/
  styles/
supabase/
  schema.sql
  policies.sql
  seed.sql
```

File lama `style.css` masih dipakai sebagai sumber legacy style. File `script.js` lama dibiarkan sebagai referensi migrasi, tetapi app React berjalan dari `src/main.jsx`.

## Cara Menjalankan Lokal

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

Jika `.env` belum diisi, student game tetap bisa berjalan memakai fallback data lokal. Admin dan penyimpanan hasil ke database membutuhkan Supabase.

## Environment Variables

Copy `.env.example` menjadi `.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Jangan simpan password admin di `.env`, frontend code, README, atau repository.

## Setup Supabase Dari Nol

1. Buat project Supabase.
2. Buka SQL Editor.
3. Jalankan berurutan:

```text
supabase/schema.sql
supabase/policies.sql
supabase/seed.sql
```

4. Buat user admin manual di Supabase Auth.
5. Tambahkan email admin ke allowlist:

```sql
insert into admin_users (email, is_active)
values ('email-admin@domain.com', true);
```

Admin authorization memakai tabel `admin_users`, bukan email hardcoded di policy. Password tetap dikelola Supabase Auth dan tidak pernah masuk repo.

## Route

Student:

```text
/
/play
/result/:sessionId
```

Admin:

```text
/admin/login
/admin
/admin/chapters
/admin/questions
/admin/minigames
/admin/results
/admin/results/:sessionId
```

## MVP Behavior

- Siswa wajib mengisi nama dan kelas.
- Siswa tidak login.
- Soal, bab, mini game, settings, dan hasil tersimpan di Supabase saat env tersedia.
- Facts, tips, quotes, dan ranks masih fallback lokal untuk MVP.
- Hasil publik `/result/:sessionId` hanya menampilkan ringkasan, bukan detail jawaban.
- Detail jawaban hanya tersedia di admin.
- Hapus bab/soal/mini game memakai soft delete lewat `is_active = false`.
- Admin bisa memfilter hasil siswa berdasarkan nama, kelas, dan rentang tanggal sebelum export CSV.

## Coolify

Untuk tahap pertama, deploy sebagai static Vite app:

```bash
npm install
npm run build
```

Output ada di `dist/`. Set environment variables `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` di Coolify sebelum build.

## Security Notes

- RLS aktif di semua tabel utama.
- Public hanya bisa membaca konten aktif dan insert hasil game.
- Public tidak bisa membaca seluruh hasil siswa.
- Admin harus login Supabase Auth dan emailnya aktif di `admin_users`.
- Password admin tidak disimpan di repository.

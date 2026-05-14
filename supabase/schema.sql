create extension if not exists pgcrypto;

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  emoji text,
  order_number int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists questions (
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

create table if not exists mini_game_items (
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

create table if not exists game_settings (
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

create table if not exists game_sessions (
  id uuid primary key default gen_random_uuid(),
  player_name text not null,
  class_name text not null,
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

create table if not exists answer_logs (
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

create table if not exists mini_game_answer_logs (
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

create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from admin_users
    where email = coalesce(auth.jwt() ->> 'email', '')
      and is_active = true
  );
$$;

create or replace function get_public_result(session_uuid uuid)
returns table (
  id uuid,
  player_name text,
  class_name text,
  score int,
  max_possible_score int,
  correct_count int,
  wrong_count int,
  total_questions int,
  accuracy numeric,
  best_streak int,
  mini_game_score int,
  mini_game_correct_count int,
  rank_label text,
  finished_at timestamptz,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    gs.id,
    gs.player_name,
    gs.class_name,
    gs.score,
    gs.max_possible_score,
    gs.correct_count,
    gs.wrong_count,
    gs.total_questions,
    gs.accuracy,
    gs.best_streak,
    gs.mini_game_score,
    gs.mini_game_correct_count,
    gs.rank_label,
    gs.finished_at,
    gs.created_at
  from game_sessions gs
  where gs.id = session_uuid
  limit 1;
$$;

alter table admin_users enable row level security;
alter table chapters enable row level security;
alter table questions enable row level security;
alter table mini_game_items enable row level security;
alter table game_settings enable row level security;
alter table game_sessions enable row level security;
alter table answer_logs enable row level security;
alter table mini_game_answer_logs enable row level security;

create policy "Admin can read admin users" on admin_users for select using (is_admin());
create policy "Admin can manage admin users" on admin_users for all using (is_admin()) with check (is_admin());

create policy "Public can read active chapters" on chapters for select using (is_active = true);
create policy "Admin can manage chapters" on chapters for all using (is_admin()) with check (is_admin());

create policy "Public can read active questions" on questions for select using (is_active = true);
create policy "Admin can manage questions" on questions for all using (is_admin()) with check (is_admin());

create policy "Public can read active mini game items" on mini_game_items for select using (is_active = true);
create policy "Admin can manage mini game items" on mini_game_items for all using (is_admin()) with check (is_admin());

create policy "Public can read active game settings" on game_settings for select using (is_active = true);
create policy "Admin can manage game settings" on game_settings for all using (is_admin()) with check (is_admin());

create policy "Public can insert game sessions" on game_sessions for insert with check (true);
create policy "Admin can read game sessions" on game_sessions for select using (is_admin());
create policy "Admin can delete game sessions" on game_sessions for delete using (is_admin());

create policy "Public can insert answer logs" on answer_logs for insert with check (true);
create policy "Admin can read answer logs" on answer_logs for select using (is_admin());
create policy "Admin can delete answer logs" on answer_logs for delete using (is_admin());

create policy "Public can insert mini game answer logs" on mini_game_answer_logs for insert with check (true);
create policy "Admin can read mini game answer logs" on mini_game_answer_logs for select using (is_admin());
create policy "Admin can delete mini game answer logs" on mini_game_answer_logs for delete using (is_admin());

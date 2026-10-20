-- CheckMente — esquema SEGURO (rode inteiro no Supabase > SQL Editor)
-- Pode rodar mais de uma vez sem quebrar.

-- ============ 1. TABELAS ============
create table if not exists public.desabafos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid default auth.uid() references auth.users(id) on delete cascade,
  nome text not null default '',
  perfil text not null default '',
  turma text not null default '',
  contato text not null default '',
  texto text not null default '',
  enviado_email boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid default auth.uid() references auth.users(id) on delete cascade,
  humor text not null default '',
  emoji text not null default '',
  intensidade integer not null default 3,
  nivel_label text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.mensagens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid default auth.uid() references auth.users(id) on delete cascade,
  nome text not null default '',
  assunto text not null default '',
  email text not null default '',
  texto text not null default '',
  created_at timestamptz not null default now()
);

-- Caso as tabelas já existissem sem o dono do registro:
alter table public.desabafos add column if not exists user_id uuid default auth.uid() references auth.users(id) on delete cascade;
alter table public.checkins  add column if not exists user_id uuid default auth.uid() references auth.users(id) on delete cascade;
alter table public.mensagens add column if not exists user_id uuid default auth.uid() references auth.users(id) on delete cascade;

create index if not exists desabafos_user_idx on public.desabafos (user_id, created_at desc);
create index if not exists checkins_user_idx  on public.checkins  (user_id, created_at desc);
create index if not exists mensagens_user_idx on public.mensagens (user_id, created_at desc);

-- ============ 2. RLS LIGADO + REMOVE AS POLÍTICAS ABERTAS ============
alter table public.desabafos enable row level security;
alter table public.checkins  enable row level security;
alter table public.mensagens enable row level security;

drop policy if exists "permitir todos" on public.desabafos;
drop policy if exists "permitir todos" on public.checkins;
drop policy if exists "permitir todos" on public.mensagens;

-- ============ 3. POLÍTICAS (só usuário logado, só os próprios dados) ============
-- Desabafos: cada pessoa vê, cria e apaga só os seus. Ninguém edita.
drop policy if exists "desabafos_select_own" on public.desabafos;
drop policy if exists "desabafos_insert_own" on public.desabafos;
drop policy if exists "desabafos_delete_own" on public.desabafos;
create policy "desabafos_select_own" on public.desabafos for select to authenticated using (user_id = (select auth.uid()));
create policy "desabafos_insert_own" on public.desabafos for insert to authenticated with check (user_id = (select auth.uid()));
create policy "desabafos_delete_own" on public.desabafos for delete to authenticated using (user_id = (select auth.uid()));

-- Check-ins: idem.
drop policy if exists "checkins_select_own" on public.checkins;
drop policy if exists "checkins_insert_own" on public.checkins;
drop policy if exists "checkins_delete_own" on public.checkins;
create policy "checkins_select_own" on public.checkins for select to authenticated using (user_id = (select auth.uid()));
create policy "checkins_insert_own" on public.checkins for insert to authenticated with check (user_id = (select auth.uid()));
create policy "checkins_delete_own" on public.checkins for delete to authenticated using (user_id = (select auth.uid()));

-- Mensagens de ajuda: só ENVIAR. Ninguém lê pelo site (você lê no painel do Supabase).
drop policy if exists "mensagens_insert_own" on public.mensagens;
create policy "mensagens_insert_own" on public.mensagens for insert to authenticated with check (user_id = (select auth.uid()));

-- ============ 4. PERMISSÕES (visitante anônimo não encosta em nada) ============
revoke all on public.desabafos from anon, authenticated;
revoke all on public.checkins  from anon, authenticated;
revoke all on public.mensagens from anon, authenticated;

grant select, delete on public.desabafos to authenticated;
grant insert (nome, perfil, turma, contato, texto, enviado_email) on public.desabafos to authenticated;

grant select, delete on public.checkins to authenticated;
grant insert (humor, emoji, intensidade, nivel_label) on public.checkins to authenticated;

grant insert (nome, assunto, email, texto) on public.mensagens to authenticated;

-- ============ 5. VALIDAÇÃO NO BANCO (vale mesmo se alguém burlar o JavaScript) ============
-- "not valid" = só vale para registros novos; não quebra dados antigos.
alter table public.desabafos drop constraint if exists desabafos_dados_ok;
alter table public.desabafos add constraint desabafos_dados_ok check (
  char_length(nome) between 2 and 80
  and perfil in ('Aluno', 'Professor', 'Servidor')
  and char_length(turma) <= 60
  and char_length(contato) <= 120
  and (contato = '' or contato ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$')
  and char_length(texto) between 10 and 2000
) not valid;

alter table public.checkins drop constraint if exists checkins_dados_ok;
alter table public.checkins add constraint checkins_dados_ok check (
  humor in ('Ótimo', 'Bem', 'Neutro', 'Cansado', 'Ansioso', 'Triste')
  and intensidade between 1 and 5
  and nivel_label in ('leve', 'moderada', 'forte')
  and char_length(emoji) <= 8
) not valid;

alter table public.mensagens drop constraint if exists mensagens_dados_ok;
alter table public.mensagens add constraint mensagens_dados_ok check (
  char_length(nome) between 2 and 80
  and assunto in ('Erro ou bug no site', 'Sugestão de melhoria', 'Dúvida sobre a plataforma', 'Outro assunto')
  and char_length(email) <= 120
  and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
  and char_length(texto) between 10 and 2000
) not valid;

-- ============ 6. LIMITE DE ENVIOS POR USUÁRIO (anti-spam / anti-script) ============
create or replace function public.limitar_envios()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  max_envios int := tg_argv[0]::int;
  janela interval := tg_argv[1]::interval;
  total int;
begin
  execute format('select count(*) from %I.%I where user_id = $1 and created_at > now() - $2', tg_table_schema, tg_table_name)
    into total using new.user_id, janela;
  if total >= max_envios then
    raise exception 'limite de envios atingido' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

revoke all on function public.limitar_envios() from public, anon, authenticated;

drop trigger if exists limite_desabafos on public.desabafos;
create trigger limite_desabafos before insert on public.desabafos
  for each row execute function public.limitar_envios('10', '1 hour');

drop trigger if exists limite_checkins on public.checkins;
create trigger limite_checkins before insert on public.checkins
  for each row execute function public.limitar_envios('30', '1 hour');

drop trigger if exists limite_mensagens on public.mensagens;
create trigger limite_mensagens before insert on public.mensagens
  for each row execute function public.limitar_envios('5', '1 hour');

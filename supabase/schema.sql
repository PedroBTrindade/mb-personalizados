-- =====================================================================
-- MB Personalizados: banco de dados, segurança e fotos
-- Cole TUDO no Supabase: SQL Editor > New query > Run
-- =====================================================================

-- ---------- PERFIS (um por conta; guarda o papel cliente/admin) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  role text not null default 'cliente' check (role in ('cliente', 'admin')),
  criado_em timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- Função que diz se quem está logado é admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

-- Cada pessoa lê só o próprio perfil (admin lê todos).
-- Não existe política de INSERT/UPDATE: ninguém consegue se promover a admin pelo site.
drop policy if exists "ler perfil" on public.profiles;
create policy "ler perfil" on public.profiles
  for select using ((select auth.uid()) = id or public.is_admin());

-- Cria o perfil automaticamente quando alguém se cadastra
create or replace function public.criar_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, nome)
  values (new.id, nullif(trim(new.raw_user_meta_data ->> 'nome'), ''));
  return new;
end;
$$;
revoke execute on function public.criar_perfil() from public, anon, authenticated;

drop trigger if exists ao_criar_usuario on auth.users;
create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function public.criar_perfil();

-- ---------- PRODUTOS ----------
create table if not exists public.produtos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nome text not null,
  descricao text,
  categoria text,
  preco numeric(10,2) not null check (preco > 0),
  preco_promocional numeric(10,2) check (preco_promocional > 0),
  promo_inicio timestamptz,
  promo_fim timestamptz,
  imagens text[] not null default '{}',
  tema text not null default 't1',
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);
alter table public.produtos enable row level security;

-- Visitantes veem só produtos ativos; admin vê tudo
drop policy if exists "ver produtos" on public.produtos;
create policy "ver produtos" on public.produtos
  for select using (ativo = true or public.is_admin());

-- Só admin cria, altera e exclui
drop policy if exists "admin cria produtos" on public.produtos;
create policy "admin cria produtos" on public.produtos
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admin altera produtos" on public.produtos;
create policy "admin altera produtos" on public.produtos
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin exclui produtos" on public.produtos;
create policy "admin exclui produtos" on public.produtos
  for delete to authenticated using (public.is_admin());

-- ---------- FOTOS (bucket público para leitura, só admin grava) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('produtos', 'produtos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = true, file_size_limit = 5242880,
      allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "admin ve fotos" on storage.objects;
create policy "admin ve fotos" on storage.objects
  for select to authenticated using (bucket_id = 'produtos' and public.is_admin());

drop policy if exists "admin envia fotos" on storage.objects;
create policy "admin envia fotos" on storage.objects
  for insert to authenticated with check (bucket_id = 'produtos' and public.is_admin());

drop policy if exists "admin altera fotos" on storage.objects;
create policy "admin altera fotos" on storage.objects
  for update to authenticated
  using (bucket_id = 'produtos' and public.is_admin())
  with check (bucket_id = 'produtos' and public.is_admin());

drop policy if exists "admin apaga fotos" on storage.objects;
create policy "admin apaga fotos" on storage.objects
  for delete to authenticated using (bucket_id = 'produtos' and public.is_admin());

-- ---------- 3 PRODUTOS DE EXEMPLO (pode apagar depois pelo painel) ----------
insert into public.produtos (slug, nome, preco, preco_promocional, tema) values
  ('garrafa-termica-verde', 'Garrafa térmica personalizada', 69.90, null, 't1'),
  ('garrafa-termica-coral', 'Garrafa térmica personalizada com nome', 75.90, 59.90, 't2'),
  ('garrafa-termica-rosa', 'Garrafa térmica personalizada rosa', 75.90, 59.90, 't3')
on conflict (slug) do nothing;

-- =====================================================================
-- DEPOIS de criar a SUA conta no site (/cadastrar), rode ISTO em uma
-- query separada, trocando o e-mail pelo da dona da loja:
--
--   update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'EMAIL_DELA@exemplo.com');
-- =====================================================================

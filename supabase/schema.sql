-- ============================================================
-- ArchiOS — Supabase Schema
-- Run this in the Supabase SQL editor to set up the database
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROJECTS
-- ============================================================
create table if not exists projects (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  subtitle    text not null,
  description text not null,
  category    text not null,
  tags        text[] default '{}',
  status      text not null default 'active' check (status in ('active','completed','archived','paused')),
  current_stage text not null default 'idea' check (current_stage in ('idea','planning','development','deployment','future')),
  is_public   boolean not null default false,
  is_pending  boolean not null default false,
  featured    boolean not null default false,
  github_url  text,
  live_url    text,
  thumbnail   text,
  tech        text[] default '{}',
  skills      text[] default '{}',
  evolution   jsonb not null default '[]',
  dna         jsonb not null default '{"complexity":50,"innovation":50,"engineering":50,"aiUsage":0,"research":0}',
  build_analytics jsonb not null default '{"manualWork":100,"aiAssistance":0,"breakdown":""}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- JOURNAL ENTRIES (separate table, linked to project)
-- ============================================================
create table if not exists journal_entries (
  id              uuid primary key default uuid_generate_v4(),
  project_id      uuid references projects(id) on delete cascade,
  date            date not null default current_date,
  problems_faced  text[] default '{}',
  failed_attempts text[] default '{}',
  lessons_learned text[] default '{}',
  future_work     text[] default '{}',
  notes           text default '',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ============================================================
-- VAULT ITEMS
-- ============================================================
create table if not exists vault_items (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  type        text not null check (type in ('cad','report','dataset','notes','research','presentation')),
  file_url    text,
  file_size   text,
  is_public   boolean not null default false,
  project_id  uuid references projects(id) on delete set null,
  tags        text[] default '{}',
  created_at  timestamptz not null default now()
);

-- ============================================================
-- KNOWLEDGE GRAPH NODES
-- ============================================================
create table if not exists knowledge_nodes (
  id              text primary key,
  label           text not null,
  node_group      text not null check (node_group in ('civil','ds','bridge','core')),
  description     text not null default '',
  related_projects text[] default '{}',
  created_at      timestamptz not null default now()
);

-- ============================================================
-- KNOWLEDGE GRAPH EDGES
-- ============================================================
create table if not exists knowledge_edges (
  id       uuid primary key default uuid_generate_v4(),
  source   text not null references knowledge_nodes(id) on delete cascade,
  target   text not null references knowledge_nodes(id) on delete cascade,
  strength numeric not null default 0.5 check (strength >= 0 and strength <= 1)
);

-- ============================================================
-- GITHUB REPOS (detected/pending approval)
-- ============================================================
create table if not exists github_repos (
  id          uuid primary key default uuid_generate_v4(),
  github_id   bigint unique,
  name        text not null,
  description text,
  url         text not null,
  stars       integer default 0,
  language    text,
  updated_at  timestamptz,
  status      text not null default 'pending' check (status in ('pending','approved','rejected')),
  detected_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Projects: public can read public+non-pending rows
alter table projects enable row level security;

create policy "Public read" on projects
  for select using (is_public = true and is_pending = false);

create policy "Admin all" on projects
  for all using (auth.role() = 'authenticated');

-- Journal: public can read if linked project is public
alter table journal_entries enable row level security;

create policy "Public read journal" on journal_entries
  for select using (
    exists (
      select 1 from projects p
      where p.id = journal_entries.project_id
        and p.is_public = true
        and p.is_pending = false
    )
  );

create policy "Admin all journal" on journal_entries
  for all using (auth.role() = 'authenticated');

-- Vault: public can read public items
alter table vault_items enable row level security;

create policy "Public read vault" on vault_items
  for select using (is_public = true);

create policy "Admin all vault" on vault_items
  for all using (auth.role() = 'authenticated');

-- Knowledge graph: fully public read
alter table knowledge_nodes enable row level security;
create policy "Public read nodes" on knowledge_nodes for select using (true);
create policy "Admin all nodes" on knowledge_nodes for all using (auth.role() = 'authenticated');

alter table knowledge_edges enable row level security;
create policy "Public read edges" on knowledge_edges for select using (true);
create policy "Admin all edges" on knowledge_edges for all using (auth.role() = 'authenticated');

-- GitHub repos: admin only
alter table github_repos enable row level security;
create policy "Admin all github" on github_repos
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at before update on projects
  for each row execute function update_updated_at();

create trigger journal_updated_at before update on journal_entries
  for each row execute function update_updated_at();

-- ============================================================
-- SEED — Knowledge Graph (core nodes)
-- ============================================================
insert into knowledge_nodes (id, label, node_group, description, related_projects) values
  ('civil', 'Civil Engineering', 'civil', 'Core discipline — B.E. at Jadavpur University', '{}'),
  ('surveying', 'Surveying', 'civil', 'Total station, GPS, levelling, cadastral surveys', '{}'),
  ('gis', 'GIS', 'bridge', 'Spatial data analysis, QGIS, ArcGIS', '{}'),
  ('remote-sensing', 'Remote Sensing', 'bridge', 'Satellite imagery, spectral analysis, Google Earth Engine', '{}'),
  ('structural', 'Structural Engineering', 'civil', 'Load analysis, IS codes, material behaviour', '{}'),
  ('hydrology', 'Hydrology', 'civil', 'Flood modelling, watershed analysis, runoff estimation', '{}'),
  ('python', 'Python', 'bridge', 'Primary programming language across domains', '{}'),
  ('data-science', 'Data Science', 'ds', 'Core discipline — BS at IIT Madras', '{}'),
  ('ml', 'Machine Learning', 'ds', 'scikit-learn, model selection, feature engineering', '{}'),
  ('ai', 'AI', 'ds', 'LLMs, prompt engineering, AI-assisted engineering', '{}'),
  ('statistics', 'Statistics', 'ds', 'Probability, regression, hypothesis testing', '{}'),
  ('web-dev', 'Web Development', 'ds', 'Next.js, TypeScript, full-stack applications', '{}'),
  ('geospatial-ml', 'Geospatial ML', 'bridge', 'Intersection of GIS, remote sensing, and machine learning', '{}'),
  ('numerical-methods', 'Numerical Methods', 'bridge', 'Stiffness matrix, FEM basics, computational science', '{}')
on conflict (id) do nothing;

insert into knowledge_edges (source, target, strength) values
  ('civil', 'surveying', 0.9),
  ('civil', 'structural', 0.9),
  ('civil', 'hydrology', 0.8),
  ('surveying', 'gis', 0.85),
  ('gis', 'remote-sensing', 0.9),
  ('remote-sensing', 'geospatial-ml', 0.85),
  ('gis', 'geospatial-ml', 0.85),
  ('geospatial-ml', 'ml', 0.9),
  ('geospatial-ml', 'python', 0.8),
  ('hydrology', 'remote-sensing', 0.7),
  ('structural', 'numerical-methods', 0.85),
  ('numerical-methods', 'python', 0.8),
  ('python', 'data-science', 0.85),
  ('python', 'ml', 0.85),
  ('ml', 'data-science', 0.9),
  ('ml', 'ai', 0.85),
  ('data-science', 'statistics', 0.9),
  ('data-science', 'web-dev', 0.5),
  ('ai', 'web-dev', 0.6)
on conflict do nothing;

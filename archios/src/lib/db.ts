import { supabase } from "./supabase";
import type { Project, VaultItem, KnowledgeNode, KnowledgeEdge, JournalEntry } from "./types";

// Row shapes from Supabase (snake_case → camelCase)
function toProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    subtitle: row.subtitle as string,
    description: row.description as string,
    category: row.category as Project["category"],
    tags: (row.tags as Project["tags"]) ?? [],
    status: row.status as Project["status"],
    currentStage: row.current_stage as Project["currentStage"],
    isPublic: row.is_public as boolean,
    isPending: row.is_pending as boolean,
    featured: row.featured as boolean,
    githubUrl: row.github_url as string | undefined,
    liveUrl: row.live_url as string | undefined,
    thumbnail: row.thumbnail as string | undefined,
    tech: (row.tech as string[]) ?? [],
    skills: (row.skills as string[]) ?? [],
    evolution: (row.evolution as Project["evolution"]) ?? [],
    dna: (row.dna as Project["dna"]) ?? { complexity: 50, innovation: 50, engineering: 50, aiUsage: 0, research: 0 },
    buildAnalytics: (row.build_analytics as Project["buildAnalytics"]) ?? { manualWork: 100, aiAssistance: 0, breakdown: "" },
    journal: row.journal_entries
      ? toJournal(row.journal_entries as Record<string, unknown>)
      : undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function toJournal(row: Record<string, unknown>): JournalEntry {
  return {
    id: row.id as string,
    projectId: row.project_id as string | undefined,
    date: row.date as string,
    problemsFaced: (row.problems_faced as string[]) ?? [],
    failedAttempts: (row.failed_attempts as string[]) ?? [],
    lessonsLearned: (row.lessons_learned as string[]) ?? [],
    futureWork: (row.future_work as string[]) ?? [],
    notes: row.notes as string,
  };
}

function toVaultItem(row: Record<string, unknown>): VaultItem {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    type: row.type as VaultItem["type"],
    fileSize: row.file_size as string | undefined,
    isPublic: row.is_public as boolean,
    projectId: row.project_id as string | undefined,
    tags: (row.tags as string[]) ?? [],
    createdAt: row.created_at as string,
  };
}

// ── Public queries ────────────────────────────────────────────

export async function fetchPublicProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(`*, journal_entries(*)`)
    .eq("is_public", true)
    .eq("is_pending", false)
    .order("created_at", { ascending: false });

  if (error) { console.error(error); return []; }

  return (data ?? []).map((row) => {
    const r = { ...row, journal_entries: row.journal_entries?.[0] ?? null };
    return toProject(r as Record<string, unknown>);
  });
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select(`*, journal_entries(*)`)
    .eq("slug", slug)
    .eq("is_public", true)
    .single();

  if (error || !data) return null;
  const r = { ...data, journal_entries: (data as Record<string, unknown[]>).journal_entries?.[0] ?? null };
  return toProject(r as Record<string, unknown>);
}

export async function fetchPublicVaultItems(): Promise<VaultItem[]> {
  const { data, error } = await supabase
    .from("vault_items")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) { console.error(error); return []; }
  return (data ?? []).map((r) => toVaultItem(r as Record<string, unknown>));
}

export async function fetchKnowledgeGraph(): Promise<{ nodes: KnowledgeNode[]; edges: KnowledgeEdge[] }> {
  const [nodesRes, edgesRes] = await Promise.all([
    supabase.from("knowledge_nodes").select("*"),
    supabase.from("knowledge_edges").select("*"),
  ]);

  const nodes: KnowledgeNode[] = (nodesRes.data ?? []).map((r) => ({
    id: r.id as string,
    label: r.label as string,
    group: r.node_group as KnowledgeNode["group"],
    description: r.description as string,
    relatedProjects: (r.related_projects as string[]) ?? [],
  }));

  const edges: KnowledgeEdge[] = (edgesRes.data ?? []).map((r) => ({
    source: r.source as string,
    target: r.target as string,
    strength: r.strength as number,
  }));

  return { nodes, edges };
}

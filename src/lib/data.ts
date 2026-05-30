import type { Project, VaultItem, KnowledgeNode, KnowledgeEdge } from "./types";
import projectsRaw from "../data/projects.json";
import vaultRaw from "../data/vault.json";
import graphRaw from "../data/knowledge-graph.json";

export const projects: Project[] = projectsRaw as unknown as Project[];
export const vaultItems: VaultItem[] = vaultRaw as unknown as VaultItem[];
export const knowledgeNodes: KnowledgeNode[] = graphRaw.nodes as unknown as KnowledgeNode[];
export const knowledgeEdges: KnowledgeEdge[] = graphRaw.edges as unknown as KnowledgeEdge[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getPublicProjects(): Project[] {
  return projects.filter((p) => p.isPublic && !p.isPending);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.isPublic && !p.isPending && p.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((p) => p.category === category && p.isPublic);
}

export function getPublicVaultItems(): VaultItem[] {
  return vaultItems.filter((v) => v.isPublic);
}

export function getPendingGitHubRepos() {
  return [];
}

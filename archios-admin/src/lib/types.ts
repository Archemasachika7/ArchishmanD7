export type ProjectStage = "idea" | "planning" | "development" | "deployment" | "future";
export type ProjectStatus = "active" | "completed" | "archived" | "paused";
export type ProjectCategory =
  | "Civil Engineering" | "Surveying" | "GIS & Remote Sensing"
  | "Structural Engineering" | "Data Science" | "Machine Learning"
  | "AI" | "Web Development" | "Research" | "Personal Experiments";

export interface EvolutionStage {
  stage: ProjectStage;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface ProjectDNA {
  complexity: number;
  innovation: number;
  engineering: number;
  aiUsage: number;
  research: number;
}

export interface BuildAnalytics {
  manualWork: number;
  aiAssistance: number;
  breakdown: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  status: ProjectStatus;
  current_stage: ProjectStage;
  is_public: boolean;
  is_pending: boolean;
  featured: boolean;
  github_url?: string;
  live_url?: string;
  thumbnail?: string;
  tech: string[];
  skills: string[];
  evolution: EvolutionStage[];
  dna: ProjectDNA;
  build_analytics: BuildAnalytics;
  created_at: string;
  updated_at: string;
}

export interface JournalEntry {
  id: string;
  project_id: string;
  date: string;
  problems_faced: string[];
  failed_attempts: string[];
  lessons_learned: string[];
  future_work: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VaultItem {
  id: string;
  title: string;
  description: string;
  type: "cad" | "report" | "dataset" | "notes" | "research" | "presentation";
  file_url?: string;
  file_size?: string;
  is_public: boolean;
  project_id?: string;
  tags: string[];
  created_at: string;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  node_group: "civil" | "ds" | "bridge" | "core";
  description: string;
  related_projects: string[];
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  strength: number;
}

export interface GitHubRepo {
  id: string;
  github_id?: number;
  name: string;
  description?: string;
  url: string;
  stars: number;
  language?: string;
  updated_at?: string;
  status: "pending" | "approved" | "rejected";
  detected_at: string;
}

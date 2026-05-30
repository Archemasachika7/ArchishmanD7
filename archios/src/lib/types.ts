export type IdentityMode = "civil" | "ds";

export type ProjectStage =
  | "idea"
  | "planning"
  | "development"
  | "deployment"
  | "future";

export type ProjectTag =
  | "Manual"
  | "Manual + AI"
  | "Prompt Driven"
  | "Academic"
  | "Research Based";

export type ProjectCategory =
  | "Civil Engineering"
  | "Surveying"
  | "GIS & Remote Sensing"
  | "Structural Engineering"
  | "Data Science"
  | "Machine Learning"
  | "AI"
  | "Web Development"
  | "Research"
  | "Personal Experiments";

export interface EvolutionStage {
  stage: ProjectStage;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface JournalEntry {
  id: string;
  projectId?: string;
  date: string;
  problemsFaced: string[];
  failedAttempts: string[];
  lessonsLearned: string[];
  futureWork: string[];
  notes: string;
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
  tags: ProjectTag[];
  status: "active" | "completed" | "archived" | "paused";
  currentStage: ProjectStage;
  isPublic: boolean;
  isPending: boolean;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
  tech: string[];
  evolution: EvolutionStage[];
  journal?: JournalEntry;
  dna: ProjectDNA;
  buildAnalytics: BuildAnalytics;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  group: "civil" | "ds" | "bridge" | "core";
  description: string;
  relatedProjects: string[];
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  strength: number;
}

export interface VaultItem {
  id: string;
  title: string;
  description: string;
  type: "cad" | "report" | "dataset" | "notes" | "research" | "presentation";
  fileSize?: string;
  isPublic: boolean;
  projectId?: string;
  createdAt: string;
  tags: string[];
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  updatedAt: string;
  status: "pending" | "approved" | "rejected";
  detectedAt: string;
}

"use client";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/types";
import { Plus, Search, Edit, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

const stageColors: Record<string, string> = {
  idea: "#ff6b35", planning: "#9b59ff", development: "#00e5ff",
  deployment: "#4466ff", future: "#00ff88",
};

export function ProjectsList({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "public" | "private" | "pending">("all");
  const router = useRouter();
  const supabase = createClient();

  const filtered = projects.filter((p) => {
    const matchSearch = search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ? true :
      filter === "public" ? p.is_public && !p.is_pending :
      filter === "private" ? !p.is_public :
      p.is_pending;
    return matchSearch && matchFilter;
  });

  async function togglePublic(id: string, current: boolean) {
    await supabase.from("projects").update({ is_public: !current, is_pending: false }).eq("id", id);
    router.refresh();
  }

  async function togglePending(id: string, current: boolean) {
    await supabase.from("projects").update({ is_pending: !current }).eq("id", id);
    router.refresh();
  }

  return (
    <div className="max-w-5xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold mb-0.5" style={{ color: "var(--text)" }}>Projects</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{projects.length} total projects</p>
        </div>
        <Link href="/projects/new" className="btn-primary flex items-center gap-1.5">
          <Plus size={14} /> New Project
        </Link>
      </div>

      {/* Filters */}
      <div className="panel p-3 flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
          <Search size={13} style={{ color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or category..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text)" }}
          />
        </div>
        <div className="flex gap-1">
          {(["all", "public", "private", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="font-mono text-xs px-3 py-1.5 rounded-md transition-all capitalize"
              style={{
                background: filter === f ? "var(--accent-dim)" : "transparent",
                color: filter === f ? "var(--accent)" : "var(--text-muted)",
                border: `1px solid ${filter === f ? "var(--border-focus)" : "var(--border)"}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Title", "Category", "Stage", "Status", "Visibility", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr key={project.id} className="border-b transition-colors hover:bg-white/3" style={{ borderColor: "var(--border)" }}>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--text)" }}>{project.title}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{project.subtitle.slice(0, 50)}...</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{project.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded capitalize"
                      style={{
                        background: `${stageColors[project.current_stage] ?? "#888"}15`,
                        color: stageColors[project.current_stage] ?? "#888",
                      }}
                    >
                      {project.current_stage}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded capitalize"
                      style={{
                        background: project.status === "active" ? "rgba(0,255,136,0.1)" : "rgba(255,255,255,0.05)",
                        color: project.status === "active" ? "#00ff88" : "var(--text-muted)",
                      }}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => togglePublic(project.id, project.is_public)}
                        className="text-xs font-mono transition-colors"
                        style={{ color: project.is_public ? "var(--accent)" : "var(--text-muted)" }}
                      >
                        {project.is_public ? "● Public" : "○ Private"}
                      </button>
                      {project.is_pending && (
                        <button
                          onClick={() => togglePending(project.id, project.is_pending)}
                          className="badge-yellow text-left"
                        >
                          Pending
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/projects/${project.id}`} className="p-1 rounded transition-colors hover:bg-white/10" style={{ color: "var(--text-muted)" }}>
                        <Edit size={13} />
                      </Link>
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-1 rounded transition-colors hover:bg-white/10" style={{ color: "var(--text-muted)" }}>
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center font-mono text-sm" style={{ color: "var(--text-muted)" }}>
              No projects found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

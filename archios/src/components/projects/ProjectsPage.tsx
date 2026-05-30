"use client";
import { useState } from "react";
import { getPublicProjects } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";
import type { ProjectCategory, ProjectStage } from "@/lib/types";
import { Search, Filter } from "lucide-react";

const categories: (ProjectCategory | "All")[] = [
  "All",
  "Civil Engineering",
  "GIS & Remote Sensing",
  "Structural Engineering",
  "Data Science",
  "Machine Learning",
  "AI",
  "Web Development",
  "Research",
];

const stages: (ProjectStage | "all")[] = ["all", "idea", "planning", "development", "deployment", "future"];

export function ProjectsPage() {
  const projects = getPublicProjects();
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [stage, setStage] = useState<ProjectStage | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchStage = stage === "all" || p.currentStage === stage;
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchStage && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs" style={{ color: "var(--accent-green)" }}>
            ~/projects
          </span>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Project Registry
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          {projects.length} projects documented with evolution history, build analytics, and engineering journal entries.
        </p>
      </div>

      {/* Filters */}
      <div className="os-panel p-3 space-y-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-md"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
        >
          <Search size={14} style={{ color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, tech, categories..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="font-mono text-xs px-3 py-1 rounded-md transition-all"
              style={{
                background: category === cat ? "var(--accent-green)" : "var(--bg-secondary)",
                color: category === cat ? "#000" : "var(--text-muted)",
                border: `1px solid ${category === cat ? "var(--accent-green)" : "var(--border)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stage filter */}
        <div className="flex items-center gap-2">
          <Filter size={12} style={{ color: "var(--text-muted)" }} />
          <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Stage:</span>
          <div className="flex flex-wrap gap-1">
            {stages.map((s) => (
              <button
                key={s}
                onClick={() => setStage(s)}
                className="font-mono text-xs px-2 py-0.5 rounded transition-all capitalize"
                style={{
                  background: stage === s ? "rgba(0,255,136,0.15)" : "transparent",
                  color: stage === s ? "var(--accent-green)" : "var(--text-muted)",
                  border: `1px solid ${stage === s ? "var(--border-bright)" : "transparent"}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Projects grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <div className="os-panel p-8 text-center">
          <p className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
            No projects match the current filters.
          </p>
        </div>
      )}
    </div>
  );
}

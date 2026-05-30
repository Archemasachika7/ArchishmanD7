"use client";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { ExternalLink, GitFork, ArrowRight } from "lucide-react";

const stageColors: Record<string, string> = {
  idea: "#ff6b35",
  planning: "#9b59ff",
  development: "#00e5ff",
  deployment: "#4466ff",
  future: "#00ff88",
};

const categoryColors: Record<string, string> = {
  "Civil Engineering": "#ff6b35",
  "Surveying": "#ff9b35",
  "GIS & Remote Sensing": "#35c5ff",
  "Structural Engineering": "#4466ff",
  "Data Science": "#00e5ff",
  "Machine Learning": "#9b59ff",
  "AI": "#00ff88",
  "Web Development": "#ff6bab",
  "Research": "#ffd700",
  "Personal Experiments": "#8892a0",
};

export function ProjectCard({ project }: { project: Project }) {
  const stageColor = stageColors[project.currentStage] || "#8892a0";
  const catColor = categoryColors[project.category] || "#8892a0";
  const aiPct = project.buildAnalytics.aiAssistance;

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div
        className="os-panel p-4 h-full flex flex-col gap-3 transition-all duration-200 hover:border-opacity-60 cursor-pointer"
        style={{
          borderColor: project.featured ? "rgba(0,255,136,0.25)" : "rgba(0,255,136,0.12)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="status-dot"
                style={{ background: catColor, boxShadow: `0 0 6px ${catColor}` }}
              />
              <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                {project.category}
              </span>
            </div>
            <h3
              className="font-semibold text-sm leading-tight transition-colors group-hover:text-[var(--accent-green)]"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{
                background: `${stageColor}15`,
                color: stageColor,
                border: `1px solid ${stageColor}30`,
              }}
            >
              {project.currentStage}
            </span>
            <span
              className="status-dot"
              style={{ background: project.status === "active" ? "#00ff88" : project.status === "completed" ? "#4466ff" : "#4a5260" }}
            />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
          {project.subtitle}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="tag-pill">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* AI meter */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Build Method</span>
            <span className="font-mono text-xs" style={{ color: aiPct > 50 ? "var(--accent-cyan)" : "var(--accent-green)" }}>
              {aiPct > 50 ? `AI: ${aiPct}%` : `Manual: ${project.buildAnalytics.manualWork}%`}
            </span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${project.buildAnalytics.manualWork}%`,
                background: "linear-gradient(90deg, var(--accent-green), var(--accent-cyan))",
              }}
            />
          </div>
          <div className="flex justify-between font-mono text-xs mt-0.5" style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}>
            <span>Manual {project.buildAnalytics.manualWork}%</span>
            <span>AI {aiPct}%</span>
          </div>
        </div>

        {/* DNA scores */}
        <div className="grid grid-cols-5 gap-1">
          {Object.entries(project.dna).map(([key, val]) => (
            <div key={key} className="flex flex-col items-center gap-0.5">
              <div className="w-full h-8 flex items-end" style={{ background: "transparent" }}>
                <div
                  className="w-full rounded-sm transition-all duration-700"
                  style={{
                    height: `${val}%`,
                    background: `rgba(0,255,136,${val / 100 * 0.8 + 0.1})`,
                  }}
                />
              </div>
              <span className="font-mono" style={{ fontSize: "0.55rem", color: "var(--text-muted)" }}>
                {key === "aiUsage" ? "AI" : key.slice(0, 3).toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="transition-colors hover:text-white"
                style={{ color: "var(--text-muted)" }}
              >
                <GitFork size={13} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="transition-colors hover:text-white"
                style={{ color: "var(--text-muted)" }}
              >
                <ExternalLink size={13} />
              </a>
            )}
          </div>
          <div
            className="flex items-center gap-1 font-mono text-xs transition-colors group-hover:text-[var(--accent-green)]"
            style={{ color: "var(--text-muted)" }}
          >
            <span>View</span>
            <ArrowRight size={11} />
          </div>
        </div>
      </div>
    </Link>
  );
}

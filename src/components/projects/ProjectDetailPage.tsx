"use client";
import type { Project } from "@/lib/types";
import { EvolutionTimeline } from "./EvolutionTimeline";
import { ProjectDNA } from "./ProjectDNA";
import { AIContributionMeter } from "./AIContributionMeter";
import Link from "next/link";
import { ArrowLeft, GitFork, ExternalLink, BookOpen, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";

export function ProjectDetailPage({ project }: { project: Project }) {
  const j = project.journal;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-mono text-xs transition-colors hover:text-white"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft size={12} />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="os-panel p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="status-dot"
                style={{ background: project.status === "active" ? "#00ff88" : "#4466ff", boxShadow: `0 0 6px ${project.status === "active" ? "#00ff88" : "#4466ff"}` }}
              />
              <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                {project.category} · {project.status}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {project.title}
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{project.subtitle}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="os-panel px-3 py-1.5 flex items-center gap-1.5 font-mono text-xs transition-colors hover:border-opacity-60"
                style={{ color: "var(--text-secondary)" }}
              >
                <GitFork size={12} /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 flex items-center gap-1.5 font-mono text-xs rounded-md transition-colors"
                style={{
                  background: "var(--accent-green)",
                  color: "#000",
                  fontWeight: 600,
                }}
              >
                Live <ExternalLink size={11} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        {/* Tech & tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded font-mono text-xs"
              style={{
                background: "rgba(0,255,136,0.08)",
                color: "var(--accent-green)",
                border: "1px solid rgba(0,255,136,0.2)",
              }}
            >
              {t}
            </span>
          ))}
          {project.tags.map((t) => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Evolution timeline — 2/3 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="os-panel p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs font-bold" style={{ color: "var(--accent-green)" }}>
                PROJECT EVOLUTION
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>
            <EvolutionTimeline stages={project.evolution} />
          </div>

          {/* Journal */}
          {j && (
            <div className="os-panel p-4">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={14} style={{ color: "#9b59ff" }} />
                <span className="font-mono text-xs font-bold" style={{ color: "#9b59ff" }}>
                  ENGINEERING JOURNAL
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{j.date}</span>
              </div>

              <div className="space-y-4">
                {/* Problems */}
                <section>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={12} style={{ color: "#ff6b35" }} />
                    <span className="font-mono text-xs font-semibold" style={{ color: "#ff6b35" }}>Problems Faced</span>
                  </div>
                  <ul className="space-y-1">
                    {j.problemsFaced.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: "#ff6b35" }}>×</span> {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Failed attempts */}
                <section>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>FAILED ATTEMPTS</span>
                  </div>
                  <ul className="space-y-1">
                    {j.failedAttempts.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--text-muted)" }}>→</span> {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Lessons */}
                <section>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={12} style={{ color: "#ffd700" }} />
                    <span className="font-mono text-xs font-semibold" style={{ color: "#ffd700" }}>Lessons Learned</span>
                  </div>
                  <ul className="space-y-1">
                    {j.lessonsLearned.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: "#ffd700" }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Future work */}
                <section>
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight size={12} style={{ color: "var(--accent-green)" }} />
                    <span className="font-mono text-xs font-semibold" style={{ color: "var(--accent-green)" }}>Future Work</span>
                  </div>
                  <ul className="space-y-1">
                    {j.futureWork.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--accent-green)" }}>›</span> {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Notes */}
                {j.notes && (
                  <div
                    className="p-3 rounded-md border-l-2 italic"
                    style={{
                      background: "rgba(155,89,255,0.05)",
                      borderColor: "#9b59ff",
                    }}
                  >
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{j.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right column — DNA + Analytics */}
        <div className="space-y-4">
          <ProjectDNA dna={project.dna} />
          <AIContributionMeter analytics={project.buildAnalytics} />

          {/* Metadata */}
          <div className="os-panel p-3 space-y-2">
            {[
              { label: "Created", value: project.createdAt },
              { label: "Updated", value: project.updatedAt },
              { label: "Stage", value: project.currentStage },
              { label: "Status", value: project.status },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                <span className="font-mono text-xs capitalize" style={{ color: "var(--text-secondary)" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

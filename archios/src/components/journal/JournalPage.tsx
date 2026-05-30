"use client";
import { getPublicProjects } from "@/lib/data";
import Link from "next/link";
import { BookOpen, AlertTriangle, Lightbulb, ArrowRight, ChevronRight } from "lucide-react";

export function JournalPage() {
  const projects = getPublicProjects().filter((p) => p.journal);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={14} style={{ color: "#9b59ff" }} />
          <span className="font-mono text-xs" style={{ color: "#9b59ff" }}>~/journal</span>
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Engineering Journal
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Lab notebook style documentation of every project — problems faced, failed attempts, lessons learned.
          Engineering thinking in the open.
        </p>
      </div>

      {/* Philosophy note */}
      <div
        className="p-4 rounded-lg border-l-2"
        style={{
          background: "rgba(155,89,255,0.06)",
          borderColor: "#9b59ff",
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Most portfolios only show finished work. This journal shows how projects actually evolved —
          what broke, what didn&apos;t work, what was learned. Failure is documented alongside success.
        </p>
      </div>

      {/* Journal entries */}
      <div className="space-y-6">
        {projects.map((project) => {
          const j = project.journal!;
          return (
            <div key={project.id} className="os-panel p-5">
              {/* Project link */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-semibold text-sm hover:underline"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                      {project.category}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>·</span>
                    <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                      {j.date}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center gap-1 font-mono text-xs transition-colors hover:text-white"
                  style={{ color: "var(--text-muted)" }}
                >
                  Full project <ChevronRight size={11} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Problems */}
                <section>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={12} style={{ color: "#ff6b35" }} />
                    <span className="font-mono text-xs font-semibold" style={{ color: "#ff6b35" }}>Problems</span>
                  </div>
                  <ul className="space-y-1.5">
                    {j.problemsFaced.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        <span className="mt-0.5 shrink-0" style={{ color: "#ff6b35" }}>×</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Lessons */}
                <section>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={12} style={{ color: "#ffd700" }} />
                    <span className="font-mono text-xs font-semibold" style={{ color: "#ffd700" }}>Lessons</span>
                  </div>
                  <ul className="space-y-1.5">
                    {j.lessonsLearned.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        <span className="mt-0.5 shrink-0" style={{ color: "#ffd700" }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Failed attempts */}
                <section>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Failed Attempts</span>
                  </div>
                  <ul className="space-y-1.5">
                    {j.failedAttempts.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        <span className="mt-0.5 shrink-0" style={{ color: "var(--text-muted)" }}>→</span>
                        {item}
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
                  <ul className="space-y-1.5">
                    {j.futureWork.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        <span className="mt-0.5 shrink-0" style={{ color: "var(--accent-green)" }}>›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Notes */}
              {j.notes && (
                <div
                  className="mt-4 p-3 rounded-md border-l-2 italic"
                  style={{ background: "rgba(155,89,255,0.05)", borderColor: "#9b59ff" }}
                >
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{j.notes}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

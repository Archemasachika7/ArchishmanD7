"use client";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { ExternalLink, GitFork, ArrowRight } from "lucide-react";

/* ─── Colour maps ──────────────────────────────────────────────────── */

const stageColors: Record<string, string> = {
  idea:        "#ff6b35",
  planning:    "#9b59ff",
  development: "#00d4ff",
  deployment:  "#4466ff",
  future:      "#00ff88",
};

const categoryColors: Record<string, string> = {
  "Civil Engineering":      "#ff6b35",
  "Surveying":              "#ff9b35",
  "GIS & Remote Sensing":   "#35c5ff",
  "Structural Engineering": "#4466ff",
  "Data Science":           "#00d4ff",
  "Machine Learning":       "#9b59ff",
  "AI":                     "#00ff88",
  "Web Development":        "#ff6bab",
  "Research":               "#ffd700",
  "Personal Experiments":   "#8892a0",
};

/* ─── Component ──────────────────────────────────────────────────────── */

export function ProjectCard({ project }: { project: Project }) {
  const stageColor = stageColors[project.currentStage]  || "#8892a0";
  const catColor   = categoryColors[project.category]   || "#8892a0";
  const aiPct      = project.buildAnalytics.aiAssistance;

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div
        style={{
          background: "var(--bg-panel)",
          border: "1px solid var(--border-mid)",
          borderLeft: `3px solid ${catColor}`,
          borderRadius: "8px",
          padding: "0",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.2s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor       = `${catColor}60`;
          el.style.borderLeftColor   = catColor;
          el.style.boxShadow         = `0 0 20px ${catColor}12, 0 4px 24px rgba(0,0,0,0.4)`;
          el.style.transform         = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor       = "var(--border-mid)";
          el.style.borderLeftColor   = catColor;
          el.style.boxShadow         = "none";
          el.style.transform         = "translateY(0)";
        }}
      >
        {/* ── OS Titlebar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              flexShrink: 0,
              background: catColor,
              boxShadow: `0 0 6px ${catColor}80`,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {project.category}
          </span>
          {/* Stage badge */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.56rem",
              padding: "2px 7px",
              borderRadius: "3px",
              background: `${stageColor}12`,
              color: stageColor,
              border: `1px solid ${stageColor}30`,
              letterSpacing: "0.05em",
              flexShrink: 0,
              boxShadow: `0 0 6px ${stageColor}15`,
            }}
          >
            {project.currentStage}
          </span>
          {/* Status dot */}
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              flexShrink: 0,
              background:
                project.status === "active"    ? "#00ff88" :
                project.status === "completed" ? "#4466ff" : "#2a3340",
              boxShadow:
                project.status === "active"    ? "0 0 6px #00ff88" :
                project.status === "completed" ? "0 0 6px #4466ff" : "none",
            }}
          />
        </div>

        {/* ── Card Body ── */}
        <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>

          {/* Title */}
          <h3
            style={{
              fontSize: "0.88rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.3,
              transition: "color 0.15s",
            }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "0.71rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.subtitle}
          </p>

          {/* Tech stack pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="tag-pill">{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="tag-pill">+{project.tech.length - 4}</span>
            )}
          </div>

          {/* AI / Manual meter */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                color: "var(--text-muted)",
              }}
            >
              <span>BUILD METHOD</span>
              <span style={{ color: aiPct > 50 ? "var(--accent-cyan)" : "var(--accent-green)" }}>
                {aiPct > 50 ? `AI ${aiPct}%` : `Manual ${project.buildAnalytics.manualWork}%`}
              </span>
            </div>
            <div
              style={{
                height: "3px",
                borderRadius: "2px",
                overflow: "hidden",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${project.buildAnalytics.manualWork}%`,
                  background: "linear-gradient(90deg, var(--accent-green), var(--accent-cyan))",
                  borderRadius: "2px",
                  transition: "width 0.5s ease-out",
                  boxShadow: "0 0 6px rgba(0,255,136,0.4)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "3px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "var(--text-muted)",
              }}
            >
              <span>Manual {project.buildAnalytics.manualWork}%</span>
              <span>AI {aiPct}%</span>
            </div>
          </div>

          {/* DNA bar chart */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "4px",
            }}
          >
            {Object.entries(project.dna).map(([key, val]) => {
              const pct = Number(val);
              return (
                <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "28px",
                      display: "flex",
                      alignItems: "flex-end",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "3px 3px 0 0",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${pct}%`,
                        background: `rgba(0,255,136,${pct / 100 * 0.75 + 0.12})`,
                        borderRadius: "2px 2px 0 0",
                        transition: "height 0.7s ease-out",
                        boxShadow: pct > 70 ? "0 -2px 6px rgba(0,255,136,0.3)" : "none",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5rem",
                      color: "var(--text-muted)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {key === "aiUsage" ? "AI" : key.slice(0, 3).toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Card Footer ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderTop: "1px solid var(--border)",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {project.githubUrl && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl, "_blank", "noopener,noreferrer"); }}
                style={{ color: "var(--text-muted)", transition: "color 0.15s", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                title="GitHub"
              >
                <GitFork size={13} />
              </button>
            )}
            {project.liveUrl && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.liveUrl, "_blank", "noopener,noreferrer"); }}
                style={{ color: "var(--text-muted)", transition: "color 0.15s", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                title="Live demo"
              >
                <ExternalLink size={13} />
              </button>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: catColor,
              opacity: 0.75,
              transition: "opacity 0.15s",
            }}
          >
            OPEN
            <ArrowRight size={11} />
          </div>
        </div>
      </div>
    </Link>
  );
}

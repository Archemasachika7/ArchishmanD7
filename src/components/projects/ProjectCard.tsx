"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  "Civil Engineering":      "#fb923c",
  "Surveying":              "#f97316",
  "GIS & Remote Sensing":   "#38bdf8",
  "Structural Engineering": "#818cf8",
  "Data Science":           "#60a5fa",
  "Machine Learning":       "#a78bfa",
  "AI":                     "#34d399",
  "Web Development":        "#f472b6",
  "Research":               "#fbbf24",
  "Personal Experiments":   "#94a3b8",
};

const STAGE_COLORS: Record<string, string> = {
  idea: "#f97316", planning: "#a78bfa",
  development: "#60a5fa", deployment: "#818cf8", future: "#34d399",
};

export function ProjectCard({ project }: { project: Project }) {
  const catColor   = CATEGORY_COLORS[project.category] ?? "#94a3b8";
  const stageColor = STAGE_COLORS[project.currentStage] ?? "#94a3b8";
  const aiPct      = project.buildAnalytics.aiAssistance;
  const rgbCat     = hexToRgb(catColor);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/projects/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div style={{
          position: "relative", overflow: "hidden",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
          transition: "border-color 0.25s, box-shadow 0.25s",
          cursor: "pointer",
          height: "100%",
        }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = `${catColor}30`;
            el.style.boxShadow = `0 8px 40px rgba(${rgbCat},0.12), 0 2px 8px rgba(0,0,0,0.5)`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "rgba(255,255,255,0.09)";
            el.style.boxShadow = "0 4px 32px rgba(0,0,0,0.35)";
          }}
        >
          {/* Ambient glow */}
          <div style={{
            position: "absolute", top: -32, right: -32,
            width: 120, height: 120, borderRadius: "50%",
            background: `rgba(${rgbCat},0.09)`,
            filter: "blur(40px)", pointerEvents: "none",
          }} />

          {/* Category accent bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${catColor}, transparent)` }} />

          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "12px 16px 10px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
              background: catColor, boxShadow: `0 0 8px ${catColor}80`,
            }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.58rem",
              color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em",
              textTransform: "uppercase", flex: 1, overflow: "hidden",
              textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{project.category}</span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.56rem",
              padding: "2px 8px", borderRadius: "100px",
              background: `${stageColor}14`, color: stageColor,
              border: `1px solid ${stageColor}30`, flexShrink: 0,
            }}>{project.currentStage}</span>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
              background: project.status === "active" ? "#34d399" : project.status === "completed" ? "#818cf8" : "#2a3340",
              boxShadow: project.status === "active" ? "0 0 6px #34d399" : "none",
            }} />
          </div>

          {/* Body */}
          <div style={{ padding: "16px 16px 12px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <h3 style={{
              fontSize: "0.95rem", fontWeight: 700,
              color: "#fff", lineHeight: 1.3,
            }}>{project.title}</h3>

            <p style={{
              fontSize: "0.73rem", color: "rgba(255,255,255,0.45)",
              lineHeight: 1.65,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>{project.subtitle}</p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} style={{
                  padding: "3px 10px", borderRadius: "100px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.65rem", color: "rgba(255,255,255,0.55)",
                }}>{t}</span>
              ))}
              {project.tech.length > 4 && (
                <span style={{
                  padding: "3px 10px", borderRadius: "100px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.65rem", color: "rgba(255,255,255,0.3)",
                }}>+{project.tech.length - 4}</span>
              )}
            </div>

            {/* Build method bar */}
            <div>
              <div style={{
                display: "flex", justifyContent: "space-between",
                marginBottom: "5px",
                fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                color: "rgba(255,255,255,0.3)",
              }}>
                <span>BUILD METHOD</span>
                <span style={{ color: aiPct > 50 ? "#60a5fa" : "#34d399" }}>
                  {aiPct > 50 ? `AI ${aiPct}%` : `Manual ${project.buildAnalytics.manualWork}%`}
                </span>
              </div>
              <div style={{
                height: 3, borderRadius: 2, overflow: "hidden",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{
                  height: "100%", width: `${project.buildAnalytics.manualWork}%`,
                  background: "linear-gradient(90deg, #34d399, #60a5fa)",
                  borderRadius: 2,
                  boxShadow: "0 0 8px rgba(52,211,153,0.4)",
                }} />
              </div>
            </div>

            {/* DNA micro chart */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px" }}>
              {Object.entries(project.dna).map(([key, val]) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                  <div style={{
                    width: "100%", height: "24px",
                    display: "flex", alignItems: "flex-end",
                    background: "rgba(255,255,255,0.03)", borderRadius: "3px 3px 0 0",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      width: "100%", height: `${Number(val)}%`,
                      background: `rgba(${rgbCat},${Number(val) / 100 * 0.7 + 0.1})`,
                      borderRadius: "2px 2px 0 0",
                    }} />
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.48rem",
                    color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em",
                  }}>
                    {key === "aiUsage" ? "AI" : key.slice(0, 3).toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 16px", marginTop: "auto",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {project.githubUrl && (
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl, "_blank", "noopener,noreferrer"); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: 0, color: "rgba(255,255,255,0.35)", transition: "color 0.15s",
                  }}
                  title="GitHub"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </button>
              )}
              {project.liveUrl && (
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.liveUrl, "_blank", "noopener,noreferrer"); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: 0, color: "rgba(255,255,255,0.35)", transition: "color 0.15s",
                  }}
                  title="Live demo"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </button>
              )}
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "5px",
              fontFamily: "var(--font-mono)", fontSize: "0.62rem",
              fontWeight: 600, letterSpacing: "0.08em",
              color: catColor, opacity: 0.8,
            }}>
              Case Study
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

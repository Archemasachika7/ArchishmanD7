"use client";
import { useOSStore } from "@/lib/store";
import type { Project } from "@/lib/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import Link from "next/link";
import {
  MapPin, BookOpen, GitBranch, Network, Archive, FlaskConical,
  ChevronRight, ExternalLink, Terminal,
} from "lucide-react";

/* ─── Static data ─────────────────────────────────────────────────── */

const civilStats = [
  { label: "Institution", value: "Jadavpur University" },
  { label: "Degree",      value: "B.E. Civil Eng." },
  { label: "Year",        value: "2024 – 2028" },
  { label: "Focus",       value: "GIS + Remote Sensing" },
];

const dsStats = [
  { label: "Institution", value: "IIT Madras" },
  { label: "Degree",      value: "BS Data Science" },
  { label: "Focus",       value: "ML · AI · Analytics" },
  { label: "Tools",       value: "Python · SQL · TF" },
];

const modules = [
  { href: "/projects", icon: GitBranch,    label: "Project Registry",   desc: "Active and completed projects with full evolution history", color: "#00ff88",  code: "01" },
  { href: "/journal",  icon: BookOpen,     label: "Engineering Journal", desc: "Lab notebook — problems, failures, lessons, discoveries",  color: "#9b59ff",  code: "02" },
  { href: "/graph",    icon: Network,      label: "Knowledge Graph",     desc: "Interactive map of skills, subjects, and their connections",color: "#00d4ff",  code: "03" },
  { href: "/vault",    icon: Archive,      label: "Engineering Vault",   desc: "CAD files, reports, datasets, research papers",            color: "#ff6b35",  code: "04" },
  { href: "/lab",      icon: FlaskConical, label: "AI Lab",              desc: "Reserved for AI avatar, voice assistant, research tools",  color: "#4466ff",  code: "05" },
];

/* ─── Component ───────────────────────────────────────────────────── */

export function HomePage({ projects }: { projects: Project[] }) {
  const { identity, setIdentity } = useOSStore();
  const featured = projects.filter((p) => p.featured);
  const isCivil  = identity === "civil";

  const stats = [
    { label: "TOTAL",     value: String(projects.length),                                        color: "#00ff88" },
    { label: "ACTIVE",    value: String(projects.filter((p) => p.status === "active").length),   color: "#00d4ff" },
    { label: "COMPLETE",  value: String(projects.filter((p) => p.status === "completed").length),color: "#4466ff" },
    { label: "AI LAB",    value: "STBY",                                                         color: "#9b59ff" },
  ];

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }} className="space-y-6">

      {/* ══════════════════════════════════════════════════════════════
          HERO — OS Window
          ══════════════════════════════════════════════════════════ */}
      <div className="os-window animate-scaleIn">
        {/* Titlebar */}
        <div className="os-window-titlebar">
          <span className="os-window-dot os-window-dot-red" />
          <span className="os-window-dot os-window-dot-yellow" />
          <span className="os-window-dot os-window-dot-green" />
          <span className="os-window-title">identity.profile — ArchiOS HQ</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
            {(["civil", "ds"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setIdentity(mode)}
                style={{
                  padding: "3px 10px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: identity === mode
                    ? (mode === "civil" ? "rgba(0,255,136,0.14)" : "rgba(0,212,255,0.14)")
                    : "transparent",
                  color: identity === mode
                    ? (mode === "civil" ? "var(--accent-green)" : "var(--accent-cyan)")
                    : "var(--text-muted)",
                  border: "1px solid",
                  borderColor: identity === mode
                    ? (mode === "civil" ? "rgba(0,255,136,0.45)" : "rgba(0,212,255,0.45)")
                    : "var(--border)",
                }}
              >
                {mode === "civil" ? "CIVIL ENG" : "DS / AI"}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div
          className="os-grid"
          style={{ padding: "28px 28px 24px", position: "relative", overflow: "hidden" }}
        >
          {/* Glow orb background */}
          <div
            style={{
              position: "absolute",
              right: "40px",
              top: "20px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: isCivil ? "var(--accent-green)" : "var(--accent-cyan)",
              opacity: 0.04,
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          {/* Name with glitch shimmer */}
          <div style={{ position: "relative", marginBottom: "6px" }}>
            <h1
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                lineHeight: 1.1,
                textShadow: "0 0 40px rgba(255,255,255,0.06)",
              }}
            >
              Archishman D
            </h1>
            {/* Thin underline accent */}
            <div
              style={{
                marginTop: "6px",
                height: "2px",
                width: "80px",
                background: isCivil
                  ? "linear-gradient(90deg, var(--accent-green), transparent)"
                  : "linear-gradient(90deg, var(--accent-cyan), transparent)",
                borderRadius: "1px",
              }}
            />
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              color: isCivil ? "var(--accent-green)" : "var(--accent-cyan)",
              marginBottom: "24px",
              letterSpacing: "0.04em",
              textShadow: isCivil
                ? "0 0 12px rgba(0,255,136,0.4)"
                : "0 0 12px rgba(0,212,255,0.4)",
            }}
          >
            {isCivil
              ? "> Civil Engineer — GIS · Remote Sensing · Structural"
              : "> Data Scientist — ML · AI · Python · Analytics"}
          </p>

          {/* Info grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            {(isCivil ? civilStats : dsStats).map(({ label, value }) => (
              <div
                key={label}
                style={{
                  padding: "10px 12px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  transition: "border-color 0.15s",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.52rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "4px",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Terminal bio block */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "14px 16px",
              background: "rgba(0,255,136,0.035)",
              border: "1px solid rgba(0,255,136,0.14)",
              borderRadius: "6px",
              borderLeft: "3px solid rgba(0,255,136,0.5)",
            }}
          >
            <Terminal
              size={15}
              style={{ color: "var(--accent-green)", flexShrink: 0, marginTop: "2px" }}
            />
            <div>
              <p
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                Both identities. One platform.
              </p>
              <p
                style={{
                  fontSize: "0.73rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Simultaneously building expertise in Civil Engineering at Jadavpur University
                and Data Science at IIT Madras. This OS documents both paths and the
                engineering thinking that connects them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          HUD STATS BAR
          ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
        }}
        className="animate-fadeInUp"
      >
        {stats.map(({ label, value, color }, idx) => (
          <div
            key={label}
            className="os-window"
            style={{
              animationDelay: `${idx * 0.07}s`,
              borderColor: `${color}20`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                height: "2px",
                background: `linear-gradient(90deg, ${color}, transparent)`,
              }}
            />
            <div style={{ padding: "14px 16px" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "6px",
                }}
              >
                {label}
              </p>
              <p
                className="hud-value"
                style={{
                  color,
                  textShadow: `0 0 20px ${color}50`,
                }}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          OS MODULES
          ══════════════════════════════════════════════════════════ */}
      <div>
        <div className="section-header">
          <span className="section-header-label">[ OS MODULES ]</span>
          <div className="section-header-line" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
            }}
          >
            {modules.length} UNITS ONLINE
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "8px",
          }}
        >
          {modules.map((mod) => (
            <Link key={mod.href} href={mod.href} className="group block">
              <div
                className="os-window"
                style={{
                  height: "100%",
                  transition: "all 0.2s ease",
                  borderColor: "var(--border)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${mod.color}40`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${mod.color}0a`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Titlebar */}
                <div
                  style={{
                    height: "3px",
                    background: `linear-gradient(90deg, ${mod.color}, transparent)`,
                  }}
                />
                <div style={{ padding: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${mod.color}12`,
                        border: `1px solid ${mod.color}25`,
                      }}
                    >
                      <mod.icon size={15} style={{ color: mod.color }} />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {mod.code}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "6px",
                      transition: "color 0.15s",
                    }}
                  >
                    {mod.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.55,
                    }}
                  >
                    {mod.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "12px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: mod.color,
                      opacity: 0.7,
                      transition: "opacity 0.15s",
                    }}
                  >
                    <span>OPEN</span>
                    <ChevronRight size={10} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED PROJECTS
          ══════════════════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <div>
          <div className="section-header">
            <span className="section-header-label">[ FEATURED PROJECTS ]</span>
            <div className="section-header-line" />
            <Link
              href="/projects"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                transition: "color 0.15s",
                flexShrink: 0,
              }}
            >
              ALL PROJECTS
              <ChevronRight size={10} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "12px",
            }}
          >
            {featured.map((p, idx) => (
              <div
                key={p.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          FOOTER — Terminal line
          ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          background: "var(--bg-panel)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
          }}
        >
          <span style={{ color: "var(--accent-green)" }}>archios@jadavpur:~$</span>
          <span style={{ color: "var(--text-secondary)" }}>
            <MapPin
              size={11}
              style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }}
            />
            Kolkata, India · Civil Engineering + AI
          </span>
          <span className="animate-blink" style={{ color: "var(--accent-green)" }}>█</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="https://github.com/archemasachika7"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.15s",
              letterSpacing: "0.06em",
            }}
          >
            github
            <ExternalLink size={9} />
          </a>
        </div>
      </div>

    </div>
  );
}

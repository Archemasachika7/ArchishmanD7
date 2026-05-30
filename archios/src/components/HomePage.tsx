"use client";
import { useOSStore } from "@/lib/store";
import { getFeaturedProjects, getPublicProjects } from "@/lib/data";
import { ProjectCard } from "@/components/projects/ProjectCard";
import Link from "next/link";
import {
  MapPin, BookOpen, Cpu, GitBranch, Network, Archive,
  FlaskConical, ChevronRight, ExternalLink, Terminal
} from "lucide-react";

const civilStats = [
  { label: "Institution", value: "Jadavpur University" },
  { label: "Degree", value: "B.E. Civil Engineering" },
  { label: "Year", value: "2024–2028" },
  { label: "Specialization", value: "GIS & Remote Sensing" },
];

const dsStats = [
  { label: "Institution", value: "IIT Madras" },
  { label: "Degree", value: "BS Data Science" },
  { label: "Focus", value: "ML, AI, Analytics" },
  { label: "Tools", value: "Python, SQL, TensorFlow" },
];

const modules = [
  { href: "/projects", icon: GitBranch, label: "Project Registry", desc: "Active and completed projects with full evolution history", color: "#00ff88" },
  { href: "/journal", icon: BookOpen, label: "Engineering Journal", desc: "Lab notebook — problems, failures, lessons, discoveries", color: "#9b59ff" },
  { href: "/graph", icon: Network, label: "Knowledge Graph", desc: "Interactive map of skills, subjects, and their connections", color: "#00e5ff" },
  { href: "/vault", icon: Archive, label: "Engineering Vault", desc: "CAD files, reports, datasets, research papers", color: "#ff6b35" },
  { href: "/lab", icon: FlaskConical, label: "AI Lab", desc: "Reserved for AI avatar, voice assistant, and research tools", color: "#4466ff" },
];

export function HomePage() {
  const { identity, setIdentity } = useOSStore();
  const featured = getFeaturedProjects();
  const allProjects = getPublicProjects();
  const isCivil = identity === "civil";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero */}
      <div className="relative os-panel p-6 os-grid overflow-hidden">
        <div className="relative z-10">
          {/* Identity toggle */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className="flex items-center gap-1 p-0.5 rounded-lg"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              {(["civil", "ds"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setIdentity(mode)}
                  className="px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200"
                  style={{
                    background: identity === mode ? (mode === "civil" ? "var(--accent-green)" : "var(--accent-cyan)") : "transparent",
                    color: identity === mode ? "#000" : "var(--text-muted)",
                    fontWeight: identity === mode ? 700 : 400,
                  }}
                >
                  {mode === "civil" ? "CIVIL ENG" : "DS / AI"}
                </button>
              ))}
            </div>
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              identity mode
            </span>
          </div>

          {/* Name + title */}
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Archishman D
          </h1>
          <p
            className="font-mono text-sm mb-4"
            style={{ color: isCivil ? "var(--accent-green)" : "var(--accent-cyan)" }}
          >
            {isCivil
              ? "Civil Engineer → GIS + Remote Sensing + Structural"
              : "Data Scientist → ML + AI + Python + Analytics"}
          </p>

          {/* Current identity stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {(isCivil ? civilStats : dsStats).map(({ label, value }) => (
              <div
                key={label}
                className="p-2 rounded-md"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
              >
                <p className="font-mono text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Dual identity note */}
          <div
            className="flex items-start gap-3 p-3 rounded-md"
            style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.12)" }}
          >
            <Terminal size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent-green)" }} />
            <div>
              <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                Both identities. One platform.
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                I'm simultaneously building expertise in Civil Engineering at Jadavpur University
                and Data Science at IIT Madras. This OS documents both paths and the engineering
                thinking that connects them. Switch modes above to reorganize the view.
              </p>
            </div>
          </div>
        </div>

        {/* BG decoration */}
        <div
          className="absolute right-6 top-6 w-32 h-32 rounded-full opacity-5"
          style={{ background: isCivil ? "var(--accent-green)" : "var(--accent-cyan)", filter: "blur(40px)" }}
        />
      </div>

      {/* System Status Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Projects", value: allProjects.length.toString(), color: "#00ff88" },
          { label: "Active", value: allProjects.filter(p => p.status === "active").length.toString(), color: "#00e5ff" },
          { label: "Completed", value: allProjects.filter(p => p.status === "completed").length.toString(), color: "#4466ff" },
          { label: "AI Lab", value: "STANDBY", color: "#9b59ff" },
        ].map(({ label, value, color }) => (
          <div key={label} className="os-panel p-3 flex items-center gap-3">
            <div className="w-1 h-8 rounded-full" style={{ background: color }} />
            <div>
              <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
              <p className="font-mono text-lg font-bold" style={{ color }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* OS Modules */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold" style={{ color: "var(--accent-green)" }}>
            OS MODULES
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {modules.map((mod) => (
            <Link key={mod.href} href={mod.href} className="group">
              <div
                className="os-panel p-4 h-full flex flex-col gap-2 transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center"
                    style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}30` }}
                  >
                    <mod.icon size={14} style={{ color: mod.color }} />
                  </div>
                  <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                    {mod.label}
                  </span>
                  <ChevronRight
                    size={12}
                    className="ml-auto transition-transform group-hover:translate-x-0.5"
                    style={{ color: mod.color }}
                  />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {mod.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold" style={{ color: "var(--accent-green)" }}>
                FEATURED PROJECTS
              </span>
              <div className="h-px w-24" style={{ background: "var(--border)" }} />
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-1 font-mono text-xs transition-colors hover:text-white"
              style={{ color: "var(--text-muted)" }}
            >
              All projects <ChevronRight size={11} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="os-panel p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={14} style={{ color: "var(--accent-green)" }} />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Kolkata, India · Building at the intersection of Civil Engineering + AI
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/archemasachika7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-mono text-xs transition-colors hover:text-white"
            style={{ color: "var(--text-muted)" }}
          >
            GitHub <ExternalLink size={10} />
          </a>
          <Link
            href="/admin"
            className="font-mono text-xs transition-colors hover:text-white"
            style={{ color: "var(--text-muted)" }}
          >
            Admin →
          </Link>
        </div>
      </div>
    </div>
  );
}

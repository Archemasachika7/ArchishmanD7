"use client";
import { FlaskConical, Bot, Mic, Cpu, BookOpen, Lightbulb, Zap } from "lucide-react";

const futureModules = [
  {
    id: "ai-avatar",
    icon: Bot,
    title: "AI Avatar",
    description: "A conversational AI that knows every project, skill, and engineering decision documented in this OS. Ask it anything about my background.",
    status: "planned",
    color: "#00ff88",
    tech: ["LLM", "RAG", "Vector DB", "Next.js"],
    eta: "Q4 2025",
  },
  {
    id: "voice-assistant",
    icon: Mic,
    title: "Voice Assistant",
    description: "Voice interface for the AI avatar. Speak your question, get a spoken response referencing actual projects and journal entries.",
    status: "planned",
    color: "#00e5ff",
    tech: ["Whisper", "TTS", "WebRTC"],
    eta: "Q1 2026",
  },
  {
    id: "white-room",
    icon: Zap,
    title: "White Room Challenges",
    description: "Live engineering problem-solving sessions, streamed and documented. Raw thinking, no edited presentation.",
    status: "concept",
    color: "#9b59ff",
    tech: ["Video", "Live Coding", "Documentation"],
    eta: "TBD",
  },
  {
    id: "engineering-tutor",
    icon: BookOpen,
    title: "Engineering Tutor",
    description: "Interactive explanations of civil engineering concepts backed by real project examples from the registry.",
    status: "concept",
    color: "#ff6b35",
    tech: ["LLM", "Project Context", "Interactive UI"],
    eta: "TBD",
  },
  {
    id: "research-assistant",
    icon: Lightbulb,
    title: "Research Assistant",
    description: "AI-powered literature review tool trained on engineering research. Summarizes papers, finds connections, suggests references.",
    status: "planned",
    color: "#ffd700",
    tech: ["RAG", "PDF Processing", "Citation Graph"],
    eta: "Q2 2026",
  },
  {
    id: "recommendation",
    icon: Cpu,
    title: "Project Recommendation",
    description: "Suggests next projects based on skill gaps, knowledge graph structure, and learning trajectory analysis.",
    status: "concept",
    color: "#4466ff",
    tech: ["Graph ML", "Skill Modeling", "Recommendation Engine"],
    eta: "TBD",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  planned: { label: "Planned", color: "#00ff88" },
  concept: { label: "Concept", color: "#9b59ff" },
  building: { label: "Building", color: "#00e5ff" },
};

export function LabPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FlaskConical size={14} style={{ color: "#4466ff" }} />
          <span className="font-mono text-xs" style={{ color: "#4466ff" }}>~/lab</span>
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          AI Lab
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Reserved architecture for future AI systems. The platform is designed to accommodate
          these without requiring a full rebuild.
        </p>
      </div>

      {/* Architecture note */}
      <div
        className="p-4 rounded-lg font-mono text-xs"
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid rgba(68,102,255,0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span style={{ color: "#4466ff" }}>SYSTEM</span>
          <span style={{ color: "var(--text-muted)" }}>·</span>
          <span style={{ color: "var(--text-muted)" }}>AI Lab Module Status</span>
        </div>
        <div className="space-y-1" style={{ color: "var(--text-secondary)" }}>
          <p><span style={{ color: "var(--accent-green)" }}>✓</span> Base Next.js architecture: <span style={{ color: "var(--accent-green)" }}>READY</span></p>
          <p><span style={{ color: "var(--accent-green)" }}>✓</span> API route structure: <span style={{ color: "var(--accent-green)" }}>RESERVED</span></p>
          <p><span style={{ color: "var(--accent-green)" }}>✓</span> Data layer extensibility: <span style={{ color: "var(--accent-green)" }}>READY</span></p>
          <p><span style={{ color: "#ffd700" }}>○</span> LLM integration: <span style={{ color: "#ffd700" }}>PENDING</span></p>
          <p><span style={{ color: "#ffd700" }}>○</span> Vector store: <span style={{ color: "#ffd700" }}>PENDING</span></p>
          <p><span style={{ color: "var(--text-muted)" }}>—</span> Voice interface: <span style={{ color: "var(--text-muted)" }}>PLANNED</span></p>
        </div>
      </div>

      {/* Future modules */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold" style={{ color: "#4466ff" }}>FUTURE MODULES</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {futureModules.map((mod) => {
            const Icon = mod.icon;
            const status = statusConfig[mod.status];
            return (
              <div
                key={mod.id}
                className="os-panel p-4 flex flex-col gap-3"
                style={{ borderColor: `${mod.color}20`, opacity: 0.85 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center"
                      style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}30` }}
                    >
                      <Icon size={14} style={{ color: mod.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                        {mod.title}
                      </h3>
                      {mod.eta && (
                        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                          ETA: {mod.eta}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded shrink-0"
                    style={{
                      background: `${status.color}15`,
                      color: status.color,
                      border: `1px solid ${status.color}30`,
                    }}
                  >
                    {status.label}
                  </span>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {mod.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {mod.tech.map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>

                {/* Placeholder UI hint */}
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <div
                    className="h-full rounded-full animate-pulse-green"
                    style={{
                      width: mod.status === "planned" ? "15%" : "5%",
                      background: mod.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

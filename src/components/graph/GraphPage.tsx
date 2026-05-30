"use client";
import { useState } from "react";
import type { KnowledgeNode, KnowledgeEdge } from "@/lib/types";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { Network } from "lucide-react";

const groupLabels: Record<string, { label: string; color: string }> = {
  civil: { label: "Civil Engineering", color: "#ff6b35" },
  ds: { label: "Data Science / AI", color: "#00e5ff" },
  bridge: { label: "Bridge Skills", color: "#00ff88" },
  core: { label: "Core", color: "#9b59ff" },
};

export function GraphPage({ nodes, edges }: { nodes: KnowledgeNode[]; edges: KnowledgeEdge[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  const groups = [...new Set(nodes.map((n) => n.group))];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Network size={14} style={{ color: "var(--accent-cyan)" }} />
          <span className="font-mono text-xs" style={{ color: "var(--accent-cyan)" }}>~/graph</span>
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Knowledge Graph</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Interactive map connecting disciplines, skills, and projects. Drag nodes, scroll to zoom.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Filter:</span>
        <button
          onClick={() => setFilter(null)}
          className="font-mono text-xs px-3 py-1 rounded-md transition-all"
          style={{
            background: filter === null ? "var(--accent-green)" : "var(--bg-secondary)",
            color: filter === null ? "#000" : "var(--text-muted)",
            border: `1px solid ${filter === null ? "var(--accent-green)" : "var(--border)"}`,
          }}
        >
          All
        </button>
        {groups.map((g) => {
          const cfg = groupLabels[g] ?? { label: g, color: "#8892a0" };
          return (
            <button
              key={g}
              onClick={() => setFilter(filter === g ? null : g)}
              className="flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-md transition-all"
              style={{
                background: filter === g ? `${cfg.color}20` : "var(--bg-secondary)",
                color: filter === g ? cfg.color : "var(--text-muted)",
                border: `1px solid ${filter === g ? `${cfg.color}50` : "var(--border)"}`,
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
              {cfg.label}
            </button>
          );
        })}
      </div>

      <div className="os-panel relative" style={{ height: "520px", overflow: "hidden" }}>
        <KnowledgeGraph nodes={nodes} edges={edges} filterGroup={filter} />
        <div className="absolute top-3 right-3 os-panel p-2 space-y-1" style={{ pointerEvents: "none" }}>
          {groups.map((g) => {
            const cfg = groupLabels[g] ?? { label: g, color: "#8892a0" };
            return (
              <div key={g} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                <span className="font-mono" style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}>{cfg.label}</span>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-3 right-3 font-mono text-xs" style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}>
          drag · scroll to zoom · click node for details
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {nodes
          .filter((n) => !filter || n.group === filter || n.group === "bridge")
          .map((node) => {
            const cfg = groupLabels[node.group] ?? { label: node.group, color: "#8892a0" };
            return (
              <div key={node.id} className="os-panel p-3" style={{ borderColor: `${cfg.color}20` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                  <span className="font-semibold text-xs" style={{ color: "var(--text-primary)" }}>{node.label}</span>
                  <span className="ml-auto font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: `${cfg.color}15`, color: cfg.color, fontSize: "0.6rem" }}>
                    {node.group}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{node.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

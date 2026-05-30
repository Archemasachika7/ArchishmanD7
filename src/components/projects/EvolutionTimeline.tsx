"use client";
import type { EvolutionStage, ProjectStage } from "@/lib/types";
import { CheckCircle, Circle, Lightbulb, Map, Code2, Rocket, Telescope } from "lucide-react";

const stageConfig: Record<ProjectStage, { icon: typeof Lightbulb; color: string; label: string }> = {
  idea: { icon: Lightbulb, color: "#ff6b35", label: "Idea" },
  planning: { icon: Map, color: "#9b59ff", label: "Planning" },
  development: { icon: Code2, color: "#00e5ff", label: "Development" },
  deployment: { icon: Rocket, color: "#4466ff", label: "Deployment" },
  future: { icon: Telescope, color: "#00ff88", label: "Future" },
};

export function EvolutionTimeline({ stages }: { stages: EvolutionStage[] }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-4 top-0 bottom-0 w-px"
        style={{ background: "var(--border)" }}
      />

      <div className="space-y-6">
        {stages.map((stage, i) => {
          const cfg = stageConfig[stage.stage];
          const Icon = cfg.icon;
          return (
            <div key={i} className="relative flex gap-4 pl-0">
              {/* Icon bubble */}
              <div
                className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                style={{
                  background: stage.completed ? `${cfg.color}20` : "var(--bg-secondary)",
                  border: `1px solid ${stage.completed ? cfg.color : "var(--border)"}`,
                  boxShadow: stage.completed ? `0 0 12px ${cfg.color}30` : "none",
                }}
              >
                <Icon size={14} style={{ color: stage.completed ? cfg.color : "var(--text-muted)" }} />
              </div>

              {/* Content */}
              <div
                className="flex-1 os-panel p-3 transition-all duration-300"
                style={{
                  borderColor: stage.completed ? `${cfg.color}30` : "var(--border)",
                  opacity: stage.completed ? 1 : 0.6,
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                    <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                      {stage.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {stage.date && (
                      <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {stage.date}
                      </span>
                    )}
                    {stage.completed ? (
                      <CheckCircle size={13} style={{ color: cfg.color }} />
                    ) : (
                      <Circle size={13} style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {stage.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

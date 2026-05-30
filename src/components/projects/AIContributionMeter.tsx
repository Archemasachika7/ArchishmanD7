"use client";
import type { BuildAnalytics } from "@/lib/types";

export function AIContributionMeter({ analytics }: { analytics: BuildAnalytics }) {
  const { manualWork, aiAssistance, breakdown } = analytics;
  const isAIHeavy = aiAssistance > 50;

  return (
    <div className="os-panel p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-xs font-bold" style={{ color: "var(--accent-cyan)" }}>
          BUILD METHOD ANALYTICS
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      {/* Big visual bar */}
      <div className="relative h-10 rounded-lg overflow-hidden mb-3" style={{ background: "var(--bg-secondary)" }}>
        <div
          className="absolute left-0 top-0 h-full flex items-center justify-center transition-all duration-1000"
          style={{
            width: `${manualWork}%`,
            background: "linear-gradient(90deg, #00ff88, #00cc66)",
          }}
        >
          {manualWork > 20 && (
            <span className="font-mono text-xs font-bold text-black">
              {manualWork}% Manual
            </span>
          )}
        </div>
        <div
          className="absolute right-0 top-0 h-full flex items-center justify-center"
          style={{
            width: `${aiAssistance}%`,
            background: "linear-gradient(90deg, #0066cc, #00e5ff)",
          }}
        >
          {aiAssistance > 20 && (
            <span className="font-mono text-xs font-bold text-black">
              {aiAssistance}% AI
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: "#00ff88" }} />
          <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
            Manual Work: {manualWork}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: "#00e5ff" }} />
          <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
            AI Assistance: {aiAssistance}%
          </span>
        </div>
      </div>

      {/* Classification badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-3"
        style={{
          background: isAIHeavy ? "rgba(0,229,255,0.08)" : "rgba(0,255,136,0.08)",
          border: `1px solid ${isAIHeavy ? "rgba(0,229,255,0.25)" : "rgba(0,255,136,0.25)"}`,
        }}
      >
        <span className="font-mono text-xs font-semibold" style={{ color: isAIHeavy ? "#00e5ff" : "#00ff88" }}>
          {isAIHeavy ? "AI-Assisted Build" : "Manual-Primary Build"}
        </span>
      </div>

      {/* Breakdown */}
      <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {breakdown}
      </p>
    </div>
  );
}

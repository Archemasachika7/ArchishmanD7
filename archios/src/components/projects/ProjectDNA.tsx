"use client";
import type { ProjectDNA as DNA } from "@/lib/types";

const metrics = [
  { key: "complexity" as const, label: "Complexity", color: "#ff6b35", desc: "Technical depth and difficulty" },
  { key: "innovation" as const, label: "Innovation", color: "#9b59ff", desc: "Novelty and creative approach" },
  { key: "engineering" as const, label: "Engineering", color: "#4466ff", desc: "Engineering rigor and methodology" },
  { key: "aiUsage" as const, label: "AI Usage", color: "#00e5ff", desc: "Degree of AI assistance" },
  { key: "research" as const, label: "Research", color: "#ffd700", desc: "Literature review and research depth" },
];

export function ProjectDNA({ dna }: { dna: DNA }) {
  return (
    <div className="os-panel p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-xs font-bold" style={{ color: "var(--accent-green)" }}>
          PROJECT DNA
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      {/* Radar-style bars */}
      <div className="space-y-3">
        {metrics.map(({ key, label, color, desc }) => {
          const value = dna[key];
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{label}</span>
                  <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>{desc}</span>
                </div>
                <span className="font-mono text-xs font-bold" style={{ color }}>{value}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${value}%`,
                    background: `linear-gradient(90deg, ${color}80, ${color})`,
                    boxShadow: `0 0 8px ${color}40`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pentagon visualization */}
      <div className="mt-4 flex justify-center">
        <PentagonChart dna={dna} />
      </div>
    </div>
  );
}

function PentagonChart({ dna }: { dna: DNA }) {
  const size = 120;
  const center = size / 2;
  const radius = 45;
  const labels = ["complexity", "innovation", "engineering", "aiUsage", "research"] as const;
  const colors = ["#ff6b35", "#9b59ff", "#4466ff", "#00e5ff", "#ffd700"];

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getGridPoint = (index: number, scale: number) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    const r = scale * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const dataPoints = labels.map((l, i) => getPoint(i, dna[l]));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridLevels.map((scale) => {
        const points = labels.map((_, i) => getGridPoint(i, scale));
        const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
        return (
          <path
            key={scale}
            d={path}
            fill="none"
            stroke="rgba(0,255,136,0.08)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Axis lines */}
      {labels.map((_, i) => {
        const end = getGridPoint(i, 1);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={end.x}
            y2={end.y}
            stroke="rgba(0,255,136,0.08)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Data area */}
      <path d={dataPath} fill="rgba(0,255,136,0.08)" stroke="rgba(0,255,136,0.5)" strokeWidth="1" />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="2.5"
          fill={colors[i]}
          style={{ filter: `drop-shadow(0 0 4px ${colors[i]})` }}
        />
      ))}
    </svg>
  );
}

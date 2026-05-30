"use client";
import { useEffect, useState } from "react";
import { useOSStore } from "@/lib/store";

const bootLines = [
  "Initializing ArchiOS v1.0.0...",
  "Loading engineering modules... OK",
  "Mounting knowledge graph... OK",
  "Connecting GitHub integration... OK",
  "Loading project registry... OK",
  "Initializing AI Lab (reserved)... STANDBY",
  "Engineering journal: online",
  "Vault encryption: enabled",
  "System ready.",
];

export function BootScreen() {
  const { bootComplete, setBootComplete } = useOSStore();
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (bootComplete) { setDone(true); return; }

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]]);
        setProgress(Math.round(((i + 1) / bootLines.length) * 100));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setBootComplete(true);
        }, 600);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [bootComplete, setBootComplete]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center os-grid"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="w-full max-w-lg px-8">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1
            className="font-mono text-4xl font-bold gradient-text-green text-glow mb-1"
          >
            ArchiOS
          </h1>
          <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            Digital Engineering Operating System
          </p>
        </div>

        {/* Boot log */}
        <div
          className="os-panel p-4 mb-4 font-mono text-xs space-y-1"
          style={{ minHeight: "160px" }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className="flex items-center gap-2 animate-fadeInUp"
              style={{ animationDelay: `${i * 0.05}s`, color: "var(--text-secondary)" }}
            >
              <span style={{ color: "var(--accent-green)" }}>›</span>
              <span>{line}</span>
            </div>
          ))}
          {lines.length < bootLines.length && (
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--accent-green)" }}>›</span>
              <span className="animate-blink" style={{ color: "var(--accent-green)" }}>_</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div
          className="h-0.5 rounded-full overflow-hidden"
          style={{ background: "var(--bg-secondary)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--accent-green), var(--accent-cyan))",
            }}
          />
        </div>
        <p className="font-mono text-xs mt-2 text-right" style={{ color: "var(--text-muted)" }}>
          {progress}%
        </p>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useOSStore } from "@/lib/store";

const bootLines = [
  { text: "Initializing ArchiOS v1.0.0", status: "OK" },
  { text: "Loading kernel modules", status: "OK" },
  { text: "Mounting engineering filesystem", status: "OK" },
  { text: "Booting knowledge graph engine", status: "OK" },
  { text: "Connecting GitHub integration", status: "OK" },
  { text: "Loading project registry [12 entries]", status: "OK" },
  { text: "Initializing AI Lab subsystem", status: "STANDBY" },
  { text: "Vault encryption layer", status: "ENABLED" },
  { text: "Engineering journal: online", status: "OK" },
  { text: "All systems nominal — ArchiOS ready", status: "DONE" },
];

const ASCII_LOGO = [
  "  █████╗ ██████╗  ██████╗██╗  ██╗██╗ ██████╗ ███████╗",
  " ██╔══██╗██╔══██╗██╔════╝██║  ██║██║██╔═══██╗██╔════╝",
  " ███████║██████╔╝██║     ███████║██║██║   ██║███████╗ ",
  " ██╔══██║██╔══██╗██║     ██╔══██║██║██║   ██║╚════██║ ",
  " ██║  ██║██║  ██║╚██████╗██║  ██║██║╚██████╔╝███████║ ",
  " ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝ ╚═════╝ ╚══════╝",
];

const STATUS_COLORS: Record<string, string> = {
  OK: "#00ff88",
  DONE: "#00ff88",
  STANDBY: "#febc2e",
  ENABLED: "#00d4ff",
};

export function BootScreen() {
  const { bootComplete, setBootComplete } = useOSStore();
  const [lines, setLines] = useState<typeof bootLines>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [asciiVisible, setAsciiVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (bootComplete) { setDone(true); return; }

    // Show ASCII first
    const asciiTimer = setTimeout(() => setAsciiVisible(true), 100);
    // Glitch the title a couple of times
    const g1 = setTimeout(() => setGlitchActive(true), 300);
    const g2 = setTimeout(() => setGlitchActive(false), 500);
    const g3 = setTimeout(() => setGlitchActive(true), 700);
    const g4 = setTimeout(() => setGlitchActive(false), 850);

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]]);
        setProgress(Math.round(((i + 1) / bootLines.length) * 100));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setFadingOut(true);
          setTimeout(() => {
            setDone(true);
            setBootComplete(true);
          }, 500);
        }, 700);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      clearTimeout(asciiTimer);
      clearTimeout(g1); clearTimeout(g2);
      clearTimeout(g3); clearTimeout(g4);
    };
  }, [bootComplete, setBootComplete]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center os-grid scanline"
      style={{
        background: "var(--bg-primary)",
        animation: fadingOut ? "bootFadeOut 0.5s ease-out forwards" : undefined,
      }}
    >
      {/* Scan line sweep */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)",
            animation: "scan 3s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6 md:px-10">
        {/* ASCII logo */}
        <div
          className="mb-6 text-center overflow-hidden"
          style={{
            opacity: asciiVisible ? 1 : 0,
            transition: "opacity 0.4s ease-out",
          }}
        >
          {ASCII_LOGO.map((row, i) => (
            <div
              key={i}
              className="font-mono leading-tight"
              style={{
                fontSize: "clamp(0.3rem, 1vw, 0.55rem)",
                color: "var(--accent-green)",
                textShadow: "0 0 8px rgba(0,255,136,0.5)",
                whiteSpace: "pre",
                animationDelay: `${i * 0.04}s`,
                opacity: asciiVisible ? 1 : 0,
                transform: asciiVisible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.3s ease-out ${i * 0.04}s, transform 0.3s ease-out ${i * 0.04}s`,
              }}
            >
              {row}
            </div>
          ))}

          {/* Glitch layers over title */}
          <div style={{ position: "relative", marginTop: "12px", height: "28px" }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                color: "var(--accent-green)",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              Digital Engineering Operating System
            </div>
            {glitchActive && (
              <>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.3em",
                    color: "#00d4ff",
                    textTransform: "uppercase",
                    clipPath: "inset(20% 0 50% 0)",
                    transform: "translateX(3px)",
                    opacity: 0.7,
                  }}
                >
                  Digital Engineering Operating System
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.3em",
                    color: "#ff6b35",
                    textTransform: "uppercase",
                    clipPath: "inset(60% 0 10% 0)",
                    transform: "translateX(-3px)",
                    opacity: 0.5,
                  }}
                >
                  Digital Engineering Operating System
                </div>
              </>
            )}
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
              padding: "2px 10px",
              border: "1px solid rgba(0,255,136,0.25)",
              borderRadius: "3px",
              fontFamily: "monospace",
              fontSize: "0.6rem",
              color: "var(--text-muted)",
              letterSpacing: "0.15em",
            }}
          >
            <span style={{ color: "var(--accent-green)", fontSize: "0.5rem" }}>●</span>
            ARCHIOS v1.0.0
            <span style={{ color: "var(--text-muted)" }}>/</span>
            BUILD 2025
          </div>
        </div>

        {/* Boot log panel */}
        <div
          className="os-window mb-4"
          style={{ opacity: asciiVisible ? 1 : 0, transition: "opacity 0.4s ease-out 0.2s" }}
        >
          <div className="os-window-titlebar">
            <span className="os-window-dot os-window-dot-red" />
            <span className="os-window-dot os-window-dot-yellow" />
            <span className="os-window-dot os-window-dot-green" />
            <span className="os-window-title">boot.log — ArchiOS kernel</span>
          </div>
          <div
            className="os-window-body"
            style={{ minHeight: "200px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className="animate-fadeInUp"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                  animationDelay: `${i * 0.03}s`,
                  color: "var(--text-secondary)",
                }}
              >
                <span style={{ color: "var(--accent-green)", opacity: 0.5 }}>$</span>
                <span style={{ flex: 1 }}>{line.text}</span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    padding: "1px 5px",
                    border: `1px solid ${STATUS_COLORS[line.status] || "#3d4a57"}40`,
                    borderRadius: "2px",
                    color: STATUS_COLORS[line.status] || "var(--text-muted)",
                    background: `${STATUS_COLORS[line.status] || "#3d4a57"}10`,
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                  }}
                >
                  [ {line.status} ]
                </span>
              </div>
            ))}
            {lines.length < bootLines.length && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--accent-green)", opacity: 0.5 }}>$</span>
                <span className="animate-blink" style={{ color: "var(--accent-green)" }}>█</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ opacity: asciiVisible ? 1 : 0, transition: "opacity 0.4s ease-out 0.3s" }}>
          <div
            style={{
              height: "2px",
              background: "var(--bg-secondary)",
              borderRadius: "1px",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: progress < 100
                  ? "linear-gradient(90deg, var(--accent-green), var(--accent-cyan))"
                  : "#00ff88",
                transition: "width 0.25s ease-out",
                boxShadow: "0 0 8px rgba(0,255,136,0.6)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "6px",
              fontFamily: "monospace",
              fontSize: "0.6rem",
              color: "var(--text-muted)",
            }}
          >
            <span>archios@boot:~$</span>
            <span style={{ color: progress === 100 ? "var(--accent-green)" : "var(--text-muted)" }}>
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

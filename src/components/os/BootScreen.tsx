"use client";
import { useEffect, useState } from "react";
import { useOSStore } from "@/lib/store";

const bootLines = [
  { text: "Initializing ArchiOS v1.0.0 kernel",          status: "OK"      },
  { text: "Loading hardware abstraction layer",           status: "OK"      },
  { text: "Mounting engineering filesystem [ext4]",       status: "OK"      },
  { text: "Starting knowledge graph engine",              status: "OK"      },
  { text: "Connecting GitHub integration layer",          status: "OK"      },
  { text: "Loading project registry [12 entries found]",  status: "OK"      },
  { text: "Initializing AI Lab subsystem",                status: "STANDBY" },
  { text: "Vault encryption layer active",                status: "ENABLED" },
  { text: "Engineering journal daemon: online",           status: "OK"      },
  { text: "All systems nominal — ArchiOS ready",          status: "DONE"    },
];

const ASCII_LOGO = [
  " ▄▄▄       ██▀███   ▄████▄   ██░ ██  ██▓",
  "▒████▄    ▓██ ▒ ██▒▒██▀ ▀█  ▓██░ ██▒▓██▒",
  "▒██  ▀█▄  ▓██ ░▄█ ▒▒▓█    ▄ ▒██▀▀██░▒██▒",
  "░██▄▄▄▄██ ▒██▀▀█▄  ▒▓▓▄ ▄██▒░▓█ ░██ ░██░",
  " ▓█   ▓██▒░██▓ ▒██▒▒ ▓███▀ ░░▓█▒░██▓░██░",
  " ▒▒   ▓▒█░░ ▒▓ ░▒▓░░ ░▒ ▒  ░ ▒ ░░▒░▒░▓  ",
  "  ▒   ▒▒ ░  ░▒ ░ ▒░  ░  ▒    ▒ ░▒░ ░ ▒ ░",
  "  ░   ▒     ░░   ░ ░         ░  ░░ ░ ▒ ░",
  "      ░  ░   ░     ░ ░       ░  ░  ░ ░  ",
];

const STATUS_COLORS: Record<string, string> = {
  OK:      "#00ff88",
  DONE:    "#00ff88",
  STANDBY: "#febc2e",
  ENABLED: "#00d4ff",
};

export function BootScreen() {
  const { bootComplete, setBootComplete } = useOSStore();
  const [lines, setLines]               = useState<typeof bootLines>([]);
  const [progress, setProgress]         = useState(0);
  const [done, setDone]                 = useState(() => bootComplete);
  const [fadingOut, setFadingOut]       = useState(false);
  const [asciiVisible, setAsciiVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [subVisible, setSubVisible]     = useState(false);

  useEffect(() => {
    if (bootComplete || done) return;

    const t1 = setTimeout(() => setAsciiVisible(true), 150);
    const t2 = setTimeout(() => setSubVisible(true),   600);

    // Glitch bursts on title
    const g1 = setTimeout(() => setGlitchActive(true),  350);
    const g2 = setTimeout(() => setGlitchActive(false), 600);
    const g3 = setTimeout(() => setGlitchActive(true),  850);
    const g4 = setTimeout(() => setGlitchActive(false), 1050);
    const g5 = setTimeout(() => setGlitchActive(true),  1150);
    const g6 = setTimeout(() => setGlitchActive(false), 1280);

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
          }, 600);
        }, 800);
      }
    }, 230);

    return () => {
      clearInterval(interval);
      [t1,t2,g1,g2,g3,g4,g5,g6].forEach(clearTimeout);
    };
  }, [bootComplete, setBootComplete]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center os-grid"
      style={{
        background: "var(--bg-primary)",
        animation: fadingOut ? "bootFadeOut 0.6s ease-out forwards" : undefined,
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Scan sweep */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent 0%, rgba(0,255,136,0.12) 20%, rgba(0,255,136,0.5) 50%, rgba(0,255,136,0.12) 80%, transparent 100%)",
            boxShadow: "0 0 12px rgba(0,255,136,0.3)",
            animation: "scan 4s linear infinite",
          }}
        />
      </div>

      <div
        className="relative w-full max-w-2xl px-6 md:px-10"
        style={{ zIndex: 10 }}
      >
        {/* ── ASCII Logo ── */}
        <div
          style={{
            opacity: asciiVisible ? 1 : 0,
            transition: "opacity 0.5s ease-out",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          {/* Big title glitch effect */}
          <div
            style={{
              position: "relative",
              marginBottom: "12px",
              lineHeight: 1,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
                fontWeight: 900,
                letterSpacing: "0.15em",
                color: "var(--accent-green)",
                textShadow: "0 0 30px rgba(0,255,136,0.7), 0 0 60px rgba(0,255,136,0.3)",
                textTransform: "uppercase",
              }}
            >
              ARCHIOS
            </div>

            {/* Glitch layer 1 */}
            {glitchActive && (
              <>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
                    fontWeight: 900,
                    letterSpacing: "0.15em",
                    color: "#00d4ff",
                    textShadow: "0 0 20px rgba(0,212,255,0.8)",
                    textTransform: "uppercase",
                    clipPath: "inset(15% 0 55% 0)",
                    transform: "translateX(6px)",
                    opacity: 0.85,
                    mixBlendMode: "screen",
                  }}
                >
                  ARCHIOS
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
                    fontWeight: 900,
                    letterSpacing: "0.15em",
                    color: "#ff6b35",
                    textShadow: "0 0 20px rgba(255,107,53,0.6)",
                    textTransform: "uppercase",
                    clipPath: "inset(60% 0 8% 0)",
                    transform: "translateX(-5px)",
                    opacity: 0.7,
                    mixBlendMode: "screen",
                  }}
                >
                  ARCHIOS
                </div>
              </>
            )}
          </div>

          {/* ASCII art rows */}
          <div style={{ overflow: "hidden", marginBottom: "12px" }}>
            {ASCII_LOGO.map((row, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(0.25rem, 0.85vw, 0.48rem)",
                  color: "var(--accent-green)",
                  opacity: asciiVisible ? 0.55 : 0,
                  whiteSpace: "pre",
                  lineHeight: 1.35,
                  letterSpacing: "0.02em",
                  transform: asciiVisible ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.3s ease-out ${i * 0.045}s, transform 0.3s ease-out ${i * 0.045}s`,
                }}
              >
                {row}
              </div>
            ))}
          </div>

          {/* Subtitle line */}
          <div
            style={{
              opacity: subVisible ? 1 : 0,
              transform: subVisible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Digital Engineering Operating System
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 14px",
                border: "1px solid rgba(0,255,136,0.2)",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                color: "var(--text-muted)",
                background: "rgba(0,255,136,0.03)",
              }}
            >
              <span
                className="animate-pulse-green"
                style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent-green)" }}
              />
              ARCHIOS v1.0.0
              <span style={{ color: "var(--border-mid)", margin: "0 2px" }}>|</span>
              BUILD 2025
              <span style={{ color: "var(--border-mid)", margin: "0 2px" }}>|</span>
              JADAVPUR × IIT MADRAS
            </div>
          </div>
        </div>

        {/* ── Boot Log Panel ── */}
        <div
          className="os-window"
          style={{
            marginBottom: "12px",
            opacity: asciiVisible ? 1 : 0,
            transition: "opacity 0.4s ease-out 0.25s",
          }}
        >
          <div className="os-window-titlebar">
            <span className="os-window-dot os-window-dot-red" />
            <span className="os-window-dot os-window-dot-yellow" />
            <span className="os-window-dot os-window-dot-green" />
            <span className="os-window-title">boot.log — ArchiOS kernel init</span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
              }}
            >
              pid:1 · tty0
            </span>
          </div>

          <div
            style={{
              padding: "14px 16px",
              minHeight: "220px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.71rem",
            }}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className="animate-fadeInUp"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "5px",
                  animationDelay: `${i * 0.02}s`,
                  color: "var(--text-secondary)",
                }}
              >
                <span style={{ color: "var(--accent-green)", opacity: 0.45, flexShrink: 0 }}>$</span>
                <span style={{ flex: 1, color: "var(--text-secondary)" }}>{line.text}</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    padding: "2px 7px",
                    border: `1px solid ${(STATUS_COLORS[line.status] || "#3d4a57")}40`,
                    borderRadius: "3px",
                    color: STATUS_COLORS[line.status] || "var(--text-muted)",
                    background: `${STATUS_COLORS[line.status] || "#3d4a57"}10`,
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                    boxShadow: `0 0 6px ${(STATUS_COLORS[line.status] || "#3d4a57")}20`,
                  }}
                >
                  [ {line.status} ]
                </span>
              </div>
            ))}

            {lines.length < bootLines.length && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingTop: "2px",
                }}
              >
                <span style={{ color: "var(--accent-green)", opacity: 0.45 }}>$</span>
                <span
                  className="animate-blink"
                  style={{ color: "var(--accent-green)", fontSize: "0.9rem", lineHeight: 1 }}
                >
                  █
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Progress Bar ── */}
        <div
          style={{
            opacity: asciiVisible ? 1 : 0,
            transition: "opacity 0.4s ease-out 0.4s",
          }}
        >
          <div
            style={{
              height: "3px",
              background: "var(--bg-secondary)",
              borderRadius: "2px",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--accent-green), var(--accent-cyan))",
                transition: "width 0.28s ease-out",
                animation: progress < 100 ? "progressPulse 1.5s ease-in-out infinite" : "none",
                boxShadow: "0 0 10px rgba(0,255,136,0.7)",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "6px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>archios@boot:~$</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  color: progress === 100 ? "var(--accent-green)" : "var(--text-muted)",
                  transition: "color 0.3s",
                  fontWeight: progress === 100 ? 700 : 400,
                }}
              >
                {progress}%
              </span>
              {progress === 100 && (
                <span
                  className="animate-fadeIn"
                  style={{
                    color: "var(--accent-green)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    textShadow: "0 0 8px rgba(0,255,136,0.6)",
                  }}
                >
                  SYSTEM READY
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

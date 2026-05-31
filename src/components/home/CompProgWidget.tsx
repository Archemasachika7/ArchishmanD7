"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const STATS = [
  { lang: "C++",  rating: "1200+", platform: "Codeforces",  color: "#60a5fa" },
  { lang: "Java", rating: "4★",    platform: "HackerRank",  color: "#34d399" },
];

const LINES = [
  { text: "$ codeforces --user archi --stats",              delay: 0    },
  { text: "  → Rating:     1200+",                          delay: 0.3  },
  { text: "  → Language:   C++ (primary)",                  delay: 0.5  },
  { text: "  → Status:     Specialist (climbing)",          delay: 0.7  },
  { text: "",                                                delay: 0.85 },
  { text: "$ hackerrank --skill algorithms,data-structures",delay: 0.9  },
  { text: "  → Java rank:  4-Star",                         delay: 1.1  },
  { text: "  → Domains:    Algorithms · DS · OOP",          delay: 1.3  },
  { text: "",                                                delay: 1.45 },
  { text: "$ echo 'Algorithmic foundation — ONLINE'",       delay: 1.5  },
  { text: "> Algorithmic foundation — ONLINE ✓",            delay: 1.75, highlight: true },
];

export function CompProgWidget() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      const t = setTimeout(() => setVisibleLines(i + 1), LINES[i].delay * 1000 + 400);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(96,165,250,0.18)",
        borderRadius: "16px",
        overflow: "hidden",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Terminal titlebar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "12px 16px",
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
          <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
        <span style={{
          marginLeft: "8px", fontFamily: "var(--font-mono)",
          fontSize: "0.65rem", color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.06em",
        }}>competitive_programming.sh</span>
      </div>

      <div style={{ padding: "20px 20px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Stat badges */}
        <div>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
            letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase", marginBottom: "12px",
          }}>Rating Snapshot</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {STATS.map((s) => (
              <div key={s.lang} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: "8px",
                background: `rgba(${s.color === "#60a5fa" ? "96,165,250" : "52,211,153"},0.07)`,
                border: `1px solid ${s.color}20`,
              }}>
                <div>
                  <p style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.62rem",
                    color: s.color, letterSpacing: "0.06em",
                  }}>{s.platform}</p>
                  <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{s.lang}</p>
                </div>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: "1.3rem",
                  fontWeight: 800, color: s.color,
                  textShadow: `0 0 20px ${s.color}50`,
                }}>{s.rating}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal output */}
        <div>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
            letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase", marginBottom: "12px",
          }}>Live Session</p>
          <div style={{
            background: "rgba(0,0,0,0.5)", borderRadius: "8px",
            padding: "12px 14px", minHeight: "140px",
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            lineHeight: 1.7,
          }}>
            {LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} style={{
                color: line.highlight
                  ? "#34d399"
                  : line.text.startsWith("$")
                    ? "#60a5fa"
                    : line.text.startsWith("  →")
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(255,255,255,0.3)",
              }}>
                {line.text || " "}
              </div>
            ))}
            {visibleLines < LINES.length && (
              <span style={{
                display: "inline-block", width: "7px", height: "13px",
                background: "#60a5fa", marginLeft: "2px",
                animation: "blink 1s step-end infinite",
              }} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

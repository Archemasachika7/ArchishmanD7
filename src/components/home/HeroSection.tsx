"use client";
import { motion } from "framer-motion";
import Link from "next/link";

/* ── Deterministic node data (no Math.random — hydration-safe) ─── */
const NODES = [
  { x:  5, y: 12, r: 2.0, delay: 0.0  },
  { x: 18, y:  6, r: 1.5, delay: 0.10 },
  { x: 33, y: 20, r: 3.0, delay: 0.20 },
  { x: 48, y:  8, r: 2.0, delay: 0.15 },
  { x: 63, y: 22, r: 2.5, delay: 0.30 },
  { x: 80, y:  9, r: 1.5, delay: 0.25 },
  { x: 93, y: 26, r: 3.0, delay: 0.05 },
  { x: 12, y: 38, r: 2.0, delay: 0.40 },
  { x: 28, y: 52, r: 4.0, delay: 0.35 },
  { x: 45, y: 44, r: 2.5, delay: 0.45 },
  { x: 62, y: 57, r: 3.5, delay: 0.20 },
  { x: 79, y: 40, r: 2.0, delay: 0.50 },
  { x:  8, y: 65, r: 2.0, delay: 0.60 },
  { x: 24, y: 78, r: 2.5, delay: 0.55 },
  { x: 40, y: 70, r: 3.0, delay: 0.65 },
  { x: 57, y: 83, r: 2.0, delay: 0.30 },
  { x: 75, y: 67, r: 4.0, delay: 0.70 },
  { x: 90, y: 75, r: 2.0, delay: 0.40 },
  { x: 17, y: 90, r: 2.5, delay: 0.75 },
  { x: 52, y: 93, r: 3.0, delay: 0.80 },
  { x: 86, y: 89, r: 2.0, delay: 0.60 },
  { x: 34, y: 34, r: 5.0, delay: 0.10 }, // hub
  { x: 61, y: 36, r: 5.0, delay: 0.15 }, // hub
  { x: 47, y: 60, r: 6.5, delay: 0.05 }, // main hub
];

const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],
  [0,7],[7,8],[8,9],[9,10],[10,11],
  [7,12],[8,13],[9,14],[10,15],[11,16],[16,17],
  [12,18],[14,19],[16,20],
  [1,7],[2,8],[3,9],[4,10],[5,11],
  [8,14],[9,15],[10,16],
  [2,21],[8,21],[9,21],[3,22],[10,22],[4,22],
  [21,23],[22,23],[8,23],[14,23],[9,23],
];

/* ── Bridge wireframe paths (structural RHS) ─────────────────── */
const BRIDGE: string[] = [
  "M 55 72 L 95 72",          // bottom chord
  "M 55 72 L 65 52 L 75 72 L 85 52 L 95 72", // triangular truss
  "M 65 52 L 85 52",          // top chord
  "M 55 72 L 55 85",          // left support
  "M 95 72 L 95 85",          // right support
  "M 55 85 L 95 85",          // foundation
  "M 75 72 L 75 52",          // center vertical
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const container: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const item: any = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100vh - 46px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        overflow: "hidden",
        padding: "60px 24px 80px",
        margin: "-24px -24px 0",
      }}
    >
      {/* ── Animated background ───────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <svg
          width="100%" height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0 }}
        >
          {/* Neural network edges */}
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={`e${i}`}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              stroke="rgba(96,165,250,0.18)"
              strokeWidth="0.12"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.2] }}
              transition={{
                duration: 2.5,
                delay: 0.8 + i * 0.04,
                ease: "easeOut",
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3 + (i % 5),
              }}
            />
          ))}

          {/* Neural network nodes */}
          {NODES.map((n, i) => (
            <motion.circle
              key={`n${i}`}
              cx={n.x} cy={n.y} r={n.r}
              fill={i >= 21 ? "#34d399" : "#60a5fa"}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, i >= 21 ? 0.85 : 0.55, i >= 21 ? 0.6 : 0.35] }}
              transition={{
                duration: 1,
                delay: n.delay,
                ease: "backOut",
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 4 + n.delay * 3,
              }}
            />
          ))}

          {/* Bridge wireframe (RHS) */}
          {BRIDGE.map((d, i) => (
            <motion.path
              key={`b${i}`}
              d={d}
              stroke="rgba(52,211,153,0.25)"
              strokeWidth="0.4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.2, delay: 1.0 + i * 0.15, ease: "easeOut" }}
            />
          ))}
        </svg>

        {/* Radial vignette — pull focus to center */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 25%, #000 80%)",
        }} />

        {/* Subtle horizontal glow under text */}
        <div style={{
          position: "absolute", left: "10%", right: "10%", top: "40%",
          height: "200px", filter: "blur(80px)",
          background: "linear-gradient(90deg, rgba(52,211,153,0.08), rgba(96,165,250,0.10), rgba(167,139,250,0.08))",
          transform: "translateY(-50%)",
        }} />
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "820px" }}
      >
        {/* Badge */}
        <motion.div variants={item} style={{ marginBottom: "28px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 18px", borderRadius: "100px",
            background: "rgba(96,165,250,0.07)",
            border: "1px solid rgba(96,165,250,0.22)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem", letterSpacing: "0.14em",
            color: "#60a5fa", textTransform: "uppercase",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#34d399", boxShadow: "0 0 8px #34d399",
              animation: "pulse-green 2s ease-in-out infinite",
              display: "inline-block",
            }} />
            Civil Engineering × Data Science
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.h1 variants={item} style={{
          fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 1.06,
          color: "#fff",
          marginBottom: "22px",
        }}>
          Architecting the{" "}
          <span style={{
            background: "linear-gradient(135deg, #34d399 0%, #60a5fa 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Physical.</span>
          <br />
          Computing the{" "}
          <span style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Future.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={item} style={{
          fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
          color: "rgba(255,255,255,0.45)",
          maxWidth: "540px", margin: "0 auto 44px",
          lineHeight: 1.75,
        }}>
          B.E. Civil Engineering at Jadavpur University &amp; BS Data Science at IIT Madras —
          building bridges between infrastructure and intelligence.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} style={{
          display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap",
        }}>
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.03, borderColor: "rgba(96,165,250,0.55)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "13px 30px", borderRadius: "10px",
                border: "1px solid rgba(96,165,250,0.35)",
                background: "rgba(96,165,250,0.09)",
                backdropFilter: "blur(12px)",
                color: "#fff", fontSize: "0.9rem",
                fontWeight: 600, letterSpacing: "0.02em",
                cursor: "pointer",
              }}
            >
              View Intersectional Work →
            </motion.button>
          </Link>
          <Link href="/graph">
            <motion.button
              whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "13px 30px", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.9rem", fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Knowledge Graph
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)" }}
      >
        <motion.div
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1, height: 44,
            background: "linear-gradient(to bottom, rgba(96,165,250,0.7), transparent)",
            margin: "0 auto",
          }}
        />
      </motion.div>
    </section>
  );
}

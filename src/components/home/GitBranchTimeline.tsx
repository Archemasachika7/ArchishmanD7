"use client";
import { motion } from "framer-motion";

type BranchEvent = {
  date: string;
  label: string;
  desc: string;
  type?: "commit" | "merge" | "current";
};

const CIVIL_BRANCH: BranchEvent[] = [
  { date: "Sep 2024", label: "Enrolled — B.E. Civil Engineering",     desc: "Jadavpur University, Kolkata",                  type: "commit"  },
  { date: "Nov 2024", label: "Structural Mechanics I",                 desc: "Beam theory, stress analysis, material props",  type: "commit"  },
  { date: "Jan 2025", label: "GIS & Remote Sensing",                   desc: "Satellite data, QGIS, terrain modelling",       type: "commit"  },
  { date: "May 2025", label: "Flood Risk Mapping Project",             desc: "ML + GIS pipeline for flood vulnerability",     type: "merge"   },
  { date: "2025→",   label: "Year 2 — Geotechnical + Hydrology",      desc: "Foundation design, watershed analysis",         type: "current" },
];

const DS_BRANCH: BranchEvent[] = [
  { date: "2023",    label: "Enrolled — BS Data Science",              desc: "IIT Madras (online programme)",                 type: "commit"  },
  { date: "2024",    label: "Statistics & Python Foundations",         desc: "Probability, NumPy, Pandas, EDA",               type: "commit"  },
  { date: "Jan 2025",label: "Machine Learning Core",                   desc: "Supervised / unsupervised, scikit-learn, TF",   type: "commit"  },
  { date: "Apr 2025",label: "Serviceability Life Assessment",          desc: "ML for structural degradation — global dataset", type: "merge"   },
  { date: "2025→",   label: "Advanced ML + LLM Applications",         desc: "Transformers, Gemma 4, agentic systems",        type: "current" },
];

const MERGE_PROJECTS = [
  {
    date:  "May 2025",
    label: "Serviceability Life Assessment",
    desc:  "ML predicts structural degradation across Tokyo, LA, Kolkata, Guwahati",
    color: "#34d399",
  },
  {
    date:  "Jan 2025",
    label: "GIS Flood Risk Mapping",
    desc:  "Remote sensing + scikit-learn flood vulnerability pipeline",
    color: "#60a5fa",
  },
];

const TRACK_COLOR_CIVIL = "#34d399";
const TRACK_COLOR_DS    = "#60a5fa";

function CommitDot({ type, color }: { type: BranchEvent["type"]; color: string }) {
  const size = type === "merge" ? 14 : type === "current" ? 10 : 8;
  return (
    <div style={{
      width: size, height: size,
      borderRadius: "50%",
      background: type === "merge" ? color : "transparent",
      border: `2px solid ${color}`,
      boxShadow: type === "current" ? `0 0 10px ${color}` : type === "merge" ? `0 0 14px ${color}` : "none",
      flexShrink: 0,
      position: "relative",
    }}>
      {type === "current" && (
        <div style={{
          position: "absolute", inset: -4, borderRadius: "50%",
          border: `1px solid ${color}40`,
          animation: "ping 1.8s ease-out infinite",
        }} />
      )}
    </div>
  );
}

export function GitBranchTimeline() {
  return (
    <section style={{ padding: "80px 0 60px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "56px" }}
      >
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
          letterSpacing: "0.2em", color: "#60a5fa",
          textTransform: "uppercase", marginBottom: "12px",
        }}>
          Academic Trajectory
        </p>
        <h2 style={{
          fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          fontWeight: 800, letterSpacing: "-0.02em",
          color: "#fff", marginBottom: "12px",
        }}>
          Two Degrees.{" "}
          <span style={{
            background: "linear-gradient(135deg, #34d399, #60a5fa)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>One Mission.</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", maxWidth: "480px", margin: "0 auto" }}>
          Running concurrently — where the branches merge is where the real work lives.
        </p>
      </motion.div>

      {/* Timeline grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", gap: "0 0" }}>

        {/* ── Civil branch (left) ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: "right", paddingRight: "28px", marginBottom: "28px",
            }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "5px 14px", borderRadius: "100px",
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.25)",
              fontFamily: "var(--font-mono)", fontSize: "0.68rem",
              letterSpacing: "0.1em", color: TRACK_COLOR_CIVIL,
              textTransform: "uppercase",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: TRACK_COLOR_CIVIL, flexShrink: 0 }} />
              Civil Engineering
            </span>
          </motion.div>

          {CIVIL_BRANCH.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                display: "flex", alignItems: "flex-start",
                justifyContent: "flex-end",
                gap: "14px", marginBottom: "28px",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                  color: TRACK_COLOR_CIVIL, letterSpacing: "0.06em",
                  marginBottom: "4px", opacity: 0.75,
                }}>{ev.date}</p>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#dde4ee", marginBottom: "3px" }}>{ev.label}</p>
                <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{ev.desc}</p>
              </div>
              <CommitDot type={ev.type} color={TRACK_COLOR_CIVIL} />
            </motion.div>
          ))}
        </div>

        {/* ── Center track ── */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Branch lines */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "absolute", top: 48, bottom: 0, width: 2,
              background: `linear-gradient(to bottom, ${TRACK_COLOR_CIVIL} 0%, rgba(96,165,250,0.3) 50%, ${TRACK_COLOR_DS} 100%)`,
              transformOrigin: "top",
            }}
          />
          {/* Merge node dots */}
          {MERGE_PROJECTS.map((mp, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.2, type: "spring", stiffness: 260 }}
              style={{
                width: 18, height: 18,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${mp.color} 30%, transparent 70%)`,
                border: `2px solid ${mp.color}`,
                boxShadow: `0 0 20px ${mp.color}60`,
                position: "relative", zIndex: 2,
                marginTop: i === 0 ? "210px" : "80px",
              }}
            />
          ))}
        </div>

        {/* ── DS branch (right) ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ paddingLeft: "28px", marginBottom: "28px" }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "5px 14px", borderRadius: "100px",
              background: "rgba(96,165,250,0.08)",
              border: "1px solid rgba(96,165,250,0.25)",
              fontFamily: "var(--font-mono)", fontSize: "0.68rem",
              letterSpacing: "0.1em", color: TRACK_COLOR_DS,
              textTransform: "uppercase",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: TRACK_COLOR_DS, flexShrink: 0 }} />
              Data Science
            </span>
          </motion.div>

          {DS_BRANCH.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                display: "flex", alignItems: "flex-start",
                gap: "14px", marginBottom: "28px", paddingLeft: "28px",
              }}
            >
              <CommitDot type={ev.type} color={TRACK_COLOR_DS} />
              <div>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                  color: TRACK_COLOR_DS, letterSpacing: "0.06em",
                  marginBottom: "4px", opacity: 0.75,
                }}>{ev.date}</p>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#dde4ee", marginBottom: "3px" }}>{ev.label}</p>
                <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{ev.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Merge project callouts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginTop: "40px" }}
      >
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.62rem",
          letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)",
          textTransform: "uppercase", textAlign: "center", marginBottom: "16px",
        }}>⌥ merge commits — where both disciplines converge</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
          {MERGE_PROJECTS.map((mp, i) => (
            <div key={i} style={{
              padding: "16px 20px",
              borderRadius: "12px",
              background: `rgba(${mp.color === "#34d399" ? "52,211,153" : "96,165,250"},0.06)`,
              border: `1px solid ${mp.color}22`,
              borderLeft: `3px solid ${mp.color}`,
            }}>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                color: mp.color, letterSpacing: "0.08em", marginBottom: "6px", opacity: 0.8,
              }}>{mp.date} · MERGE</p>
              <p style={{ fontSize: "0.83rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{mp.label}</p>
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{mp.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

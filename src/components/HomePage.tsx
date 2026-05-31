"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { HeroSection } from "@/components/home/HeroSection";
import { GitBranchTimeline } from "@/components/home/GitBranchTimeline";
import { CompProgWidget } from "@/components/home/CompProgWidget";

const MODULES = [
  { href: "/projects", label: "Project Registry",    desc: "Active and completed projects with full evolution history", color: "#34d399", code: "01" },
  { href: "/journal",  label: "Engineering Journal",  desc: "Lab notebook — problems, failures, lessons, discoveries",  color: "#a78bfa", code: "02" },
  { href: "/graph",    label: "Knowledge Graph",      desc: "Interactive map of skills, subjects, and their connections",color: "#60a5fa", code: "03" },
  { href: "/vault",    label: "Engineering Vault",    desc: "CAD files, reports, datasets, research papers",            color: "#fb923c", code: "04" },
  { href: "/lab",      label: "AI Lab",               desc: "Reserved for AI avatar, voice assistant, research tools",  color: "#818cf8", code: "05" },
];

export function HomePage({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);

  return (
    <div style={{ background: "#000", color: "#fff" }}>
      {/* Hero */}
      <HeroSection />

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section style={{ padding: "80px 24px 60px", maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "40px" }}
          >
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: "0.68rem",
              letterSpacing: "0.2em", color: "#34d399",
              textTransform: "uppercase", marginBottom: "12px",
            }}>
              Intersectional Work
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <h2 style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 800, letterSpacing: "-0.02em", color: "#fff",
              }}>
                Featured{" "}
                <span style={{
                  background: "linear-gradient(135deg, #34d399, #60a5fa)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Projects</span>
              </h2>
              <Link href="/projects" style={{
                fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                color: "rgba(255,255,255,0.4)", textDecoration: "none",
                letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "6px",
                transition: "color 0.2s",
              }}>
                All Projects →
              </Link>
            </div>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "16px",
          }}>
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", maxWidth: "1100px", margin: "0 auto" }} />

      {/* Academic Timeline */}
      <section style={{ padding: "0 24px" }}>
        <GitBranchTimeline />
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", maxWidth: "1100px", margin: "0 auto" }} />

      {/* Competitive Programming */}
      <section style={{ padding: "80px 24px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "32px" }}
        >
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.68rem",
            letterSpacing: "0.2em", color: "#60a5fa",
            textTransform: "uppercase", marginBottom: "12px",
          }}>Algorithmic Foundation</p>
          <h2 style={{
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 800, letterSpacing: "-0.02em", color: "#fff",
          }}>
            Competitive{" "}
            <span style={{
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Programming</span>
          </h2>
        </motion.div>
        <CompProgWidget />
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", maxWidth: "1100px", margin: "0 auto" }} />

      {/* OS Modules */}
      <section style={{ padding: "80px 24px 100px", maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "40px" }}
        >
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.68rem",
            letterSpacing: "0.2em", color: "#a78bfa",
            textTransform: "uppercase", marginBottom: "12px",
          }}>Navigation</p>
          <h2 style={{
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 800, letterSpacing: "-0.02em", color: "#fff",
          }}>
            OS{" "}
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #818cf8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Modules</span>
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "12px",
        }}>
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link href={mod.href} style={{ display: "block", textDecoration: "none" }}>
                <div
                  style={{
                    padding: "20px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    cursor: "pointer",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = `${mod.color}35`;
                    el.style.boxShadow = `0 8px 32px ${mod.color}12`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div style={{ height: 2, background: `linear-gradient(90deg, ${mod.color}, transparent)`, borderRadius: 1, marginBottom: "16px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: `${mod.color}12`, border: `1px solid ${mod.color}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: mod.color, fontWeight: 700 }}>{mod.code}</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={mod.color} strokeWidth="2" opacity={0.6}>
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>{mod.label}</p>
                  <p style={{ fontSize: "0.69rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.55 }}>{mod.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

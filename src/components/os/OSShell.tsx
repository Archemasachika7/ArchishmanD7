"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useOSStore } from "@/lib/store";
import {
  LayoutGrid, BookOpen, Network, Archive, FlaskConical,
  GitBranch, Settings, Menu, X
} from "lucide-react";

const navItems = [
  { href: "/",         label: "HQ",      icon: LayoutGrid,   desc: "Home Base",                section: "NAVIGATION" },
  { href: "/projects", label: "Projects", icon: GitBranch,    desc: "Project Registry",         section: "NAVIGATION" },
  { href: "/journal",  label: "Journal",  icon: BookOpen,     desc: "Engineering Lab Notebook",  section: "NAVIGATION" },
  { href: "/graph",    label: "Graph",    icon: Network,      desc: "Knowledge Graph",           section: "NAVIGATION" },
  { href: "/vault",    label: "Vault",    icon: Archive,      desc: "Engineering Vault",         section: "SYSTEM"     },
  { href: "/lab",      label: "AI Lab",   icon: FlaskConical, desc: "Future AI Systems",         section: "SYSTEM"     },
];

function useTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function OSShell({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const { identity, setIdentity, sidebarOpen, setSidebarOpen } = useOSStore();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const time = useTime();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navSections = ["NAVIGATION", "SYSTEM"] as const;

  const breadcrumb = pathname === "/" ? "~/" : `~${pathname}`;

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ═══════════════════════════════ MOBILE OVERLAY ═══════════════════════════════ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ═══════════════════════════════ SIDEBAR ═══════════════════════════════════ */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-[200px]" : "w-[48px]"}
          max-md:${mobileOpen ? "translate-x-0 w-[220px]" : "-translate-x-full w-[220px]"}
        `}
        style={{
          background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Scanline on sidebar */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── Logo / Toggle ── */}
        <div
          className="relative z-10 flex items-center gap-3 h-[46px] px-3 shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-7 h-7 flex items-center justify-center rounded transition-all duration-150"
            style={{
              color: "var(--accent-green)",
              border: "1px solid var(--border)",
              background: "var(--bg-panel)",
            }}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen
              ? <X size={13} />
              : <Menu size={13} />
            }
          </button>
          {sidebarOpen && (
            <div className="flex flex-col leading-none animate-fadeIn">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--accent-green)",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 12px rgba(0,255,136,0.5)",
                }}
              >
                ArchiOS
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                }}
              >
                v1.0.0
              </span>
            </div>
          )}
        </div>

        {/* ── Nav ── */}
        <nav className="relative z-10 flex-1 py-3 flex flex-col gap-0.5 px-2 overflow-y-auto">
          {navSections.map((section) => {
            const items = navItems.filter((n) => n.section === section);
            return (
              <div key={section} className="mb-2">
                {sidebarOpen && (
                  <div
                    className="px-2 mb-1.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5rem",
                      letterSpacing: "0.18em",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    {section}
                  </div>
                )}
                {items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setHovered(item.href)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-150 group"
                        style={{
                          color: active ? "var(--accent-green)" : "var(--text-secondary)",
                          background: active
                            ? "rgba(0,255,136,0.06)"
                            : "transparent",
                          border: active
                            ? "1px solid rgba(0,255,136,0.2)"
                            : "1px solid transparent",
                          position: "relative",
                          boxShadow: active
                            ? "0 0 12px rgba(0,255,136,0.08)"
                            : "none",
                        }}
                      >
                        {/* Active left bar */}
                        {active && (
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "20%",
                              bottom: "20%",
                              width: "2px",
                              borderRadius: "0 2px 2px 0",
                              background: "var(--accent-green)",
                              boxShadow: "0 0 6px var(--accent-green)",
                            }}
                          />
                        )}
                        <item.icon
                          size={15}
                          className="shrink-0 transition-all duration-150"
                          style={{
                            color: active ? "var(--accent-green)" : "var(--text-muted)",
                            filter: active ? "drop-shadow(0 0 4px rgba(0,255,136,0.6))" : "none",
                          }}
                        />
                        {sidebarOpen && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: active ? 600 : 400,
                              fontFamily: active ? "var(--font-mono)" : "var(--font-sans)",
                              letterSpacing: active ? "0.03em" : "0",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.label}
                          </span>
                        )}
                      </Link>

                      {/* Tooltip when collapsed */}
                      {!sidebarOpen && hovered === item.href && (
                        <div className="os-tooltip animate-fadeIn">
                          <span style={{ color: "var(--accent-green)", marginRight: "6px", fontSize: "0.55rem" }}>▶</span>
                          {item.label}
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.58rem",
                              color: "var(--text-muted)",
                              marginTop: "1px",
                            }}
                          >
                            {item.desc}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* ── Identity Toggle ── */}
        <div
          className="relative z-10 p-2"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {sidebarOpen ? (
            <div
              style={{
                background: "var(--bg-panel)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "8px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.52rem",
                  letterSpacing: "0.15em",
                  color: "var(--text-muted)",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                }}
              >
                Identity Mode
              </p>
              <div style={{ display: "flex", gap: "4px" }}>
                {(["civil", "ds"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setIdentity(mode)}
                    style={{
                      flex: 1,
                      padding: "5px 4px",
                      borderRadius: "4px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      transition: "all 0.15s",
                      background: identity === mode
                        ? (mode === "civil" ? "rgba(0,255,136,0.12)" : "rgba(0,212,255,0.12)")
                        : "transparent",
                      color: identity === mode
                        ? (mode === "civil" ? "var(--accent-green)" : "var(--accent-cyan)")
                        : "var(--text-muted)",
                      border: "1px solid",
                      borderColor: identity === mode
                        ? (mode === "civil" ? "rgba(0,255,136,0.4)" : "rgba(0,212,255,0.4)")
                        : "var(--border)",
                    }}
                  >
                    {mode === "civil" ? "CIVIL" : "DS/AI"}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIdentity(identity === "civil" ? "ds" : "civil")}
              title={`Mode: ${identity === "civil" ? "Civil Eng" : "DS/AI"} — click to toggle`}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                fontWeight: 700,
                transition: "all 0.15s",
                color: identity === "civil" ? "var(--accent-green)" : "var(--accent-cyan)",
                border: "1px solid",
                borderColor: identity === "civil"
                  ? "rgba(0,255,136,0.3)"
                  : "rgba(0,212,255,0.3)",
                background: identity === "civil"
                  ? "rgba(0,255,136,0.06)"
                  : "rgba(0,212,255,0.06)",
              }}
            >
              {identity === "civil" ? "CE" : "DS"}
            </button>
          )}
        </div>

        {/* ── Admin ── */}
        <div className="relative z-10 p-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-2 py-1.5 rounded transition-all duration-150 hover:bg-white/5"
            style={{ color: "var(--text-muted)" }}
          >
            <Settings size={13} className="shrink-0" />
            {sidebarOpen && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.06em" }}>
                ADMIN
              </span>
            )}
          </Link>
        </div>
      </aside>

      {/* ═══════════════════════════════ MAIN CONTENT ═════════════════════════════ */}
      <main
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? "200px" : "48px" }}
      >
        {/* ── Top Bar ── */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between h-[46px] px-4"
          style={{
            background: "rgba(5,5,7,0.88)",
            borderBottom: "1px solid var(--border)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Left: route breadcrumb */}
          <div
            className="flex items-center gap-1.5"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem" }}
          >
            <span style={{ color: "var(--accent-green)", opacity: 0.7 }}>archios:</span>
            <span style={{ color: "var(--text-secondary)" }}>{breadcrumb}</span>
            <span
              className="animate-blink"
              style={{ color: "var(--accent-green)", marginLeft: "1px" }}
            >
              █
            </span>
          </div>

          {/* Right: time + identity pill */}
          <div className="flex items-center gap-3">
            {/* Live clock */}
            {time && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {time}
              </span>
            )}

            {/* Status dot */}
            <div className="flex items-center gap-1.5">
              <span className="status-dot status-active animate-pulse-green" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: identity === "civil" ? "var(--accent-green)" : "var(--accent-cyan)",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                {identity === "civil" ? "CIVIL.MODE" : "DS.AI.MODE"}
              </span>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-7 h-7 rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                border: "1px solid var(--border)",
                color: "var(--accent-green)",
                background: "var(--bg-panel)",
              }}
            >
              <Menu size={13} />
            </button>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div className="flex-1 p-4 md:p-6 animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
}

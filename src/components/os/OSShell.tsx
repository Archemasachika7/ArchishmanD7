"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useOSStore } from "@/lib/store";
import {
  LayoutGrid, BookOpen, Network, Archive, FlaskConical,
  GitBranch, Settings, Menu, X, ChevronRight
} from "lucide-react";

const navItems = [
  { href: "/", label: "HQ", icon: LayoutGrid, desc: "Home Base" },
  { href: "/projects", label: "Projects", icon: GitBranch, desc: "Project Registry" },
  { href: "/journal", label: "Journal", icon: BookOpen, desc: "Engineering Lab Notebook" },
  { href: "/graph", label: "Graph", icon: Network, desc: "Knowledge Graph" },
  { href: "/vault", label: "Vault", icon: Archive, desc: "Engineering Vault" },
  { href: "/lab", label: "AI Lab", icon: FlaskConical, desc: "Future AI Systems" },
];

export function OSShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { identity, setIdentity, sidebarOpen, setSidebarOpen } = useOSStore();
  const [hovered, setHovered] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300 ${sidebarOpen ? "w-56" : "w-14"}`}
        style={{
          background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 flex items-center justify-center rounded transition-colors hover:bg-white/5"
            style={{ color: "var(--accent-green)" }}
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          {sidebarOpen && (
            <span className="font-mono text-sm font-bold" style={{ color: "var(--accent-green)" }}>
              ArchiOS
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHovered(item.href)}
                onMouseLeave={() => setHovered(null)}
                className={`relative flex items-center gap-3 px-2 py-2.5 rounded-md transition-all duration-150 group ${
                  active ? "os-panel-bright glow-green" : "hover:bg-white/5"
                }`}
                style={{ color: active ? "var(--accent-green)" : "var(--text-secondary)" }}
              >
                <item.icon size={16} className="shrink-0" />
                {sidebarOpen && (
                  <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
                )}
                {active && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r"
                    style={{ background: "var(--accent-green)" }}
                  />
                )}
                {/* Tooltip when collapsed */}
                {!sidebarOpen && hovered === item.href && (
                  <div
                    className="absolute left-12 px-2 py-1 rounded text-xs whitespace-nowrap z-50"
                    style={{
                      background: "var(--bg-panel)",
                      border: "1px solid var(--border-bright)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Identity Toggle */}
        <div className="p-2 border-t" style={{ borderColor: "var(--border)" }}>
          {sidebarOpen ? (
            <div className="os-panel p-2 rounded-md">
              <p className="font-mono text-xs mb-2" style={{ color: "var(--text-muted)" }}>MODE</p>
              <div className="flex gap-1">
                {(["civil", "ds"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setIdentity(mode)}
                    className="flex-1 py-1 rounded text-xs font-mono transition-all"
                    style={{
                      background: identity === mode ? "var(--accent-green)" : "transparent",
                      color: identity === mode ? "#000" : "var(--text-secondary)",
                      border: "1px solid",
                      borderColor: identity === mode ? "var(--accent-green)" : "var(--border)",
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
              className="w-8 h-8 flex items-center justify-center rounded text-xs font-mono transition-colors hover:bg-white/5"
              style={{
                color: identity === "civil" ? "var(--accent-green)" : "var(--accent-cyan)",
                border: "1px solid var(--border)",
              }}
              title="Toggle Identity Mode"
            >
              {identity === "civil" ? "CE" : "DS"}
            </button>
          )}
        </div>

        {/* Admin link */}
        <div className="p-2">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-2 py-2 rounded text-xs transition-colors hover:bg-white/5"
            style={{ color: "var(--text-muted)" }}
          >
            <Settings size={14} className="shrink-0" />
            {sidebarOpen && <span>Admin</span>}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-56" : "ml-14"}`}>
        {/* Top bar */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between px-4 py-2"
          style={{
            background: "rgba(6,6,8,0.8)",
            borderBottom: "1px solid var(--border)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-2 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            <ChevronRight size={12} style={{ color: "var(--accent-green)" }} />
            <span>{pathname === "/" ? "~/headquarters" : `~${pathname}`}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="status-dot status-active" />
              <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                {identity === "civil" ? "Civil Mode" : "DS/AI Mode"}
              </span>
            </div>
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
          </div>
        </header>
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}

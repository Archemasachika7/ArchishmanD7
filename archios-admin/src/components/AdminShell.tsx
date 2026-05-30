"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import {
  LayoutDashboard, GitBranch, BookOpen, Archive,
  GitFork, Network, LogOut, ExternalLink, ChevronRight
} from "lucide-react";

const nav = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/projects", icon: GitBranch, label: "Projects" },
  { href: "/journal", icon: BookOpen, label: "Journal" },
  { href: "/vault", icon: Archive, label: "Vault" },
  { href: "/github", icon: GitFork, label: "GitHub" },
  { href: "/graph", icon: Network, label: "Knowledge Graph" },
];

export function AdminShell({ children, userEmail }: { children: React.ReactNode; userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-52 flex flex-col shrink-0" style={{ background: "var(--bg-panel)", borderRight: "1px solid var(--border)" }}>
        {/* Logo */}
        <div className="px-4 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-dim)", border: "1px solid var(--border-focus)" }}>
              <span className="font-mono font-bold text-sm" style={{ color: "var(--accent)" }}>A</span>
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: "var(--text)" }}>ArchiOS</p>
              <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5">
          {nav.map(({ href, icon: Icon, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all"
                style={{
                  background: active ? "var(--accent-dim)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-muted)",
                  border: `1px solid ${active ? "var(--border-focus)" : "transparent"}`,
                  fontWeight: active ? 600 : 400,
                }}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t space-y-1" style={{ borderColor: "var(--border)" }}>
          <a
            href={process.env.NEXT_PUBLIC_PUBLIC_SITE_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-all hover:bg-white/5"
            style={{ color: "var(--text-muted)" }}
          >
            <ExternalLink size={12} /> Public Site
          </a>
          <div className="px-3 py-1">
            <p className="text-xs truncate" style={{ color: "var(--text-dim)" }}>{userEmail}</p>
          </div>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-all hover:bg-white/5 text-left"
            style={{ color: "var(--text-muted)" }}
          >
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-2 px-5 py-3 border-b" style={{ background: "var(--bg-panel)", borderColor: "var(--border)" }}>
          <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>{pathname === "/" ? "~/dashboard" : `~${pathname}`}</span>
          <ChevronRight size={10} style={{ color: "var(--text-dim)" }} />
        </header>

        <main className="flex-1 p-5 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

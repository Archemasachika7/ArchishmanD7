"use client";
import Link from "next/link";
import { GitBranch, Archive, GitFork, BookOpen, Network, Plus, AlertTriangle } from "lucide-react";

interface Stats {
  totalProjects: number;
  publicProjects: number;
  pendingProjects: number;
  activeProjects: number;
  vaultTotal: number;
  vaultPublic: number;
  githubPending: number;
}

export function Dashboard({ stats }: { stats: Stats }) {
  const cards = [
    { label: "Total Projects", value: stats.totalProjects, sub: `${stats.publicProjects} public`, color: "var(--accent)", href: "/projects" },
    { label: "Active Projects", value: stats.activeProjects, sub: `${stats.pendingProjects} pending review`, color: "#00e5ff", href: "/projects" },
    { label: "Vault Items", value: stats.vaultTotal, sub: `${stats.vaultPublic} public`, color: "#ff6b35", href: "/vault" },
    { label: "GitHub Pending", value: stats.githubPending, sub: "awaiting approval", color: "#fbbf24", href: "/github" },
  ];

  const quickLinks = [
    { href: "/projects/new", icon: Plus, label: "New Project", color: "var(--accent)" },
    { href: "/journal", icon: BookOpen, label: "Journal Entries", color: "#9b59ff" },
    { href: "/vault", icon: Archive, label: "Manage Vault", color: "#ff6b35" },
    { href: "/github", icon: GitFork, label: "GitHub Queue", color: "#fbbf24" },
    { href: "/graph", icon: Network, label: "Edit Graph", color: "#00e5ff" },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold mb-0.5" style={{ color: "var(--text)" }}>Dashboard</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Overview of ArchiOS content and pending actions.</p>
      </div>

      {/* Pending alert */}
      {(stats.pendingProjects > 0 || stats.githubPending > 0) && (
        <div className="panel p-4 flex items-start gap-3" style={{ borderColor: "rgba(251,191,36,0.3)" }}>
          <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--warning)" }} />
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>Action required</p>
            <div className="space-y-0.5 text-sm" style={{ color: "var(--text-muted)" }}>
              {stats.pendingProjects > 0 && <p>{stats.pendingProjects} project(s) pending approval → <Link href="/projects" className="underline" style={{ color: "var(--warning)" }}>Review</Link></p>}
              {stats.githubPending > 0 && <p>{stats.githubPending} GitHub repo(s) detected → <Link href="/github" className="underline" style={{ color: "var(--warning)" }}>Review</Link></p>}
            </div>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map(({ label, value, sub, color, href }) => (
          <Link key={label} href={href} className="panel p-4 block transition-all hover:bg-white/5">
            <p className="font-mono text-xs mb-2" style={{ color: "var(--text-muted)" }}>{label}</p>
            <p className="font-mono text-2xl font-bold mb-0.5" style={{ color }}>{value}</p>
            <p className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>{sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-muted)" }}>QUICK ACTIONS</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {quickLinks.map(({ href, icon: Icon, label, color }) => (
            <Link key={href} href={href} className="panel p-3 flex flex-col items-center gap-2 text-center transition-all hover:bg-white/5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon size={14} style={{ color }} />
              </div>
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* System info */}
      <div className="panel p-4">
        <p className="font-mono text-xs font-semibold mb-3" style={{ color: "var(--accent)" }}>SYSTEM</p>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          <div>Public site reads from Supabase in real-time</div>
          <div>Changes appear after ISR revalidation (60s)</div>
          <div>Vault files need external storage (Supabase Storage)</div>
          <div>GitHub webhook: configure in settings</div>
        </div>
      </div>
    </div>
  );
}

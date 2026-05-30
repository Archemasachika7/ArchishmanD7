"use client";
import Link from "next/link";
import { projects, vaultItems } from "@/lib/data";
import {
  Settings, GitBranch, Archive, GitFork, LayoutGrid,
  AlertCircle, CheckCircle, Clock, ChevronRight
} from "lucide-react";

export function AdminDashboard() {
  const pending = projects.filter((p) => p.isPending);
  const active = projects.filter((p) => p.status === "active" && !p.isPending);
  const privateVault = vaultItems.filter((v) => !v.isPublic);

  return (
    <div
      className="min-h-screen os-grid"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Settings size={14} style={{ color: "var(--accent-green)" }} />
              <span className="font-mono text-xs" style={{ color: "var(--accent-green)" }}>~/admin</span>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Admin Dashboard</h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 font-mono text-xs transition-colors hover:text-white"
            style={{ color: "var(--text-muted)" }}
          >
            <LayoutGrid size={12} /> Public Site
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total Projects", value: projects.length, color: "var(--accent-green)", icon: GitBranch },
            { label: "Pending Review", value: pending.length, color: "#ffd700", icon: Clock },
            { label: "Active Projects", value: active.length, color: "var(--accent-cyan)", icon: CheckCircle },
            { label: "Private Files", value: privateVault.length, color: "#ff6b35", icon: Archive },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="os-panel p-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={12} style={{ color }} />
                <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
              </div>
              <p className="font-mono text-2xl font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Pending approval */}
        {pending.length > 0 && (
          <div className="os-panel p-4" style={{ borderColor: "rgba(255,215,0,0.3)" }}>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={14} style={{ color: "#ffd700" }} />
              <span className="font-mono text-xs font-bold" style={{ color: "#ffd700" }}>
                PENDING APPROVAL
              </span>
            </div>
            {pending.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2 rounded" style={{ background: "var(--bg-secondary)" }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{p.title}</p>
                  <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{p.category}</p>
                </div>
                <div className="flex gap-2">
                  <button className="font-mono text-xs px-2 py-1 rounded" style={{ background: "rgba(0,255,136,0.15)", color: "var(--accent-green)" }}>
                    Approve
                  </button>
                  <button className="font-mono text-xs px-2 py-1 rounded" style={{ background: "rgba(255,107,53,0.15)", color: "#ff6b35" }}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Admin modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { href: "/admin/projects", icon: GitBranch, label: "Manage Projects", desc: "Edit, add, publish, or archive projects", color: "#00ff88" },
            { href: "/admin/vault", icon: Archive, label: "Manage Vault", desc: "Control which files are public", color: "#ff6b35" },
            { href: "/admin/github", icon: GitFork, label: "GitHub Integration", desc: "Review detected repositories", color: "#9b59ff" },
          ].map((mod) => (
            <Link key={mod.href} href={mod.href} className="group">
              <div className="os-panel p-4 flex flex-col gap-2 transition-all hover:bg-white/5">
                <div className="flex items-center justify-between">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center"
                    style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}30` }}
                  >
                    <mod.icon size={14} style={{ color: mod.color }} />
                  </div>
                  <ChevronRight size={12} style={{ color: mod.color }} />
                </div>
                <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{mod.label}</h3>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{mod.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Project list */}
        <div className="os-panel p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold" style={{ color: "var(--accent-green)" }}>ALL PROJECTS</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="space-y-2">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded transition-colors hover:bg-white/5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="status-dot"
                    style={{
                      background: p.status === "active" ? "#00ff88" : p.status === "completed" ? "#4466ff" : "#4a5260",
                    }}
                  />
                  <div>
                    <p className="text-sm" style={{ color: "var(--text-primary)" }}>{p.title}</p>
                    <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{p.category} · {p.currentStage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      background: p.isPublic ? "rgba(0,255,136,0.1)" : "rgba(255,107,53,0.1)",
                      color: p.isPublic ? "#00ff88" : "#ff6b35",
                    }}
                  >
                    {p.isPublic ? "Public" : "Private"}
                  </span>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="font-mono text-xs transition-colors hover:text-white"
                    style={{ color: "var(--text-muted)" }}
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

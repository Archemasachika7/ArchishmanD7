"use client";
import Link from "next/link";
import { projects } from "@/lib/data";
import { ArrowLeft, GitBranch } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen os-grid" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="flex items-center gap-1 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            <ArrowLeft size={12} /> Admin
          </Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span className="font-mono text-xs" style={{ color: "var(--accent-green)" }}>Projects</span>
        </div>

        <div>
          <h1 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Manage Projects</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Edit the <code className="font-mono text-xs" style={{ color: "var(--accent-green)" }}>src/data/projects.json</code> file to add or modify projects.
          </p>
        </div>

        <div className="os-panel p-4 space-y-2">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-3 rounded transition-colors hover:bg-white/5"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <GitBranch size={14} style={{ color: p.status === "active" ? "#00ff88" : "#4a5260" }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{p.title}</p>
                  <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    {p.category} · {p.currentStage} · {p.status}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded" style={{
                  background: p.isPublic ? "rgba(0,255,136,0.1)" : "rgba(255,107,53,0.1)",
                  color: p.isPublic ? "#00ff88" : "#ff6b35",
                }}>
                  {p.isPublic ? "Public" : "Private"}
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded" style={{
                  background: p.featured ? "rgba(0,229,255,0.1)" : "transparent",
                  color: p.featured ? "#00e5ff" : "var(--text-muted)",
                }}>
                  {p.featured ? "Featured" : "Normal"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="os-panel p-4" style={{ borderColor: "rgba(0,255,136,0.2)" }}>
          <p className="font-mono text-xs mb-2" style={{ color: "var(--accent-green)" }}>HOW TO ADD A PROJECT</p>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Open <code className="font-mono">src/data/projects.json</code> and add a new entry following the existing schema.
            Set <code className="font-mono">isPublic: false</code> to keep it private, <code className="font-mono">isPending: true</code> for review queue.
          </p>
        </div>
      </div>
    </div>
  );
}

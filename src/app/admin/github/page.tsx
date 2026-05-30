"use client";
import Link from "next/link";
import { ArrowLeft, GitFork, Star, Clock } from "lucide-react";

const mockDetected = [
  {
    id: "gh-001",
    name: "gis-flood-mapping",
    description: "GIS-based flood risk analysis using satellite imagery and ML",
    url: "https://github.com/archemasachika7/gis-flood-mapping",
    stars: 0,
    language: "Python",
    updatedAt: "2025-01-15",
    status: "pending",
    detectedAt: "2025-01-16",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen os-grid" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="flex items-center gap-1 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            <ArrowLeft size={12} /> Admin
          </Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span className="font-mono text-xs" style={{ color: "#9b59ff" }}>GitHub Integration</span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitFork size={14} style={{ color: "#9b59ff" }} />
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>GitHub Integration</h1>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Automatically detected repositories pending review. Nothing appears publicly until approved.
          </p>
        </div>

        {/* Integration status */}
        <div className="os-panel p-4 font-mono text-xs space-y-1">
          <p style={{ color: "var(--text-muted)" }}>INTEGRATION STATUS</p>
          <p>
            <span style={{ color: "var(--accent-green)" }}>●</span>{" "}
            <span style={{ color: "var(--text-secondary)" }}>GitHub webhook: </span>
            <span style={{ color: "#ffd700" }}>Not configured (set GITHUB_WEBHOOK_SECRET env var)</span>
          </p>
          <p>
            <span style={{ color: "var(--accent-green)" }}>●</span>{" "}
            <span style={{ color: "var(--text-secondary)" }}>API token: </span>
            <span style={{ color: "#ffd700" }}>Not configured (set GITHUB_TOKEN env var)</span>
          </p>
          <p>
            <span style={{ color: "#4a5260" }}>●</span>{" "}
            <span style={{ color: "var(--text-secondary)" }}>Auto-detection: </span>
            <span style={{ color: "#4a5260" }}>Polling every 6h once token is set</span>
          </p>
        </div>

        {/* Pending repos */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={12} style={{ color: "#ffd700" }} />
            <span className="font-mono text-xs font-bold" style={{ color: "#ffd700" }}>
              PENDING REVIEW ({mockDetected.length})
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          {mockDetected.map((repo) => (
            <div key={repo.id} className="os-panel p-4" style={{ borderColor: "rgba(255,215,0,0.2)" }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <GitFork size={13} style={{ color: "var(--text-muted)" }} />
                    <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                      {repo.name}
                    </span>
                    <span className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "#ffd70015", color: "#ffd700" }}>
                      {repo.language}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>{repo.description}</p>
                  <div className="flex items-center gap-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1"><Star size={10} /> {repo.stars}</span>
                    <span>Updated: {repo.updatedAt}</span>
                    <span>Detected: {repo.detectedAt}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    className="font-mono text-xs px-3 py-1.5 rounded transition-colors"
                    style={{ background: "rgba(0,255,136,0.15)", color: "var(--accent-green)", border: "1px solid rgba(0,255,136,0.3)" }}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="font-mono text-xs px-3 py-1.5 rounded transition-colors"
                    style={{ background: "rgba(255,107,53,0.15)", color: "#ff6b35", border: "1px solid rgba(255,107,53,0.3)" }}
                  >
                    × Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="os-panel p-4">
          <p className="font-mono text-xs mb-2" style={{ color: "var(--accent-green)" }}>SETUP INSTRUCTIONS</p>
          <div className="space-y-2 text-xs" style={{ color: "var(--text-secondary)" }}>
            <p>1. Add <code className="font-mono" style={{ color: "var(--accent-green)" }}>GITHUB_TOKEN</code> to your environment variables (Vercel / .env.local)</p>
            <p>2. Add <code className="font-mono" style={{ color: "var(--accent-green)" }}>GITHUB_WEBHOOK_SECRET</code> and configure webhook in GitHub repo settings</p>
            <p>3. Point webhook to <code className="font-mono" style={{ color: "var(--accent-green)" }}>https://your-domain.com/api/github/webhook</code></p>
            <p>4. New repos will appear here for approval before going public</p>
          </div>
        </div>
      </div>
    </div>
  );
}

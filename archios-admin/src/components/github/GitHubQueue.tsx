"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { GitHubRepo } from "@/lib/types";
import { Star, Clock, CheckCircle, XCircle, GitFork } from "lucide-react";

const statusConfig = {
  pending: { label: "Pending", color: "#fbbf24", icon: Clock },
  approved: { label: "Approved", color: "#00ff88", icon: CheckCircle },
  rejected: { label: "Rejected", color: "#ef4444", icon: XCircle },
};

export function GitHubQueue({ repos }: { repos: GitHubRepo[] }) {
  const router = useRouter();
  const supabase = createClient();
  const pending = repos.filter(r => r.status === "pending");
  const processed = repos.filter(r => r.status !== "pending");

  async function setStatus(id: string, status: "approved" | "rejected") {
    await supabase.from("github_repos").update({ status }).eq("id", id);
    router.refresh();
  }

  function RepoCard({ repo }: { repo: GitHubRepo }) {
    const cfg = statusConfig[repo.status];
    const StatusIcon = cfg.icon;
    return (
      <div className="panel p-4" style={{ borderColor: repo.status === "pending" ? "rgba(251,191,36,0.25)" : "var(--border)" }}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-2">
            <GitFork size={14} className="mt-0.5 shrink-0" style={{ color: "var(--text-muted)" }} />
            <div>
              <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>{repo.name}</p>
              {repo.description && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{repo.description}</p>}
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <StatusIcon size={12} style={{ color: cfg.color }} />
            <span className="font-mono text-xs" style={{ color: cfg.color }}>{cfg.label}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          {repo.language && <span>{repo.language}</span>}
          <span className="flex items-center gap-1"><Star size={10} /> {repo.stars}</span>
          {repo.updated_at && <span>Updated: {repo.updated_at.slice(0, 10)}</span>}
          <span>Detected: {repo.detected_at.slice(0, 10)}</span>
        </div>
        {repo.status === "pending" && (
          <div className="flex gap-2">
            <button onClick={() => setStatus(repo.id, "approved")} className="btn-primary flex items-center gap-1.5">
              <CheckCircle size={12} /> Approve
            </button>
            <button onClick={() => setStatus(repo.id, "rejected")} className="btn-danger flex items-center gap-1.5">
              <XCircle size={12} /> Reject
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold mb-0.5" style={{ color: "var(--text)" }}>GitHub Queue</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Detected repositories awaiting approval. Nothing appears on the public site until approved.
        </p>
      </div>

      {/* Integration status */}
      <div className="panel p-4 font-mono text-xs space-y-1.5">
        <p className="font-bold mb-2" style={{ color: "var(--accent)" }}>INTEGRATION STATUS</p>
        <p><span style={{ color: "#fbbf24" }}>○</span> <span style={{ color: "var(--text-muted)" }}>GITHUB_TOKEN — </span><span style={{ color: "#fbbf24" }}>Set in Vercel env vars</span></p>
        <p><span style={{ color: "#fbbf24" }}>○</span> <span style={{ color: "var(--text-muted)" }}>GITHUB_WEBHOOK_SECRET — </span><span style={{ color: "#fbbf24" }}>Set in Vercel env vars</span></p>
        <p><span style={{ color: "var(--text-dim)" }}>—</span> <span style={{ color: "var(--text-muted)" }}>Webhook URL: </span><code style={{ color: "var(--accent)" }}>https://your-admin.vercel.app/api/github/webhook</code></p>
      </div>

      {pending.length > 0 && (
        <div>
          <p className="font-mono text-xs font-bold mb-3" style={{ color: "#fbbf24" }}>PENDING ({pending.length})</p>
          <div className="space-y-3">{pending.map(r => <RepoCard key={r.id} repo={r} />)}</div>
        </div>
      )}

      {pending.length === 0 && (
        <div className="panel p-8 text-center font-mono text-sm" style={{ color: "var(--text-muted)" }}>
          No pending repositories. Queue is clear.
        </div>
      )}

      {processed.length > 0 && (
        <div>
          <p className="font-mono text-xs font-bold mb-3" style={{ color: "var(--text-muted)" }}>PROCESSED ({processed.length})</p>
          <div className="space-y-3">{processed.map(r => <RepoCard key={r.id} repo={r} />)}</div>
        </div>
      )}
    </div>
  );
}

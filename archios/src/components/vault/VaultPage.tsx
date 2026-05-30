"use client";
import { getPublicVaultItems } from "@/lib/data";
import { vaultItems } from "@/lib/data";
import { Archive, FileText, Database, BookMarked, Presentation, PenTool, Lock } from "lucide-react";

const typeConfig: Record<string, { icon: typeof FileText; color: string; label: string }> = {
  cad: { icon: PenTool, color: "#ff6b35", label: "CAD File" },
  report: { icon: FileText, color: "#4466ff", label: "Report" },
  dataset: { icon: Database, color: "#00e5ff", label: "Dataset" },
  notes: { icon: BookMarked, color: "#9b59ff", label: "Notes" },
  research: { icon: BookMarked, color: "#ffd700", label: "Research" },
  presentation: { icon: Presentation, color: "#00ff88", label: "Presentation" },
};

export function VaultPage() {
  const publicItems = getPublicVaultItems();
  const privateCount = vaultItems.filter((v) => !v.isPublic).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Archive size={14} style={{ color: "#ff6b35" }} />
          <span className="font-mono text-xs" style={{ color: "#ff6b35" }}>~/vault</span>
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Engineering Vault
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Repository of CAD files, reports, datasets, research papers, and notes.
          Admin controls which items become public.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="os-panel p-3 text-center">
          <p className="font-mono text-2xl font-bold" style={{ color: "var(--accent-green)" }}>{publicItems.length}</p>
          <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Public</p>
        </div>
        <div className="os-panel p-3 text-center">
          <p className="font-mono text-2xl font-bold" style={{ color: "#ff6b35" }}>{privateCount}</p>
          <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Private</p>
        </div>
        <div className="os-panel p-3 text-center">
          <p className="font-mono text-2xl font-bold" style={{ color: "var(--accent-cyan)" }}>{vaultItems.length}</p>
          <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Total</p>
        </div>
      </div>

      {/* Public items */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold" style={{ color: "var(--accent-green)" }}>PUBLIC ITEMS</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {publicItems.map((item) => {
            const cfg = typeConfig[item.type] || typeConfig.notes;
            const Icon = cfg.icon;
            return (
              <div key={item.id} className="os-panel p-4" style={{ borderColor: `${cfg.color}20` }}>
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${cfg.color}15`, border: `1px solid ${cfg.color}30` }}
                  >
                    <Icon size={14} style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm leading-tight" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </h3>
                      <span
                        className="font-mono text-xs px-1.5 py-0.5 rounded shrink-0"
                        style={{ background: `${cfg.color}15`, color: cfg.color, fontSize: "0.6rem" }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags.map((t) => (
                        <span key={t} className="tag-pill">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {item.fileSize || "—"} · {item.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Private vault notice */}
      <div
        className="os-panel p-4 flex items-start gap-3"
        style={{ borderColor: "rgba(255,107,53,0.2)" }}
      >
        <Lock size={16} className="mt-0.5 shrink-0" style={{ color: "#ff6b35" }} />
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
            {privateCount} items in private vault
          </p>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            CAD drawings, raw field notes, unreleased datasets, and draft research papers
            are kept private. Admin access required to review or publish.
          </p>
        </div>
      </div>
    </div>
  );
}

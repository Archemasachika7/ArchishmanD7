"use client";
import Link from "next/link";
import { vaultItems } from "@/lib/data";
import { ArrowLeft, Archive, Lock, Unlock } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen os-grid" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="flex items-center gap-1 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            <ArrowLeft size={12} /> Admin
          </Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span className="font-mono text-xs" style={{ color: "#ff6b35" }}>Vault</span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Archive size={14} style={{ color: "#ff6b35" }} />
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Manage Vault</h1>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Control which files are public. Edit <code className="font-mono text-xs" style={{ color: "var(--accent-green)" }}>src/data/vault.json</code> to add items.
          </p>
        </div>

        <div className="os-panel p-4 space-y-2">
          {vaultItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded"
              style={{ border: "1px solid var(--border)" }}
            >
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                  {item.type} · {item.fileSize || "—"} · {item.createdAt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {item.isPublic ? (
                  <div className="flex items-center gap-1 font-mono text-xs" style={{ color: "#00ff88" }}>
                    <Unlock size={12} /> Public
                  </div>
                ) : (
                  <div className="flex items-center gap-1 font-mono text-xs" style={{ color: "#ff6b35" }}>
                    <Lock size={12} /> Private
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

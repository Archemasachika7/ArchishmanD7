"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { VaultItem } from "@/lib/types";
import { Plus, Trash2, Eye, EyeOff, Archive } from "lucide-react";

const types = ["cad", "report", "dataset", "notes", "research", "presentation"] as const;
const typeColors: Record<string, string> = {
  cad: "#ff6b35", report: "#4466ff", dataset: "#00e5ff",
  notes: "#9b59ff", research: "#ffd700", presentation: "#00ff88",
};

export function VaultManager({ items, projects }: { items: VaultItem[]; projects: { id: string; title: string }[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", type: "notes" as VaultItem["type"], file_size: "", is_public: false, project_id: "", tags: "" });
  const [saving, setSaving] = useState(false);

  async function togglePublic(id: string, current: boolean) {
    await supabase.from("vault_items").update({ is_public: !current }).eq("id", id);
    router.refresh();
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this vault item?")) return;
    await supabase.from("vault_items").delete().eq("id", id);
    router.refresh();
  }

  async function addItem() {
    setSaving(true);
    await supabase.from("vault_items").insert({
      ...form,
      tags: form.tags.split(",").map(s => s.trim()).filter(Boolean),
      project_id: form.project_id || null,
    });
    setForm({ title: "", description: "", type: "notes", file_size: "", is_public: false, project_id: "", tags: "" });
    setAdding(false);
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold mb-0.5" style={{ color: "var(--text)" }}>Vault</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{items.length} items · {items.filter(i => i.is_public).length} public</p>
        </div>
        <button onClick={() => setAdding(!adding)} className="btn-primary flex items-center gap-1.5">
          <Plus size={13} /> Add Item
        </button>
      </div>

      {adding && (
        <div className="panel p-4 space-y-3 animate-in">
          <p className="font-mono text-xs font-bold" style={{ color: "var(--accent)" }}>NEW VAULT ITEM</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-base" placeholder="Item title" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as VaultItem["type"] })} className="input-base capitalize">
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-base" rows={2} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>File Size (e.g. 2.4 MB)</label>
              <input value={form.file_size} onChange={e => setForm({ ...form, file_size: e.target.value })} className="input-base" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Linked Project</label>
              <select value={form.project_id} onChange={e => setForm({ ...form, project_id: e.target.value })} className="input-base">
                <option value="">None</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Tags (comma sep)</label>
              <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="input-base" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_public} onChange={e => setForm({ ...form, is_public: e.target.checked })} className="w-4 h-4" />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>Make public</span>
            </label>
            <div className="flex-1" />
            <button onClick={() => setAdding(false)} className="btn-ghost">Cancel</button>
            <button onClick={addItem} className="btn-primary" disabled={saving || !form.title}>
              {saving ? "Saving..." : "Add"}
            </button>
          </div>
        </div>
      )}

      <div className="panel overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Title", "Type", "Size", "Project", "Visibility", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b hover:bg-white/3 transition-colors" style={{ borderColor: "var(--border)" }}>
                <td className="px-4 py-3">
                  <p className="font-medium text-sm" style={{ color: "var(--text)" }}>{item.title}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.description.slice(0, 50)}...</p>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs px-2 py-0.5 rounded capitalize" style={{ background: `${typeColors[item.type]}15`, color: typeColors[item.type] }}>
                    {item.type}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>{item.file_size || "—"}</td>
                <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{item.project_id ? "Linked" : "—"}</td>
                <td className="px-4 py-3">
                  <button onClick={() => togglePublic(item.id, item.is_public)} className="flex items-center gap-1.5 text-xs" style={{ color: item.is_public ? "var(--accent)" : "var(--text-muted)" }}>
                    {item.is_public ? <Eye size={12} /> : <EyeOff size={12} />}
                    {item.is_public ? "Public" : "Private"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => deleteItem(item.id)} className="p-1 rounded transition-colors hover:bg-red-500/10" style={{ color: "var(--text-muted)" }}>
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="py-12 text-center font-mono text-sm" style={{ color: "var(--text-muted)" }}>No vault items yet.</div>
        )}
      </div>
    </div>
  );
}

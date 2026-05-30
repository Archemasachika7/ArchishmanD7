"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { KnowledgeNode, KnowledgeEdge } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

const groups = ["civil", "ds", "bridge", "core"] as const;
const groupColors: Record<string, string> = { civil: "#ff6b35", ds: "#00e5ff", bridge: "#00ff88", core: "#9b59ff" };

export function GraphManager({ nodes, edges }: { nodes: KnowledgeNode[]; edges: KnowledgeEdge[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [tab, setTab] = useState<"nodes" | "edges">("nodes");

  // Node form
  const [nForm, setNForm] = useState({ id: "", label: "", node_group: "civil" as KnowledgeNode["node_group"], description: "" });
  const [addingNode, setAddingNode] = useState(false);

  // Edge form
  const [eForm, setEForm] = useState({ source: "", target: "", strength: 0.7 });
  const [addingEdge, setAddingEdge] = useState(false);

  async function addNode() {
    await supabase.from("knowledge_nodes").insert({ ...nForm, related_projects: [] });
    setNForm({ id: "", label: "", node_group: "civil", description: "" });
    setAddingNode(false);
    router.refresh();
  }

  async function deleteNode(id: string) {
    if (!confirm(`Delete node "${id}"? This also removes connected edges.`)) return;
    await supabase.from("knowledge_nodes").delete().eq("id", id);
    router.refresh();
  }

  async function addEdge() {
    await supabase.from("knowledge_edges").insert(eForm);
    setEForm({ source: "", target: "", strength: 0.7 });
    setAddingEdge(false);
    router.refresh();
  }

  async function deleteEdge(id: string) {
    await supabase.from("knowledge_edges").delete().eq("id", id);
    router.refresh();
  }

  return (
    <div className="max-w-4xl space-y-5">
      <div>
        <h1 className="text-xl font-bold mb-0.5" style={{ color: "var(--text)" }}>Knowledge Graph</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{nodes.length} nodes · {edges.length} edges</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", width: "fit-content" }}>
        {(["nodes", "edges"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-all" style={{
            background: tab === t ? "var(--bg)" : "transparent",
            color: tab === t ? "var(--text)" : "var(--text-muted)",
            border: `1px solid ${tab === t ? "var(--border)" : "transparent"}`,
          }}>
            {t} ({t === "nodes" ? nodes.length : edges.length})
          </button>
        ))}
      </div>

      {/* Nodes tab */}
      {tab === "nodes" && (
        <div className="space-y-3">
          <button onClick={() => setAddingNode(!addingNode)} className="btn-primary flex items-center gap-1.5">
            <Plus size={13} /> Add Node
          </button>

          {addingNode && (
            <div className="panel p-4 space-y-3 animate-in">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>ID (slug, e.g. "gis")</label>
                  <input value={nForm.id} onChange={e => setNForm({ ...nForm, id: e.target.value })} className="input-base font-mono" />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Label</label>
                  <input value={nForm.label} onChange={e => setNForm({ ...nForm, label: e.target.value })} className="input-base" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Group</label>
                  <select value={nForm.node_group} onChange={e => setNForm({ ...nForm, node_group: e.target.value as KnowledgeNode["node_group"] })} className="input-base capitalize">
                    {groups.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Description</label>
                  <input value={nForm.description} onChange={e => setNForm({ ...nForm, description: e.target.value })} className="input-base" />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setAddingNode(false)} className="btn-ghost">Cancel</button>
                <button onClick={addNode} className="btn-primary" disabled={!nForm.id || !nForm.label}>Add Node</button>
              </div>
            </div>
          )}

          <div className="panel overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["ID", "Label", "Group", "Description", ""].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {nodes.map(node => (
                  <tr key={node.id} className="border-b hover:bg-white/3" style={{ borderColor: "var(--border)" }}>
                    <td className="px-4 py-2 font-mono text-xs" style={{ color: "var(--accent)" }}>{node.id}</td>
                    <td className="px-4 py-2 text-sm font-medium" style={{ color: "var(--text)" }}>{node.label}</td>
                    <td className="px-4 py-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded capitalize" style={{ background: `${groupColors[node.node_group]}15`, color: groupColors[node.node_group] }}>{node.node_group}</span>
                    </td>
                    <td className="px-4 py-2 text-xs" style={{ color: "var(--text-muted)" }}>{node.description.slice(0, 40)}...</td>
                    <td className="px-4 py-2">
                      <button onClick={() => deleteNode(node.id)} className="p-1 rounded hover:bg-red-500/10 transition-colors" style={{ color: "var(--text-muted)" }}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edges tab */}
      {tab === "edges" && (
        <div className="space-y-3">
          <button onClick={() => setAddingEdge(!addingEdge)} className="btn-primary flex items-center gap-1.5">
            <Plus size={13} /> Add Edge
          </button>

          {addingEdge && (
            <div className="panel p-4 space-y-3 animate-in">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Source Node ID</label>
                  <select value={eForm.source} onChange={e => setEForm({ ...eForm, source: e.target.value })} className="input-base font-mono">
                    <option value="">Select...</option>
                    {nodes.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Target Node ID</label>
                  <select value={eForm.target} onChange={e => setEForm({ ...eForm, target: e.target.value })} className="input-base font-mono">
                    <option value="">Select...</option>
                    {nodes.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Strength ({eForm.strength})</label>
                  <input type="range" min={0.1} max={1} step={0.05} value={eForm.strength} onChange={e => setEForm({ ...eForm, strength: Number(e.target.value) })} className="w-full mt-2" />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setAddingEdge(false)} className="btn-ghost">Cancel</button>
                <button onClick={addEdge} className="btn-primary" disabled={!eForm.source || !eForm.target}>Add Edge</button>
              </div>
            </div>
          )}

          <div className="panel overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Source", "→", "Target", "Strength", ""].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {edges.map(edge => (
                  <tr key={edge.id} className="border-b hover:bg-white/3" style={{ borderColor: "var(--border)" }}>
                    <td className="px-4 py-2 font-mono text-xs" style={{ color: "var(--accent)" }}>{edge.source}</td>
                    <td className="px-4 py-2 text-xs" style={{ color: "var(--text-dim)" }}>→</td>
                    <td className="px-4 py-2 font-mono text-xs" style={{ color: "var(--accent)" }}>{edge.target}</td>
                    <td className="px-4 py-2 font-mono text-xs" style={{ color: "var(--text-muted)" }}>{edge.strength}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => deleteEdge(edge.id)} className="p-1 rounded hover:bg-red-500/10 transition-colors" style={{ color: "var(--text-muted)" }}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

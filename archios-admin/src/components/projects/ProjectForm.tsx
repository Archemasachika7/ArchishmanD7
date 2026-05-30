"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { Project, JournalEntry, EvolutionStage } from "@/lib/types";
import { ArrowLeft, Plus, Trash2, Save, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const categories = [
  "Civil Engineering", "Surveying", "GIS & Remote Sensing", "Structural Engineering",
  "Data Science", "Machine Learning", "AI", "Web Development", "Research", "Personal Experiments",
];
const stages = ["idea", "planning", "development", "deployment", "future"] as const;
const statuses = ["active", "completed", "archived", "paused"] as const;
const tagOptions = ["Manual", "Manual + AI", "Prompt Driven", "Academic", "Research Based"];

const defaultDNA = { complexity: 50, innovation: 50, engineering: 50, aiUsage: 0, research: 0 };
const defaultBuild = { manualWork: 100, aiAssistance: 0, breakdown: "" };
const defaultStage = (stage: string): EvolutionStage => ({
  stage: stage as EvolutionStage["stage"],
  title: "",
  description: "",
  date: "",
  completed: false,
});

export function ProjectForm({
  mode,
  project,
  journal,
}: {
  mode: "create" | "edit";
  project?: Project;
  journal?: JournalEntry | null;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"basic" | "evolution" | "dna" | "journal">("basic");

  // Form state
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [subtitle, setSubtitle] = useState(project?.subtitle ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [category, setCategory] = useState(project?.category ?? "Civil Engineering");
  const [status, setStatus] = useState(project?.status ?? "active");
  const [currentStage, setCurrentStage] = useState(project?.current_stage ?? "idea");
  const [tags, setTags] = useState<string[]>(project?.tags ?? []);
  const [tech, setTech] = useState(project?.tech?.join(", ") ?? "");
  const [skills, setSkills] = useState(project?.skills?.join(", ") ?? "");
  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.live_url ?? "");
  const [isPublic, setIsPublic] = useState(project?.is_public ?? false);
  const [isPending, setIsPending] = useState(project?.is_pending ?? false);
  const [featured, setFeatured] = useState(project?.featured ?? false);

  const [evolution, setEvolution] = useState<EvolutionStage[]>(
    project?.evolution ?? stages.map(defaultStage)
  );
  const [dna, setDna] = useState(project?.dna ?? defaultDNA);
  const [build, setBuild] = useState(project?.build_analytics ?? defaultBuild);

  // Journal
  const [jProblems, setJProblems] = useState(journal?.problems_faced?.join("\n") ?? "");
  const [jFailed, setJFailed] = useState(journal?.failed_attempts?.join("\n") ?? "");
  const [jLessons, setJLessons] = useState(journal?.lessons_learned?.join("\n") ?? "");
  const [jFuture, setJFuture] = useState(journal?.future_work?.join("\n") ?? "");
  const [jNotes, setJNotes] = useState(journal?.notes ?? "");

  function autoSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function toggleTag(t: string) {
    setTags((prev) => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  }

  async function handleSave() {
    setSaving(true); setError("");
    try {
      const payload = {
        slug: slug || autoSlug(title),
        title, subtitle, description,
        category, status, current_stage: currentStage,
        tags, tech: tech.split(",").map(s => s.trim()).filter(Boolean),
        skills: skills.split(",").map(s => s.trim()).filter(Boolean),
        github_url: githubUrl || null,
        live_url: liveUrl || null,
        is_public: isPublic, is_pending: isPending, featured,
        evolution, dna, build_analytics: build,
        updated_at: new Date().toISOString(),
      };

      let projectId = project?.id;

      if (mode === "create") {
        const { data, error: e } = await supabase.from("projects").insert(payload).select("id").single();
        if (e) throw e;
        projectId = data.id;
      } else {
        const { error: e } = await supabase.from("projects").update(payload).eq("id", project!.id);
        if (e) throw e;
      }

      // Upsert journal
      if (projectId && (jProblems || jFailed || jLessons || jFuture || jNotes)) {
        const journalPayload = {
          project_id: projectId,
          date: new Date().toISOString().split("T")[0],
          problems_faced: jProblems.split("\n").filter(Boolean),
          failed_attempts: jFailed.split("\n").filter(Boolean),
          lessons_learned: jLessons.split("\n").filter(Boolean),
          future_work: jFuture.split("\n").filter(Boolean),
          notes: jNotes,
        };

        if (journal?.id) {
          await supabase.from("journal_entries").update(journalPayload).eq("id", journal.id);
        } else {
          await supabase.from("journal_entries").insert(journalPayload);
        }
      }

      router.push("/projects");
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
      setSaving(false);
    }
  }

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "evolution", label: "Evolution" },
    { id: "dna", label: "DNA + Build" },
    { id: "journal", label: "Journal" },
  ] as const;

  return (
    <div className="max-w-3xl space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/projects" className="btn-ghost flex items-center gap-1.5 !py-1.5 !px-2.5">
          <ArrowLeft size={13} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
            {mode === "create" ? "New Project" : `Edit: ${project?.title}`}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setIsPublic(!isPublic); setIsPending(false); }}
            className="flex items-center gap-1.5 btn-ghost !py-1.5"
            style={{ color: isPublic ? "var(--accent)" : "var(--text-muted)" }}
          >
            {isPublic ? <Eye size={13} /> : <EyeOff size={13} />}
            {isPublic ? "Public" : "Private"}
          </button>
          <button onClick={handleSave} className="btn-primary flex items-center gap-1.5" disabled={saving}>
            <Save size={13} /> {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="px-3 py-2 rounded text-xs" style={{ background: "var(--danger-dim)", color: "var(--danger)" }}>{error}</div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex-1 py-1.5 rounded-md text-xs font-medium transition-all"
            style={{
              background: activeTab === t.id ? "var(--bg)" : "transparent",
              color: activeTab === t.id ? "var(--text)" : "var(--text-muted)",
              border: `1px solid ${activeTab === t.id ? "var(--border)" : "transparent"}`,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Basic Info */}
      {activeTab === "basic" && (
        <div className="panel p-5 space-y-4 animate-in">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Title *</label>
              <input value={title} onChange={(e) => { setTitle(e.target.value); if (!project) setSlug(autoSlug(e.target.value)); }} className="input-base" placeholder="Project title" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Slug *</label>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="input-base font-mono" placeholder="url-friendly-slug" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Subtitle</label>
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="input-base" placeholder="One-line description" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-base" rows={4} placeholder="Full project description..." />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className="input-base">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="input-base capitalize">
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Current Stage</label>
              <select value={currentStage} onChange={(e) => setCurrentStage(e.target.value as typeof currentStage)} className="input-base capitalize">
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Tags</label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map(t => (
                <button key={t} onClick={() => toggleTag(t)} className="tag transition-all" style={{ background: tags.includes(t) ? "var(--accent-dim)" : "transparent", color: tags.includes(t) ? "var(--accent)" : "var(--text-muted)", borderColor: tags.includes(t) ? "var(--border-focus)" : "var(--border)" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Tech Stack (comma separated)</label>
              <input value={tech} onChange={(e) => setTech(e.target.value)} className="input-base" placeholder="Python, QGIS, scikit-learn" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Skills (comma separated)</label>
              <input value={skills} onChange={(e) => setSkills(e.target.value)} className="input-base" placeholder="GIS, Remote Sensing, ML" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>GitHub URL</label>
              <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="input-base" placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Live URL</label>
              <input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="input-base" placeholder="https://..." />
            </div>
          </div>
          <div className="flex gap-4">
            {[
              { label: "Featured", value: featured, set: setFeatured },
              { label: "Pending review", value: isPending, set: setIsPending },
            ].map(({ label, value, set }) => (
              <label key={label} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={value} onChange={(e) => set(e.target.checked)} className="w-4 h-4 accent-green-400" />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Evolution */}
      {activeTab === "evolution" && (
        <div className="space-y-3 animate-in">
          {evolution.map((ev, i) => (
            <div key={ev.stage} className="panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold capitalize" style={{ color: "var(--accent)" }}>{ev.stage}</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={ev.completed} onChange={(e) => {
                    const next = [...evolution];
                    next[i] = { ...ev, completed: e.target.checked };
                    setEvolution(next);
                  }} className="w-4 h-4" />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Completed</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Title</label>
                  <input value={ev.title} onChange={(e) => { const next = [...evolution]; next[i] = { ...ev, title: e.target.value }; setEvolution(next); }} className="input-base" placeholder="Stage title" />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Date (e.g. 2025-01)</label>
                  <input value={ev.date} onChange={(e) => { const next = [...evolution]; next[i] = { ...ev, date: e.target.value }; setEvolution(next); }} className="input-base" placeholder="2025-01" />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Description</label>
                <textarea value={ev.description} onChange={(e) => { const next = [...evolution]; next[i] = { ...ev, description: e.target.value }; setEvolution(next); }} className="input-base" rows={2} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DNA + Build */}
      {activeTab === "dna" && (
        <div className="panel p-5 space-y-5 animate-in">
          <div>
            <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-muted)" }}>PROJECT DNA SCORES (0–100)</p>
            <div className="space-y-3">
              {(Object.keys(dna) as (keyof typeof dna)[]).map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <label className="w-28 text-xs capitalize" style={{ color: "var(--text-muted)" }}>
                    {key === "aiUsage" ? "AI Usage" : key}
                  </label>
                  <input
                    type="range" min={0} max={100}
                    value={dna[key]}
                    onChange={(e) => setDna({ ...dna, [key]: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="font-mono text-xs w-8 text-right" style={{ color: "var(--accent)" }}>{dna[key]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t pt-5" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-muted)" }}>BUILD ANALYTICS</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="w-28 text-xs" style={{ color: "var(--text-muted)" }}>Manual Work %</label>
                <input type="range" min={0} max={100} value={build.manualWork} onChange={(e) => setBuild({ ...build, manualWork: Number(e.target.value), aiAssistance: 100 - Number(e.target.value) })} className="flex-1" />
                <span className="font-mono text-xs w-8 text-right" style={{ color: "var(--accent)" }}>{build.manualWork}</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-28 text-xs" style={{ color: "var(--text-muted)" }}>AI Assistance %</label>
                <div className="flex-1 h-2 rounded-full" style={{ background: "var(--bg)" }}>
                  <div className="h-full rounded-full" style={{ width: `${build.aiAssistance}%`, background: "#00e5ff" }} />
                </div>
                <span className="font-mono text-xs w-8 text-right" style={{ color: "#00e5ff" }}>{build.aiAssistance}</span>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>Breakdown explanation</label>
                <textarea value={build.breakdown} onChange={(e) => setBuild({ ...build, breakdown: e.target.value })} className="input-base" rows={3} placeholder="Describe how AI was used vs manual work..." />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Journal */}
      {activeTab === "journal" && (
        <div className="panel p-5 space-y-4 animate-in">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Each line = one item. Press Enter to separate entries.</p>
          {[
            { label: "Problems Faced", value: jProblems, set: setJProblems, color: "#ef4444" },
            { label: "Failed Attempts", value: jFailed, set: setJFailed, color: "var(--text-muted)" },
            { label: "Lessons Learned", value: jLessons, set: setJLessons, color: "#fbbf24" },
            { label: "Future Work", value: jFuture, set: setJFuture, color: "var(--accent)" },
          ].map(({ label, value, set, color }) => (
            <div key={label}>
              <label className="block text-xs font-medium mb-1.5" style={{ color }}>{label}</label>
              <textarea value={value} onChange={(e) => set(e.target.value)} className="input-base" rows={3} placeholder={`One item per line...`} />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#9b59ff" }}>Personal Notes / Reflection</label>
            <textarea value={jNotes} onChange={(e) => setJNotes(e.target.value)} className="input-base" rows={3} placeholder="Raw thoughts, insights, observations..." />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pb-4">
        <Link href="/projects" className="btn-ghost">Cancel</Link>
        <button onClick={handleSave} className="btn-primary flex items-center gap-1.5" disabled={saving}>
          <Save size={13} /> {saving ? "Saving..." : "Save Project"}
        </button>
      </div>
    </div>
  );
}

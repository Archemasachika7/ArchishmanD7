"use client";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

export function JournalManager({ entries }: { entries: Record<string, unknown>[] }) {
  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h1 className="text-xl font-bold mb-0.5" style={{ color: "var(--text)" }}>Journal Entries</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Journal entries are edited from within each project. {entries.length} entries total.
        </p>
      </div>

      <div className="panel p-4" style={{ borderColor: "rgba(155,89,255,0.25)" }}>
        <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
          To edit a journal entry, go to the project and use the Journal tab in the project form.
        </p>
        <Link href="/projects" className="btn-ghost flex items-center gap-1.5 w-fit">
          <BookOpen size={13} /> Go to Projects
        </Link>
      </div>

      <div className="panel overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Project", "Date", "Problems", "Lessons", "Edit"].map(h => (
                <th key={h} className="text-left px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const proj = entry.projects as Record<string, string> | null;
              return (
                <tr key={entry.id as string} className="border-b hover:bg-white/3" style={{ borderColor: "var(--border)" }}>
                  <td className="px-4 py-3 font-medium text-sm" style={{ color: "var(--text)" }}>
                    {proj?.title ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    {(entry.date as string)?.slice(0, 10) ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    {((entry.problems_faced as string[]) ?? []).length}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    {((entry.lessons_learned as string[]) ?? []).length}
                  </td>
                  <td className="px-4 py-3">
                    {proj?.id && (
                      <Link href={`/projects/${proj.id}`} className="flex items-center gap-1 text-xs transition-colors hover:text-white" style={{ color: "var(--text-muted)" }}>
                        Edit <ChevronRight size={11} />
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {entries.length === 0 && (
          <div className="py-12 text-center font-mono text-sm" style={{ color: "var(--text-muted)" }}>No journal entries yet.</div>
        )}
      </div>
    </div>
  );
}

import { AdminShell } from "@/components/AdminShell";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { createClient } from "@/lib/supabase-server";
import { redirect, notFound } from "next/navigation";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase.from("projects").select("*").eq("id", id).single();
  if (!data) notFound();

  const { data: journal } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("project_id", id)
    .maybeSingle();

  return (
    <AdminShell userEmail={user.email ?? ""}>
      <ProjectForm mode="edit" project={data as unknown as Project} journal={journal} />
    </AdminShell>
  );
}

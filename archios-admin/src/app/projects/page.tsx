import { AdminShell } from "@/components/AdminShell";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <AdminShell userEmail={user.email ?? ""}>
      <ProjectsList projects={(data ?? []) as unknown as Project[]} />
    </AdminShell>
  );
}

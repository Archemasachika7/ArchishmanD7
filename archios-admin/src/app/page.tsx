import { AdminShell } from "@/components/AdminShell";
import { Dashboard } from "@/components/Dashboard";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [projectsRes, vaultRes, githubRes] = await Promise.all([
    supabase.from("projects").select("id, status, is_public, is_pending"),
    supabase.from("vault_items").select("id, is_public"),
    supabase.from("github_repos").select("id, status"),
  ]);

  const stats = {
    totalProjects: projectsRes.data?.length ?? 0,
    publicProjects: projectsRes.data?.filter(p => p.is_public).length ?? 0,
    pendingProjects: projectsRes.data?.filter(p => p.is_pending).length ?? 0,
    activeProjects: projectsRes.data?.filter(p => p.status === "active").length ?? 0,
    vaultTotal: vaultRes.data?.length ?? 0,
    vaultPublic: vaultRes.data?.filter(v => v.is_public).length ?? 0,
    githubPending: githubRes.data?.filter(r => r.status === "pending").length ?? 0,
  };

  return (
    <AdminShell userEmail={user.email ?? ""}>
      <Dashboard stats={stats} />
    </AdminShell>
  );
}

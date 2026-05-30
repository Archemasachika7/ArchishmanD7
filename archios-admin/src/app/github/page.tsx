import { AdminShell } from "@/components/AdminShell";
import { GitHubQueue } from "@/components/github/GitHubQueue";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import type { GitHubRepo } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase.from("github_repos").select("*").order("detected_at", { ascending: false });

  return (
    <AdminShell userEmail={user.email ?? ""}>
      <GitHubQueue repos={(data ?? []) as unknown as GitHubRepo[]} />
    </AdminShell>
  );
}

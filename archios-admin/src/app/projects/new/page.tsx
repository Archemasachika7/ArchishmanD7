import { AdminShell } from "@/components/AdminShell";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <AdminShell userEmail={user.email ?? ""}>
      <ProjectForm mode="create" />
    </AdminShell>
  );
}

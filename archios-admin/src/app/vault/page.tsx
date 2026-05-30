import { AdminShell } from "@/components/AdminShell";
import { VaultManager } from "@/components/vault/VaultManager";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import type { VaultItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: items } = await supabase.from("vault_items").select("*").order("created_at", { ascending: false });
  const { data: projects } = await supabase.from("projects").select("id, title").order("title");

  return (
    <AdminShell userEmail={user.email ?? ""}>
      <VaultManager
        items={(items ?? []) as unknown as VaultItem[]}
        projects={(projects ?? []) as { id: string; title: string }[]}
      />
    </AdminShell>
  );
}

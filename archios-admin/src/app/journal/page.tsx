import { AdminShell } from "@/components/AdminShell";
import { JournalManager } from "@/components/journal/JournalManager";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: entries } = await supabase
    .from("journal_entries")
    .select("*, projects(id, title, slug)")
    .order("date", { ascending: false });

  return (
    <AdminShell userEmail={user.email ?? ""}>
      <JournalManager entries={entries ?? []} />
    </AdminShell>
  );
}

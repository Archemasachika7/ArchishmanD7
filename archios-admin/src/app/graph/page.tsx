import { AdminShell } from "@/components/AdminShell";
import { GraphManager } from "@/components/graph/GraphManager";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import type { KnowledgeNode, KnowledgeEdge } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [nodesRes, edgesRes] = await Promise.all([
    supabase.from("knowledge_nodes").select("*").order("label"),
    supabase.from("knowledge_edges").select("*"),
  ]);

  return (
    <AdminShell userEmail={user.email ?? ""}>
      <GraphManager
        nodes={(nodesRes.data ?? []) as unknown as KnowledgeNode[]}
        edges={(edgesRes.data ?? []) as unknown as KnowledgeEdge[]}
      />
    </AdminShell>
  );
}

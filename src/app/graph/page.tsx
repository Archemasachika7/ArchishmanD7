import { OSShell } from "@/components/os/OSShell";
import { GraphPage } from "@/components/graph/GraphPage";
import { fetchKnowledgeGraph } from "@/lib/db";
import { knowledgeNodes, knowledgeEdges } from "@/lib/data";

export const revalidate = 300;

export default async function Page() {
  let nodes = knowledgeNodes;
  let edges = knowledgeEdges;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const graph = await fetchKnowledgeGraph();
    nodes = graph.nodes;
    edges = graph.edges;
  }

  return (
    <OSShell>
      <GraphPage nodes={nodes} edges={edges} />
    </OSShell>
  );
}

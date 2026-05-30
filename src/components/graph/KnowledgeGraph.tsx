"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { KnowledgeNode, KnowledgeEdge } from "@/lib/types";

type GraphNode = KnowledgeNode & d3.SimulationNodeDatum;

const groupColors: Record<string, string> = {
  civil: "#ff6b35",
  ds: "#00e5ff",
  bridge: "#00ff88",
  core: "#9b59ff",
};

export function KnowledgeGraph({
  nodes,
  edges,
  filterGroup,
}: {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  filterGroup?: string | null;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<KnowledgeNode | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const el = svgRef.current;
    const width = el.clientWidth || 700;
    const height = el.clientHeight || 500;

    d3.select(el).selectAll("*").remove();

    const filteredNodes: GraphNode[] = (
      filterGroup
        ? nodes.filter((n) => n.group === filterGroup || n.group === "bridge")
        : nodes
    ).map((n) => ({ ...n }));

    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredEdges = edges.filter(
      (e) => nodeIds.has(e.source) && nodeIds.has(e.target)
    );

    const svg = d3.select(el);

    // Zoom
    const g = svg.append("g");
    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 3])
        .on("zoom", (event) => g.attr("transform", event.transform))
    );

    // Simulation
    const simulation = d3.forceSimulation<GraphNode>(filteredNodes)
      .force("link", d3.forceLink<GraphNode, KnowledgeEdge>(filteredEdges)
        .id((d) => d.id)
        .distance((d) => 80 + (1 - d.strength) * 60)
        .strength((d) => d.strength * 0.8)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(40));

    // Edges
    const link = g.append("g")
      .selectAll("line")
      .data(filteredEdges)
      .enter()
      .append("line")
      .attr("stroke", "rgba(0,255,136,0.15)")
      .attr("stroke-width", (d) => d.strength * 2);

    // Node groups
    const node = g.append("g")
      .selectAll("g")
      .data(filteredNodes)
      .enter()
      .append("g")
      .style("cursor", "pointer")
      .call(
        d3.drag<SVGGElement, GraphNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => { d.fx = event.x; d.fy = event.y; })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on("click", (_, d) => setSelected(d));

    // Circles
    node.append("circle")
      .attr("r", 18)
      .attr("fill", (d) => `${groupColors[d.group]}12`)
      .attr("stroke", (d) => groupColors[d.group])
      .attr("stroke-width", 1.5);

    // Glow filter
    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    const merge = filter.append("feMerge");
    merge.append("feMergeNode").attr("in", "coloredBlur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    node.select("circle").attr("filter", "url(#glow)");

    // Labels
    node.append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "8px")
      .attr("font-family", "monospace")
      .attr("fill", (d) => groupColors[d.group])
      .attr("pointer-events", "none");

    // Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => ((d.source as unknown) as GraphNode).x ?? 0)
        .attr("y1", (d) => ((d.source as unknown) as GraphNode).y ?? 0)
        .attr("x2", (d) => ((d.target as unknown) as GraphNode).x ?? 0)
        .attr("y2", (d) => ((d.target as unknown) as GraphNode).y ?? 0);
      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => { simulation.stop(); };
  }, [nodes, edges, filterGroup]);

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
      {/* Selected node info */}
      {selected && (
        <div
          className="absolute bottom-4 left-4 os-panel p-3 max-w-xs"
          style={{ borderColor: `${groupColors[selected.group]}40` }}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className="font-mono text-xs font-bold"
              style={{ color: groupColors[selected.group] }}
            >
              {selected.label}
            </span>
            <span
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{
                background: `${groupColors[selected.group]}20`,
                color: groupColors[selected.group],
              }}
            >
              {selected.group}
            </span>
          </div>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {selected.description}
          </p>
          <button
            onClick={() => setSelected(null)}
            className="mt-2 font-mono text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            dismiss ×
          </button>
        </div>
      )}
    </div>
  );
}

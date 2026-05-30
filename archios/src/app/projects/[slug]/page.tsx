import { OSShell } from "@/components/os/OSShell";
import { ProjectDetailPage } from "@/components/projects/ProjectDetailPage";
import { getProjectBySlug, getPublicProjects } from "@/lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getPublicProjects().map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <OSShell>
      <ProjectDetailPage project={project} />
    </OSShell>
  );
}

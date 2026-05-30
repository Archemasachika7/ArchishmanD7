import { OSShell } from "@/components/os/OSShell";
import { ProjectDetailPage } from "@/components/projects/ProjectDetailPage";
import { fetchProjectBySlug, fetchPublicProjects } from "@/lib/db";
import { getProjectBySlug, getPublicProjects } from "@/lib/data";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return getPublicProjects().map((p) => ({ slug: p.slug }));
  }
  const projects = await fetchPublicProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? await fetchProjectBySlug(slug)
    : getProjectBySlug(slug) ?? null;

  if (!project) notFound();

  return (
    <OSShell>
      <ProjectDetailPage project={project} />
    </OSShell>
  );
}

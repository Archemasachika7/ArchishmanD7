import { OSShell } from "@/components/os/OSShell";
import { ProjectsPage } from "@/components/projects/ProjectsPage";
import { fetchPublicProjects } from "@/lib/db";
import type { Project } from "@/lib/types";

// Fallback to JSON data if Supabase env vars are not set
async function getProjects(): Promise<Project[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { getPublicProjects } = await import("@/lib/data");
    return getPublicProjects();
  }
  return fetchPublicProjects();
}


export default async function Page() {
  const projects = await getProjects();
  return (
    <OSShell>
      <ProjectsPage projects={projects} />
    </OSShell>
  );
}

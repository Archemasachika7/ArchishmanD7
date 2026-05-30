import { OSShell } from "@/components/os/OSShell";
import { BootScreen } from "@/components/os/BootScreen";
import { HomePage } from "@/components/HomePage";
import { fetchPublicProjects } from "@/lib/db";
import { getPublicProjects } from "@/lib/data";

export const revalidate = 60;

export default async function Page() {
  const projects = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? await fetchPublicProjects()
    : getPublicProjects();

  return (
    <>
      <BootScreen />
      <OSShell>
        <HomePage projects={projects} />
      </OSShell>
    </>
  );
}

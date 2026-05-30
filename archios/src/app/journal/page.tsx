import { OSShell } from "@/components/os/OSShell";
import { JournalPage } from "@/components/journal/JournalPage";

export default function Page() {
  return (
    <OSShell>
      <JournalPage />
    </OSShell>
  );
}

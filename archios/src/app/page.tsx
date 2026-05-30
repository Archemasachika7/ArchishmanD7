import { OSShell } from "@/components/os/OSShell";
import { BootScreen } from "@/components/os/BootScreen";
import { HomePage } from "@/components/HomePage";

export default function Page() {
  return (
    <>
      <BootScreen />
      <OSShell>
        <HomePage />
      </OSShell>
    </>
  );
}

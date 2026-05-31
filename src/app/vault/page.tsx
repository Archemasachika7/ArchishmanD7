import { OSShell } from "@/components/os/OSShell";
import { VaultPage } from "@/components/vault/VaultPage";
import { getPublicVaultItems, vaultItems } from "@/lib/data";

export default function Page() {
  const publicItems = getPublicVaultItems();
  const total = vaultItems.length;

  return (
    <OSShell>
      <VaultPage publicItems={publicItems} totalCount={total} />
    </OSShell>
  );
}

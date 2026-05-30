import { OSShell } from "@/components/os/OSShell";
import { VaultPage } from "@/components/vault/VaultPage";
import { fetchPublicVaultItems } from "@/lib/db";
import { getPublicVaultItems, vaultItems } from "@/lib/data";

export const revalidate = 60;

export default async function Page() {
  let publicItems = getPublicVaultItems();
  let total = vaultItems.length;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { data } = await import("@supabase/supabase-js").then(() =>
      import("@/lib/supabase").then(({ supabase }) =>
        supabase.from("vault_items").select("id, is_public")
      )
    );
    publicItems = await fetchPublicVaultItems();
    total = data?.length ?? publicItems.length;
  }

  return (
    <OSShell>
      <VaultPage publicItems={publicItems} totalCount={total} />
    </OSShell>
  );
}

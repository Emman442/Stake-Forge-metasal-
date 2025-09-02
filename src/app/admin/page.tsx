import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mock data for the global state
const globalState = {
  admin: "AdminWalletAddressHere",
  platform_fee_bps: 100, // 1%
  total_pools_created: 42,
  platform_fee_vault: "FeeVaultWalletAddressHere",
};

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-glow sm:text-5xl font-headline">
          Global Admin Dashboard
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          Manage the platform-wide settings for StakingForge.
        </p>
      </section>

      <section className="mt-12 max-w-2xl mx-auto">
        <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
          <CardHeader>
            <CardTitle>Global State</CardTitle>
            <CardDescription>
              These settings affect the entire platform. Be careful with
              changes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="admin">Admin Address</Label>
              <Input id="admin" defaultValue={globalState.admin} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-fee">Platform Fee (BPS)</Label>
              <Input
                id="platform-fee"
                type="number"
                defaultValue={globalState.platform_fee_bps}
              />
              <p className="text-xs text-muted-foreground">
                Basis points. 100 BPS = 1%.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee-vault">Platform Fee Vault</Label>
              <Input
                id="fee-vault"
                defaultValue={globalState.platform_fee_vault}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total-pools">Total Pools Created</Label>
              <Input
                id="total-pools"
                value={globalState.total_pools_created}
                readOnly
                disabled
              />
            </div>
            <div className="flex justify-end">
              <Button className="button-glow">Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

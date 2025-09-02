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
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for a specific staking pool
const poolConfig = {
  pool_name: "My Awesome Pool",
  pool_description: "Staking my awesome token for even more awesome rewards.",
  reward_rate_per_token_per_second: 10000000, // 0.01 tokens per second
  min_stake_amount: 100,
  max_stake_per_user: 10000,
  min_stake_duration: 604800, // 7 days in seconds
  early_withdrawal_penalty_bps: 500, // 5%
  max_pool_size: 1000000,
  lock_period: 2592000, // 30 days in seconds
};

export default function PoolAdminPage({
  params,
}: {
  params: { poolId: string };
}) {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-glow sm:text-5xl font-headline">
          Pool Admin:{" "}
          <span className="text-primary">{poolConfig.pool_name}</span>
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          Manage the settings for this specific staking pool. Pool ID:{" "}
          {params.poolId}
        </p>
      </section>

      <section className="mt-12 max-w-2xl mx-auto">
        <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
          <CardHeader>
            <CardTitle>Staking Pool Configuration</CardTitle>
            <CardDescription>
              Adjust the parameters for your staking pool.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pool-name">Pool Name</Label>
                <Input id="pool-name" defaultValue={poolConfig.pool_name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pool-desc">Pool Description</Label>
                <Input
                  id="pool-desc"
                  defaultValue={poolConfig.pool_description}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reward-rate">Reward Rate (per token/sec)</Label>
                <Input
                  id="reward-rate"
                  type="number"
                  defaultValue={poolConfig.reward_rate_per_token_per_second}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-stake">Min Stake Amount</Label>
                <Input
                  id="min-stake"
                  type="number"
                  defaultValue={poolConfig.min_stake_amount}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-duration">
                  Min Stake Duration (seconds)
                </Label>
                <Input
                  id="min-duration"
                  type="number"
                  defaultValue={poolConfig.min_stake_duration}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="penalty">Early Withdrawal Penalty (BPS)</Label>
                <Input
                  id="penalty"
                  type="number"
                  defaultValue={poolConfig.early_withdrawal_penalty_bps}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="max-stake-enabled"
                  defaultChecked={!!poolConfig.max_stake_per_user}
                />
                <Label htmlFor="max-stake-enabled">
                  Set Max Stake Per User
                </Label>
              </div>
              <Input
                id="max-stake"
                type="number"
                defaultValue={poolConfig.max_stake_per_user}
                placeholder="e.g. 10000"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="max-pool-enabled"
                  defaultChecked={!!poolConfig.max_pool_size}
                />
                <Label htmlFor="max-pool-enabled">Set Max Pool Size</Label>
              </div>
              <Input
                id="max-pool"
                type="number"
                defaultValue={poolConfig.max_pool_size}
                placeholder="e.g. 1000000"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lock-period-enabled"
                  defaultChecked={!!poolConfig.lock_period}
                />
                <Label htmlFor="lock-period-enabled">
                  Set Lock Period (seconds)
                </Label>
              </div>
              <Input
                id="lock-period"
                type="number"
                defaultValue={poolConfig.lock_period}
                placeholder="e.g. 2592000 for 30 days"
              />
            </div>
            <div className="flex justify-end">
              <Button className="button-glow">Update Pool</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

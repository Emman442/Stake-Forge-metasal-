"use client";
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
import { use, useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@/hooks/use-program";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { BN } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import{toast} from "sonner";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

export default function PoolAdminPage({
  params,
}: {
  params: Promise<{ poolId: string }>;
}) {
  const { program, provider } = useProgram();
  const { publicKey } = useWallet();

  const resolvedParams = use(params);
  const { poolId } = resolvedParams;

  const [fundAmount, setFundAmount] = useState<number>();
  const [pool, setPool] = useState<any>(null);
  const [isFunding, setIsFunding] = useState(false);
  const [loading, setLoading] = useState(true);
  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  });

  useEffect(() => {
    const fetchPool = async () => {
      if (!program) return;
      try {
        setLoading(true);

        const rawPools = await program.account.stakingPool.all();

        const match = rawPools.find((p) => p.account.tokenSymbol === poolId);

        if (!match) {
          console.warn(`No pool found for ${poolId}`);
          setPool(null);
          return;
        }

        let metadata = null;
        if (match.account.metadataUri) {
          try {
            const cid = match.account.metadataUri.replace("ipfs://", "");
            const url = `https://ipfs.io/ipfs/${cid}`;
            const res = await fetch(url);
            if (res.ok) {
              metadata = await res.json();
            }
          } catch (err) {
            console.error("Error fetching metadata:", err);
          }
        }

        setPool({
          pubkey: match.publicKey.toBase58(),
          ...match.account,
          metadata,
        });
      } catch (err) {
        console.error("Error fetching pool:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPool();
  }, [program, publicKey, poolId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex flex-col gap-2">
          <LoadingSpinner size="lg" />
          <p>Loading pool...</p>
        </div>
      </div>
    );
  }
  const handleFundPool = async () => {
    if (!program || !publicKey) return;
    if (!fundAmount) {
      toast.info("Fund Amount is Empty!");
      return;
    }

    try {
      const [stakingPoolPda, stakingPoolbump] = useMemo(() => {
        return PublicKey.findProgramAddressSync(
          [
            Buffer.from("staking_pool"),
            new PublicKey(pool.creator).toBuffer(),
            new PublicKey(pool.tokenMint).toBuffer(),
          ],
          program!.programId
        );
      }, [pool.creator, pool.tokenMint, program?.programId]);

      const getStakeAccount = async () => {
        if (!provider?.wallet?.publicKey)
          throw new Error("Wallet not connected");

        return await getOrCreateAssociatedTokenAccount(
          connection,
          provider.wallet.payer!,
          new PublicKey(pool.tokenMint),
          provider.wallet.publicKey
        );
      };

      const [globalStatePda, _] = PublicKey.findProgramAddressSync(
        [Buffer.from("global_state")],
        program!.programId
      );

      const [rewardVaultPda, rewardVaultPdaBump] =
        PublicKey.findProgramAddressSync(
          [Buffer.from("reward_vault"), stakingPoolPda.toBuffer()],
          program.programId
        );

      const stakeAcct = await getStakeAccount();

      const tx = await program.methods
        .fundRewardPool(new BN(fundAmount * 10 ** pool.decimals))
        .accounts({
          funder: publicKey,
          stakingPool: stakingPoolPda,
          //@ts-ignore
          globalState: globalStatePda,
          funderRewardAccount: stakeAcct.address,
          rewardVault: rewardVaultPda,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        })
        .rpc();
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const txDetails = await connection.getTransaction(tx, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,
      });

      if (!txDetails) {
        throw new Error("Transaction not found or not confirmed");
      }

      const logs = txDetails?.meta?.logMessages;
      const eventLog = logs?.find((l) => l.startsWith("Program data:"));

      if (eventLog) {
        const encoded = eventLog.replace("Program data: ", "");
        const decoded = program.coder.events.decode(encoded);
        if (decoded?.name === "poolFunded") {
          toast.success("You've sucessfully Funded your pool!", {
            cancel: {
              label: "View Transaction",
              onClick: () =>
                window.open(
                  `https://solscan.io/tx/${tx}?cluster=devnet`,
                  "_blank"
                ),
            },
          });
          return;
        }
      }
    } catch (error) {
      setIsFunding(false);
      toast.error("Error Funding Campaign");
    } finally {
      setIsFunding(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-glow sm:text-5xl font-headline">
          Pool Admin: <span className="text-primary">{pool.metadata.name}</span>
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          Manage the settings and funds for your staking pool. Pool ID: {poolId}
        </p>
      </section>

      <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="space-y-8">
          <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
            <CardHeader>
              <CardTitle>Fund Pool</CardTitle>
              <CardDescription>
                Add reward tokens to the pool to be distributed to stakers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fund-amount">Amount</Label>
                <div className="relative">
                  <Input
                    id="fund-amount"
                    type="number"
                    placeholder={`e.g., 10000 ${poolId}`}
                    className="pl-8"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(Number(e.target.value))}
                  />
                </div>
              </div>
              <Button
                onClick={handleFundPool}
                disabled={isFunding}
                className="w-full button-glow"
              >
                {isFunding ? "Funding..." : "Fund Pool"}
              </Button>
            </CardContent>
          </Card>
          {/* <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
              <CardDescription>
                Withdraw reward tokens from the pool.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-baseline p-4 rounded-lg bg-background/50">
                <span className="text-muted-foreground">Available Balance</span>
                <span className="text-2xl font-bold font-code text-glow">
                  {poolConfig.pool_balance.toLocaleString()}{" "}
                  {poolId}
                </span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount</Label>
                <div className="relative">
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="e.g., 5000"
                    className="pl-8"
                  />
                  <span className="absolute left-2.5 top-2.5 text-muted-foreground">
                    {poolConfig.token_symbol}
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Withdraw Funds
              </Button>
            </CardContent>
          </Card> */}
        </div>
        <Card className="bg-secondary/30 backdrop-blur-sm card-glow lg:col-span-1">
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
                <Input id="pool-name" defaultValue={pool.metadata.name} />
              </div>
              {/* <div className="space-y-2 col-span-2">
                <Label htmlFor="reward-rate">Reward Rate (per token/sec)</Label>
                <Input
                  id="reward-rate"
                  type="number"
                  defaultValue={poolConfig.reward_rate_per_token_per_second}
                />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="min-stake">Min Stake Amount</Label>
                <Input
                  id="min-stake"
                  type="number"
                  defaultValue={
                    pool.config.minStakeAmount / 10 ** pool.decimals
                  }
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="max-pool-enabled"
                  defaultChecked={!!pool.max_pool_size}
                />
                <Label htmlFor="max-pool-enabled">Set Max Pool Size</Label>
              </div>
              <Input
                id="max-pool"
                type="number"
                defaultValue={pool.config.maxStakePerUser / 10 ** pool.decimals}
                placeholder="e.g. 1000000"
              />
            </div>
            {/* <div className="flex justify-end pt-4">
              <Button className="button-glow">Update Pool</Button>
            </div> */}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

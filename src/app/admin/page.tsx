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
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@/hooks/use-program";
import { PublicKey } from "@solana/web3.js";
import dynamic from "next/dynamic";
import * as anchor from "@coral-xyz/anchor";
import { toast } from "sonner";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
export default function AdminDashboardPage() {
  const { publicKey } = useWallet();
  const { program } = useProgram();
  const [isCreatingGlobalState, setIsCreatingGlobalState] = useState(false);

  const [globalState, setGlobalState] = useState({
    admin: "",
    platform_fee_bps: 0,
    // total_pools_created: 0,
    platform_fee_vault: "",
  });

  const [pdaExists, setPdaExists] = useState<boolean | null>(null);
  const [globalStatePDA, _] = program
    ? PublicKey.findProgramAddressSync(
        [Buffer.from("global_state")],
        program.programId
      )
    : [null, null];

  useEffect(() => {
    const checkPda = async () => {
      if (!program || !globalStatePDA) return;

      try {
        const account = await program.account.globalState.fetch(globalStatePDA);
        if (account) {
          setPdaExists(true);
          setGlobalState({
            admin: account.admin.toBase58(),
            platform_fee_bps: account.platformFeeBps,
            // total_pools_created: account.totalPoolsCreated.toNumber(),
            platform_fee_vault: account.platformFeeVault.toBase58(),
          });
        }
      } catch (err) {
        // PDA does not exist yet
        setPdaExists(false);
      }
    };

    checkPda();
  }, [program, globalStatePDA]);

  if (!publicKey || !program) {
    return (
      <div className="min-h-screen justify-center flex items-center ">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p>Please Connect your wallet to continue!</p>
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  const handleCreateGlobalState = async () => {
    if (!program || !publicKey) return;
    try {
      setIsCreatingGlobalState(true);
      const tx = await program.methods
        .initializeGlobalState(globalState.platform_fee_bps)
        .accounts({
          admin: publicKey,
          //@ts-ignore
          global_state: globalStatePDA,
          platformFeeVault: publicKey,
          sytemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      setPdaExists(true);
      setIsCreatingGlobalState(false);
      toast.success("Global State Initialized successfully", {
        cancel: {
          label: "View Transaction",
          onClick: () =>
            window.open(`https://solscan.io/tx/${tx}?cluster=devnet`, "_blank"),
        },
      });
    } catch (error) {
      setIsCreatingGlobalState(false);
      toast.error(`Failed to Create Global State: ${error}`);
    } finally {
      setIsCreatingGlobalState(false);
    }
  };

  
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
              <Input id="admin" value={globalState.admin} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-fee">Platform Fee (BPS)</Label>
              <Input
                id="platform-fee"
                type="number"
                value={globalState.platform_fee_bps}
                // readOnly
                onChange={(e) => {
                  setGlobalState({
                    ...globalState,
                    platform_fee_bps: Number(e.target.value),
                  });
                }}
              />
              <p className="text-xs text-muted-foreground">
                Basis points. 100 BPS = 1%.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee-vault">Platform Fee Vault</Label>
              <Input
                id="fee-vault"
                value={globalState.platform_fee_vault}
                readOnly
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="total-pools">Total Pools Created</Label>
              <Input
                id="total-pools"
                value={globalState.total_pools_created}
                readOnly
                disabled
              />
            </div> */}
            <div className="flex justify-end">
              <Button
                className="button-glow"
                onClick={handleCreateGlobalState}
                disabled={isCreatingGlobalState || pdaExists === null}
              >
                {pdaExists === null && "Loading..."}
                {pdaExists !== null &&
                  !isCreatingGlobalState &&
                  (pdaExists ? "Update" : "Create")}
                {isCreatingGlobalState && "Creating..."}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

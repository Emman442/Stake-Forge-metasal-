"use client";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { CustomStakingPage } from "@/components/staking/CustomStakingPage";
import { useProgram } from "@/hooks/use-program";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { PublicKey } from "@solana/web3.js";

export default function StakePoolPage({
  params,
}: {
  params: { poolId: string };
}) {
  const { program } = useProgram();
  const [poolData, setPoolData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [poolNotFound, setPoolNotFound] = useState(false);

  const { poolId } = params;

  useEffect(() => {
    if (!program) return;

    async function fetchPools() {
      try {
        const res = await program!.account.stakingPool.all();
        const pool = res.find((p: any) => p.account.tokenSymbol.toLowerCase() === poolId.toLowerCase());
        if (!pool) {
          setPoolNotFound(true);
          return;
        }

        const cid = pool?.account?.metadataUri?.replace("ipfs://", "");
        if (!cid) {
          setPoolNotFound(true);
          return;
        }

        const url = `https://ipfs.io/ipfs/${cid}`;
        const metaRes = await fetch(url);
        const meta = await metaRes.json();
        setPoolData(meta);
      } catch (err) {
        console.error("Error fetching pool:", err);
        setPoolNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPools();
  }, [program, poolId]);

  if (poolNotFound && !loading) {
    notFound();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex flex-col gap-2">
          <LoadingSpinner size="lg" />
          <p className="text-center text-white text-xl">
            Please wait while we fetch this staking pool...
          </p>
        </div>
      </div>
    );
  }

  return poolData ? <CustomStakingPage pool={poolData} /> : null;
}

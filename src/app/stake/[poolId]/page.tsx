"use client"
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { CustomStakingPage } from "@/components/staking/CustomStakingPage";
import { useProgram } from "@/hooks/use-program";
import { use, useEffect, useState } from "react";

  export default function StakePoolPage({ params }: { params: Promise<{ poolId: string }> }) {
    const { program } = useProgram();
    const [poolData, setPoolData] = useState<any>(null);
    const { poolId } = use(params);

    const [pools, setPools] = useState<any[]>([]);

    useEffect(() => {
      if (!program) return; 
      async function fetchPools() {
        try {
          const res = await program?.account.stakingPool.all();
          setPools(res);
        } catch (err) {
          console.error("Error fetching pools:", err);
        }
      }

      fetchPools();
    }, [program]);

    const pool = pools[0];
    // "ipfs://bafkreidhyo4ks5pcvxf6opt2aqpjlwahwnebexyfx45vwjgwgn37qlqgfq"

    const cid = pool?.account?.metadataUri?.replace("ipfs://", "");
    const url = `https://ipfs.io/ipfs/${cid}`;
    console.log(cid)

    useEffect(() => {
      if (!program) return;
      if (!cid) return;
      async function fetchPoolData() {
        try {
           const res = await fetch(url);
           const data = await res.json();
          setPoolData(data);
        } catch (err) {
          console.error("Error fetching pools:", err);
        }
      }

      fetchPoolData();
    }, [program, cid, pool, url]);

    return poolData ? (
      <CustomStakingPage pool={poolData} />
    ) : (
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

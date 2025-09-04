"use client"
import { CustomStakingPage } from "@/components/staking/CustomStakingPage";
import { useProgram } from "@/hooks/use-program";
import { PublicKey } from "@solana/web3.js";
import { use, useEffect, useState } from "react";

  export default function StakePoolPage({ params }: { params: Promise<{ poolId: string }> }) {
    // In a real app, you would fetch pool data based on the poolId
    const { program } = useProgram();
    const [poolData, setPoolData] = useState<any>(null);
    const { poolId } = use(params);

    const [pools, setPools] = useState<any[]>([]);

    // const [stakingPoolPda, stakingPoolbump] = PublicKey.findProgramAddressSync(
    //   [Buffer.from("stakingpool"), new PublicKey(poolId).toBuffer()],
    //   program?.programId
    // );

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
      <div>Loading...</div>
    );
  }

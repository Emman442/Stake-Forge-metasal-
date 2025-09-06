"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Link as LinkIcon, Users, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useProgram } from "@/hooks/use-program";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { set } from "date-fns";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function DashboardPage() {
  
  const { publicKey } = useWallet();
  const { program } = useProgram();
  const [myPools, setMyPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
 useEffect(() => {
   const fetchMyPools = async () => {
     if (!program || !publicKey) return;

     try {
       setLoading(true);
       const pools = await program.account.stakingPool.all([
         {
           memcmp: {
             offset: 8,
             bytes: publicKey.toBase58(),
           },
         },
       ]);

       // Map pools with metadata fetch
       const poolsWithMeta = await Promise.all(
         pools.map(async (p) => {
           const account = p.account;
           let metadata = null;

           if (account.metadataUri) {
             try {
               const cid = account.metadataUri.replace("ipfs://", "");
               const url = `https://ipfs.io/ipfs/${cid}`;
               const res = await fetch(url);
               if (res.ok) {
                 metadata = await res.json();
               }
             } catch (err) {
               console.error(
                 `Error fetching metadata for ${account.tokenSymbol}:`,
                 err
               );
             }
           }

           return {
             pubkey: p.publicKey,
             ...account,
             metadata, // attach metadata here
           };
         })
       );

       setMyPools(poolsWithMeta);
     } catch (err) {
       console.error("Error fetching pools:", err);
     } finally {
       setLoading(false);
     }
   };

   fetchMyPools();
 }, [program, publicKey]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex flex-col gap-2">
          <LoadingSpinner size="lg" />
          <p>Loading your pools...</p>
        </div>
      </div>
    );
  }
  if(myPools.length === 0) { return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 py-16 sm:py-24 flex flex-col items-center justify-center gap-2">
        <p>You've not created any pools yet. </p>
        <Button asChild size="lg" className="button-glow">
          <Link href="/create">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Pool
          </Link>
        </Button>
      </div>
    </div>
  ); }

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 space-y-12">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-glow font-headline">
            My Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your staking pools and view your referral earnings.
          </p>
        </div>
        <Button asChild size="lg" className="button-glow">
          <Link href="/create">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Pool
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-3 space-y-8">
          <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
            <CardHeader>
              <CardTitle>My Staking Pools</CardTitle>
              <CardDescription>
                A list of all staking pools you have created.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pool Name</TableHead>
                    <TableHead>TVL</TableHead>
                    <TableHead>Stakers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myPools.map((pool) => (
                    <TableRow key={pool.stakeTokenMint}>
                      <TableCell className="font-medium text-glow">
                        {pool.metadata.name}
                      </TableCell>
                      <TableCell className="font-code">
                        {Number(pool.totalStaked)/(10**pool.decimals)}
                      </TableCell>
                      <TableCell>{Number(pool.totalStakers)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            pool.isActive? "default" : "secondary"
                          }
                          className={
                            pool.isActive
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }
                        >
                          {pool.isActive? "Live": "ended"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/admin/${pool.tokenSymbol}`}>Manage</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
} 


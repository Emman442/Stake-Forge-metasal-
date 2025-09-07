"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/helpers/formatDate";
import { formatNumber } from "@/helpers/formatNumber";
import { getTokenBalance } from "@/helpers/getTokenBalance";
import { ipfsToHttp } from "@/helpers/ipfstohttp";
import { useProgram } from "@/hooks/use-program";
import { usePostData } from "@/hooks/usePostData";
import { AnchorProvider, BN } from "@coral-xyz/anchor";
import {
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FaDiscord, FaStackExchange, FaXTwitter } from "react-icons/fa6";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { useFetchActivity } from "@/hooks/useFetchActivity";
import { ExternalLink, Wallet } from "lucide-react";
import { truncateHash } from "@/helpers/truncateHash";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export interface PoolConfigInterfaceMetadata {
  creator: string;
  name: string;
  tokenMint: string;
  symbol?: string;
  description?: string;
  penalty: string;
  image?: string;
  external_url?: string;
  reward_rate_per_token_per_second: number;
  tokenSymbol: string;
  links: {
    x?: string;
    discord?: string;
  };
  colors?: {
    background: string;
    buttons: string;
    header: string;
  };
  adminFee: string;
}

export function CustomStakingPage({
  pool,
}: {
  pool: PoolConfigInterfaceMetadata;
}) {
  const { publicKey, connected } = useWallet();
  const [tokenBalace, setTokenBalance] = useState<number>(0);
  const [poolDetails, setPoolDetails] = useState<any>();
  const [isStaking, setIsStaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [stakeAmount, setStakeAmount] = useState<number>();
  const [userDetails, setUserDetails] = useState<any>();
  const [lockupDuration, setLockupDuration] = useState<number>(7);
  const [unstakeAmount, setUnstakeAmount] = useState<number>(0);
  const { mutate } = usePostData();

  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  });
  const wallet = useAnchorWallet();

  const provider = new AnchorProvider(connection, wallet!, {
    preflightCommitment: "processed",
  });

  const { data, isLoading, error } = useFetchActivity(
    publicKey!,
    pool.tokenSymbol!
  );
  const { program } = useProgram();
  if (!program || !publicKey) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Please connect your wallet to continue
      </div>
    );
  }

  const src = ipfsToHttp(pool.image!);

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

  const [globalStatePda, _] = PublicKey.findProgramAddressSync(
    [Buffer.from("global_state")],
    program!.programId
  );

  const [stakeVaultPda, stakeVaultPdaBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("stake_vault"), stakingPoolPda.toBuffer()],
    program!.programId
  );
  const [userStakePda, userStakePdaBump] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_stake"),
      publicKey!.toBuffer(),
      stakingPoolPda.toBuffer(),
    ],
    program!.programId
  );

  useEffect(() => {
    const fetchPoolDetails = async () => {
      if (!stakingPoolPda) return;
      try {
        const details = await program?.account.stakingPool.fetch(
          stakingPoolPda
        );
        setPoolDetails(details);
        console.log(details.config.minStakeAmount.toNumber());
      } catch (err) {}
    };

    fetchPoolDetails();
  }, [stakingPoolPda]);
  useEffect(() => {
    const fetchUserStakeDetails = async () => {
      if (!userStakePda) return;
      try {
        const details = await program?.account.userStake.fetch(userStakePda);
        setUserDetails(details);
      } catch (err) {
        // If account doesn't exist, fallback to default values
        setUserDetails({
          amount: new BN(0),
          pendingRewards: new BN(0),
          lastUpdateTime: new BN(Math.floor(Date.now() / 1000)),
          lockupDuration: new BN(0),
          startTime: new BN(0),
        });
      }
    };

    fetchUserStakeDetails();
  }, [stakingPoolPda]);

  useEffect(() => {
    const fetchTokenBal = async () => {
      if (!publicKey || !pool?.tokenMint) return;

      try {
        const balance = await getTokenBalance(
          new PublicKey(publicKey),
          new PublicKey(pool.tokenMint)
        );
        const poolBalance = await getTokenBalance(
          publicKey,
          new PublicKey(pool.tokenMint)
        );
        setTokenBalance(balance);
      } catch (err) {
        console.error("Error fetching token balance:", err);
      }
    };

    fetchTokenBal();
  }, [publicKey, pool?.tokenMint]);

  function calculateClaimable() {
    if (!userDetails || !poolDetails) return;
    const now = Math.floor(Date.now() / 1000); // seconds
    const timeElapsed = now - userDetails.lastUpdateTime.toNumber();
    const newRewards =
      timeElapsed *
      (userDetails?.amount.toNumber() / 10**poolDetails.decimals)*
      (poolDetails?.config.rewardRatePerTokenPerSecond.toNumber() / 10000);

    return userDetails?.pendingRewards.toNumber() + newRewards;
  }

  const lockupDurationSeconds = userDetails?.lockupDuration.toNumber();
  const no_of_days = lockupDurationSeconds / (24 * 60 * 60);
  const startTimeSec = userDetails?.startTime.toNumber();
  const endTimeSec = startTimeSec + lockupDurationSeconds;
  const endDate = new Date(endTimeSec * 1000);

  function calculateDailyReward(tokensStaked: number) {
    if (!poolDetails) return 0;
    const secondsInDay = 86400;
    return (
      (poolDetails.config.rewardRatePerTokenPerSecond.toNumber() / 10000) *
      tokensStaked*
      secondsInDay
    )/10**(poolDetails.decimals);
  }
  const claimable = calculateClaimable() / 10 ** poolDetails?.decimals;
  const canClaim = claimable > 0;

  const getStakeAccount = async () => {
    if (!provider?.wallet?.publicKey) throw new Error("Wallet not connected");

    return await getOrCreateAssociatedTokenAccount(
      connection,
      provider.wallet.payer!,
      new PublicKey(pool.tokenMint),
      provider.wallet.publicKey
    );
  };
  const getCreatorpenaltyAccount = async () => {
    if (!provider?.wallet?.publicKey) throw new Error("Wallet not connected");

    return await getOrCreateAssociatedTokenAccount(
      connection,
      provider.wallet.payer!,
      new PublicKey(pool.tokenMint),
      new PublicKey(pool.creator)
    );
  };
  const getPlatformFeeAccount = async () => {
    if (!provider?.wallet?.publicKey) throw new Error("Wallet not connected");

    return await getOrCreateAssociatedTokenAccount(
      connection,
      provider.wallet.payer!,
      new PublicKey(pool.tokenMint),
      new PublicKey(process.env.NEXT_PUBLIC_PLATFORM_FEE_VAULT!)
    );
  };

  const handleStake = async () => {
    if (!stakeAmount) {
      toast.info("Enter an Amount to stake");
      return;
    }

    if (!program || !publicKey) return;
    const duration = new BN(lockupDuration * 24 * 60 * 60);
    try {
      setIsStaking(true);
      const stakeAccount = await getStakeAccount();
      const tx = await program.methods
        .stake(new BN(stakeAmount * 10 ** poolDetails.decimals), duration)
        .accounts({
          user: publicKey,
          stakingPool: stakingPoolPda,
          //@ts-ignore
          userStake: userStakePda,
          userStakeAccount: await stakeAccount.address,
          stakeVault: stakeVaultPda,

          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
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
        if (decoded?.name === "tokensStaked") {
          setIsStaking(false);

          const newActivity = {
            user: publicKey.toString(),
            action: "stake",
            amount: stakeAmount,
            lock_time: no_of_days.toString(),
            timestamp: startTimeSec,
            transaction: tx,
            tokenSymbol: pool.tokenSymbol!,
          };

          mutate(newActivity);

          toast.success("You've sucessfully deposited tokens!", {
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
      setIsStaking(false);
      toast.error("Transaction failed. Please try again.");
    } finally {
      setIsStaking(false);
    }
  };
  const handleClaim = async () => {
    if (!program || !publicKey) return;

    try {
      setIsClaiming(true);
      const stakeAccount = await getStakeAccount();
      const platformFeeVault = await getPlatformFeeAccount();
      const [rewardVaultPda, rewardVaultPdaBump] =
        PublicKey.findProgramAddressSync(
          [Buffer.from("reward_vault"), stakingPoolPda.toBuffer()],
          program.programId
        );

      const tx = await program.methods
        .claimRewards()
        .accounts({
          user: publicKey,
          stakingPool: stakingPoolPda,
          userRewardAccount: stakeAccount.address,
          //@ts-ignore
          globalState: globalStatePda,
          userStake: userStakePda,
          userStakeAccount: stakeAccount.address,
          stakeVault: stakeVaultPda,
          platformFeeVault: platformFeeVault.address,
          tokenProgram: TOKEN_PROGRAM_ID,
          rewardVault: rewardVaultPda,
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
        if (decoded?.name === "rewardsClaimed") {
          setIsClaiming(false);
          const newActivity = {
            action: "claim",
            user: publicKey.toString(),
            amount: claimable,
            // lockTime: null,
            timestamp: Math.floor(Date.now() / 1000),
            transaction: tx,
            tokenSymbol: pool.tokenSymbol!,
          };
          mutate(newActivity);
          toast.success("Tokens claimed succesfully!", {
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
      setIsClaiming(false);
    } catch (error) {
      setIsClaiming(false);
      toast.error("Error Claiming Rewards");
    } finally {
      setIsClaiming(false);
    }
  };
  const handleUnstake = async () => {
    if (!program || !publicKey) return;
    if (!unstakeAmount) {
      toast.error("Enter amount to unstake");
    }
    const stakeAccount = await getStakeAccount();
    try {
      setIsUnstaking(true);
      const tx = await program.methods
        .unstake(new BN(unstakeAmount * 10 ** poolDetails.decimals))
        .accounts({
          //@ts-ignore
          user_stake: userStakePda,
          user: publicKey,
          stakingPool: stakingPoolPda,
          userStakeAccount: stakeAccount.address,
          creatorPenaltyAccount: (await getCreatorpenaltyAccount()).address,
          stakeVault: stakeVaultPda,
          tokenProgram: TOKEN_PROGRAM_ID,
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
        if (decoded?.name === "tokensUnstaked") {
          setIsUnstaking(false);

          const newActivity = {
            user: publicKey.toString(),
            action: "unstake",
            amount: unstakeAmount,
            // lockTime: null,
            timestamp: Math.floor(Date.now() / 1000),
            transaction: tx,
            tokenSymbol: pool.tokenSymbol!,
          };

          mutate(newActivity);
          toast.success("Tokens unstaked sucessfully!", {
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
      setIsUnstaking(false);
    } catch (error) {
      setIsUnstaking(false);
      toast.error("Error Unstaking Tokens");
    } finally {
      setIsUnstaking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex gap-2 flex-col">
          <LoadingSpinner size="lg" />
          <p>Please wait while we load your pool</p>
        </div>
      </div>
    );
  }

  if (!poolDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading user or pool details...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white font-body">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center mx-auto">
          <div className="mr-4 flex items-center">
            <div className="mr-6 flex items-center space-x-2">
              <img src={src} alt="" className="w-10 h-10 rounded-full" />
              <span className="font-bold font-headline text-foreground">
                {pool.tokenSymbol}
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <WalletMultiButton
                  style={{
                    background: "transparent",
                    height: "40px",
                    padding: "0 16px 0 40px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    color: "#00E6B8",
                    border: "1px solid #00E6B8",
                  }}
                />
                {connected ? (
                  <span className="left-0 absolute"></span>
                ) : (
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00E6B8] pointer-events-none" />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-xl flex items-center justify-center">
        <img
          src={src}
          alt={`${pool.name} header`}
          className="object-contain opacity-10 scale-150 rounded-full w-42"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40" />
      </div>

      <main className="container mx-auto px-4 py-8 -mt-24 relative z-10">
        <div className="flex justify-end items-center gap-4 mb-4">
          {pool.links.x && (
            <Link
              href={pool.links.x || ""}
              target="_blank"
              className="text-gray-300 hover:text-white"
            >
              <FaXTwitter size={30} />
            </Link>
          )}
          {pool.links.discord && (
            <Link
              href={pool.links?.discord || ""}
              target="_blank"
              className="text-gray-300 hover:text-white"
            >
              <FaDiscord />
            </Link>
          )}
        </div>

        <Card className="bg-gray-900/50 backdrop-blur-md border border-gray-700 p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-glow">
              {pool.name}
            </h1>
            <div className="text-center">
              <div className="text-sm text-gray-400">
                {formatNumber(
                  (poolDetails?.totalStaked ?? 0) /
                    10 ** (poolDetails?.decimals ?? 0)
                )}{" "}
                /{" "}
                {formatNumber(
                  (poolDetails?.config.maxPoolSize ?? 1_000_000_000) /
                    10 ** (poolDetails?.decimals ?? 0)
                )}{" "}
                Staked
              </div>

              <Progress
                value={
                  ((poolDetails?.totalStaked ?? 0) /
                    (poolDetails?.config.maxPoolSize ?? 1_000_000)) *
                  100
                }
                className="w-48 mt-1 h-2 bg-gray-700 [&>div]:bg-primary"
              />
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Reward</div>
              <div>
                {calculateDailyReward(
                  userDetails?.amount.toNumber() / 10 ** poolDetails?.decimals
                ).toFixed(5) || 0}{" "}
                {pool.tokenSymbol}/day
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-900/80 border border-gray-700">
            <CardHeader>
              <CardTitle>Stake</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  // variant="secondary"
                  variant="outline"
                  onClick={() => setLockupDuration(7)}
                  className={`${
                    lockupDuration === 7 ? "bg-primary/90" : ""
                  } hover:bg-primary/90 text-primary-foreground border-none text-white flex-1`}
                >
                  7 days
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setLockupDuration(30)}
                  className={`${
                    lockupDuration === 30 ? "bg-primary" : ""
                  } border-none hover:bg-gray-800 flex-1`}
                >
                  30 days
                </Button>
              </div>
              <div className="border border-gray-700 rounded-md p-3 bg-gray-800/50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">You stake</span>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-6 px-2 border-gray-600 hover:bg-gray-700"
                      onClick={() => setStakeAmount(tokenBalace)}
                    >
                      Max
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-6 px-2 border-gray-600 hover:bg-gray-700"
                      onClick={() => setStakeAmount(tokenBalace / 2)}
                    >
                      Half
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-1">
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    className="bg-transparent border-none outline-none text-2xl font-bold p-0 h-auto focus-visible:ring-0"
                    value={stakeAmount}
                    onChange={(e) => {
                      setStakeAmount(Number(e.target.value));
                    }}
                  />
                  <div className="flex items-center gap-1 justify-center bg-primary text-primary-foreground px-3 py-1 rounded-md">
                    <Image
                      src={src}
                      width={24}
                      height={24}
                      alt="token"
                      className="rounded-full"
                      data-ai-hint="token icon"
                    />
                    <span className="font-bold">{pool.tokenSymbol}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Balance: {tokenBalace} {pool.tokenSymbol}
                </div>
              </div>
              <Button
                size="lg"
                onClick={handleStake}
                disabled={isStaking}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg"
              >
                {isStaking ? "Staking..." : "Stake"}
              </Button>
            </CardContent>
          </Card>

          {/* Claim/Unstake Box */}
          <Card className="bg-gray-900/80 border border-gray-700">
            <CardHeader>
              <CardTitle>Claim / Unstake</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-gray-400">Your Locked Tokens</div>
                  <div className="text-2xl font-bold">
                    {(userDetails?.amount.toString() ?? 0) /
                      10 ** poolDetails?.decimals}{" "}
                    {pool.tokenSymbol}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Your Claimable Tokens</div>
                  <div className="text-2xl font-bold">
                    {claimable.toFixed(5)} {pool.tokenSymbol}
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full bg-gray-400 hover:bg-gray-600"
                disabled={!canClaim}
                onClick={handleClaim}
              >
                {isClaiming ? "Claiming..." : "Claim"}
              </Button>

              <div className="border border-destructive/50 rounded-md p-3 bg-gray-800/50">
                <div className="flex justify-between items-center text-sm">
                  <span>Unstake</span>
                  <span className="text-gray-400">
                    {no_of_days} days (
                    {formatDate(new Date(startTimeSec * 1000))} →{" "}
                    {formatDate(endDate)})
                  </span>
                </div>
                <div className="flex justify-between items-end mt-1">
                  <Input
                    value={unstakeAmount}
                    type="text"
                    placeholder="0"
                    className="bg-transparent border-none text-2xl font-bold p-0 h-auto focus-visible:ring-0"
                    defaultValue="0"
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-6 px-2 border-gray-600 hover:bg-gray-700"
                        onClick={() =>
                          setUnstakeAmount(
                            userDetails?.amount.toNumber() /
                              10 ** poolDetails?.decimals
                          )
                        }
                      >
                        Max
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-6 px-2 border-gray-600 hover:bg-gray-700"
                        onClick={() =>
                          setUnstakeAmount(
                            userDetails?.amount.toNumber() /
                              10 ** poolDetails?.decimals /
                              2
                          )
                        }
                      >
                        Half
                      </Button>
                    </div>
                    <div className="flex items-center justify-center gap-1 bg-destructive text-destructive-foreground px-4 py-1 rounded-md">
                      <Image
                        src={src}
                        width={20}
                        height={20}
                        alt="token"
                        className="rounded-full"
                        data-ai-hint="token icon"
                      />
                      <span className="font-bold">{pool.tokenSymbol}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full bg-gray-400 hover:bg-gray-600"
                disabled={unstakeAmount <= 0}
                onClick={handleUnstake}
              >
                {isUnstaking ? "Unstaking..." : "Unstake"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Activity */}
        <div className="mt-8">
          <Card className="bg-gray-900/80 border border-gray-700">
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800/50">
                    <TableHead className="text-gray-400">Action</TableHead>
                    <TableHead className="text-gray-400">Amount</TableHead>
                    <TableHead className="text-gray-400">
                      Lock time - Date
                    </TableHead>
                    <TableHead className="text-gray-400">Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!data || data.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-gray-500 py-8"
                      >
                        No Activity yet!
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((activity, idx) => (
                      <TableRow
                        key={idx}
                        className="border-gray-800 hover:bg-gray-800/30"
                      >
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.amount.toFixed(5)}</TableCell>
                        <TableCell className="pl-2">
                          {activity.action === "stake" ? (
                            <>
                              {`${activity.lock_time} days - ${formatDate(
                                new Date(activity.timestamp * 1000)
                              )}`}
                            </>
                          ) : (
                            formatDate(new Date(activity.timestamp * 1000)) ?? (
                              <span className="pl-14">-</span>
                            )
                          )}
                        </TableCell>

                        <TableCell>
                          <a
                            href={`https://explorer.solana.com/tx/${activity.transaction}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            <Link
                              href={`https://solscan.io/tx/${activity.transaction}?cluster=devnet`}
                              className="flex items-center gap-1 hover:text-primary transition-colors"
                            >
                              {truncateHash(activity.transaction)}
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </a>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

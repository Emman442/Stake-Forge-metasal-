"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Palette, Wand2, Info } from "lucide-react";
import { pinata } from "@/config/pinata-config";
import * as anchor from "@coral-xyz/anchor";
import { useProgram } from "@/hooks/use-program";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { toast } from "sonner";
const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const TABS = ["token", "rewards", "settings", "customization"];

export interface PoolConfigInterface {
  tokenMint: string;
  useDifferentRewardToken: boolean;
  penalty: string;
  poolName: string;
  poolDescription: string;
  maxSize: string;
  minStake: string;
  maxStakeUser: string;
  adminFee: string;
  xLink: string;
  discordLink: string;
  tokenLogo: File | null;
  headerColor: string;
  buttonsColor: string;
  backgroundColor: string;
  tokenSymbol: string;
  rewardRate?: string;
}

export default function PoolBuilder() {
  const [currentTab, setCurrentTab] = useState(TABS[0]);
  const { program } = useProgram();
  const { publicKey } = useWallet();
  const [decimals, setDecimals] = useState<number | null>(null);
  const [isCreatingPool, setIsCreatingPool] = useState(false);
  // const [tokenSymbol, setTokenSymbol] = useState<string>("");

  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  });
 const calculateExampleReward = () => {
   if (!poolConfig.rewardRate) return;
   if (Number(poolConfig.rewardRate) <= 0) return 0;
   const tokensStaked = 100;
   const secondsIn30Days = 30 * 24 * 60 * 60;
   const totalReward =
     (((Number(poolConfig.rewardRate) * tokensStaked) / 10 ** decimals!) *
       secondsIn30Days) /
     10 ** 4;
   return totalReward.toLocaleString(undefined, { maximumFractionDigits: 2 });
 };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPoolConfig({ ...poolConfig, tokenLogo: e.target.files[0] });
    }
  };

  const [poolConfig, setPoolConfig] = useState<PoolConfigInterface>({
    tokenMint: "",
    useDifferentRewardToken: false,
    penalty: "",
    poolName: "",
    poolDescription: "",
    maxSize: "",
    minStake: "",
    maxStakeUser: "",
    adminFee: "",
    xLink: "",
    discordLink: "",
    tokenLogo: null,
    headerColor: "",
    buttonsColor: "",
    backgroundColor: "",
    tokenSymbol: "",
    rewardRate: "",
  });

  useEffect(() => {
    if (poolConfig.tokenMint.length !== 44) return;

    (async () => {
      try {
        const mintPubkey = new PublicKey(poolConfig.tokenMint);
        const mintInfo = await connection.getParsedAccountInfo(mintPubkey);
        // @ts-ignore
        const decimals = mintInfo?.value?.data?.parsed?.info?.decimals;
        if (decimals !== undefined) {
          setDecimals(decimals);
        }

        // Fetch token metadata from Jupiter
        const res = await fetch(
          `https://lite-api.jup.ag/tokens/v2/search?query=${poolConfig.tokenMint}`
        );
        const data = await res.json();

        if (data && data.length > 0) {
          const token = data[0];
          setPoolConfig((prev) => ({
            ...prev,
            tokenSymbol: token.symbol || "UNKNOWN",
          }));
        } else {
          setPoolConfig((prev) => ({
            ...prev,
            tokenSymbol: "USDC",
          }));
        }
      } catch (error) {
        console.error("Error fetching token data:", error);
        setPoolConfig((prev) => ({
          ...prev,
          tokenSymbol: "USDC",
        }));
      }
    })();
  }, [poolConfig.tokenMint]);

  const handlePoolAndDeploy = async () => {
    if (!program || !publicKey) return;

    const allPools = await program.account.stakingPool.all();

    const filteredPools = allPools.filter(
      (pool) =>
        pool.account.tokenSymbol.toLowerCase() ===
        poolConfig.tokenSymbol.toLowerCase()
    );
        setIsCreatingPool(true);

    if (filteredPools.length > 0) {
      toast.error(
        "A pool with this token symbol already exists. try creating a pool with a different token."
      );
      return;
    }

    if (
      !poolConfig.tokenMint ||
      !poolConfig.poolName ||
      !poolConfig.poolDescription ||
      !poolConfig.adminFee
    ) {
      toast.info("Please fill in all required fields.");
      return;
    }

    const [stakingPoolPda, stakingPdaBump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("staking_pool"),
        publicKey.toBuffer(),
        new PublicKey(poolConfig.tokenMint).toBuffer(),
      ],
      program.programId
    );
    const [stakeVaultPda, stakeVaultPdaBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("stake_vault"), stakingPoolPda.toBuffer()],
      program.programId
    );
    const [global_state, _] = PublicKey.findProgramAddressSync(
      [Buffer.from("global_state")],
      program.programId
    );

    try {
      // Step 1: Upload token logo to IPFS
      let imageIpfsUrl = "";
      if (poolConfig.tokenLogo) {
        //@ts-ignore
        const uploadImage = await pinata.upload.public.file(
          poolConfig.tokenLogo
        );
        imageIpfsUrl = `ipfs://${uploadImage.cid}`;
      }

      // Step 2: Construct metadata JSON
      const metadata = {
        creator: publicKey,
        name: poolConfig.poolName,
        description: poolConfig.poolDescription,
        tokenMint: poolConfig.tokenMint,
        penalty: poolConfig.penalty,
        maxSize: poolConfig.maxSize,
        minStake: poolConfig.minStake,
        maxStakeUser: poolConfig.maxStakeUser,
        adminFee: poolConfig.adminFee,
        tokenSymbol: poolConfig.tokenSymbol,
        links: {
          x: poolConfig.xLink,
          discord: poolConfig.discordLink,
        },
        colors: {
          header: poolConfig.headerColor,
          buttons: poolConfig.buttonsColor,
          background: poolConfig.backgroundColor,
        },
        image: imageIpfsUrl || "",
      };

      //@ts-ignore
      const uploadMetadata = await pinata.upload.public
        .json(metadata)
        .name(poolConfig.tokenSymbol);

      const metadataUri = `ipfs://${uploadMetadata.cid}`;

      const program_config = {
        rewardRatePerTokenPerSecond: new anchor.BN(Number(poolConfig.rewardRate)), // e.g., 0.001 tokens/sec
        minStakeAmount: new anchor.BN(
          Number(poolConfig.minStake) * 10 ** decimals!
        ),
        maxStakePerUser: new anchor.BN(
          Number(poolConfig.maxStakeUser) * 10 ** decimals!
        ),
        minStakeDuration: new anchor.BN(60),
        earlyWithdrawalPenaltyBps: new anchor.BN(poolConfig.penalty),
        maxPoolSize: new anchor.BN(
          Number(poolConfig.maxSize) * 10 ** decimals!
        ),
        lockPeriod: null,
        poolName: poolConfig.poolName,
        poolDescription: poolConfig.poolDescription,
      };

      const tx = await program?.methods
        .createStakingPool(program_config, metadataUri, poolConfig.tokenSymbol)
        .accounts({
          stakeTokenMint: new PublicKey(poolConfig.tokenMint),
          //@ts-ignore
          globalState: global_state,
          rewardTokenMint: new PublicKey(poolConfig.tokenMint),
          stakingPool: stakingPoolPda,
          stakeVault: stakeVaultPda,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          creator: publicKey!,
          systemProgram: anchor.web3.SystemProgram.programId,
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
        if (decoded?.name === "poolCreated") {
          setIsCreatingPool(false);
          toast.success("You've successfully created a staking vault.", {
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
      setIsCreatingPool(false)
      return metadataUri;
    } catch (error) {
      setIsCreatingPool(false);
      console.error("Error deploying pool:", error);
      toast.error("Something went wrong while creating the pool.");
    }
  };

  const handleNext = () => {
    const currentIndex = TABS.indexOf(currentTab);
    if (currentIndex < TABS.length - 1) {
      setCurrentTab(TABS[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = TABS.indexOf(currentTab);
    if (currentIndex > 0) {
      setCurrentTab(TABS[currentIndex - 1]);
    }
  };
  if (!publicKey || !program) {
    return (
      <div className="min-h-screen justify-center flex items-center ">
        <div className="flex flex-col gap-2 ">
          <p>Please Connect your wallet to continue!</p>
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto bg-secondary/30 backdrop-blur-sm card-glow">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <div className="p-6 border-b">
          <TabsList className="grid w-full grid-cols-4 bg-background/50">
            <TabsTrigger value="token">1. Token</TabsTrigger>
            <TabsTrigger value="rewards">2. Rewards</TabsTrigger>
            <TabsTrigger value="settings">3. Settings</TabsTrigger>
            <TabsTrigger value="customization">4. Appearance</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="token" className="p-6 space-y-6">
          <CardHeader className="p-0">
            <CardTitle>Token Configuration</CardTitle>
            <CardDescription>
              Specify the token to be staked and the reward token.
            </CardDescription>
          </CardHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="spl-address">SPL Token Address</Label>
              <Input
                id="spl-address"
                value={poolConfig.tokenMint}
                placeholder="Enter SPL token mint address"
                onChange={(e) =>
                  setPoolConfig({ ...poolConfig, tokenMint: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Token symbol and name will be fetched automatically.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Token Logo</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-border">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Logo
                </Button>
                {poolConfig.tokenLogo && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Selected:{" "}
                    <span className="py-1 bg-slate-600 px-2 rounded-full">
                      {poolConfig.tokenLogo.name} <span></span>
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="different-reward-token"
                required={true}
                checked={poolConfig.useDifferentRewardToken}
                onCheckedChange={(checked) =>
                  setPoolConfig({
                    ...poolConfig,
                    useDifferentRewardToken: checked,
                  })
                }
              />
              <Label htmlFor="different-reward-token">
                Use a different reward token
              </Label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="p-6 space-y-6">
          <CardHeader className="p-0">
            <CardTitle>Rewards Structure</CardTitle>
            <CardDescription>
              Define how rewards are calculated and distributed.
            </CardDescription>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="reward-rate">
                Reward Rate (per token per second)
              </Label>
              <Input
                id="reward-rate"
                type="number"
                placeholder="e.g., 100"
                value={poolConfig.rewardRate}
                onChange={(e) =>
                  setPoolConfig({
                    ...poolConfig,
                    rewardRate: e.target.value,
                  })
                }
              />
              <div className="text-xs text-muted-foreground p-2 bg-background/40 rounded-md flex items-center gap-2">
                <Info className="h-4 w-4 shrink-0" />
                <span>
                  Staking <strong>100</strong> tokens would yield approximately{" "}
                  <strong>{calculateExampleReward()}</strong> tokens after 30
                  days.
                </span>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="penalty">Early Withdrawal Penalty</Label>
              <Input
                id="penalty"
                type="number"
                placeholder="e.g., 5 for 5%"
                value={poolConfig.penalty}
                onChange={(e) =>
                  setPoolConfig({ ...poolConfig, penalty: e.target.value })
                }
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="p-6 space-y-6">
          <CardHeader className="p-0">
            <CardTitle>Pool Settings</CardTitle>
            <CardDescription>
              General settings and limits for your staking pool.
            </CardDescription>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pool-name">Pool Name</Label>
              <Input
                id="pool-name"
                placeholder="My Awesome Staking Pool"
                required={true}
                value={poolConfig.poolName}
                onChange={(e) =>
                  setPoolConfig({ ...poolConfig, poolName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pool-description">Pool Description</Label>
              <Textarea
                id="pool-description"
                placeholder="A short description of your staking pool."
                value={poolConfig.poolDescription}
                required={true}
                onChange={(e) =>
                  setPoolConfig({
                    ...poolConfig,
                    poolDescription: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-size">Maximum Pool Size</Label>
              <Input
                id="max-size"
                type="number"
                placeholder="e.g., 1,000,000"
                value={poolConfig.maxSize}
                onChange={(e) =>
                  setPoolConfig({
                    ...poolConfig,
                    maxSize: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-stake">Minimum Stake Amount</Label>
              <Input
                id="min-stake"
                type="number"
                placeholder="e.g., 100"
                value={poolConfig.minStake}
                onChange={(e) =>
                  setPoolConfig({
                    ...poolConfig,
                    minStake: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-stake-user">Max Stake Per User</Label>
              <Input
                id="max-stake-user"
                type="number"
                placeholder="e.g., 10,000"
                value={poolConfig.maxStakeUser}
                onChange={(e) =>
                  setPoolConfig({
                    ...poolConfig,
                    maxStakeUser: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-fee">Admin Fee</Label>
              <Input
                id="admin-fee"
                type="number"
                placeholder="e.g., 2 for 2%"
                required={true}
                value={poolConfig.adminFee}
                onChange={(e) =>
                  setPoolConfig({
                    ...poolConfig,
                    adminFee: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customization" className="p-6 space-y-6">
          <CardHeader className="p-0">
            <CardTitle>Pool Customization</CardTitle>
            <CardDescription>
              Personalize the look and feel of your staking interface.
            </CardDescription>
          </CardHeader>
          <div className="space-y-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full text-accent border-accent hover:bg-accent/10 hover:text-accent"
            >
              <Wand2 className="mr-2 h-5 w-5" />
              Style with AI ✨
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Let AI generate a theme based on your token's community trends.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-secondary px-2 text-muted-foreground">
                Or Customize Manually
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <Label>
                <div className="flex items-center gap-2">
                  Custom Colors{" "}
                  <span>
                    <Palette className="h-3 w-3" />
                  </span>
                </div>
              </Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={poolConfig.headerColor}
                  className="w-10 h-10 rounded-md border-2"
                  onChange={(e) =>
                    setPoolConfig({
                      ...poolConfig,
                      headerColor: e.target.value,
                    })
                  }
                />
                <Input
                  type="color"
                  value={poolConfig.buttonsColor}
                  className="w-10 h-10 rounded-md border-2"
                  onChange={(e) =>
                    setPoolConfig({
                      ...poolConfig,
                      buttonsColor: e.target.value,
                    })
                  }
                />
                <Input
                  type="color"
                  value={poolConfig.backgroundColor}
                  className="w-10 h-10 rounded-md border-2"
                  onChange={(e) =>
                    setPoolConfig({
                      ...poolConfig,
                      backgroundColor: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Social Links</Label>
              <Input
                placeholder="https://twitter.com/yourproject"
                value={poolConfig.xLink}
                onChange={(e) =>
                  setPoolConfig({
                    ...poolConfig,
                    xLink: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </TabsContent>

        <CardFooter className="p-6 flex justify-between">
          <div>
            {currentTab !== TABS[0] && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
          </div>
          <div>
            {currentTab !== TABS[TABS.length - 1] ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button
                size="lg"
                className="button-glow"
                disabled={isCreatingPool}
                onClick={handlePoolAndDeploy}
              >
                {isCreatingPool ? "Creating..." : "Create Pool & Deploy"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  );
}

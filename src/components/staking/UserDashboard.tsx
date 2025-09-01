'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, Gift, Zap } from "lucide-react";

export default function UserDashboard({ poolId }: { poolId: string }) {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-glow sm:text-5xl font-headline">
          My Awesome Staking Pool
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          Stake your tokens to earn rewards. Current APY is a juicy <span className="text-accent font-bold">25%</span>.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
            <CardHeader>
              <CardTitle>My Staking Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">Total Staked</span>
                <span className="text-2xl font-bold font-code text-glow">10,000.00</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">Pending Rewards</span>
                <span className="text-2xl font-bold font-code text-glow">123.45</span>
              </div>
               <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">Claimed Rewards</span>
                <span className="text-2xl font-bold font-code text-glow">567.89</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full button-glow">
                <Gift className="mr-2 h-4 w-4" />
                Claim Rewards
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
            <Tabs defaultValue="stake" className="w-full">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-2 bg-background/50">
                  <TabsTrigger value="stake">Stake</TabsTrigger>
                  <TabsTrigger value="unstake">Unstake</TabsTrigger>
                </TabsList>
              </CardHeader>
              <TabsContent value="stake">
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stake-amount">Amount to Stake</Label>
                    <div className="relative">
                      <Input id="stake-amount" placeholder="0.00" type="number" className="pr-16" />
                      <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-7">Max</Button>
                    </div>
                     <p className="text-xs text-muted-foreground">Wallet Balance: 5,000</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full button-glow">
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Stake Tokens
                  </Button>
                </CardFooter>
              </TabsContent>
              <TabsContent value="unstake">
                 <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                    <div className="relative">
                      <Input id="unstake-amount" placeholder="0.00" type="number" className="pr-16" />
                      <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-7">Max</Button>
                    </div>
                     <p className="text-xs text-muted-foreground">Staked Amount: 10,000</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full">
                    <ArrowDown className="mr-2 h-4 w-4" />
                    Unstake Tokens
                  </Button>
                   <Button variant="destructive" className="w-full bg-destructive/20 border border-destructive text-destructive hover:bg-destructive/30">
                    <Zap className="mr-2 h-4 w-4" />
                    Emergency Unstake (5% penalty)
                  </Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>

        </div>
        
        <aside className="lg:col-span-1">
          <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
            <CardHeader>
              <CardTitle>Pool Statistics</CardTitle>
              <CardDescription>Live data for this staking pool.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Pool TVL</span>
                  <span className="font-code text-glow text-foreground">$4,200,000</span>
                </div>
                 <Progress value={75} className="h-2 [&>div]:bg-accent" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Your Pool Share</span>
                  <span className="font-code text-glow text-foreground">0.23%</span>
                </div>
                 <Progress value={23} className="h-2 [&>div]:bg-accent" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Rewards Per Second</span>
                  <span className="font-code text-glow text-foreground">0.0015</span>
                </div>
              </div>
               <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Time Until Unlock</span>
                  <span className="font-code text-glow text-foreground">25d 10h 3m</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

      </div>
    </div>
  );
}

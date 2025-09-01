'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Palette, Wand2 } from "lucide-react";

const TABS = ["token", "rewards", "settings", "customization"];

export default function PoolBuilder() {
  const [currentTab, setCurrentTab] = useState(TABS[0]);

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
            <CardDescription>Specify the token to be staked and the reward token.</CardDescription>
          </CardHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="spl-address">SPL Token Address</Label>
              <Input id="spl-address" placeholder="Enter SPL token mint address" />
              <p className="text-xs text-muted-foreground">Token symbol and name will be fetched automatically.</p>
            </div>
             <div className="space-y-2">
              <Label>Token Logo</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-border">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline">Upload Logo</Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="different-reward-token" />
              <Label htmlFor="different-reward-token">Use a different reward token</Label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="p-6 space-y-6">
          <CardHeader className="p-0">
            <CardTitle>Rewards Structure</CardTitle>
            <CardDescription>Define how rewards are calculated and distributed.</CardDescription>
          </CardHeader>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>APY / APR</Label>
                <div className="flex items-center gap-4">
                  <Slider defaultValue={[25]} max={100} step={1} />
                  <span className="font-code text-lg text-glow">25%</span>
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="reward-method">Reward Calculation</Label>
                <Select>
                  <SelectTrigger id="reward-method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed APY</SelectItem>
                    <SelectItem value="time-based">Time-based multipliers</SelectItem>
                    <SelectItem value="pool-based">Pool-based distribution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lock-period">Lock Period</Label>
                 <Select>
                  <SelectTrigger id="lock-period">
                    <SelectValue placeholder="Select lock period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">Flexible</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="60d">60 Days</SelectItem>
                    <SelectItem value="90d">90 Days</SelectItem>
                    <SelectItem value="180d">180 Days</SelectItem>
                    <SelectItem value="365d">365 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="penalty">Early Withdrawal Penalty</Label>
                <Input id="penalty" type="number" placeholder="e.g., 5 for 5%" />
              </div>
            </div>
        </TabsContent>

        <TabsContent value="settings" className="p-6 space-y-6">
          <CardHeader className="p-0">
            <CardTitle>Pool Settings</CardTitle>
            <CardDescription>General settings and limits for your staking pool.</CardDescription>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pool-name">Pool Name</Label>
              <Input id="pool-name" placeholder="My Awesome Staking Pool" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pool-description">Pool Description</Label>
              <Textarea id="pool-description" placeholder="A short description of your staking pool." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-size">Maximum Pool Size</Label>
              <Input id="max-size" type="number" placeholder="e.g., 1,000,000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-stake">Minimum Stake Amount</Label>
              <Input id="min-stake" type="number" placeholder="e.g., 100" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="max-stake-user">Max Stake Per User</Label>
              <Input id="max-stake-user" type="number" placeholder="e.g., 10,000" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="admin-fee">Admin Fee</Label>
              <Input id="admin-fee" type="number" placeholder="e.g., 2 for 2%" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="customization" className="p-6 space-y-6">
          <CardHeader className="p-0">
            <CardTitle>Pool Customization</CardTitle>
            <CardDescription>Personalize the look and feel of your staking interface.</CardDescription>
          </CardHeader>
            <div className="space-y-4">
              <Button variant="outline" size="lg" className="w-full text-accent border-accent hover:bg-accent/10 hover:text-accent">
                <Wand2 className="mr-2 h-5 w-5"/>
                Style with AI ✨
              </Button>
              <p className="text-center text-xs text-muted-foreground">Let AI generate a theme based on your token's community trends.</p>
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
                <Label>Custom Colors</Label>
                 <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-md border-2" style={{backgroundColor: '#1a2332'}}></div>
                  <div className="w-10 h-10 rounded-md border-2" style={{backgroundColor: '#0d4d4d'}}></div>
                  <div className="w-10 h-10 rounded-md border-2" style={{backgroundColor: '#00ffcc'}}></div>
                  <Button variant="ghost"><Palette className="h-5 w-5"/></Button>
                 </div>
              </div>
              <div className="space-y-2">
                <Label>Social Links</Label>
                <Input placeholder="https://twitter.com/yourproject" />
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
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button size="lg" className="button-glow">
                Create Pool & Deploy
              </Button>
            )}
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  )
}

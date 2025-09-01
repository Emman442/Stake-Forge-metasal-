// src/components/staking/CustomStakingPage.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Twitter, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// You can create a proper Discord icon component later
const DiscordIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.36981C18.6988 3.50424 16.9422 2.92291 15.099 2.65111C14.8329 3.01451 14.5516 3.42961 14.2627 3.89641C12.3314 3.48131 10.4379 3.48131 8.52172 3.89641C8.23282 3.42961 7.95152 3.01451 7.68542 2.65111C5.84222 2.92291 4.08562 3.50424 2.46742 4.36981C1.43981 6.84305 0.858486 9.42998 0.733386 12.068C1.94439 12.9336 3.12519 13.6338 4.23819 14.1853C4.02049 14.5487 3.81799 14.9121 3.61549 15.2604C2.02749 14.6791 0.733386 13.8286 0.733386 13.8286C0.733386 13.8286 1.15509 15.4244 2.76999 16.815C4.38489 18.2055 6.12629 18.7868 6.12629 18.7868C6.12629 18.7868 6.57819 18.3199 6.94639 17.8953C6.39499 17.5622 5.87389 17.1867 5.38309 16.7716C5.48629 16.6961 5.58949 16.6205 5.67749 16.5373C9.80339 18.2348 14.2818 18.2348 18.104 16.5373C18.2072 16.6205 18.3104 16.6961 18.4136 16.7716C17.9228 17.1867 17.4017 17.5622 16.8351 17.8953C17.2185 18.3199 17.669 18.7868 17.669 18.7868C17.669 18.7868 19.4104 18.2055 21.0253 16.815C22.6402 15.4244 23.0619 13.8286 23.0619 13.8286C23.0619 13.8286 21.7678 14.6791 20.1798 15.2604C19.9773 14.9121 19.7748 14.5487 19.5571 14.1853C20.6701 13.6338 21.8509 12.9336 23.0619 12.068C22.9519 9.44508 22.3706 6.85815 21.3278 4.36981H20.317Z" />
    <path d="M8.28863 10.2335C7.29343 10.2335 6.48903 11.0927 6.48903 12.1601C6.48903 13.2275 7.27823 14.0867 8.28863 14.0867C9.29903 14.0867 10.1034 13.2275 10.1034 12.1601C10.1034 11.0927 9.29903 10.2335 8.28863 10.2335Z" />
    <path d="M15.5068 10.2335C14.5168 10.2335 13.7124 11.0927 13.7124 12.1601C13.7124 13.2275 14.5016 14.0867 15.5068 14.0867C16.5172 14.0867 17.3216 13.2275 17.3216 12.1601C17.3216 11.0927 16.5172 10.2335 15.5068 10.2335Z" />
  </svg>
)

interface Pool {
  id: string;
  name: string;
  tokenSymbol: string;
  headerImage: string;
  socials: {
    twitter?: string;
    discord?: string;
    telegram?: string;
  }
}

export function CustomStakingPage({ pool }: { pool: Pool }) {
  const [activeTab, setActiveTab] = useState('stake');

  return (
    <div className="min-h-screen text-white font-body">
      {/* Header Image */}
      <header className="relative w-full h-48 md:h-64">
        <Image
          src={pool.headerImage}
          alt={`${pool.name} header`}
          fill
          className="object-cover"
          data-ai-hint="header image"
        />
        <div className="absolute inset-0 bg-black/50" />
      </header>

      <main className="container mx-auto px-4 py-8 -mt-24 relative z-10">
        {/* Socials */}
        <div className="flex justify-end items-center gap-4 mb-4">
          {pool.socials.twitter && (
            <Link href={pool.socials.twitter} target="_blank" className="text-gray-300 hover:text-white">
              <Twitter />
            </Link>
          )}
          {pool.socials.discord && (
            <Link href={pool.socials.discord} target="_blank" className="text-gray-300 hover:text-white">
              <DiscordIcon />
            </Link>
          )}
          {pool.socials.telegram && (
            <Link href={pool.socials.telegram} target="_blank" className="text-gray-300 hover:text-white">
              <Send />
            </Link>
          )}
        </div>

        {/* Pool Info */}
        <Card className="bg-gray-900/50 backdrop-blur-md border border-gray-700 p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-glow">{pool.name}</h1>
            <div className="text-right">
              <div className="text-sm text-gray-400">24.96M / 999.72M Staked</div>
              <Progress value={2.5} className="w-48 mt-1 h-2 bg-gray-700 [&>div]:bg-primary" />
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Reward</div>
              <div>0 {pool.tokenSymbol}/day</div>
            </div>
          </div>
        </Card>
        
        {/* Staking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Staking Box */}
          <Card className="bg-gray-900/80 border border-gray-700">
            <CardHeader>
              <CardTitle>Stake</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button variant="secondary" className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">7 days</Button>
                <Button variant="outline" className="border-gray-600 hover:bg-gray-800 flex-1">30 days</Button>
              </div>
              <div className="border border-gray-700 rounded-md p-3 bg-gray-800/50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">You stake</span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="text-xs h-6 px-2 border-gray-600 hover:bg-gray-700">Max</Button>
                    <Button variant="outline" size="sm" className="text-xs h-6 px-2 border-gray-600 hover:bg-gray-700">Half</Button>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-1">
                  <Input 
                    type="text" 
                    placeholder="0" 
                    className="bg-transparent border-none text-2xl font-bold p-0 h-auto focus-visible:ring-0" 
                    defaultValue="0"
                  />
                  <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-md">
                     <Image src="https://picsum.photos/24/24" width={24} height={24} alt="token" className="rounded-full" data-ai-hint="token icon" />
                    <span className="font-bold">{pool.tokenSymbol}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">Balance: 100.00K {pool.tokenSymbol}</div>
              </div>
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg">Stake</Button>
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
                  <div className="text-2xl font-bold">0 {pool.tokenSymbol}</div>
                </div>
                 <div>
                  <div className="text-gray-400">Your Claimable Tokens</div>
                  <div className="text-2xl font-bold">0 {pool.tokenSymbol}</div>
                </div>
              </div>
              <Button size="lg" className="w-full bg-gray-700 hover:bg-gray-600" disabled>Claim</Button>
              
              <div className="border border-destructive/50 rounded-md p-3 bg-gray-800/50">
                <div className="flex justify-between items-center text-sm">
                  <span>Unstake</span>
                  <span className="text-gray-400">7 days (09/08/2025 16:11)</span>
                </div>
                 <div className="flex justify-between items-end mt-1">
                  <Input 
                    type="text" 
                    placeholder="0" 
                    className="bg-transparent border-none text-2xl font-bold p-0 h-auto focus-visible:ring-0" 
                    defaultValue="0"
                  />
                  <div className="flex items-center gap-2">
                     <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="text-xs h-6 px-2 border-gray-600 hover:bg-gray-700">Max</Button>
                      <Button variant="outline" size="sm" className="text-xs h-6 px-2 border-gray-600 hover:bg-gray-700">Half</Button>
                    </div>
                    <div className="flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-md">
                      <Image src="https://picsum.photos/24/24" width={24} height={24} alt="token" className="rounded-full" data-ai-hint="token icon" />
                      <span className="font-bold">{pool.tokenSymbol}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="lg" className="w-full bg-gray-700 hover:bg-gray-600" disabled>Unstake</Button>
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
                    <TableHead className="text-gray-400">Lock time - Date</TableHead>
                    <TableHead className="text-gray-400">Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-800">
                    <TableCell colSpan={4} className="text-center text-gray-500 py-8">No activity yet</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

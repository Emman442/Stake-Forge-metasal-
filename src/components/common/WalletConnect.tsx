'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Wallet } from 'lucide-react';

const wallets = [
  { name: 'Phantom', icon: '/phantom-icon.svg' },
  { name: 'Solflare', icon: '/solflare-icon.svg' },
  { name: 'Sollet', icon: '/sollet-icon.svg' },
];

// NOTE: These icons are placeholders. You would need to add actual icon files to your /public directory.
// For now, we will use a fallback.

export function WalletConnect() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card border-border">
        {wallets.map((wallet) => (
          <DropdownMenuItem key={wallet.name} className="focus:bg-secondary focus:text-secondary-foreground">
             <Wallet className="mr-2 h-4 w-4" />
            <span>{wallet.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

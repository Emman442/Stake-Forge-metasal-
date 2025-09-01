import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WalletConnect } from '../common/WalletConnect';
import { CodeXml } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CodeXml className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-foreground">StakingForge</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
              href="/create"
              className="transition-colors hover:text-primary text-muted-foreground"
            >
              Create Pool
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-primary text-muted-foreground"
            >
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <WalletConnect />
        </div>
      </div>
    </header>
  );
}

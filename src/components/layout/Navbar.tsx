"use client";
import Link from "next/link";
import { CodeXml, Wallet } from "lucide-react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { usePathname } from "next/navigation";
const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export function Navbar() {

 const { connected } = useWallet();
 const pathname = usePathname();
console.log(pathname)
 // 👇 list of pages where you don't want the Navbar
if (pathname.startsWith("/stake")){
  return null
}

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CodeXml className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-foreground">
              StakingForge
            </span>
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
             { connected ? <span className="left-0 absolute"></span>: <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00E6B8] pointer-events-none" />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

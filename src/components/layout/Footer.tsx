import { CodeXml, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <CodeXml className="h-6 w-6 text-accent" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by StakingForge. The source code is available on GitHub.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" target="_blank" rel="noreferrer" className="font-medium text-muted-foreground transition-colors hover:text-accent">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" target="_blank" rel="noreferrer" className="font-medium text-muted-foreground transition-colors hover:text-accent">
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

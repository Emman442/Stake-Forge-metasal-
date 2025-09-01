import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <p className="text-primary font-semibold tracking-wider">
            CREATE SOLANA TOKEN STAKING
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground !leading-tight">
            Create Token Staking on Solana{' '}
            <span className="text-primary">FOR FREE</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
            With our Staking Builder you will be able to create your Custom Staking Site of your Token in Solana within 5 minutes and 0 coding.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="button-glow px-10 py-6 text-lg">
              <Link href="/create">
                Create now
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <Image 
            src="https://picsum.photos/800/600"
            alt="Staking UI Collage"
            width={800}
            height={600}
            className="rounded-xl shadow-2xl"
            data-ai-hint="UI collage"
          />
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeartCrack } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex h-[calc(100vh-10rem)] items-center justify-center px-4 py-16 sm:py-24">
      <div className="flex flex-col items-center text-center">
        <HeartCrack className="h-24 w-24 text-primary animate-bounce" />
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-glow sm:text-5xl font-headline">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-md mx-auto">
          Oops! It looks like the page you were searching for has wandered off.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="button-glow">
            <Link href="/">
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

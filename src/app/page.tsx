import Link from 'next/link';
import { Button } from '@/components/ui/button';
import StatsDashboard from '@/components/common/StatsDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Settings, Palette } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: 'Instant Deployment',
      description: 'Launch your staking pool on Solana in minutes with our intuitive, no-code builder.',
    },
    {
      icon: <Settings className="h-8 w-8 text-accent" />,
      title: 'Flexible Rewards',
      description: 'Configure APY, lockup periods, and penalties to create a staking model that fits your tokenomics.',
    },
    {
      icon: <Palette className="h-8 w-8 text-accent" />,
      title: 'AI-Powered Customization',
      description: 'Use AI to generate a unique theme for your pool, reflecting your community\'s identity.',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-accent" />,
      title: 'Completely Free',
      description: 'StakingForge is free to use. Create and manage your staking protocol without any upfront cost.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-glow sm:text-6xl lg:text-7xl font-headline bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Create Your Token Staking Protocol on Solana
        </h1>
        <p className="mt-6 text-2xl lg:text-3xl font-bold leading-8 text-primary">
          FOR FREE
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg" className="button-glow">
            <Link href="/create">
              Create Staking Pool
            </Link>
          </Button>
        </div>
      </section>

      <section className="mt-24">
        <StatsDashboard />
      </section>

      <section className="mt-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-glow sm:text-5xl font-headline">
          The Ultimate No-Code Staking Solution
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          StakingForge provides all the tools you need to build, launch, and manage a successful staking program on the Solana blockchain. No coding required.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-secondary/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-background mx-auto">
                  {feature.icon}
                </div>
                <CardTitle className="mt-4 text-glow text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

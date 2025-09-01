'use client';

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Lock, BarChart, Trophy } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Stat {
  icon: React.ReactNode;
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

const statsData: Stat[] = [
  { icon: <Users className="h-6 w-6 text-accent" />, title: 'Total Stakers', value: 1337, },
  { icon: <Lock className="h-6 w-6 text-accent" />, title: 'Total Value Locked (TVL)', value: 4200000, prefix: '$' },
  { icon: <BarChart className="h-6 w-6 text-accent" />, title: 'Average Staking Duration', value: 180, suffix: ' Days' },
  { icon: <Trophy className="h-6 w-6 text-accent" />, title: 'Total Rewards Distributed', value: 690000, prefix: '$' },
];

function AnimatedCounter({ to, prefix = '', suffix = '' }: { to: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const duration = 2000;
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(to * progress);
      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);
    
    return () => clearInterval(counter);
  }, [to, totalFrames, frameRate]);
  
  return <span ref={ref} className="font-code">{prefix}{count.toLocaleString()}{suffix}</span>;
}

function StatsCard({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <Card ref={ref} className="bg-secondary/50 backdrop-blur-sm card-glow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
        {stat.icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-glow">
          {inView ? <AnimatedCounter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} /> : '0'}
        </div>
      </CardContent>
    </Card>
  );
}

export default function StatsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <StatsCard key={stat.title} stat={stat} />
      ))}
    </div>
  );
}

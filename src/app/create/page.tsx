import PoolBuilder from "@/components/staking/PoolBuilder";

export default function CreatePoolPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
       <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-glow sm:text-5xl font-headline">
          Staking Pool Builder
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          Create a custom staking protocol on Solana in minutes. No code required.
        </p>
      </section>
      <section className="mt-12">
        <PoolBuilder />
      </section>
    </div>
  );
}

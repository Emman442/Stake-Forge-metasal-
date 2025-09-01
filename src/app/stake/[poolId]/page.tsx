import UserDashboard from "@/components/staking/UserDashboard";

export default function StakePoolPage({ params }: { params: { poolId: string } }) {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <UserDashboard poolId={params.poolId} />
    </div>
  );
}

import { CustomStakingPage } from "@/components/staking/CustomStakingPage";

export default function StakePoolPage({ params }: { params: { poolId: string } }) {
  // In a real app, you would fetch pool data based on the poolId
  const poolData = {
    id: params.poolId,
    name: "Supa Staking",
    tokenSymbol: "SUPA",
    headerImage: "https://picsum.photos/1200/400",
    socials: {
      twitter: "#",
      discord: "#",
      telegram: "#",
    }
  };

  return (
    <CustomStakingPage pool={poolData} />
  );
}

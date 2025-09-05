import { Activity, fetchActivity } from "@/services/fetchActivity";
import { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";

export function useFetchActivity(publicKey: PublicKey) {

    const { data, isLoading, error } = useQuery<Activity[]>({
        queryKey: ["activity", publicKey.toString()],
        queryFn: () => fetchActivity(publicKey.toString()),
        staleTime: 1000 * 60, 
        enabled: !!publicKey, // 
    });

    return {data, isLoading, error}

}
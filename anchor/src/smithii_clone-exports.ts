// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SmithiiCloneIDL from '../target/idl/smithii_clone.json'
import type { SmithiiClone } from '../target/types/smithii_clone'

// Re-export the generated IDL and type
export { SmithiiClone, SmithiiCloneIDL }

// The programId is imported from the program IDL.
export const SMITHII_CLONE_PROGRAM_ID= new PublicKey(SmithiiCloneIDL.address)

// This is a helper function to get the Counter Anchor program.
export function getHugooProgram(provider: AnchorProvider, address?: PublicKey) {
    return new Program({ ...SmithiiCloneIDL, address: address ? address.toBase58() : SmithiiCloneIDL.address } as SmithiiClone, provider)
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getSmithiiCloneId(cluster: Cluster) {
    switch (cluster) {
        case 'devnet':
        case 'testnet':
            // This is the program ID for the Counter program on devnet and testnet.
            return new PublicKey("3HY3jdzJgQQwehWPNNu25ewRJogd4P2c3b38UPPSvSA1")
        case 'mainnet-beta':
        default:
            return SMITHII_CLONE_PROGRAM_ID
    }
}
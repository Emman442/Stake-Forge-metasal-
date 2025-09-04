// // // Jupiter maintains a comprehensive token list


// import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

// const connection = new Connection(clusterApiUrl("devnet"), {commitment: "confirmed"})

// export async function getSPLTokenFromJupiter(mintAddress: PublicKey) {
//   try {
//     const response = await fetch('https://token.jup.ag/all');
//     const tokens = await response.json();
//     console.log(tokens)
    
//     const token = tokens.find(t => t.address === mintAddress);
    
//     if (token) {
//       return {
//         mintAddress: token.address,
//         name: token.name,
//         symbol: token.symbol,
//         decimals: token.decimals,
//         logoURI: token.logoURI || '',
//         tags: token.tags || [],
//       };
//     }
    
//     return null;
//   } catch (error) {
//     console.error('Error fetching from Jupiter:', error);
//     return null;
//   }
// }


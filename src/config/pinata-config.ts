import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_API_JWT || "",
    pinataGateway: "cyan-abstract-penguin-699.mypinata.cloud",
});
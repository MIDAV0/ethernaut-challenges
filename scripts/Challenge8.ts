import { ethers } from "hardhat";
import * as dotenv from "dotenv"
dotenv.config()


const CONTRACT_ADDRESS = "0xC031cbA28138Fa3c690EfC096dE2A172F76Bda46"


async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.ALCHEMY_HTTPS_API_KEY
    )

    const storage = await provider.getStorageAt(CONTRACT_ADDRESS, 1)
    console.log(`The storage at ${CONTRACT_ADDRESS} is ${storage}`)

    const password = ethers.utils.toUtf8String(storage)
    console.log(`The password is ${password}`)
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
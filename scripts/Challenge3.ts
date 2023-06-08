import { ethers } from "hardhat";
import { AttackCoinFlip__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()



const TARGET_CONTRACT_ADDRESS = "0x48cf70d2A9ecE09338d3f7DaaCbbC73E43B0DD91"

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    console.log(`Using wallet address ${wallet.address}`)

    const provider = new ethers.providers.JsonRpcProvider(
        process.env.ALCHEMY_HTTPS_API_KEY
    )
    const lastBlock = await provider.getBlock("latest")
    console.log(`The last block is ${lastBlock.number}`)

    const signer = wallet.connect(provider)
    const balance = await signer.getBalance()
    console.log(`Balance is ${balance} WEI`)

    console.log("---------")

    const attackContractFactory = new AttackCoinFlip__factory(signer);
    const attackContract = await attackContractFactory.deploy(TARGET_CONTRACT_ADDRESS);
    const deployTx = await attackContract.deployTransaction.wait();
    console.log(`The attack contract was deployed at address ${attackContract.address} at block ${deployTx.blockNumber}, at TXN: ${deployTx.transactionHash}`)

    for (let i = 0; i < 10; i++) {
        const tx = await attackContract.attack();
        await tx.wait();
        console.log(`Attack ${i} was successful!`)
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
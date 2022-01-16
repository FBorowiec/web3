import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy(name, ...args) {
    const Fallback = await ethers.getContractFactory(name);
    const fallback = await Fallback.deploy(...args); // builds a json request
    await fallback.deployed();

    console.log("Fallback address:", fallback.address);

    return fallback;
}

async function printStorage(contract, name, count) {
    for (let i = 0; i < count; ++i) {
        console.log(name, i, await
                    ethers.provider.getStorageAt(contract.address, i));
    }
}

// @ts-ignore
async function fallback() {
    const a = await deploy("A");
    const b = await deploy("B", a.address);

    await printStorage(b, "B", 3);
    await b.setB(0x45);
    console.log("--------");
    await printStorage(b, "B", 3);
}

fallback();


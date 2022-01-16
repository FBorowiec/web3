import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(); // builds a json request
    await counter.deployed();

    console.log("Counter address:", counter.address);

    return counter;
}

// @ts-ignore
async function count(counter) {
    await counter.count();
    const message = await counter.getCounter();
    console.log("Counter", message);
}

deploy().then(count);


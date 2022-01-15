import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
    const helloWorld = await ethers.getContractFactory("helloWorld");
    const hello = await helloWorld.deploy(); // builds a json request
    await hello.deployed();

    return hello;
}

// @ts-ignore
async function sayHello(hello) {
    const message = await hello.hello();
    console.log(message);
}

deploy().then(sayHello);

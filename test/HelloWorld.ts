import "@nomiclabs/hardhat-ethers"; // Uses the hardhat-ethers plugin to use Ethers
import { ethers } from "hardhat";
import { expect } from "chai";

describe("hello-world", function () {
  it("should say hi", async function () {
      // 1. setup environment <- imports
      // 2. deploy contract
      // 3. call our functions to test

      // 2 what happens here is that hardhat has compiled your contract:
      // you can check it by running: `less contracts/HelloWorld.sol/HelloWorld.json | jq`
      const HelloWorld = await ethers.getContractFactory("HelloWorld");
      // This makes a transaction that deploys the contract on the ethereum network
      const hello = await HelloWorld.deploy();
      await hello.deployed(); // this waits until the transaction is mined (contract confirmed by the network enough times)

      expect(await hello.hello()).to.equal("Hello, World");
  });
});

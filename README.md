---
title: Web3 course
author: F.Borowiec
date: 2022-01-12
extensions:
    - qrcode
    - image_ueberzug
styles:
    style: paraiso-dark
    table:
        column_spacing: 3
        header_divider: "-"

---

# A tour of Web 3: Ethereum and Smart Contracts

[first-contract](theprimeagen.github.io/nft/your-first-contract)
https://blog.mgechev.com/2018/11/19/introduction-bazel-typescript-tutorial/

1. The foundation
    * building a `HelloWorld` contract.
    * testing it
    * deploying it
    * comunicating from the browser

2. Understanding solidity
    * a slightly more complex contract with reading and writing
    * on Rinkeby [Rinkeby faucet](https://faucet.rinkeby.io/)

3. Complex contract
    * the concepts
        * arrays
        * mappings
        * bits
            * what does this mean?
                * `a & b == b`
                * `(0x1 <<3) - 1`
        * testing, deploying, communicating

4. Solve the needing to update your contract

---

# Initializing the repo

If it fails: [no-such-file-or-directory](https://programmerah.com/yarn-install-error-00h00m00s-0-0-error-errno-2-no-such-file-or-directory-install-29658/)

```
yarn init -y
yarn add -D hardhat
npx hardhat
```

Select: `Create an empty hardhat.config.js`

---

# Typical smart contracts structure

```bash
- contracts
    - YourConstracts.sol
    ...
- scripts
    - deploy.ts
    ...
- test
    - sometest.js
    ...
```

## HardHat

HardHat is a tool for building and deploying contracts to any ethereum network.

Solidity is the programming language of ethereum.

```

# First contract

```solidity

// MIT
pragma solidity ^0.8.0; // Tell solidity what compiler you expect

contract HelloWorld {
    function hello() public pure returns (string memory) {
        return "Hello, World";
    }
}
```

Hint: `LspInstall solang` for neovim's native lsp

A contract looks a lot like a class (it's a state container with functions to mutate it).

Let's leave the `pure` and `memory` keywords for later.

Now compile: `npx hardhat compile`

THIS WILL FAIL! Need to bump the hardhat version to `8.10`.

Now let's analyze what has been created: `less contracts/HelloWorld.sol/HelloWorld.json | jq`

You can see:
* the deployed bytecode
* the bytecode
* what functions exist on there (in this case there is one called `hello` returning a `string`

This is all the code that's needed in order to deploy it (note the code is inside in bytecode understood by the EVM - Ethereum Virtual Machine).

# Now what? Let's test

## Install deps (a lot)

`yarn add -D @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai`

Typescript: `yarn add --save-dev ts-node typescript`

Testing types: `yarn add --save-dev chai @types/node @types/mocha @types/chai`

## `hardhat.config.js -> hardhat.config.ts`

Rename `hardhat.config.js` to Typescript (`.ts`) and add `import "@nomiclabs/hardhat-waffle"` and `ethers` to the top of it.

## Let's write a test!

Pay attention to the folder style convention!

```typescript
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
```

And run them: `npx hardhat test`

---

# Deployment script

```typescript
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
    const helloWorld = await ethers.getContractFactory("helloWorld");
    const hello = await helloWorld.deploy(); // builds a json request
    await hello.deployed();

    return hello;
}

async function sayHello(hello) {
    const message = await hello.hello();
    console.log(message);
}

deploy().then(sayHello);
```

Deploy using `npx hardhat run scripts/deploy-hello.ts --network localhost` <- This will fail!
Note you can replace localhost with any other ethereum network!

In order to create an ethereum network on you computer though you first need to create one using: `npx hardhat node`
OUTPUT:

```bash
$ npx hardhat node
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

Account #3: 0x90f79bf6eb2c4f870365e785982e1f101e93b906 (10000 ETH)
Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6

Account #4: 0x15d34aaf54267db7d7c367839aaf71a00a2c6a65 (10000 ETH)
Private Key: 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a

Account #5: 0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc (10000 ETH)
Private Key: 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba

Account #6: 0x976ea74026e726554db657fa54763abd0c3a0aa9 (10000 ETH)
Private Key: 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e

Account #7: 0x14dc79964da2c08b23698b3d3cc7ca32193d9955 (10000 ETH)
Private Key: 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356

Account #8: 0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f (10000 ETH)
Private Key: 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97

Account #9: 0xa0ee7a142d267c1f36714e4a8f75612f20a79720 (10000 ETH)
Private Key: 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

Account #10: 0xbcd4042de499d14e55001ccbb24a551f3b954096 (10000 ETH)
Private Key: 0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897

Account #11: 0x71be63f3384f5fb98995898a86b02fb2426c5788 (10000 ETH)
Private Key: 0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82

Account #12: 0xfabb0ac9d68b0b445fb7357272ff202c5651694a (10000 ETH)
Private Key: 0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1

Account #13: 0x1cbd3b2770909d4e10f157cabc84c7264073c9ec (10000 ETH)
Private Key: 0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd

Account #14: 0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097 (10000 ETH)
Private Key: 0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa

Account #15: 0xcd3b766ccdd6ae721141f452c550ca635964ce71 (10000 ETH)
Private Key: 0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61

Account #16: 0x2546bcd3c84621e976d8185a91a922ae77ecec30 (10000 ETH)
Private Key: 0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0

Account #17: 0xbda5747bfd65f08deb54cb465eb87d40e51b197e (10000 ETH)
Private Key: 0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd

Account #18: 0xdd2fd4581271e230360230f9337d5c0430bf44c0 (10000 ETH)
Private Key: 0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0

Account #19: 0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199 (10000 ETH)
Private Key: 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.
```

Let's redeploy now.
`npx hardhat run scripts/deploy-hello.ts --network localhost`

---

# Communicating from the browser

1. Install the MetaMask extension
2. Create a dummy account
3. Go to one of your accounts of the active node
4. Copy the private key
5. Import an account on MetaMask (click on your account's circular icon)
6. Select the localhost network (you need to show test networks in settings)

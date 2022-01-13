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

# Now what? Let's test

## Install deps (a lot)

`yarn add -D @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai`

Typescript: `yarn add --save-dev ts-node typescript`

Testing types: `yarn add --save-dev chai @types/node @types/mocha @types/chai`

## `hardhat.config.js -> hardhat.config.ts`

Rename `hardhat.config.js` to Typescript (`.ts`) and add `import "@nomiclabs/hardhat-waffle"` and `ethers` to the top of it.

## Let's write a test!

Pay attention to the folder style convention!

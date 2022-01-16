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

# Game contract

## Design

* We want to be able to generate random Hereos.
* The user gets to put in their class of hereo on generation
    * classes: Mage, Healer, Barbarian
    * Class will not influence stats created, therefore getting an epic hero will be hard.
* I want to be paid... 0.05 eth per hero!
* I should be able to get my heroes I have generated.
* Heroes should be stored on the chain.
* stats are strength, health, intellect, magic, dexterity
* stats are randomly generated
    * A scale of 1 - 18
    * The stats are randomly picked and their amplitude is randomly determined according to the following:
        * Stat 1 can max at 18
        * Stat 2 can max at 17
        * Stat 3 can max at 16
        * ...
* You could imagine these being an NFT
    * They are non divisable

---

# How to determine the contracts' size?

`$(($(cat artifacts/contracts/Hero.sol/Hero.json | jq .deployedBytecode | wc -c) / 2 - 1))`

Output: `zsh: command not found: 2655` <- 2.65 kb is the size of the contract

Contracts do have a hard limit of 24kb! Imagine the game gets bigger?

Everytime your contract gets deployed again (upgrade / bug fix) address changes??

* what if you had money associated with a contract?
* what if you had data associated with that contract? (items bought in the game)
* who would have to pay in order to move these items to the new contract? you.

There is a solution!

---

# Learn by doing

go to [cryptozombies.io](https://cryptozombies.io) and make their course.

---

# How to address the size problem of a contract and needing to redeploy buggy contracts?

Diamond Pattern

Use case:

* Your contract is too big.
* You will have to update your contract at some point.

EIP-2535 (Ethereum Improvement Proposal)

From the site:
```
Motivation

    A single address for unlimited contract functionality. Using a single address for contract functionality makes deployment, testing and integration with other smart contracts, software and user interfaces easier.
    Your contract exceeds the 24KB maximum contract size. You may have related functionality that it makes sense to keep in a single contract, or at a single contract address. A diamond does not have a max contract size.
    A diamond provides a way to organize contract code and data. You may want to build a contract system with a lot of functionality. A diamond provides a systematic way to isolate different functionality and connect them together and share data between them as needed in a gas-efficient way.
    A diamond provides a way to upgrade functionality. Upgradeable diamonds can be upgraded to add/replace/remove functionality. Because diamonds have no max contract size, there is no limit to the amount of functionality that can be added to diamonds over time. Diamonds can be upgradeable or immutable. It is also possible to make an upgradeable diamond and then at a later time remove its upgrade capability.
```

Three Foundational Materials required for basic Diamond Understanding

* By understanding the first two, you will know how the diamond pattern works.
* By understanding the third one, you will prevent a whole class of bugs that will dominate your contract.

* Fallbacks
* Delegate calls
* Storage / Layout

You can understand the diamond pattern, but probably not create it easily.

---

# Deploy new contract

While having a `npx hardhat node` running:

`npx hardhat run scripts/deploy-fallback.ts --network localhost`

Output:

```bash
Fallback address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
(node:393755) UnhandledPromiseRejectionWarning: ProviderError: Error: VM Exception while processing transaction: reverted with reason string 'You shouldn't be here'
    at HttpProvider.request (/home/fra/dev/web3/node_modules/hardhat/src/internal/core/providers/http.ts:49:19)
    at GanacheGasMultiplierProvider.request (/home/fra/dev/web3/node_modules/hardhat/src/internal/core/providers/gas-providers.ts:312:34)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:393755) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .c
ise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:393755) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

You shouldn't be here!

---

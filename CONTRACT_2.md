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

# Counter contract

Let's create another contract responsible for incrementing a number.

`Counter.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";  // console out from the contract

contract Counter {
    uint counter;

    function count () public returns (uint) {
        counter++;
        console.log("Counter is now: ", counter);
        return counter;
    }
}
```

And the deployment script `deploy-counter.ts`:

```typescript
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(); // builds a json request
    await counter.deployed();

    return counter;
}

// @ts-ignore
async function count(counter) {
    const message = await counter.count();
    console.log(message);
}

deploy().then(count);
```

---

# Deployment

Let's `npx hardhat compile` and `npx hardhat run scripts/deploy-counter.ts --network localhost`.

Output (this is a transaction because we changed the contract):

```bash
{
  hash: '0xe63ace5363c8c0c474327d5ba7a9885790bf59ba408bd3034028a319401bba0c',
  type: 2,
  accessList: [],
  blockHash: '0xd18e2b56bc99e297e91c2036404678e5d219caaed710b3fe4e2d78011334cc8b',
  blockNumber: 3,
  transactionIndex: 0,
  confirmations: 1,
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  gasPrice: BigNumber { value: "672222034" },
  maxPriorityFeePerGas: BigNumber { value: "0" },
  maxFeePerGas: BigNumber { value: "850781011" },
  gasLimit: BigNumber { value: "47352" },
  to: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  value: BigNumber { value: "0" },
  nonce: 2,
  data: '0x06661abd',
  r: '0x74d2fad79f245be55916556956737a1b6cfd4f4ad659ac21a364212c78eb2713',
  s: '0x29a0bc886559db5f2d4a5a7b19a96afde166238d99fa57acfd2c89d5a38627b9',
  v: 0,
  creates: null,
  chainId: 31337,
  wait: [Function (anonymous)]
}
```

Check also the output of the network:

```bash
hardhat_addCompilationResult
web3_clientVersion
eth_chainId
eth_accounts
eth_blockNumber
eth_chainId (2)
eth_estimateGas
eth_getBlockByNumber
eth_feeHistory
eth_sendTransaction
  Contract deployment: Counter
  Contract address:    0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
  Transaction:         0x1d4cb0adfea46f403e9e90126a3bbc331509f44cc5c22ec6452a92f6965ff306
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            225158 of 225158
  Block #2:            0xa93c0412ef1e2c85ae6b70b31dab719a7683f93f1ca2d64823909246695f9956

eth_chainId
eth_getTransactionByHash
eth_chainId
eth_getTransactionReceipt
eth_chainId
eth_estimateGas
eth_feeHistory
eth_sendTransaction
  Contract call:       Counter#count
  Transaction:         0xe63ace5363c8c0c474327d5ba7a9885790bf59ba408bd3034028a319401bba0c
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:                  0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
  Value:               0 ETH
  Gas used:            47352 of 47352
  Block #3:            0xd18e2b56bc99e297e91c2036404678e5d219caaed710b3fe4e2d78011334cc8b

  console.log:
    Counter is now:  1

eth_chainId
eth_getTransactionByHash
```

Storage is expensive - altered state means transactions take time to process.

---

# Let's change the contract into two functions (one that does the mutation and the other that does the reading (for free)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";  // console out from the contract

contract Counter {
    uint counter;

    function count () public {
        counter++;
        console.log("Counter is now: ", counter);
    }

    function getCounter() public view returns (uint) {
        return counter;
    }
}
```

---

# Let's adapt the deployment script

```typescript
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(); // builds a json request
    await counter.deployed();

    return counter;
}

// @ts-ignore
async function count(counter) {
    await counter.count();
    const message = await counter.getCounter();
    console.log("Counter", message);
}

deploy().then(count);
```

After deploying it once again the output should be: `Counter BigNumber: { value: "1" }`

Note: `BigNumber` because javascript can't display solidity's uint256.

You can avoid that by casting to a `uint32` inside the contract (be careful with overflows).

---

# Environment variables

Go back to the contract and remove the hardcoded wallet value and change it to `process.env.CONTRACT_ADDRESS` that you will specify in a `.env` file inside your root.

The contract address is the last `To` address of the counter contract.

Let's also modify inside the `index.ts` the functions list to add the counter's contract functions.

```typescript
import { ethers } from "ethers";

function getEth() {
    // @ts-ignore
    const eth = window.ethereum;
    if (!eth) {
        throw new Error("No Ethereum provider found");
    }
    return eth;
}

async function hasAccounts() {
    const eth = getEth();
    const accounts = await eth.request({ method: "eth_accounts" }) as string[];

    return accounts && accounts.length > 0 ? accounts : null;
}

async function requestAccounts() {
    const eth = getEth();
    const accounts = await eth.request({ method: "eth_requestAccounts" }) as string[];

    return accounts && accounts.length > 0 ? accounts : null;
}

async function run() {
    if (!await hasAccounts() && !await requestAccounts()) {
        throw new Error("No accounts found");
    }

    const counter = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        [
            "function count() public",
            "function getCounter() public view returns (uint32)",
        ],
        new ethers.providers.Web3Provider(getEth()),
    )

    const el = document.createElement("div");
    async function setCounter() {
        el.innerHTML = await counter.getCounter();
    }
    setCounter();

    const button = document.createElement("button");
    button.innerText = "increment";
    button.onclick = async function() {
        setCounter();
    }

    document.body.appendChild(el);
    document.body.appendChild(button);
}

run();
```

And rerun `webpack` before deploying. DEPLOYING WILL FAIL!

---

# How to deploy

Several things need to happen:

* Add a new network to `hardhat.config.ts`:

```typescript
  networks : {
    hardhat : {
      chainId : 1337,
    }
  }
```

* Have python running a server from the `dist` folder on port `6969`
* Restart the node
* Redeploy using the deployment script
* Take the new address of the `To` from the `eth_call`
* Substitute it in the `.env`
* Restart webpack
* Go to `localhost:6969`
* Connect to MetaMask with the test account / Reset your account
* Increment the counter
* Add the new address (`Counter contract`) - Notice same address as in `.env`
* Pay for the transaction

---

# How to deploy to a real network

* Create a Rinkeby network: [faucets.chain.link/rinkeby](https://faucets.chain.link/rinkeby)
* Deploy the Rinkeby network on `alchemyapi`.
* Add the new netowrk to `hardhat.config.ts`:

```typescript
    rinkeby: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        accounts: [`${process.env.RINKEBY_KEY}`],
    }
```

* Add a console log of the address in the deploy function of the deployment script(in order to know to the `scripts/deploy-counter.ts`:

```typescript
    await counter.deployed();

    console.log("Counter address:", counter.address);

    return counter;
```

* Deploy it using the network's name: `npx hardhat run scripts/deploy-counter.ts --network rinkeby`
* Use the new address to subsittute it inside the `.env`.
* Restart `npx webpack`
* Change the network on MetaMask to the new Rinkeby network.

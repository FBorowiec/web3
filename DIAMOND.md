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

# Diamond contract

`git clone https://www.github.com/mudgen/diamond-3-hardhat`

Add a new `A.sol` contract.

```solidity
pragma solidity ^0.8.0;

contract A {
    function getA() public pure returns (uint) {
        return 42;
    }
}
```

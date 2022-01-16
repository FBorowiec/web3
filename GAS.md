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

# GAS

What is gas?

Its the cost, in ethers, for the transaction. The typical measurement for gas is gwei. gwei is 10^9 wei. In other words, its giga weis.

* wei is the fundamental unit of ether. Its like our cents.
* gwei = 10^9 wei
* ether = 10^18 wei

How does gas price work?

[Operations costs](https://github.com/crytic/evm-opcodes)

That was in gas, but how much does gas cost?

[Gas station](ethgasstation.info)

To understand you need to understand two things.

* what a virtual machine is
* The current cost of gas. Opcode and its associated prices.

What is a virtual machine.

gas-cost * gas-used * 10^9 * eth-cost / 10^18
// Or simplified as
gas-cost * gas-used * eth-cost / 10^9

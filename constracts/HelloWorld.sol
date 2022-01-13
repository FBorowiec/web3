// SPDX-License-Identifier: MIT
import "@nomiclabs/hardhat-waffle"
pragma solidity ^0.8.0;

contract HelloWorld {

    function hello() public pure returns (string memory) {
        return "Hello, World";
    }
}

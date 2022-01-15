// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";  // console out from the contract

contract Counter {
    uint counter;

    function count () public {
        counter++;
        console.log("Counter is now: ", counter);
    }

    function getCounter() public view returns (uint32) {
        return uint32(counter);
    }
}

import "@nomiclabs/hardhat-ethers"; // Uses the hardhat-ethers plugin to use Ethers
import "@nomiclabs/hardhat-waffle"; // Uses the hardhat-waffle plugin to test Ethers contracts

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity : "0.8.10",
  networks : {
    hardhat : {
      chainId : 1337,
    }
  }
};

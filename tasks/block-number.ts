import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("block-number", "Prints the current block number").setAction(
  // anonymous async function
  async (taskArgs: string[], hre: HardhatRuntimeEnvironment) => {
    const publicClient = await hre.viem.getPublicClient();

    const blockNumber = await publicClient.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);

module.exports = {
  solidity: "0.8.28",
};

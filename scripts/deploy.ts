// imports
import { ethers, run, network } from "hardhat";
// if you get a typescript warning that typechain-types is not found
// recompile the code, you likely cleaned your workspace
import { SimpleStorage__factory } from "../typechain-types";
import "@nomicfoundation/hardhat-verify";
import { ContractTransactionResponse } from "ethers";

// async main
async function main(): Promise<void> {
  const SimpleStorageFactory: SimpleStorage__factory =
    await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();

  console.log(`Deployed contract to ${await simpleStorage.getAddress()}`);

  // if we are on Sepolia testnet, and we have an ETHERSCAN_API_KEY
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY!) {
    // verifying may take some time, let's wait for 5 blocks
    console.log("Waiting for block confirmation...");
    await simpleStorage.deploymentTransaction()?.wait(5);
    await verifyContract(await simpleStorage.getAddress(), []);
  }

  // Get the current value
  let currentValue: bigint = await simpleStorage.getFunction("retrieve")();
  console.log(`Current value is ${currentValue}`);

  // Get a new value
  let tx: ContractTransactionResponse = await simpleStorage.getFunction(
    "store"
  )("42");
  await tx.wait(); // properly wait, or this might not work
  currentValue = await simpleStorage.getFunction("retrieve")();
  console.log(`Current value is ${currentValue}`);
}

// automatically verify contract on etherscan
// by calling an API of etherscan
// for this we need run package from hardhat
// it is for running task with hardhat (like hardhat verify, ...)
async function verifyContract(contractAddress: string, args: string[]) {
  console.log("Verifying contract...");
  // try catch block to handle errors during verification
  // like the code has already been verified, network error, auth error
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    }); // hardhat verify --verify
  } catch (error: any) {
    // from the error message, determine if the contract has already been verified
    if (error.message.toLowerCase().includes("already been verified")) {
      console.log("Contract already verified");
    } else {
      console.error(error);
    }
  }
}

// main call
main()
  .then(() => {
    console.log("Deployed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

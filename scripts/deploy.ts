// imports
import hre from "hardhat";
import "@nomicfoundation/hardhat-verify";
import SimpleStorageModule from "../ignition/modules/SimpleStorage";

// async main
async function main(): Promise<void> {
  const { SimpleStorage } = await hre.ignition.deploy(SimpleStorageModule);
  const publicClient = await hre.viem.getPublicClient();

  console.log(`SimpleStorage deployed to: ${SimpleStorage.address}`);

  // if we are on Sepolia testnet, and we have an ETHERSCAN_API_KEY
  if (
    hre.network.config.chainId === 11155111 &&
    process.env.ETHERSCAN_API_KEY!
  ) {
    /*
    // verifying may take some time, let's wait for 5 blocks
    console.log("Waiting for block confirmation...");
    await publicClient.waitForTransactionReceipt({
      confirmations: 5,
      hash: SimpleStorage.address,
    });
    */
    await verifyContract(SimpleStorage.address, []);
  }

  // Get the current value
  let currentValue: bigint =
    await SimpleStorage.read.retrieveGlobalFavoriteNumber();
  console.log(`Current value is ${currentValue}`);

  // Get a new value
  const hash = await SimpleStorage.write.storeGlobalFavoriteNumber([
    BigInt(42),
  ]);
  await publicClient.waitForTransactionReceipt({ hash });

  currentValue = await SimpleStorage.read.retrieveGlobalFavoriteNumber();
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
    await hre.run("verify:verify", {
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

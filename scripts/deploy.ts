// imports
import { ethers } from "hardhat";
import { SimpleStorage__factory } from "../typechain-types";

// async main
async function main(): Promise<void> {
  const SimpleStorageFactory: SimpleStorage__factory =
    await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();

  console.log(`Deployed contract to ${await simpleStorage.getAddress()}`);
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

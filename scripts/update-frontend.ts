// To run this:
// FRONTEND_CONSTANTS_JSON="/home/masum/Dev-Environment/Blockchains/blockchain-websites/nextjs-basic-simple-storage/src/constants/constants.json" hardhat run scripts/update-frontend.ts --network sepolia
// OR pass --tags frontend to only run this script

import dotenv from "dotenv";
import fs from "fs";
import { PathLike } from "fs";
import hre from "hardhat";
import { network } from "hardhat";
import SimpleStorageModule from "../ignition/modules/SimpleStorage";
import { Abi } from "viem";

interface Constants {
  contractAbi: Abi;
  contractAddresses: {
    [chainId: string]: string;
  };
}

dotenv.config();

async function main(): Promise<void> {
  const defaultPath =
    "/home/masum/Dev-Environment/Blockchains/blockchain-websites/nextjs-basic-simple-storage/src/constants/constants.json";
  const constantsPath = process.env.FRONTEND_CONSTANTS_JSON || defaultPath;

  console.log("Updating front end");
  updateFrontendConstants(constantsPath).catch((err) => {
    console.error("❌ Failed to update constants.json:", err);
  });
}

async function updateFrontendConstants(outputPath: PathLike) {
  const { SimpleStorage } = await hre.ignition.deploy(SimpleStorageModule);

  let constants: Constants = {
    contractAbi: [],
    contractAddresses: {},
  };

  // Load existing constants.json if it exists
  //
  console.log("testing");
  if (fs.existsSync(outputPath)) {
    try {
      const existing = fs.readFileSync(outputPath, "utf8");
      constants = JSON.parse(existing);
    } catch (err) {
      console.warn("⚠️ Could not parse existing constants.json. Overwriting.");
    }
  }

  constants.contractAbi = SimpleStorage.abi;
  constants.contractAddresses = {
    ...constants.contractAddresses,
    [network.config.chainId!]: SimpleStorage.address,
  };

  fs.writeFileSync(outputPath, JSON.stringify(constants, null, 2));
  console.log(`✅ constants.json updated at ${outputPath}`);
}

main()
  .then(() => {
    console.log("Deployed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

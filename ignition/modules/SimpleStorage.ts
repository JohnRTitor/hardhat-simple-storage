// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
// Deploy with: hardhat ignition deploy ignition/modules/SimpleStorage.ts

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SimpleStorageModule = buildModule("SimpleStorageModule", (m) => {
  const SimpleStorage = m.contract("SimpleStorage");

  return { SimpleStorage };
});

export default SimpleStorageModule;

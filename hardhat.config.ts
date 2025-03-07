import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const SEPOLIA_RPC_URL: string = process.env.SEPOLIA_RPC_URL!;
const PRIVATE_KEY: string = process.env.PRIVATE_KEY!;

const config: HardhatUserConfig = {
  // default, you can change network on the go, by passing
  // `--network hardhat` or `--network localhost` to hardhat run
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL, // Get from Alchemy or Infura
      accounts: [PRIVATE_KEY], // Get from MetaMask
      chainId: 11155111, // Sepolia testnet chain ID: https://chainlist.org/
    },
  },
  solidity: "0.8.28",
};

export default config;

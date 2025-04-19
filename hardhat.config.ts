import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";
import "./tasks/block-number";
import { hardhat, sepolia } from "viem/chains";

dotenv.config();

const SEPOLIA_RPC_URL: string = process.env.SEPOLIA_RPC_URL!;
const PRIVATE_KEY: string = process.env.PRIVATE_KEY!;
const ETHERSCAN_API_KEY: string = process.env.ETHERSCAN_API_KEY!;
const COINMARKETCAP_API_KEY: string = process.env.COINMARKETCAP_API_KEY!;

const config: HardhatUserConfig = {
  // default, you can change network on the go, by passing
  // `--network hardhat` or `--network localhost` to hardhat run
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL, // Get from Alchemy or Infura
      accounts: [PRIVATE_KEY], // Get from MetaMask
      chainId: sepolia.id, // Sepolia testnet chain ID: https://chainlist.org/
    },
    localhost: {
      // start by `hardhat node`
      url: "http://127.0.0.1:8545/",
      // acoounts: [] //auto-filled by hardhat. Thanks hardhat :)
      chainId: hardhat.id, // uses the same chainId as `hardhat` network
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    // get a key from https://coinmarketcap.com/api/
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH",
  },
  solidity: "0.8.28",
};

export default config;

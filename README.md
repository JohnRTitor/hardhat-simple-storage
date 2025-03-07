# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## Commands to run

```
hardhat run scripts/deploy.ts --network sepolia
hardhat run scripts/deploy.ts --network hardhat
```

## Notes
The following commmand can be used to spawn a `localhost` blockchain server:

```shell
hardhat node
```

However, this network is not the network hardhat internally uses.
When we run a command with `--network hardhat`, it uses the internal network,
which is why in a `hardhat node` monitoring shell, those transactions won't show up.

`hardhat` network is not persistent. It actually resets every time we run a script
on it. So the starting block number is always 1.

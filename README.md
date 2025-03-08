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
### Node
The following commmand can be used to spawn a `localhost` blockchain server:

```shell
hardhat node
```

However, this network is not the network hardhat internally uses.
When we run a command with `--network hardhat`, it uses the internal network,
which is why in a `hardhat node` monitoring shell, those transactions won't show up.

`hardhat` network is not persistent. It actually resets every time we run a script
on it. So the starting block number is always 1.

### Hardhat console
This command is very much a repl for hardhat. It can evaluate a statement, get the response back, etc.

```
hardhat console --network hardhat
```

However it does not support TypeScript syntax, for now. So be sure to remove your type
annotation and use pure JavaScript instead. :(

### solidity-coverage
When we write tests for our contracts, sometimes we might just miss a part that should be tested.
`solidity-coverage` is a plugin for Hardhat that checks all of our contracts in contracts/ folder
and generates a report. Which methods are covered, and which are not.

We can run it with the following command:

```
hardhat coverage
```

### Tests
We use Mocha and Chai for testing.
To run defined tests, we can use the following command:

```
hardhat test
```

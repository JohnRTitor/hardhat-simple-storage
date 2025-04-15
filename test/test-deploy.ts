import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { assert, expect } from "chai";
import hre from "hardhat";

// We are using Mocha for testing
// we could use solidity itself for testing solidity
// but most people just use a language framework like Mocha
// as it's more flexible

// run `hardhat test` to run all tests
// run `hardhat test --grep store` to run tests with the word "store"
// we can also specifically run a test by appending the only keyword in it()
// Like it.only()

describe("SimpleStorage", function () {
  async function deploySimpleStorageFixture() {
    const [deployer, otherAccount] = await hre.viem.getWalletClients();
    const simpleStorage = await hre.viem.deployContract("SimpleStorage");
    const publicClient = await hre.viem.getPublicClient();

    return { simpleStorage, deployer, otherAccount, publicClient };
  }

  // it() is used to define a test case
  // in this testcase, we are testing the initial value/favorite number
  // of our contract, which should be 0
  it("Should start with the favorite number of 0", async function () {
    const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
    const expectedValue: bigint = 0n;
    const currentValue = await simpleStorage.read.retrieve();

    // we can either use expect or assert
    // expect(currentValue).to.equal(0);
    assert.equal(currentValue, expectedValue);
  });

  // in this test case, we are testing the update functionality of our contract
  // we are testing that the favorite number is updated correctly
  it("Should update when we call store", async function () {
    const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
    const expectedValue = 55n;
    await simpleStorage.write.store([expectedValue]);
    const currentValue = await simpleStorage.read.retrieve();
    assert.equal(currentValue, expectedValue);
  });

  it("Should update when we call addPerson", async function () {
    const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
    const name: string = "John Doe";
    const favoriteNumber: bigint = 42n;

    await simpleStorage.write.addPerson([name, favoriteNumber]);

    // we can use read.varName to get the value of public variables too
    // get the favorite number by querying the dictionary
    const returnedNumberFromDictionary =
      await simpleStorage.read.nameToFavoriteNumber([name]);

    // get the people list's 0th element, it is the person we just added
    const person: [bigint, string] = await simpleStorage.read.people([0n]);

    // testing our nameToFavoriteNumber mapping/dictionary
    assert.equal(returnedNumberFromDictionary, favoriteNumber);
    // testing our people list 0'th element - person which is a list
    // [favoriteNumber, name]
    assert.equal(person[1], name);
    assert.equal(person[0], favoriteNumber);
  });
});

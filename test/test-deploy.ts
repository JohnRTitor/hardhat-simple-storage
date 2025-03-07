import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";
import { expect, assert } from "chai";

// We are using Mocha for testing
// we could use solidity itself for testing solidity
// but most people just use a language framework like Mocha
// as it's more flexible

// run `hardhat test` to run all tests
// run `hardhat test --grep store` to run tests with the word "store"
// we can also specifically run a test by appending the only keyword in it()
// Like it.only()

// describe the test SimpleStorage, such that the function......
describe("SimpleStorage", function () {
  let simpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;

  // beforeEach() is run before each it() block means test
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  // it() is used to define a test case
  // in this testcase, we are testing the initial value/favorite number
  // of our contract, which should be 0
  it("Should start with the favorite number of 0", async function () {
    const currentValue = await simpleStorage.getFunction("retrieve")();
    const expectedValue = 0;
    // we can either use expect or assert
    // expect(currentValue).to.equal(0);
    assert.equal(currentValue.toString(), expectedValue.toString());
  });

  // in this test case, we are testing the update functionality of our contract
  // we are testing that the favorite number is updated correctly
  it("Should update when we call store", async function () {
    const expectedValue = 55;
    const tx = await simpleStorage.store(expectedValue);
    tx.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue.toString());
  });
});

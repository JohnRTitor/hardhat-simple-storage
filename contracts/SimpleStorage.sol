// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    uint256 public globalFavoriteNumber;

    struct Person {
        uint256 favoriteNumber;
        string name;
    }

    Person[] public personList;

    mapping(string => uint256) public nameToFavoriteNumber;

    function storeGlobalFavoriteNumber(uint256 _favoriteNumber) public {
        globalFavoriteNumber = _favoriteNumber;
    }

    function retrieveGlobalFavoriteNumber() public view returns (uint256) {
        return globalFavoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        personList.push(Person(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}

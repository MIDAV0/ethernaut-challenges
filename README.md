# Ethernaut Challenges

Sollutions to the [Ethernaut](https://ethernaut.openzeppelin.com/) challenges.

## Level 1 - Fallback

The contract has a fallback function that is called when the contract receives ether without any data. The function sets message sender as the owner of the contract.

## Level 2 - Fallout

The constructor of the contract is declared as function and can be called by anyone. The function sets the owner of the contract to the caller and gives the caller permissions to withdraw funds from the contract.


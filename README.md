# Ethernaut Challenges

Sollutions to the [Ethernaut](https://ethernaut.openzeppelin.com/) challenges.

## Level 1 - Fallback

The contract has a fallback function that is called when the contract receives ether without any data. The function sets message sender as the owner of the contract.

## Level 2 - Fallout

The constructor of the contract is declared as function and can be called by anyone. The function sets the owner of the contract to the caller and gives the caller permissions to withdraw funds from the contract.

## Level 3 - Coin Flip

The contract uses a blockhash to determine the outcome of a coin flip. The outcome of the coin flip can be calculated by other contract in the same block and used to win the game.

## Level 4 - Telephone

The contract uses `tx.origin` to determine the caller of the contract. The contract can be called by another contract to change ownership.
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

## Level 5 - Token

The contract has an integer underflow vulnerability. The `transfer` function can be called with amount bigger than the balance of the caller, when the balance is substracted from bigger value it will cause an underflow and pass required checks and give the caller more tokens than they should have.

## Level 6 - Delegation

The contract uses delegatecall to call the implementation contract. We should use delegate call in Delegation contract to call pwn function in Delegate contract. This will change the state of the Delegation contract (because delegatecall uses storage of the Delegation contract). To do so we just send a transaction to the Delegation contract with data of the pwn function `{ "data": "0xdd365b8b" }`.
In web console `contract.sendTransaction({data: "0xdd365b8b"})`

## Level 7 - Force

The contract is vulnarable to forcing eth by destroing other contract. We can create attack contract deposit some funds to it and call `selfdestruct` with address of the Force contract. This will destroy the attacker contract and send all funds to the Force contract.

## Level 8 - Vault
The contract has a `password` argument in it's storage at slot number 1. It's publickly accessible and can be vied by calling provider `provider.getStorageAt(contractAddress, 1)`. The retrieved password can be used to call `unlock` function and win the game.

## Level 9 - King
The contract can be exploited by using failed fallback function. When someone tries to claim king status they trigger the `trasnfer` function which sends ETH to specified address. We can create a contract that will revert the transaction and make the `transfer` function fail. This will cause the rest of the transaction to fail and no one will be able to claim the king status.

## Level 10 - Reentrancy

The contract is vulnaruble to reentrancy attack. The `withdraw` function first sends ETH to the caller and then updates the balance of the caller. This allows the caller to call the `withdraw` function again before the balance is updated. The caller can call the `withdraw` function multiple times and drain the contract.

## Level 11 - Elevator

The contract has a loophole in the `goTo` function. It calls the `isLastFloor` two times and first time it has to return `false` and second time `true`. We can create an attack contract that implements `Building` interface and will be atteched to in `Elevator`. In the attack contract we will keep track of the number of times `isLastFloor` was called and return `false` the first time and `true` the second time. This will allow us to call `goTo` function and win the game.

Prevention: You can use the `view` function modifier on an interface in order to prevent state modifications. The `pure` modifier also prevents functions from modifying the state. Make sure you read Solidity's documentation and learn its caveats.
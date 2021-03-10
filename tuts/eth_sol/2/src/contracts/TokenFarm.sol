// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
    }

    // Stakes Tokens(Deposit)
    function stakeTokens(uint _amount) public { 
         //Transfer Mock dai tokens to this contract for staking
         daiToken.transferFrom(msg.sender, address(this), _amount);
         
         //update staking balance
         stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

         stakers.push(msg.sender);

         // Add user to stakers array *only* if they haven't staked already
         if(!hasStaked[msg.sender]) {
             stakers.push(msg.sender);
         
         //Update staking status
         isStaking[msg.sender] = true;
         hasStaked[msg.sender] = true;

        }
    }
}

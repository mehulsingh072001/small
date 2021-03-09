pragma solidity ^0.5.0;

contract DappToken {
    string public name = "DApp Token";
    string public symbol = "DAPP";
    uint256 public totalSupply = 1000000;
    uint8 public decimals = 18;

    mapping(address => uint256) public balanceOf;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }
}

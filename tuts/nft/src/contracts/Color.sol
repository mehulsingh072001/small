pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is ERC721 {
  string[] public colors;
  mapping(string => bool) _colorExists;

  constructor() ERC721("Color", "COLOR") public {
  }

  function mint(string memory _color) public {
    //Color - track it and add it
    colors.push(_color);
    uint _id = colors.length - 1;
    _mint(msg.sender, _id);
    _colorExists[_color] = true;
  }
}

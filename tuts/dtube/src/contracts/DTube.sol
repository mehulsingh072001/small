pragma solidity ^0.8.0;

contract DTube {
  uint public videoCount = 0;
  string public name = "DTube";
  mapping(uint => Video) public videos;

  struct Video {
    uint id;
    string hash;
    string title;
    address author;
  }

  event VideoUploaded(
    uint id,
    string hash,
    string title,
    address author
  );

  constructor() public {
  }

  function uploadVideo(string memory _videoHash, string memory _title) public {

    //Make sure the video hash exists
    require(bytes(_videoHash).length > 0);

    //Make sure the title hash exists
    require(bytes(_title).length > 0);

    //Increment video ID 
    videoCount++;

    //Add video to the contract
    videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);

    //Trigger an event
    emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);
  }
}

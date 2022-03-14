// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MultiSend {
  
  address public owner;
  event Received(address, uint);

  constructor() {
    owner = msg.sender;
  }

  //receive ether
  receive() external payable {
    emit Received(msg.sender, msg.value);
  }

  fallback() external payable {
    emit Received(msg.sender, msg.value);
  }

  modifier onlyOwner() {
    require(msg.sender == owner, 'only owner can send');
    _;
  }

  function send(address payable[] memory _to, uint _amount) onlyOwner() external {  
    for(uint i=0;i<_to.length;i++){
      _to[i].transfer(_amount);
    }
  }
}

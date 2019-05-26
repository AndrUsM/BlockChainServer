pragma solidity >=0.4.21 <0.6.0;

contract Documents {
    string public _manager;

    constructor(string memory manager) public {
      _manager = manager;
    }

    function getInstructor() public view returns (string memory) {
      return (_manager);
    }
}

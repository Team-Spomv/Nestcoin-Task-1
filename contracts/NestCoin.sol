// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NestCoin is ERC20, ERC20Burnable, Pausable, Ownable {
    uint256 private maxNumOfAddress;

    constructor() ERC20("NestCoin", "NSC") {
        maxNumOfAddress = 200;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function batchTransfer(address[] memory to, uint256 amount) public returns(bool) {
        require(to.length <= maxNumOfAddress, "Too many addresses");
        require(to.length > 0, "No address to transfer");
        require(amount > 0, "Amount must be greater than 0");
        
        for(uint256 i = 0; i < to.length; i++){
            _mint(to[i], amount);
        }

        return true;
    }

    function setMaxNumOfAddress(uint256 _maxNumOfAddress) public onlyOwner {
        maxNumOfAddress = _maxNumOfAddress;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NestCoin is ERC20, ERC20Burnable, Pausable, Ownable {

    /**
     * @dev initialize the total token supply and price of one token.
     */
    uint256 private _totalSupply = 100000000;
    uint256 public constant tokensPerEth = 200;
    

    constructor() ERC20("NestCoin", "NSC") {
        /**
        * @dev mint the supply of tokens to this contract
        * allowing it ownership of the tokens.
        */
        _mint(address(this), _totalSupply * 10 ** decimals());
    }

    event Sold(address indexed _seller, uint256 _tokenAmount, uint256 _ethAmount);

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
        for(uint256 i = 0; i < to.length; i++){
            _mint(to[i], amount);
        }

        return true;
    }
    /**
    * @dev allows tokens to be sold for ETH in a case where
    * user may want to purchase an NFT with their tokens. 
    */
    function sell(uint _tokenAmount)
        payable
        public
    {
        require(_tokenAmount > 0, "You need to sell at least 1 token");
        require(balanceOf(msg.sender) > _tokenAmount, "Your balance too low to initiate sell");
        uint256 ethAmount = (_tokenAmount / tokensPerEth) * 1 ether;
        uint256 ownerBalance = address(this).balance;
        require(ownerBalance > ethAmount);
        (bool sent) = transferFrom(msg.sender, address(this), _tokenAmount);
        require(sent, "Failed to transfer tokens");
        (sent,) = msg.sender.call{value: ethAmount}("");
        require(sent, "Failed to send ETH to user");
        ownerBalance = 0;
        emit Sold(msg.sender, _tokenAmount, ethAmount);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./NestCoin.sol";

contract MyToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    NestCoin public nestCoin;
    Counters.Counter private _tokenIdCounter;

    /**
    * @dev mint event for frontend consumption. 
    */
    event NFTMinted(address indexed _sender, uint256 _tokenId);

    constructor() ERC721("NestCoin", "NCN") {}

    /**
    * @dev Mints the token, adds a unique ID and
    * sets the token metadata.
    */
    function safeMint(address to, string memory uri) public returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        uri = string(abi.encodePacked("{'name': 'Subaru Boy ", tokenId , "', 'image': 'https://ipfs.io/ipfs/ QmPLUFGapx7QCMLKcBXSjmRj9nv1DVMbaqhCoqosmuNENP', 'description': 'A collection of super rare Subaru boys.'}"));
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit NFTMinted(to, tokenId);
        return tokenId;
    }

    /**
    * @dev destroys tokenId
    */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

   /**
   * @dev set tokenURI for tokenId.
   */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function awardItem(address minter, string memory metadataURI, uint256 price){
        nestCoin.transferFrom(msg.sender, address (this), price);
        uint256 newToken = safeMint(minter, matadataURI);

    }
}

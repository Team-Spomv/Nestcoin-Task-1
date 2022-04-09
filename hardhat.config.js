require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
// const CONSTANTS = require("../../../utils/constants");

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/427069041f66480c93be73ccb223693e",
      accounts: ["de557f686ccf884254afdd485b14584546c7157b4dd0c12e217b9ce19897e682"],
    },
    // hardhat: {
    //   chainId: 1337
    // }
  },
};

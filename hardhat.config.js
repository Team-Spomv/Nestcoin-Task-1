require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
    solidity: "0.8.4",
    defaultNetwork: "rinkeby",
    networks: {
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/427069041f66480c93be73ccb223693e", // <---- YOUR INFURA ID! (or it won't work)
            accounts: [
                "f4aa392b3b595e5a7556807cbbe1c0fcc88dd772f17178413e5a1996e2edd142",
            ],
        },
        // hardhat: {
        //   chainId: 1337
        // }
    },
};

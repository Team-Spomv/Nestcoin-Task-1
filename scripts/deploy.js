const { ethers, upgrades } = require("hardhat");

const main = async () => {
    const Nestcoin = await ethers.getContractFactory("NestCoin");
    const nestcoin = await Nestcoin.deploy();

    await nestcoin.deployed();
    console.log("Your contract has been deployed 🤓", nestcoin.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();
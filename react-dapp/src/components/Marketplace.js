import { Fragment, useState, useEffect } from "react";

import { ethers } from "ethers";
import NFTs from "../NFT";
import CONSTANTS from "../utils/constants";

const Marketplace = (props) => {
    const { contract } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [tab, setTab] = useState("buy");

    const { ethereum } = window;

    const [NFT, setContract] = useState({});
    const [NFTList, setList] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        if (ethereum) {
            NFT1();
        }
    }, []);

    const getMyToken = async () => {
        const url = `https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${
            CONSTANTS.NFT_CONTRACT_ADDRES
        }&address=${currentUser}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${"T7GW314ZY1GCCBHAIFIE2ZT9ETJU5R6RJC"}`;
        const res = await fetch(url);
        console.log(res, "ressssssssssssssssss");
    };

    const buyNow = async () => {
        console.log("____________contract", contract);
        const trx = await contract.approve(
            CONSTANTS.NFT_CONTRACT_ADDRES,
            ethers.utils.parseEther("2")._hex
        );
        console.log("Bo_________________________________________-00", trx);
        await awardItem();
    };

    const awardItem = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(
                CONSTANTS.NFT_CONTRACT_ADDRES,
                CONSTANTS.NFT_ABI,
                signer
            );
            const uri =
                "https://ipfs.io/ipfs/bafkreifqdlag6i7wemrkqlvsdr7a4jscnwzxlnh3iabsucorzsghlzhyme";
            console.log("NFT____________________", contract);
            console.log({
                address,
                uri,
                price: ethers.utils.parseEther("2")._hex,
            });
            const trx = await contract.awardItem(
                address,
                ethers.utils.parseEther("2")._hex,
                {
                    gasLimit: 5000000,
                }
            );
            console.log("awarded", trx);
        } catch (err) {
            console.log(err);
        }
    };

    const NFT1 = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setCurrentUser(address);
        const contract = new ethers.Contract(
            CONSTANTS.NFT_LIST_ADDRESS,
            CONSTANTS.NFT_LIST_ABI,
            signer
        );
        console.log("contract", contract);
        const trx = await contract.allNFT();
        setList(trx);
    };

    const handleTab = (tab) => {
        setTab(tab);
    };
    return (
        <>
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto"></div>
            </div>
            <>
                {/* <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li
                        className="mr-2 cursor-pointer"
                        onClick={() => handleTab("buy")}
                    >
                        <div
                            aria-current="page"
                            className={
                                tab === "buy"
                                    ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                                    : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                            }
                        >
                            Buy
                        </div>
                    </li>
                    <li
                        className="mr-2 cursor-pointer"
                        onClick={() => handleTab("sell")}
                    >
                        <div
                            className={
                                tab === "sell"
                                    ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 "
                                    : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                            }
                        >
                            Sell
                        </div>
                    </li>
                </ul> */}
                {tab === "buy" && (
                    <div className="bg-white">
                        <div className="max-w-2xl mx-auto px-4  sm:px-6 lg:max-w-7xl lg:px-8">
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                                NFTs MarketPlace
                            </h2>
                            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                                {NFTList.length &&
                                    NFTList.map((nft) => (
                                        <div
                                            key={nft.name}
                                            className="group relative"
                                        >
                                            <div className="w-full max-h-60 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                                <img
                                                    src={
                                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyMjPivV1SRwlb4oFvuCuibsIaJSuY1tukRw&usqp=CAU"
                                                    }
                                                    alt={nft.name}
                                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                                />
                                            </div>
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                    <h3 className="text-sm text-gray-700 font-extrabold">
                                                        <div className="cursor-pointer">
                                                            <span
                                                                aria-hidden="true"
                                                                className="absolute inset-0 "
                                                            />
                                                            {nft.name}
                                                        </div>
                                                    </h3>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {Number(nft.price) /
                                                        10 ** 18}
                                                </p>
                                            </div>
                                            <div className="justify-between flex">
                                                <button
                                                    onClick={() => buyNow()}
                                                    className="bg-blue-500 font-semibold text-white p-3 cursor-pointer z-40"
                                                >
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
                {tab === "sell" && <div></div>}
            </>
            <button onClick={() => getMyToken()}>GET NFT</button>
        </>
    );
};

export default Marketplace;

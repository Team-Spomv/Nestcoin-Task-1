import { Fragment, useState, useEffect } from "react";
import { ethers } from "ethers";
import CONSTANTS from "../utils/constants";

const Marketplace = (props) => {
    const { contract } = props;
    const [isLoading, setIsLoading] = useState(false);

    const { ethereum } = window;
    const [NFTList, setList] = useState([]);
    // const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        if (ethereum) {
            NFT1();
        }
    }, []);

    const buyNow = async () => {
        const trx = await contract.approve(
            CONSTANTS.NFT_CONTRACT_ADDRES,
            ethers.utils.parseEther("2")._hex
        );
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

        // setCurrentUser(address);
        const contract = new ethers.Contract(
            CONSTANTS.NFT_LIST_ADDRESS,
            CONSTANTS.NFT_LIST_ABI,
            signer
        );

        const trx = await contract.allNFT();
        setList(trx);
    };

    return (
        <>
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto"></div>
            </div>
            <>
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
                                                {Number(nft.price) / 10 ** 18}
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
            </>
        </>
    );
};

export default Marketplace;

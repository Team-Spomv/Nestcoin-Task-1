import { Fragment, useState } from "react";

import NFTs from "../NFT";

const Marketplace = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState("buy");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      console.log("Please Install Metamask");
    }

    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTab = (tab) => {
    setTab(tab);
  };
  return (
    <>
      <div className="relative bg-white overflow-hidden z-5">
        <div className="max-w-7xl mx-auto"></div>
      </div>
      <>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="mr-2 cursor-pointer" onClick={() => handleTab("buy")}>
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
          <li className="mr-2 cursor-pointer" onClick={() => handleTab("sell")}>
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
        </ul>
        {tab === "buy" && (
          <div className="bg-white">
            <div className="max-w-2xl mx-auto px-4  sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                NFTs MarketPlace
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                {NFTs.map((nft) => (
                  <div key={nft.id} className="group relative">
                    <div className="w-full max-h-60 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      <img
                        src={nft.imageSrc}
                        alt={nft.imageAlt}
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
                        {nft.price}
                      </p>
                    </div>
                    <div className="justify-between flex">
                      <div className="text-blue-500 font-semibold cursor-pointer">
                        Buy Now
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "sell" && <div></div>}
      </>
    </>
  );
};

export default Marketplace;

import { Fragment, useState } from "react";

import { Popover, Transition } from "@headlessui/react";
import { FaBars, FaTimesCircle } from "react-icons/fa";
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
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16  lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              <div className="pt-6 px-4 sm:px-6 lg:px-8 ">
                {/* <nav
                  className="relative flex items-center  justify-between sm:h-10 "
                  aria-label="Global"
                >
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <a href="#">
                        <span className="sr-only">Nextcoin</span>
                        <h1 className="h-8 w-auto sm:h-10 text-indigo-600 text-3xl font-extrabold">
                          Nextcoin
                        </h1>
                      </a>
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Open main menu</span>

                          <FaBars className="block h-6 w-6" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden self-center md:block ">
                    <button
                      onClick={() => connectWallet()}
                      className="font-medium outline-none text-indigo-600 hover:text-indigo-500"
                    >
                      Connect Wallet
                    </button>
                  </div>
                </nav> */}
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-50 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <h1 className="h-8 w-auto text-xl font-extrabold text-indigo-600">
                          Nextcoin
                        </h1>
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>

                          <FaTimesCircle className="block h-6 w-6" />
                        </Popover.Button>
                      </div>
                    </div>

                    <div className="px-2  pb-3 space-y-1">
                      <button
                        onClick={() => connectWallet()}
                        className="font-medium outline-none text-indigo-600 hover:text-indigo-500"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>
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

import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { Popover, Transition, Menu } from "@headlessui/react";
import { FaBars, FaTimesCircle } from "react-icons/fa";
import NFTs from "../NFT";

const Body = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState("users");

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
                <nav
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
                    <button className="font-medium outline-none text-indigo-600 hover:text-indigo-500">
                      Connect Wallet
                    </button>
                  </div>
                </nav>
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
                      <button className="font-medium outline-none text-indigo-600 hover:text-indigo-500">
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
          <li
            className="mr-2 cursor-pointer"
            onClick={() => handleTab("users")}
          >
            <div
              aria-current="page"
              className={
                tab === "users"
                  ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                  : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }
            >
              Users
            </div>
          </li>
          <li
            className="mr-2 cursor-pointer"
            onClick={() => handleTab("dued-users")}
          >
            <div
              className={
                tab === "dued-users"
                  ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 "
                  : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }
            >
              Users Reward
            </div>
          </li>
          <li
            className="mr-2 cursor-pointer"
            onClick={() => handleTab("marketplace")}
          >
            <div
              className={
                tab === "marketplace"
                  ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                  : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }
            >
              {" "}
              MarketPlace
            </div>
          </li>
        </ul>
        {tab === "marketplace" && (
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
        {tab === "users" && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="p-4">
              <label for="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Reward status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NCT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Reward</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    0x2be317D089F70Db97dFD10F6f4F98700F2C0cAe6{" "}
                  </th>
                  <td className="px-6 py-4">Due</td>
                  <td className="px-6 py-4">2999</td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Reward
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {tab === "dued-users" && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="p-4">
              <label for="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Reward status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NCT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Reward</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    0x2be317D089F70Db97dFD10F6f4F98700F2C0cAe6{" "}
                  </th>
                  <td className="px-6 py-4">Due</td>
                  <td className="px-6 py-4">2999</td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Reward
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </>
    </>
  );
};
export default Body;

import { Button, PageHeader } from "antd";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { Contract, ethers } from "ethers";
import CONSTANTS from "../utils/constants";
import { concat } from "ethers/lib/utils";

// displays a page header

export default function Header() {
  const { ethereum } = window;

  let Abi;

  const currentUrl = new URL(window.location.href);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:9010" : undefined;

  const { isMetaMaskInstalled } = MetaMaskOnboarding;

  const [onboardButton, setOnboardButton] = useState({
    text: "Install MetaMask",
    disabled: false,
  });

  const [accountDetails, setAccountDetails] = useState({
    account: "",
    network: "",
    chainId: "",
  });

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      console.log("Please Install Metamask");
    }

    try {
      // alert("MetaMask is installed!");

      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountDetails({ ...accountDetails, account: addressArray[0] });

      console.log("accout details:", accountDetails.account);
    } catch (error) {
      console.error(error);
    }
  };

  async function getNetworkAndChainId() {
    try {
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      const networkId = await ethereum.request({
        method: "net_version",
      });

      // setAccountDetails({chainId})
      // handleNewNetwork(networkId)
    } catch (err) {
      console.error(err);
    }
  }

  const callFunc = () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const address = signer.getAddress();
      const contract = new ethers.Contract(
        CONSTANTS.CONTRACT_ADDRESS_NESTCOIN,
        CONSTANTS.NESTCOIN_ABI,
        signer
      );
      setContract(contract);
    } catch (err) {
      console.log(err);
    }
  };

  try {
    ethereum.on("accountsChanged", (accounts) => {
      console.log("accounts changed", accounts);
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setOnboardButton({ text: "Connect Wallet", disabled: false });
    } else {
      setOnboardButton({ text: "Install Metamask ", disabled: false });
    }

    callFunc();
  }, []);

  const getEthereumContracts = () => {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const NestCoin = new ethers.Contract();
  };

  const [contract, setContract] = useState({});

  return (
    <>
      <PageHeader
        title="NestCoin"
        subTitle="Nestcoin the future of film house."
        style={{ cursor: "pointer" }}
      />
      <div style={{ padding: 8 }}>
        <Button
          id="connectButton"
          type={"primary"}
          onClick={() => {
            connectWallet();
          }}
          disabled={onboardButton.disabled}
        >
          {onboardButton.text}
        </Button>
        <div style={{ margin: "1rem" }}>
          <Button
            type={"primary"}
            onClick={async () => {
              const transaction = await contract.balanceOf(accountDetails.account);
              const balance = Number(transaction._hex)
              console.log("balance", balance);
              console.log(transaction);
            }}
          >
            Send Tokens
          </Button>
        </div>
        <p>{accountDetails.account}</p>
        <p>{accountDetails.chainId}</p>
        <p>{accountDetails.network}</p>
      </div>
    </>
  );
}

import { Button, PageHeader } from "antd";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { ethers } from "ethers";
import { requestAccounts } from "./BasicActions";

// displays a page header

export default function Header() {
  const currentUrl = new URL(window.location.href);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:9010" : undefined;

  const { isMetaMaskInstalled } = MetaMaskOnboarding;

  const [onboardButton, setOnboardButton] = useState({
    text: "Install MetaMask",
    disabled: false,
  });

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

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setOnboardButton({ text: "Connect Wallet", disabled: false });
    } else {
      setOnboardButton({ text: "Install Metamask ", disabled: false });
    }
  }, []);

  const [accountDetails, setAccountDetails] = useState({
    account: "",
    network: "",
    chainId: "",
  });

  const onClickConnect = async () => {
    if (window.ethereum === undefined) {
      alert("MetaMask is not installed");
      setOnboardButton({
        text: "Click here to install MetaMask! ",
        disabled: true,
      });

      return;
    }
    // else {
    //   alert('This is connect button')

    // }
    // try {
    //   const newAccounts = requestAccounts();
    //   handleNewAccounts(newAccounts);
    // } catch (error) {
    //   console.error(error);
    // }
  };

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
        <p>{accountDetails.account}</p>
        <p>{accountDetails.chainId}</p>
        <p>{accountDetails.network}</p>
      </div>
    </>
  );
}

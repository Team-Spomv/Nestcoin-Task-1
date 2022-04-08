import { Button, PageHeader, Alert } from "antd";
import { useEffect, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { ethers } from "ethers";
import CONSTANTS from "../utils/constants";

// displays a page header

export default function Header() {
  const { ethereum } = window;

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

  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });

  const [contract, setContract] = useState({});

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
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      const networkId = await ethereum.request({
        method: "net_version",
      });
      setAccountDetails({
        ...accountDetails,
        account: addressArray[0],
        chainId: chainId,
        network: networkId,
      });

      console.log("account details 📈:", accountDetails);
    } catch (error) {
      console.error(error);
    }
  };

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

  }

  if (onboardButton.text === "Connect Wallet" && accountDetails.account) {
    setOnboardButton({...onboardButton, text: "Wallet Connected", disabled: true});
    connectWallet();
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setOnboardButton({ text: "Connect Wallet", disabled: false });
      connectWallet();
    } else {
      setOnboardButton({ text: "Install Metamask ", disabled: false });
    }

    
    callFunc();
  }, []);

  // send transaction

  const sendTransaction = async () => {
    try {
      // console.log('amount', ethers.utils.parseEther('0.0005')._hex);
      const tx = await contract.batchTransfer(['0x7F4cA4B78d555D5Fb1f91abfBb91A1365e0e8802', '0x7F913b411F2C509dc1C8271aFb26160223fa6be8', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'], ethers.utils.parseEther('0.005')._hex);
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  };

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
            if (typeof window.ethereum === "undefined") {
              let onboarding = new MetaMaskOnboarding({ forwarderOrigin });
              onboarding.startOnboarding();
              setOnboardButton({ text: "Onboarding", disabled: true });
            } else {
              connectWallet();
            }
          }}
          disabled={onboardButton.text === "Connect Wallet" && accountDetails.account ? true : onboardButton.text === "Onboarding" ? true : onboardButton.disabled}
        >
          {onboardButton.text}
        </Button>
        <div style={{ margin: "1rem" }}>
          <Button
            type={"primary"}
            onClick={
              // async () => {
                () => {
                 sendTransaction();
              // const transaction = await contract.balanceOf(
              //   accountDetails.account
              // );
              // const balance = Number(transaction._hex);
              // console.log("balance", balance);
              // console.log(transaction);
            }}
          >
            Send Tokens
          </Button>
        </div>
<Alert message={accountDetails.account ? accountDetails.account : "account not connected"} type="success" />
        <Alert
          message={
            accountDetails.network === "1"
              ? "mainnet"
              : accountDetails.network === "3"
              ? "ropsten"
              : accountDetails.network === "4"
              ? "rinkeby"
              : accountDetails.network === "5"
              ? "goerli"
              : accountDetails.network === "6"
              ? "kotti"
              : accountDetails.network === "2018"
              ? "dev"
              : accountDetails.network === "7"
              ? "mordor"
              : "localhost"
          }
          type="info"
        />
        {/* <p>{accountDetails.account}</p>
        <p>{accountDetails.network}</p> */}
      </div>
    </>
  );
}

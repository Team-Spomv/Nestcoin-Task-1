import { Button, PageHeader, Alert } from "antd";
import { useEffect, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";

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

  try {
    ethereum.on("accountsChanged", (accounts) => {
      console.log("accounts changed", accounts);
    });
  } catch (err) {
    // openNotification(err);
    console.error(err);
  }

  if (onboardButton.text === "Connect Wallet" && accountDetails.account) {
    setOnboardButton({
      ...onboardButton,
      text: "Wallet Connected",
      disabled: true,
    });
    connectWallet();
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setOnboardButton({ text: "Connect Wallet", disabled: false });
      connectWallet();
    } else {
      setOnboardButton({ text: "Install Metamask ", disabled: false });
    }

  }, []);

  return (
    <>
      <PageHeader
        title="NestCoin"
        subTitle="Nestcoin the future of film house."
        style={{ cursor: "pointer" }}
      />
      <div style={{ padding: 8 }}>
        <div style={{ margin: "1rem" }}>
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
            disabled={
              onboardButton.text === "Connect Wallet" && accountDetails.account
                ? true
                : onboardButton.text === "Onboarding"
                ? true
                : onboardButton.disabled
            }
          >
            {onboardButton.text}
          </Button>
        </div>
        <Alert
          message={
            accountDetails.account
              ? accountDetails.account
              : "account not connected"
          }
          type="success"
        />
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
      </div>
    </>
  );
}

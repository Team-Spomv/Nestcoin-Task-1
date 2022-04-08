import { Button, PageHeader } from "antd";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from "web3modal";
import { useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { ethers } from "ethers";
import { requestAccounts } from './BasicActions'

// displays a page header

export default function Header() {
  let ethersProvider;
  let hstFactory;
  let piggybankFactory;

  const currentUrl = new URL(window.location.href);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:9010" : undefined;

  const { isMetaMaskInstalled } = MetaMaskOnboarding;

  const [accountDetails, setAccountDetails] = useState({
    account: "",
    network: "",
    chainId: "",
  });

  const [onboardButton, setOnboardButton] = useState({
    text: "Install MetaMask",
    onClick: () => {
      if(window.ethereum === undefined) {
        alert('MetaMask is not installed')
        setOnboardButton({ text: "Click here to install MetaMask! ", disabled: true });
  
        return 
      }},
    disabled: false,
  });

  const onClickConnect = async () => {
    if(window.ethereum === undefined) {
      alert('MetaMask is not installed')
      setOnboardButton({ text: "Click here to install MetaMask! ", disabled: true });

      return 
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

  const getAccountsButton = document.getElementById("getAccounts");
  const getAccountsResults = document.getElementById("getAccountsResult");

  const initialize = async () => {
    const { ethereum } = window;

    try {
      // We must specify the network as 'any' for ethers to allow network changes
      ethersProvider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      hstFactory = new ethers.ContractFactory(ethersProvider.getSigner());
      piggybankFactory = new ethers.ContractFactory(ethersProvider.getSigner());
    } catch (error) {
      console.error(error);
    }

    let onboarding;
    try {
      onboarding = new MetaMaskOnboarding({ forwarderOrigin });
    } catch (error) {
      console.error(error);
    }

    let accounts;
    let accountButtonsInitialized = false;

    // Button List
    const accountButtons = [];

    const isMetaMaskConnected = () => accounts && accounts.length > 0;

    const onClickInstall = () => {
      setOnboardButton({ text: "Onboarding in progress", disabled: true });
      onboarding.startOnboarding();
    };

    const onClickConnect = async () => {
      alert('This is connect button')
      try {
        const newAccounts = requestAccounts();
        handleNewAccounts(newAccounts);
      } catch (error) {
        console.error(error);
      }
    };

    const updateButtons = () => {
      const accountButtonsDisabled =
        !isMetaMaskInstalled() || !isMetaMaskConnected();
      if (accountButtonsDisabled) {
        for (const button of accountButtons) {
          button.disabled = true;
        }
        // clearTextDisplays()
      } else {
        // deployButton.disabled = false
        // sendButton.disabled = false
        // createToken.disabled = false
        // personalSign.disabled = false
        // signTypedData.disabled = false
        // getEncryptionKeyButton.disabled = false
        // ethSign.disabled = false
        // personalSign.disabled = false
        // signTypedData.disabled = false
        // signTypedDataV3.disabled = false
        // signTypedDataV4.disabled = false
      }

      if (!isMetaMaskInstalled()) {
        setOnboardButton({
          text: "Click here to install MetaMask!",
          disabled: false,
          onClick: onClickInstall,
        });
      } else if (isMetaMaskConnected()) {
        setOnboardButton({ text: "Connected", disabled: true });
        if (onboarding) {
          onboarding.stopOnboarding();
        }
      } else {
        setOnboardButton({
          text: "Connect",
          disabled: false,
          onClick: onClickConnect,
        });
      }
    };
    const getAccountsButtonAction = () => {
      getAccountsButton.onclick = async () => {
        try {
          const _accounts = await ethereum.request({
            method: "eth_accounts",
          });
          getAccountsResults.appendChild(
            document.createTextNode(
              `${_accounts[0] || "Not able to get accounts"}`
            )
          );
        } catch (err) {
          console.error(err);
          getAccountsResults.appendChild(
            document.createTextNode(`Error: ${err.message}`)
          );
        }
      };
    };

    const initializeAccountButtons = () => {
      getAccountsButtonAction();

      if (accountButtonsInitialized) {
        return;
      }
      accountButtonsInitialized = true;
    };

    function handleNewAccounts(newAccounts) {
      accounts = newAccounts;
      // accountsDiv.appendChild(document.createTextNode(accounts))
      setAccountDetails({ account: accounts });

      if (isMetaMaskConnected()) {
        initializeAccountButtons();
      }
      updateButtons();
    }

    function handleNewChain(chainId) {
      // chainIdDiv.appendChild(document.createTextNode(chainId))
      setAccountDetails({ chainId: chainId });
    }
    function handleNewNetwork(networkId) {
      // networkDiv.appendChild(document.createTextNode(networkId))
      setAccountDetails({ network: networkId });
    }

    async function getNetworkAndChainId() {
      try {
        const chainId = await ethereum.request({
          method: "eth_chainId",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });

        handleNewChain(chainId);
        handleNewNetwork(networkId);
      } catch (err) {
        console.error(err);
      }
    }

    updateButtons();

    if (isMetaMaskInstalled()) {
      ethereum.autoRefreshOnNetworkChange = false;
      getNetworkAndChainId();
      ethereum.on("networkChanged", handleNewNetwork);
      ethereum.on("chainChanged", handleNewChain);
      ethereum.on("accountsChanged", handleNewAccounts);

      try {
        const newAccounts = await ethereum.request({
          method: "eth_accounts",
        });
        handleNewAccounts(newAccounts);
      } catch (err) {
        console.error("Error on init when getting accounts", err);
      }
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
          onClick={onboardButton.onClick}
          // disabled={onboardButton.disabled}
        >
          {onboardButton.text}
        </Button>
        <p>{accountDetails.account}</p>
        <p>{accountDetails.chainId}</p>
        <p>{accountDetails.network}</p>
        {/* <Button
          id="getAccountsResult"
          type={"primary"}
          onClick={() => {
            initialize();
          }}
        >
          getAccountsResult
        </Button> */}
      </div>
    </>
  );
}

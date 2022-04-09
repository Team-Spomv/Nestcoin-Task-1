import "./App.css";
import Header from "./components/Header";
import UploadTokens from "./components/UploadTokens";
import { Menu, Divider, Typography } from "antd";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import Marketplace from "./components/Marketplace";
import { Button, Alert } from "antd";
import MetaMaskOnboarding from "@metamask/onboarding";
import { ethers } from "ethers";
import CONSTANTS from "./utils/constants";

const { Title } = Typography;

function App() {
    // Route setup
    const [route, setRoute] = useState();

    useEffect(() => {
        setRoute(window.location.pathname);
    }, [setRoute]);

    // Connect DAPP To Wallet Setup
    const { ethereum } = window;

    const [contract, setContract] = useState({});

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

    useEffect(() => {
        callFunc();
    }, []);

    return (
        <div className="App">
            {/* Header */}
            <Header />

            {/* Routes */}
            <BrowserRouter>
                <Menu
                    style={{ textAlign: "center" }}
                    selectedKeys={[route]}
                    mode="horizontal"
                >
                    <Menu.Item key="/">
                        <Link
                            onClick={() => {
                                setRoute("/");
                            }}
                            to="/"
                        >
                            NestCoin Tokens
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/marketplace">
                        <Link
                            onClick={() => {
                                setRoute("/marketplace");
                            }}
                            to="/marketplace"
                        >
                            Marketplace
                        </Link>
                    </Menu.Item>
                </Menu>
                <Switch>
                    <Route exact path="/">
                        <div style={{ padding: "2rem" }}>
                            <Title>Transfer Tokens</Title>
                            <UploadTokens contract={contract} ethers={ethers} />
                        </div>
                        <Divider />
                    </Route>
                    <Route path="/marketplace">
                        <Marketplace contract={contract} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

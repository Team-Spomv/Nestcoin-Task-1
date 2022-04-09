import { Row, Col, Card } from "antd";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import CONSTANTS from "../utils/constants";

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]);

    const getMyToken = async () => {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const url = `https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${
            CONSTANTS.NFT_CONTRACT_ADDRES
        }&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${"T7GW314ZY1GCCBHAIFIE2ZT9ETJU5R6RJC"}`;
        const res = await fetch(url);
        console.log(res, "ressssssssssssssssss");
        console.log(res.status);
        setPortfolio(res.result);
    };
    useEffect(() => {
        getMyToken();
    }, []);

    return (
        <>
            <Row gutter={[8, 8]}>
                {portfolio &&
                    portfolio.map((e) => (
                        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Card
                                style={{ width: 240 }}
                                bodyStyle={{ padding: 0 }}
                            >
                                <div className="custom-image">
                                    <img
                                        alt={e.name}
                                        width="100%"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyMjPivV1SRwlb4oFvuCuibsIaJSuY1tukRw&usqp=CAU"
                                    />
                                </div>
                                <div
                                    style={{
                                        justifyContent: "space-between",
                                        display: "flex",
                                    }}
                                >
                                    <h3>{e.name}</h3>
                                </div>
                            </Card>
                        </Col>
                    ))}
            </Row>
            ,
        </>
    );
};

export default Portfolio;

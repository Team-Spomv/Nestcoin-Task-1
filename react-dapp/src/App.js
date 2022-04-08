import "./App.css";
import Header from "./components/Header";
import UploadTokens from "./components/UploadTokens";
import { Menu, Layout, Breadcrumb, Icon, Divider, Typography } from "antd";
import { BrowserRouter as Router, Route, Link,  } from "react-router-dom";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import Marketplace from "./components/Marketplace";
import Forup from "./components/forup";
import { Routes } from "react-router-dom";

const { Title } = Typography;

function App() {
  const [route, setRoute] = useState();

  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  return (
    <div className="App">
      <Header />
       <Router>
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
              to="/" style={{fontSize:"20px", fontWeight:"bold",color:"#F178B6"}}>
              NestCoin Tokens 
              
            </Link>
            
          </Menu.Item>
          
          <Menu.Item key="/marketplace">
            <Link
              onClick={() => {
                setRoute("/marketplace");
              }}
              to="/Marketplace"
              style={{fontSize:"20px", fontWeight:"bold",color:"#F178B6",}}
            >
              Marketplace
            </Link>
  
          </Menu.Item>
        </Menu>
              
        <Routes>
          <Route exact path="/" element={<Forup/>}/>
          
          {/* <Route path="/marketplace"></Route> */}
          <Route path = "/marketplace" element={<Marketplace/>} />
           
        </Routes>
            </Router>
    </div>
  );
}

export default App;
 
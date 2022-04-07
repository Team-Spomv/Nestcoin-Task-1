
import './App.css';
import Header from './components/Header';
import UploadTokens from './components/UploadTokens';
import {Menu, Layout, Breadcrumb, Icon, Divider, Typography} from 'antd';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';

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
      <Menu style={{ textAlign: "center" }} selectedKeys={[route]} mode="horizontal">
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
            <div style={{ padding: '2rem'}}>
              <Title>Transfer Tokens</Title>
          <UploadTokens />
          </div>
            <Divider />

          </Route>
          <Route path="/marketplace">
            
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;

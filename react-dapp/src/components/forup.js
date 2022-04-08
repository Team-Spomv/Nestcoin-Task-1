import React from 'react'
import UploadTokens from './UploadTokens'
import { Menu, Layout, Breadcrumb, Icon, Divider, Typography } from "antd";

export const forup = () => {
  return (
      <div>
    <div style={{ padding: "2rem", }}>
              <h1 style={{fontSize: "40px",fontWeight:"bold",}}>Transfer Tokens</h1>
              <UploadTokens />
            </div>
            <Divider /> 
            </div>
  )
};
export default forup

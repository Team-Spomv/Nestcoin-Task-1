import { Upload, message, Card, Button, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import AddressInput from "./AddressInput";
const { Dragger } = Upload;

const UploadTokens = () => {
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
  };

  return (
    <>
    <div style={{ padding: 8, marginTop: 32, width: 420, margin: "auto" }}>
        <Card title="Transfer tokens">
          <div>
            <div style={{ padding: 8 }}>
              <AddressInput
                // ensProvider={mainnetProvider}
                placeholder="to address"
                // value={tokenSendToAddress}
                // onChange={setTokenSendToAddress}
              />
            </div>
            <div style={{ padding: 8 }}>
              <Input
                style={{ textAlign: "center" }}
                placeholder={"amount of tokens to send"}
                // value={tokenSendAmount}
                onChange={e => {
                  // setTokenSendAmount(e.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ padding: 8 }}>
            <Button
              type={"primary"}
              // onClick={() => {
              //   tx(
              //     writeContracts.YourToken.transfer(tokenSendToAddress, ethers.utils.parseEther("" + tokenSendAmount)),
              //   );
              // }}
            >
              Send Tokens
            </Button>
          </div>
        </Card>
      </div>
      <div
        id="spreadsheet_output"
        className="textarea full_width spacer center_text"
      ></div>
      {/* <Dragger maxCount={1} onChange={onChange} {...props}>
      {fileList.length < 5 && '+ Upload'}
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger> */}
    </>
  );
};

export default UploadTokens;

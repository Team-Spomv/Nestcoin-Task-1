import { Button, Row, Col, notification, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";

const openNotification = (type, description) => {
  notification[type]({
    message: type === "warning" ? "LOADING..." : type.toUpperCase(),
    description,
  });
};

const UploadTokens = (props) => {
  const [fileName, setFileName] = useState("");
  const [state, setState] = useState({});
  // Token Amount to be sent
  const [amountToSend, setAmountToSend] = useState();

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    // get addresses from uploaded spreadsheet file
    setFileName(fileObj.name);
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setState({
          cols: resp.cols,
          rows: resp.rows,
        });
      }
    });
  };

  // send bulk transfer transaction
  const sendTransaction = async (address) => {
    try {
      // loading alert to show transaction is being sent
      openNotification("warning", "Loading...");
      const tx = await props.contract.batchTransfer(
        address,
        props.ethers.utils.parseEther(String(amountToSend))._hex
      );
      tx.wait();

      // alert success message
      openNotification("success", "Transaction Successful!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="ant-upload ant-upload-drag">
        <label className="custom-file-upload">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>

          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onInput={(event) => fileHandler(event)}
            style={{ padding: "10px" }}
          />
        </label>
      </div>
      <span>{fileName}</span>

      <div
        value={`${amountToSend} `}
        suffix="NestCoin(NSC)"
        onChange={(e) => {
          setAmountToSend(e.target.value);
          console.log(amountToSend);
        }}
        style={{ margin: "1rem 0" }}
      >
        <Input placeholder="NestCoin(NSC) Amount to be sent" />
      </div>

      <div style={{ padding: 8 }}>
        <Button
          type={"primary"}
          onClick={() => {
            // send bulk transfer transaction
            !state.rows
              ? openNotification("error", "Please upload a file")
              : !amountToSend
              ? openNotification(
                  "error",
                  "Please enter the amount you want to send"
                )
              : state.rows.length > 200
              ? openNotification(
                  "error",
                  "Maximum number of addresses exceeded,        \n \n Reduce number to 200"
                )
              : sendTransaction(
                  state.rows.map((data) =>
                    data[1] !== undefined ? data[1] : null
                  )
                );
          }}
        >
          Send Tokens
        </Button>
      </div>

      <Row>
        <Col span={12} className="">
          {"Address"}
          {state.rows
            ? state.rows.map((data, i) => <p key={i}>{data[1]}</p>)
            : null}
        </Col>
        <Col span={12} className="">
          {"Amount"}
          {state.rows
            ? state.rows.map((data, i) => <p key={i}>{data[2]}</p>)
            : null}
        </Col>
      </Row>
    </>
  );
};

export default UploadTokens;

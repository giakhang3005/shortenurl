import { React, useState } from "react";
import {
  Typography,
  Table,
  message,
  Popover,
  Button,
} from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";
import {HandleDownloadQr} from "./DownloadQR"
import {ShortenUrlCopy} from "./ShortenUrlCopy"


export function ShowHistory() {
  const { Title, Text } = Typography;

  const [userHistory, setUserHistory] = useState(
    JSON.parse(localStorage.getItem("userHistory"))
  );

  //----------------------------------------------------------------
  //! Columns
  const Columns = [
    //setUserHistory, userHistory
    {
      key: "1",
      title: "Original Url",
      dataIndex: "long",
    },
    {
      key: "2",
      title: "Shorten Url",
      render: (url) => {
        return (
          <ShortenUrlCopy url={url} />
        );
      },
    },
    {
      key: "3",
      title: "",
      render: (url) => {
        return <HandleDownloadQr url={url} />;
      },
    },
  ];

  return (
    <div
      className="InputUrl"
      style={Object.assign(
        { width: "90%" },
        { margin: "0 20px 0 20px" },
        { height: "100%" },
        { position: "absolute" },
        { top: "40px" }
      )}
    >
      <Title className="InputTitle"></Title>

      <Table
        style={Object.assign({ width: "100%" }, { maxHeight: "100vh" })}
        columns={Columns}
        dataSource={userHistory}
        rowKey="id"
        key="key"
      ></Table>
    </div>
  );
}

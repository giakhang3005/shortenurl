import { React, useState } from "react";
import { Typography, Table, message, Popover, Button, Popconfirm } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import QRCode from "react-qr-code";

export function ShowHistory() {
  const { Title, Text } = Typography;

  //state for all url
  const [userHistory, setUserHistory] = useState(
    JSON.parse(localStorage.getItem("userHistory"))
  );

  //clear all history
  const handleClearAll = () => {
    setUserHistory([]);
    localStorage.removeItem("userHistory");
    message.success("Cleared your history");
  };

  //columns
  const columns = [
    {
      key: "1",
      title: "Original Url",
      //location.id
      dataIndex: "long",
    },
    {
      key: "2",
      title: "Shorten Url",
      render: (url) => {
        return (
          <span style={Object.assign({display: 'flex'}, {alignItems: 'center'})}>
            <span style={{margin: '0 10px 0 0'}}>{url.short} </span>
            <Popover content="Click to copy">
              <CopyToClipboard
                text={url.short}
                onCopy={() => message.success("Copied")}
              >
                <Button icon={<CopyOutlined />} type="primary"></Button>
              </CopyToClipboard>
            </Popover>
          </span>
        );
      },
    },
    {
      key: "3",
      title: (
        <Popconfirm
          title="Clear History"
          description="Are you sure to clear your history?"
          onConfirm={handleClearAll}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Button type="primary" icon={<DeleteOutlined />} danger>
            Clear all
          </Button>
        </Popconfirm>
      ),
      render: (url) => {
        return (
          <>
            {/* QR Code */}
            <QRCode style={Object.assign({width: '60px'}, {height: '60px'}, {margin: 0})} value={url.short} />
          </>
        );
      },
    },
  ];

  return (
    <div
      className="InputUrl"
      style={Object.assign({ width: "100%" }, { margin: "0 20px 0 20px" })}
    >
      <Title className="InputTitle">HISTORY</Title>

      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={userHistory}
        rowKey="id"
        key="key"
      ></Table>
    </div>
  );
}

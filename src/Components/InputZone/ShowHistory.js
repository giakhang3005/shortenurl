import React from "react";
import { Typography, Table, message, Popover, Button } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

export function ShowHistory() {
  const { Title, Text } = Typography;

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
      dataIndex: "short",
    },
    {
      key: "3",
      title: "",
      render: (url) => {
        return (
          <Popover content="Click to copy">
            <CopyToClipboard
              text={url.short}
              onCopy={() => message.success("Copied")}
            >
              <Button icon={<CopyOutlined />} type="primary"></Button>
            </CopyToClipboard>
          </Popover>
        );
      },
    },
  ];

  const userHistory = JSON.parse(localStorage.getItem("userHistory"));

  return (
    <div className="InputUrl">
      <Title className="InputTitle">HISTORY</Title>
      <Table
        columns={columns}
        dataSource={userHistory}
        // loading={isLoading}
        rowKey="id"
      ></Table>
    </div>
  );
}

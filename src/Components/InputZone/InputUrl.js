import { React, useState } from "react";
import {
  Input,
  Button,
  Space,
  Typography,
  Tag,
  message,
  Popover,
  QRCode,
} from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";
import "./InputUrl.css";
import { useGenerateUrl } from "../../Hooks/HooksController";
import { GenerateShortenLink } from "./GeneratedShortenLink";
import {DownloadQR} from "./DownloadQR";

export function InputUrl() {
  const { Title, Text } = Typography;

  //decare hooks
  const { shortenUrl, loading, generateUrl } = useGenerateUrl();

  return (
    <div className="InputUrl">
      <Title className="InputTitle">URL SHORTENER</Title>

      <Space.Compact
        style={Object.assign({ width: "97%" }, { margin: "0 0 0 0" })}
      >
        <Popover content="Your long URL, Ex: google.com/docs/1#abde...">
          <Input
            allowClear
            className="UrlInputBox"
            placeholder="Input your long URL"
            style={{ width: "100%" }}
          />
        </Popover>
      </Space.Compact>

      <Space.Compact
        style={Object.assign(
          { width: "100%" },
          { display: "flex" },
          { alignItems: "flex-start" },
          { justifyContent: "flex-start" }
        )}
      >
        <Popover
          title="Your custom path"
          content={
            <>
              Ex: https://shorten.giakhang3005.com/<b>test-form</b> <br />
              <b>[test-form]</b> is the path
              <br />
              <br />
              Leave it empty if you want a random path
            </>
          }
        >
          <Input
            allowClear
            addonBefore={
              <span style={{ color: "white" }}>
                https://shorten.giakhang3005.com/
              </span>
            }
            className="PathInput"
            style={Object.assign(
              { width: "100%" },
              { height: "32px" },
              { margin: "5px 5px 0 5px" }
            )}
            placeholder="Custom path"
          ></Input>
        </Popover>
      </Space.Compact>

      {/* Submit Button */}
      <Space.Compact style={Object.assign({ width: "100%" })}>
        <Button
          loading={loading}
          type="primary"
          style={Object.assign(
            { height: "36.5px" },
            { width: "100%" },
            { margin: "15px 5px 0 5px" }
          )}
          onClick={() => GenerateShortenLink(generateUrl)}
        >
          Shorten
        </Button>
      </Space.Compact>

      {/* Result */}
      {shortenUrl !== "" && (
        <span
          style={Object.assign(
            { display: "flex" },
            { justifyContent: "center" },
            { alignItems: "center" },
            { margin: "8px 0 0 0" }
          )}
        >
          {/* QR Code */}
          <Popover content="Click to download">
            <a onClick={() => DownloadQR(shortenUrl)} className="qrDownload">
              <QRCode
                className="qrcode"
                size={100}
                bordered
                style={Object.assign({ margin: "0 7px 0 0" })}
                type="canvas"
                value={shortenUrl}
              />
            </a>
          </Popover>

          {/* Link */}
          <Tag color="green">{shortenUrl}</Tag>
          <Popover content="Click to copy">
            <CopyToClipboard
              style={{ margin: "0 0 0 0" }}
              text={shortenUrl}
              onCopy={() => message.success("Copied")}
            >
              <Button icon={<CopyOutlined />} type="primary"></Button>
            </CopyToClipboard>
          </Popover>
        </span>
      )}
    </div>
  );
}

import { message, Popover, Button } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

//! Handle showing & Copy action of shorten URL
export const ShortenUrlCopy = ({ url }) => {
  return (
    <span style={Object.assign({ display: "flex" }, { alignItems: "center" })}>
      <span style={{ margin: "0 10px 0 0" }}>{url.short} </span>
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
};

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
//https://app.short.io/users/dashboard/878845/links

export function InputUrl() {
  const { Title, Text } = Typography;

  const [shortenUrl, setShortenUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const checkUrl = (string) => {
    try {
      return Boolean(new URL(string));
    } catch (e) {
      return false;
    }
  };

  //generate link
  const generateShortenLink = () => {
    const SelectedInput = document.querySelectorAll(".ant-input");
    const userInputUrl = SelectedInput[0].value;
    const userInputPath = SelectedInput[1].value;

    console.log(userInputUrl);

    const handleGenerateUrl = (data) => {
      if (checkUrl(userInputUrl) === false) {
        message.error("You must enter a url to shorten");
        setShortenUrl("");
      } else {
        setLoading(true);
        fetch("https://api.short.io/links/public", {
          method: "post",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            authorization: "pk_cYj2a160rvwjosKP",
          },
          body: JSON.stringify(data),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            //check for errors
            if (data.success === false) {
              setLoading(false);
              setShortenUrl("");
              message.error(
                "Path aldready exist, please change to a new one or leave it empty for a random path"
              );
            } else {
              setLoading(false);
              message.success("Generate shorten Url successfully");

              //return to users
              setShortenUrl(data.shortURL);

              //save to localStorage
              const userHistory = JSON.parse(
                localStorage.getItem("userHistory")
              );
              if (userHistory === null || userHistory === undefined) {
                localStorage.setItem(
                  "userHistory",
                  JSON.stringify([{ long: userInputUrl, short: data.shortURL }])
                );
              } else {
                localStorage.setItem(
                  "userHistory",
                  JSON.stringify([
                    ...userHistory,
                    { long: userInputUrl, short: data.shortURL },
                  ])
                );
              }
            }
          });
      }
    };

    if (userInputPath.length === 0) {
      let data = {
        domain: "shorten.giakhang3005.com",
        originalURL: userInputUrl,
        allowDuplicates: false,
      };
      handleGenerateUrl(data);
    } else if (userInputPath.length >= 5 && userInputPath.length <= 15) {
      let data = {
        domain: "shorten.giakhang3005.com",
        originalURL: userInputUrl,
        allowDuplicates: false,
        path: userInputPath,
      };
      handleGenerateUrl(data);
    } else {
      message.error("Path must between 5 and 15 characters");
    }
  };


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
          onClick={generateShortenLink}
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
            <QRCode
              size={100}
              bordered
              style={Object.assign({ margin: "0 7px 0 0" })}
              type="canvas"
              value={shortenUrl}
            />
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

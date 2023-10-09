import { React, useState } from "react";
import { Input, Button, Space, Typography, Tag, message, Popover } from "antd";
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
    setLoading(true);
    const userInputUrl = document.querySelector(".UrlInputBox").value;

    if (checkUrl(userInputUrl) === false) {
      setLoading(false);
      message.error("You must enter a url to shorten");
    } else {
      let data = {
        domain: "shorten.giakhang3005.com",
        originalURL: userInputUrl,
        allowDuplicates: false,
      };
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
          message.success("Generate shorten Url successfully");

          //return to users
          setShortenUrl(data.shortURL);

          //save to localStorage
          const userHistory = JSON.parse(localStorage.getItem("userHistory"));
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

          setLoading(false);
        });
    }
  };

  return (
    <div className="InputUrl">
      <Title className="InputTitle">URL SHORTENER</Title>

      <Space.Compact style={Object.assign({ width: "100%" })}>
        <Input className="UrlInputBox" placeholder="Input Url to shorten" />

        <Button
          loading={loading}
          type="primary"
          style={{ height: "36.5px" }}
          onClick={generateShortenLink}
        >
          Shorten
        </Button>
      </Space.Compact>
      <br />

      {/* Result */}
      {shortenUrl !== "" && (
        <>
          <Tag color="green">{shortenUrl}</Tag>
          <Popover content="Click to copy">
            <CopyToClipboard
              text={shortenUrl}
              onCopy={() => message.success("Copied")}
            >
              <Button icon={<CopyOutlined />} type="primary"></Button>
            </CopyToClipboard>
          </Popover>
        </>
      )}
    </div>
  );
}

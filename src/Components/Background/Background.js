import React from "react";
import "./Background.css";
import { Button, Typography } from "antd";
import {
  FacebookFilled,
  MailFilled,
  HistoryOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

export function Background(props) {
  const {Text} = Typography;
  const location = useLocation();
  const setView = props.setView,
    view = props.view;

  return (
    <div>
      <ul className="background">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      {location.pathname === "/nonexist" ? (
        <></>
      ) : view === "viewHistory" ? (
        <Button
          className="viewBtn"
          icon={<CodeOutlined />}
          type="primary"
          size="small"
          onClick={() => setView("")}
        >
          Shorten Url
        </Button>
      ) : (
        <Button
          className="viewBtn"
          icon={<HistoryOutlined />}
          type="primary"
          size="small"
          onClick={() => setView("viewHistory")}
        >
          View History
        </Button>
      )}
      <div className="info">
      <Text style={Object.assign({color: 'white'})}>Powered by Gia Khang</Text>
        <a href="https://www.facebook.com/danny.neee" target="_blank">
          <Button
            className="infoBtn"
            type="text"
            icon={<FacebookFilled />}
          ></Button>
        </a>
        <a href="mailto:khanggia85@gmail.com" target="_blank">
          <Button
            className="infoBtn"
            type="text"
            icon={<MailFilled />}
          ></Button>
        </a>
      </div>
    </div>
  );
}

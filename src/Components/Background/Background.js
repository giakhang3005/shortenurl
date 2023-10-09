import React from "react";
import "./Background.css";
import { Button } from "antd";
import {
  FacebookFilled,
  MailFilled,
  HistoryOutlined,
  CodeOutlined
} from "@ant-design/icons";

export function Background(props) {
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

      {view === "viewHistory" ? (
        <Button className="viewBtn" icon={<CodeOutlined/>} type="primary" size="small" onClick={() => setView("")}>
          Shorten Url
        </Button>
      ) : (
        <Button className="viewBtn" icon={<HistoryOutlined />} type="primary" size="small" onClick={() => setView("viewHistory")}>
          View History
        </Button>
      )}

      <div className="info">
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

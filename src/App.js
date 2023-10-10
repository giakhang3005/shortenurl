import { Background } from "./Components/Background/Background";
import { InputUrl } from "./Components/InputZone/InputUrl";
import { ShowHistory } from "./Components/InputZone/ShowHistory";
import { ConfigProvider } from "antd";
import { useState } from "react";
import {NonExist} from "./Components/InputZone/NonExist"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  const [view, setView] = useState("");
  const [titleState, setTitleState] = useState(true);

  //change web title
  const shortenUrlByGK = () => {
    switch (titleState) {
      case true: {
        document.title = "Shorten Url";
        setTitleState(false);
        break;
      }
      case false: {
        document.title = "By Gia Khang";
        setTitleState(true);
        break;
      }
    }
  };
  setInterval(() => shortenUrlByGK(), 1600);

  return (
    <div
      className="App"
      style={Object.assign(
        { display: "flex" },
        { justifyContent: "center" },
        { alignItems: "center" },
        { height: "100vh" },
        { width: "100wh" },
        { overFlow: "scroll" }
      )}
    >
      <ConfigProvider theme={{ token: { colorPrimary: "#518bb2" } }}>

        <BrowserRouter>
        <span style={{display: 'none'}}>
          <Link to="/nonexists">nonexist</Link>
          <Link to="/*">main</Link>
        </span>
          <Routes>
            <Route path="/nonexist" element={<NonExist />}/>
            <Route
              path="/*"
              element={view === "viewHistory" ? <ShowHistory /> : <InputUrl />}
            />
          </Routes>
          <Background setView={setView} view={view} />
        </BrowserRouter>

      </ConfigProvider>
    </div>
  );
}

export default App;
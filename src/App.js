import { Background } from "./Components/Background/Background";
import { InputUrl } from "./Components/InputZone/InputUrl";
import { ShowHistory } from "./Components/History/ShowHistory";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { NonExist } from "./Components/NonExist/NonExist";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { getIpAddress } from "./Hooks/Apis";

function App() {
  const [view, setView] = useState("");
  const [titleState, setTitleState] = useState(true);

  useEffect(() => {
    getIpAddress(null);
  }, []);

  return (
    <div
      className="App"
      style={Object.assign(
        { display: "flex" },
        { justifyContent: "center" },
        { alignItems: "center" },
        { height: "100vh" },
        { width: "100wh" },
        { overFlow: "hidden" }
      )}
    >
      <ConfigProvider theme={{ token: { colorPrimary: "#518bb2" } }}>
        <BrowserRouter>
          <span style={{ display: "none" }}>
            <Link to="/nonexists">nonexist</Link>
            <Link to="/*">main</Link>
          </span>
          <Routes>
            <Route path="/nonexist" element={<NonExist />} />
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

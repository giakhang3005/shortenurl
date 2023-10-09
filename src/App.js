import { Background } from "./Components/Background/Background";
import { InputUrl } from "./Components/InputZone/InputUrl";
import {ShowHistory} from "./Components/InputZone/ShowHistory";
import { ConfigProvider } from "antd";
import { useState } from "react";

function App() {
  const [view, setView] = useState("");

  return (
    <div
      className="App"
      style={Object.assign(
        { display: "flex" },
        { justifyContent: "center" },
        { alignItems: "center" },
        { height: "100vh" },
        {width: "100%"},
      )}
    >
      <ConfigProvider theme={{ token: { colorPrimary: "#518bb2" } }}>
        {view === "viewHistory" ? (
          <ShowHistory />
        ) : (
          <InputUrl/>
        )}
        <Background setView={setView} view={view}/>
      </ConfigProvider>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function ThemeWrapper() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return <App dark={dark} setDark={setDark} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeWrapper />
);
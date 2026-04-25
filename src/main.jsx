import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App";
import "./index.css";

function ThemeWrapper() {
  const [dark, setDark] = useState(true);

  return (
    <BrowserRouter>
      <App dark={dark} setDark={setDark} />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeWrapper />
    <SpeedInsights />
  </React.StrictMode>
);
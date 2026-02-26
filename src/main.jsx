// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// function ThemeWrapper() {
//   const [dark, setDark] = useState(true);

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [dark]);

//   return <App dark={dark} setDark={setDark} />;
// }

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <ThemeWrapper />
// );

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

function ThemeWrapper() {
  const [dark, setDark] = useState(true); // default to dark mode

  return (
    <BrowserRouter>
      <App dark={dark} setDark={setDark} />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeWrapper />
  </React.StrictMode>
);
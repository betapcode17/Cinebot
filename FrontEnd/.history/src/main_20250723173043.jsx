import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // import CSS ở đây
import "./App.css"; // nếu có

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

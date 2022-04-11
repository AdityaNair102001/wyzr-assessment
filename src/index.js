import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const replaceHashPath = () => {
  const history = createBrowserHistory();
  const hash = history.location.hash;
  if (hash) {
    const path = hash.replace(/^#/, "");
    if (path) {
      history.replace(path);
    }
  }
};
replaceHashPath();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

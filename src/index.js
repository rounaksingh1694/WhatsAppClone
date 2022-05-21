import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import Router from "./Router";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(<Router />, document.getElementById("root"));

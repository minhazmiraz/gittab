import React from "react";
import ReactDOM from "react-dom";
import SidebarApp from "./views/Content/components/SidebarApp";

let body = document.getElementsByTagName("body")[0];
let divRoot = document.createElement("div");
divRoot.setAttribute("id", "root");
body.insertBefore(divRoot, body.firstElementChild);

ReactDOM.render(
  <React.StrictMode>
    <SidebarApp />
  </React.StrictMode>,
  document.getElementById("root")
);

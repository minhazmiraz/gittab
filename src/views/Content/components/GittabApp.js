import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { SidebarContext } from "../contexts/SidebarContext";
import { TabsbarContext } from "../contexts/TabsbarContext";
import Sidebar from "./Sidebar";
import Tabsbar from "./Tabsbar";

const GittabApp = () => {
  const sidebarContextData = useContext(SidebarContext);
  const tabsbarContextData = useContext(TabsbarContext);

  const sidebarInject = () => {
    if (!document.getElementById("gittab-sidebar")) {
      let body = document.getElementsByTagName("body")[0];
      let divRoot = document.createElement("div");
      divRoot.setAttribute("id", "gittab-sidebar");
      body.insertBefore(divRoot, body.firstElementChild);
    }

    if (!document.getElementById("gittab-sidebar")) {
      console.log("gittab-sidebar not pushed!!");
      return;
    }

    ReactDOM.render(
      <React.StrictMode>
        <Sidebar {...sidebarContextData} {...tabsbarContextData} />
      </React.StrictMode>,
      document.getElementById("gittab-sidebar")
    );
  };

  const tabsbarInject = () => {
    if (!document.getElementById("gittab-tab")) {
      let divChild = document.createElement("div");
      divChild.setAttribute("id", "gittab-tab");
      let target = document.querySelector("main");
      target.insertBefore(divChild, target.children[1]);
    }

    if (!document.getElementById("gittab-tab")) {
      console.log("gittab-tab not pushed!!");
      return;
    }

    ReactDOM.render(
      <React.StrictMode>
        <Tabsbar {...sidebarContextData} {...tabsbarContextData} />
      </React.StrictMode>,
      document.getElementById("gittab-tab")
    );
  };

  return (
    <div>
      {sidebarInject()}
      {tabsbarInject()}
    </div>
  );
};

export default GittabApp;

import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
} from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import FileTree from "./FileTree";

const Sidebar = (props) => {
  const {
    repoData,
    sidebarData,
    setSidebarData,
    sourceTree,
    setGetSource,
  } = props;
  console.log("props", props);

  const handleDrawerOpen = () => {
    if (sidebarData.drawerOpen) {
      document
        .getElementsByTagName("body")[0]
        .setAttribute("style", "margin-left: 0px;");
    } else {
      document
        .getElementsByTagName("body")[0]
        .setAttribute("style", "margin-left: 200px;");
      setGetSource(true);
    }
    setSidebarData({ ...sidebarData, drawerOpen: !sidebarData.drawerOpen });
  };

  console.log(repoData);

  return (
    <div className="sidebar">
      <Drawer
        anchor="left"
        open={sidebarData.drawerOpen}
        variant="persistent"
        PaperProps={{
          style: { width: "200px" },
          component: "div",
          variant: "outlined",
        }}
      >
        <Button onClick={handleDrawerOpen}>Close</Button>
        <Divider />
        {sourceTree.tree && <FileTree {...props} />}
        {!sourceTree.tree && (
          <Backdrop open={!sourceTree.tree}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Drawer>
      {!sidebarData.drawerOpen &&
        Object.values(repoData).every((o) => o !== null && o !== undefined) && (
          <div
            style={{
              position: "fixed",
              top: "250px",
              left: "-20px",
            }}
          >
            <IconButton color="primary" onClick={handleDrawerOpen}>
              <GitHub />
            </IconButton>
          </div>
        )}
    </div>
  );
};

export default Sidebar;

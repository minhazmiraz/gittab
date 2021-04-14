import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import React from "react";
import Scrollbars from "react-custom-scrollbars";
import Draggable from "react-draggable";
import FileTree from "./FileTree";

const Sidebar = (props) => {
  const {
    repoData,
    sidebarData,
    setSidebarData,
    sourceTree,
    setGetSource,
  } = props;

  console.log("sidebar props", props);

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

  const handleDrag = (e, ui) => {
    const { x, y } = sidebarData.draggableIconPosition;
    setSidebarData({
      ...sidebarData,
      draggableIconPosition: { x, y: y + ui.deltaY },
    });
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
        {sourceTree.tree && (
          <Scrollbars autoHide>
            <FileTree {...props} />
          </Scrollbars>
        )}
        {!sourceTree.tree && (
          <Backdrop open={!sourceTree.tree}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Drawer>
      {!sidebarData.drawerOpen &&
        Object.values(repoData).every((o) => o !== null && o !== undefined) && (
          <Draggable
            axis="y"
            defaultPosition={{
              x: sidebarData.draggableIconPosition.x,
              y: sidebarData.draggableIconPosition.y,
            }}
            bounds={{ top: 60, bottom: 560, left: 0, right: 0 }}
            onDrag={handleDrag}
          >
            <div
              style={{
                position: "fixed",
              }}
            >
              <IconButton color="primary" onClick={handleDrawerOpen}>
                <GitHub />
              </IconButton>
            </div>
          </Draggable>
        )}
    </div>
  );
};

export default Sidebar;

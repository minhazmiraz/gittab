import { Tab, Tabs, withStyles } from "@material-ui/core";
import {
  getMaterialFileIcon,
  getMaterialFolderIcon,
} from "file-extension-icon-js";
import { useContext, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { TabsbarContext } from "../contexts/TabsbarContext";

const Tabsbar = (props) => {
  const { repoData, tabsList, activeTab, setActiveTab } = props;

  const AntTabs = withStyles({
    root: {
      background: "#fafbfc",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      border: "1px solid #d9dadc",
    },
    indicator: {
      backgroundColor: "#1890ff",
    },
  })(Tabs);

  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "#40a9ff",
        opacity: 1,
      },
      "&$selected": {
        background: "#f1f8ff",
        color: "#1890ff",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "#40a9ff",
      },
    },
    selected: {},
  }))((props) => <Tab disableRipple {...props} />);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const treeIcon = (name, type) => {
    //type: 0 - file, 1 - folder, 2 - open folder
    let iconSrc = "";
    let iconAlt = "";
    switch (type) {
      case 0:
        iconSrc = getMaterialFileIcon(name);
        iconAlt = "-";
        break;
      case 1:
        iconSrc = getMaterialFolderIcon(name);
        iconAlt = "+";
        break;
      case 2:
        iconSrc = getMaterialFolderIcon(name, 1);
        iconAlt = "-";
        break;

      default:
        break;
    }
    return <img src={iconSrc} alt={iconAlt} width="15" />;
  };

  console.log("tabslist: ", tabsList);

  return (
    <div style={{ marginBottom: "10px" }}>
      {tabsList.array.length > 0 && (
        <AntTabs
          value={activeTab}
          onChange={handleChange}
          aria-label="gittab-tabsbar"
        >
          {tabsList.array.map((tab) => (
            <AntTab
              key={tab.id}
              value={tab.id}
              label={
                //Todo: Link should be whole tab
                <a
                  href={
                    "/" +
                    repoData["author"] +
                    "/" +
                    repoData["name"] +
                    "/blob/" +
                    repoData["branch"] +
                    "/" +
                    tab.path
                  }
                  style={{ textDecoration: "none", color: "inherit" }}
                  data-pjax="#repo-content-pjax-container"
                >
                  {tab.name}
                </a>
              }
              icon={treeIcon(tab.name, 0)}
            />
          ))}
        </AntTabs>
      )}
    </div>
  );
};

export default Tabsbar;

import { Link, Tab, Tabs, withStyles } from "@material-ui/core";
import {
  getMaterialFileIcon,
  getMaterialFolderIcon,
} from "file-extension-icon-js";

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
      backgroundColor: "#f2816b",
    },
  })(Tabs);

  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(0.5),
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
        color: "#f2816b",
        opacity: 1,
      },
      "&$selected": {
        background: "#fafbfc",
        color: "#f2816b",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "#f2816b",
      },
    },
    selected: {},
    wrapper: {
      display: "inline",
    },
    labelIcon: {
      minHeight: "0px",
    },
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
    return (
      <img
        src={iconSrc}
        alt={iconAlt}
        width="15"
        height="15"
        style={{ marginBottom: "-3px", marginRight: "5px" }}
      />
    );
  };

  const isSourcePage = () => {};

  console.log("tabslist: ", tabsList);

  return (
    <div
      style={{
        marginBottom: "10px",
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
    >
      {tabsList.array.length > 0 && (
        <AntTabs
          value={activeTab}
          onChange={handleChange}
          aria-label="gittab-tabsbar"
          variant="scrollable"
          scrollButtons="off"
        >
          {tabsList.array.map((tab) => (
            <AntTab
              key={tab.id}
              value={tab.id}
              component={Link}
              icon={treeIcon(tab.name, 0)}
              label={tab.name}
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
              style={{ textDecoration: "none" }}
              data-pjax="#repo-content-pjax-container"
            />
          ))}
        </AntTabs>
      )}
    </div>
  );
};

export default Tabsbar;

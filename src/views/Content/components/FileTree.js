import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import {
  getMaterialFileIcon,
  getMaterialFolderIcon,
} from "file-extension-icon-js";
import { makeStyles, Typography } from "@material-ui/core";

const FileTree = ({ repoData, sourceTree }) => {
  let treeData = sourceTree?.tree !== undefined ? sourceTree.tree : [];

  const data = {
    name: repoData.name,
    id: 1,
    child: treeData,
  };

  const useTreeItemStyles = makeStyles((theme) => ({
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.3, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(0.3),
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1,
    },
  }));

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

    const icon = <img src={iconSrc} alt={iconAlt} width="15" />;

    return icon;
  };

  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelLink, ...other } = props;

    const labelDiv = (
      <div className={classes.labelRoot}>
        <i
          className={classes.labelIcon}
          style={{ marginTop: "6px", marginRight: "3px" }}
        >
          {LabelIcon}
        </i>
        <Typography
          variant="body2"
          className={classes.labelText}
          style={{ whiteSpace: "nowrap" }}
        >
          {labelText}
        </Typography>
      </div>
    );

    return (
      <TreeItem
        label={
          labelLink ? (
            <a
              href={labelLink}
              style={{ textDecoration: "none", color: "inherit" }}
              data-pjax="#repo-content-pjax-container"
            >
              {labelDiv}
            </a>
          ) : (
            labelDiv
          )
        }
        {...other}
      />
    );
  }

  console.log("FileTree");

  const renderTree = (nodes) => (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id.toString()}
      labelIcon={
        nodes.child.length > 0
          ? treeIcon(nodes.name, 1)
          : treeIcon(nodes.name, 0)
      }
      labelText={nodes.name}
      labelLink={
        nodes.child.length === 0
          ? "/" +
            repoData["author"] +
            "/" +
            repoData["name"] +
            "/blob/" +
            repoData["branch"] +
            "/" +
            nodes.path
          : ""
      }
    >
      {Array.isArray(nodes.child) && nodes.child.length
        ? nodes.child.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  return (
    <div>
      <TreeView
        defaultExpanded={["1"]}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
};

export default FileTree;

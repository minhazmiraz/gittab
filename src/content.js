import React from "react";
import ReactDOM from "react-dom";
import SidebarApp from "./views/Content/components/SidebarApp";
import TabsbarApp from "./views/Content/components/TabsbarApp";

//Sidebar injection
let body = document.getElementsByTagName("body")[0];
let divRoot = document.createElement("div");
divRoot.setAttribute("id", "gittab-sidebar");
body.insertBefore(divRoot, body.firstElementChild);

ReactDOM.render(
  <React.StrictMode>
    <SidebarApp />
  </React.StrictMode>,
  document.getElementById("gittab-sidebar")
);

//Tabsbar injection
let target = document.querySelector("#repo-content-pjax-container");
let divChild = document.createElement("div");
divChild.setAttribute("id", "gittab-tab");

if (
  target.querySelector("#blob-path") &&
  target.querySelector("#blob-more-options-details") &&
  target.querySelector(" #blob-path").parentElement ===
    target.querySelector("#blob-more-options-details").parentElement
) {
  console.log("found");
  let parent = target.querySelector("#blob-path").parentElement.parentElement;
  let child = target.querySelector("#blob-path").parentElement;
  parent.insertBefore(divChild, child.nextElementSibling);
} else {
  console.log("not found");
  target.insertBefore(divChild, target.firstElementChild);
}

ReactDOM.render(
  <React.StrictMode>
    <TabsbarApp />
  </React.StrictMode>,
  document.getElementById("gittab-tab")
);

let observer = new MutationObserver((mutations) => {
  console.log("new mutations array");
  let flag = 0;
  for (let idxA = 0; idxA < mutations.length; idxA++) {
    const mutation = mutations[idxA];
    let nodes = mutation.addedNodes;
    let idA = null;
    let idB = null;

    for (let idxB = 0; idxB < nodes.length; idxB++) {
      const node = nodes[idxB];
      console.log("new added node ");

      if (node.nodeType === 1) {
        if (!idA) idA = node.querySelector("#blob-path");
        if (!idB) idB = node.querySelector("#blob-more-options-details");
      }
    }

    if (idA && idB && idA.parentElement === idB.parentElement) {
      console.log("found");
      let parent = idA.parentElement.parentElement;
      let child = idA.parentElement;
      parent.insertBefore(divChild, child.nextElementSibling);
      flag = 1;
    }

    if (flag) break;
  }

  if (!flag) {
    let blobContainer = document.querySelector("#repo-content-pjax-container");
    blobContainer.insertBefore(divChild, blobContainer.firstElementChild);
  }

  ReactDOM.render(
    <React.StrictMode>
      <TabsbarApp />
    </React.StrictMode>,
    document.getElementById("gittab-tab")
  );
});

// configuration of the observer:
var config = {
  attributes: false,
  childList: true,
  subtree: false,
};

// pass in the target node, as well as the observer options
observer.observe(target, config);

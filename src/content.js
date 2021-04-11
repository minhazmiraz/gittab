import React from "react";
import ReactDOM from "react-dom";
import App from "./views/Content/App";

/* let body = document.getElementsByTagName("body")[0];
let divRoot = document.createElement("div");
divRoot.setAttribute("id", "gittab-sidebar");
body.insertBefore(divRoot, body.firstElementChild); */

let root = document.createElement("div");
root.setAttribute("id", "gittab-root");
document.getElementsByTagName("body")[0].appendChild(root);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("gittab-root")
);

/* 

let observer = new MutationObserver((mutations) => {
  console.log("new mutations");
  let flag = 0;
  for (let idxA = 0; idxA < mutations.length; idxA++) {
    const mutation = mutations[idxA];

    const container = [...mutation.addedNodes].filter((node) => {
      return node.nodeType === 1
        ? node.querySelector("#repo-content-pjax-container")
        : null;
    });

    if (container.length) {
      flag = 1;
      break;
    }
  }

  if (flag) {
    let target = document.querySelector("#repo-content-pjax-container");
    let divChild = document.createElement("div");
    divChild.setAttribute("id", "gittab-tab");
    target.parentElement.insertBefore(divChild, target);
  }
});

// configuration of the observer:
var config = {
  attributes: false,
  childList: true,
  subtree: true,
};
// pass in the target node, as well as the observer options
observer.observe(document.getElementById("js-repo-pjax-container"), config);
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./views/Content/App";

let repoData = {};

const fetchRepoHome = () => {
  console.log("fetchRepoHome");
  let fetchUrl =
    "https://www.github.com/" + repoData["author"] + "/" + repoData["name"];

  fetch(fetchUrl)
    .then((response) => response.text())
    .then((response) => {
      let doc = new DOMParser().parseFromString(response, "text/html");

      let shaSearchString =
        "/" + repoData["author"] + "/" + repoData["name"] + "/commit/";
      let shaSearchSpace = doc.getElementById("repo-content-pjax-container")
        .innerHTML;
      repoData["sha"] = shaSearchSpace.substr(
        shaSearchSpace.indexOf(shaSearchString) + shaSearchString.length,
        40
      );

      console.log(repoData);
    });
};

const scrapeData = () => {
  console.log("scrapeData");
  let data = {};

  //Get Repo Name and Repo Author
  let url = window.location.href;
  let urlData = url.split("/");

  data["author"] = urlData[3];
  data["name"] = urlData[4];

  if (!data["name"] || !data["author"]) return false;

  //Get Branch name
  let branch_selector = document.querySelector(
    "#branch-select-menu [data-menu-button]"
  );

  if (!branch_selector) return false;

  data["branch"] = branch_selector.outerText;

  return data;
};

let contents = () => {
  console.log("contents");
  repoData = scrapeData();

  if (repoData["name"] && repoData["author"] && repoData["branch"])
    fetchRepoHome();

  /* if (data === false) return;
  console.log(data);
  
  const parent = document.querySelector(".file-navigation");
  if (!parent) return;
  const child = parent.querySelector("a.btn");
  if (!child) return;
  
  let btn = document.createElement("button");
  let btnText = document.createTextNode("Source");
  btn.appendChild(btnText);
  btn.setAttribute("class", "btn ml-2 d-none d-md-block");
    btn.setAttribute("id", "sourceButton");
    parent.insertBefore(btn, child);
    
    document
    .getElementById("sourceButton")
    .addEventListener("click", () => openIde(data));
  }, 500); */
};

//contents();

setTimeout(() => {
  let body = document.getElementsByTagName("body")[0];
  body.setAttribute("style", "margin-left: 215px");

  let divRoot = document.createElement("div");
  divRoot.setAttribute("id", "root");
  document.getElementsByTagName("html")[0].insertBefore(divRoot, body);

  ReactDOM.render(
    <React.StrictMode>Hello World</React.StrictMode>,
    document.getElementById("root")
  );
}, 500);

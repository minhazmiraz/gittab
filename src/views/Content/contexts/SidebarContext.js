import { createContext, useEffect, useState } from "react";
import { parseJsonToTree } from "../common/parseTree";

export const SidebarContext = createContext();

const SidebarContextProvider = (props) => {
  const [repoData, setRepoData] = useState({
    name: null,
    author: null,
    branch: null,
    sha: null,
  });

  const [sidebarData, setSidebarData] = useState({ drawerOpen: false });

  const [sourceTree, setSourceTree] = useState({});

  const [getSource, setGetSource] = useState(false);

  const fetchSourceTree = (abortCtrl) => {
    fetch(
      "https://api.github.com/repos/" +
        repoData["author"] +
        "/" +
        repoData["name"] +
        "/git/trees/" +
        repoData["sha"] +
        "?recursive=true",
      { signal: abortCtrl.signal }
    )
      .then((response) => response.json())
      .then((response) => {
        setSourceTree({
          details: repoData,
          tree: parseJsonToTree(response.tree),
        });
        setGetSource(false);
      });
  };

  const scrapeUrlData = () => {
    console.log("scrapeUrlData");
    let data = {
      name: null,
      author: null,
      branch: null,
      sha: null,
    };

    //Get Repo Name and Repo Author
    let urlData = document
      ?.querySelector(".js-permalink-shortcut")
      ?.href?.split("/");

    if (urlData) {
      data["author"] = urlData[3];
      data["name"] = urlData[4];
      data["sha"] = urlData[6];
    }

    data["branch"] = document
      ?.querySelector(".js-navigation-open.Link--primary")
      ?.href?.split("/")[6];

    if (!data["branch"]) {
      data["branch"] = document?.querySelector("#raw-url")?.href?.split("/")[6];
    }

    setRepoData(data);
  };

  let contents = () => {
    console.log("contents");
    scrapeUrlData();
  };

  useEffect(() => {
    contents();
  }, []);

  useEffect(() => {
    let abortCtrl = new AbortController();
    if (
      getSource &&
      repoData?.name !== sourceTree?.details?.name &&
      repoData?.author !== sourceTree?.details?.author
    ) {
      fetchSourceTree(abortCtrl);
    }
    return () => abortCtrl.abort();
  }, [getSource]);

  console.log("sidebarContext: ", {
    repoData,
    setRepoData,
    sidebarData,
    setSidebarData,
    sourceTree,
    setSourceTree,
    getSource,
    setGetSource,
  });

  return (
    <SidebarContext.Provider
      value={{
        repoData,
        setRepoData,
        sidebarData,
        setSidebarData,
        sourceTree,
        setSourceTree,
        getSource,
        setGetSource,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;

import { createContext, useEffect, useState } from "react";

export const TabsbarContext = createContext();

const TabsbarContextProvider = (props) => {
  const [tabsList, setTabsList] = useState({ array: [] });
  const [activeTab, setActiveTab] = useState(false);

  console.log(tabsList.array.length);
  console.log(activeTab);

  return (
    <TabsbarContext.Provider
      value={{ tabsList, setTabsList, activeTab, setActiveTab }}
    >
      {props.children}
    </TabsbarContext.Provider>
  );
};

export default TabsbarContextProvider;

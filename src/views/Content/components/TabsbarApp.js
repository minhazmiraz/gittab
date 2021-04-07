import SidebarContextProvider from "../contexts/SidebarContext";
import TabsbarContextProvider from "../contexts/TabsbarContext";
import Tabsbar from "./Tabsbar";

const TabsbarApp = () => {
  return (
    <SidebarContextProvider>
      <TabsbarContextProvider>
        <Tabsbar />
      </TabsbarContextProvider>
    </SidebarContextProvider>
  );
};

export default TabsbarApp;

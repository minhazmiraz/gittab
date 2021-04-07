import SidebarContextProvider from "../contexts/SidebarContext";
import TabsbarContextProvider from "../contexts/TabsbarContext";
import Sidebar from "./Sidebar";

const SidebarApp = () => {
  return (
    <SidebarContextProvider>
      <TabsbarContextProvider>
        <Sidebar />
      </TabsbarContextProvider>
    </SidebarContextProvider>
  );
};

export default SidebarApp;

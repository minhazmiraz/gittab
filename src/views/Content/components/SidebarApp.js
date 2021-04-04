import SidebarContextProvider from "../contexts/SidebarContext";
import Sidebar from "./Sidebar";

const SidebarApp = () => {
  return (
    <SidebarContextProvider>
      <Sidebar />
    </SidebarContextProvider>
  );
};

export default SidebarApp;

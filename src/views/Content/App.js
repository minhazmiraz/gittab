import React from "react";
import "./App.css";
import GittabApp from "./components/GittabApp";
import SidebarContextProvider from "./contexts/SidebarContext";
import TabsbarContextProvider from "./contexts/TabsbarContext";

function App() {
  return (
    <div className="App">
      <SidebarContextProvider>
        <TabsbarContextProvider>
          <GittabApp />
        </TabsbarContextProvider>
      </SidebarContextProvider>
    </div>
  );
}

export default App;

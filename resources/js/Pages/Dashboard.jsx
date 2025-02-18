import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("app");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        selectedSection={selectedSection}
        onSectionChange={setSelectedSection}
        toggleSidebar={toggleSidebar}
        isCollapsed={isSidebarCollapsed}
      />
      <MainContent selectedSection={selectedSection} />
    </div>
  );
}

export default Dashboard;

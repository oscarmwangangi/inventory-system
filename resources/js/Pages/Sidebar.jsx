import React from "react";

function Sidebar({ selectedSection, onSectionChange, toggleSidebar, isCollapsed }) {
    // Define your navigation items with inline SVG icons.
    const navItems = [
      {
        id: "app",
        label: "Dashboard",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M3 10h4l3-3 4 8 3-6h4" />
          </svg>
        ),
      },
      {
        id: "products",
        label: "Products",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4 17h16" />
          </svg>
        ),
      },
      {
        id: "inventory",
        label: "Inventory",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        ),
      },
      {
        id: "orders",
        label: "Orders",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M9 17v-2a4 4 0 014-4h0a4 4 0 014 4v2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M7 7h10M7 7l1-4h6l1 4" />
          </svg>
        ),
      },
      {
        id: "suppliers",
        label: "Suppliers",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M16 11V5a4 4 0 00-8 0v6" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M5 11h14l1 9H4l1-9z" />
          </svg>
        ),
      },
      {
        id: "reports",
        label: "Reports",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M9 17v-2a4 4 0 014-4h0a4 4 0 014 4v2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4 7h16" />
          </svg>
        ),
      },
      {
        id: "settings",
        label: "Settings",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M12 8v4l3 3" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M12 4a8 8 0 100 16 8 8 0 000-16z" />
          </svg>
        ),
      },
      {
        id: "help",
        label: "Help/Support",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M8 10h.01M12 14h.01M16 10h.01M12 16h.01" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        ),
      },
    ];
  
    return (
      <div
        className={`bg-blue-800 text-white transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && <span className="text-lg font-bold">Admin Panel</span>}
          <button onClick={toggleSidebar} className="focus:outline-none">
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center w-full p-4 hover:bg-blue-700 ${
                    selectedSection === item.id ? "bg-blue-700" : ""
                  }`}
                >
                  <span>{item.icon}</span>
                  {!isCollapsed && <span className="ml-4">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }

export default Sidebar;

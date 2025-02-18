import React from "react";
import App from "./sections/App";
import Products from "./sections/Products";
import Inventory from "./sections/Inventory";
import Orders from "./sections/Orders";
import Suppliers from "./sections/Suppliers";
import Reports from "./sections/Reports";
import Settings from "./sections/Settings";
import Help from "./sections/Help";

function MainContent({ selectedSection }) {
  return (
    <div className="p-6 flex-1 overflow-auto">
      {selectedSection === "app" && <App />}
      {selectedSection === "products" && <Products />}
      {selectedSection === "inventory" && <Inventory />}
      {selectedSection === "orders" && <Orders />}
      {selectedSection === "suppliers" && <Suppliers />}
      {selectedSection === "reports" && <Reports />}
      {selectedSection === "settings" && <Settings />}
      {selectedSection === "help" && <Help />}
    </div>
  );
}

export default MainContent;

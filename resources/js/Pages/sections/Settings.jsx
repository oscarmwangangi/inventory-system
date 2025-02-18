import React, { useState, useEffect } from "react";

function Settings() {
  const [activeTab, setActiveTab] = useState("userManagement");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (activeTab === "userManagement") {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, [activeTab]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("userManagement")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "userManagement"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab("integrations")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "integrations"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Integrations
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`px-4 py-2 ${
            activeTab === "preferences"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Preferences
        </button>
      </div>
      {activeTab === "userManagement" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p>Manage system users here.</p>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email}) - {user.role}
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === "integrations" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Integrations</h2>
          <p>Configure system integrations here.</p>
        </div>
      )}
      {activeTab === "preferences" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Preferences</h2>
          <p>Set system preferences here.</p>
        </div>
      )}
    </div>
  );
}

export default Settings;

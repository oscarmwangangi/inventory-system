import React, { useState, useEffect } from "react";

function Suppliers() {
  const [activeTab, setActiveTab] = useState("supplierList");
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact_email: "",
    contact_phone: "",
    address: "",
  });

  // Fetch suppliers when component mounts
  useEffect(() => {
    fetch("/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error("Error fetching suppliers:", err));
  }, []);

  // Handle supplier submission
  const addSupplier = async () => {
    if (newSupplier.name.trim() === "") {
      alert("Please enter a supplier name.");
      return;
    }

    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSupplier),
      });

      const responseText = await response.text();
      console.log("Response:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      setSuppliers([...suppliers, data]);
      setNewSupplier({
        name: "",
        contact_email: "",
        contact_phone: "",
        address: "",
      });
      alert("Supplier added successfully!");
    } catch (error) {
      console.error("Error adding supplier:", error.message);
      alert(`Error adding supplier: ${error.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("supplierList")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "supplierList" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Supplier List
        </button>
        <button
          onClick={() => setActiveTab("addSupplier")}
          className={`px-4 py-2 ${
            activeTab === "addSupplier" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Add New Supplier
        </button>
      </div>
      {activeTab === "supplierList" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Supplier List</h2>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Contact Email</th>
                <th className="p-2 border">Contact Phone</th>
                <th className="p-2 border">Address</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="p-2 border">{supplier.name}</td>
                  <td className="p-2 border">{supplier.contact_email || "N/A"}</td>
                  <td className="p-2 border">{supplier.contact_phone || "N/A"}</td>
                  <td className="p-2 border">{supplier.address || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "addSupplier" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Add New Supplier</h2>
          <input
            type="text"
            placeholder="Supplier Name"
            value={newSupplier.name}
            onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="email"
            placeholder="Contact Email"
            value={newSupplier.contact_email}
            onChange={(e) => setNewSupplier({ ...newSupplier, contact_email: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Contact Phone"
            value={newSupplier.contact_phone}
            onChange={(e) => setNewSupplier({ ...newSupplier, contact_phone: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={newSupplier.address}
            onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={addSupplier} className="bg-blue-600 text-white py-2 px-4 rounded">
            Add Supplier
          </button>
        </div>
      )}
    </div>
  );
}

export default Suppliers;
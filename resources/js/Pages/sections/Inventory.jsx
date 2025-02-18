import React, { useState, useEffect } from "react";

function Inventory() {
  const [activeTab, setActiveTab] = useState("stockLevels");
  const [products, setProducts] = useState([]);
  const [adjustments, setAdjustments] = useState([]);
  const [newAdjustment, setNewAdjustment] = useState({
    product_id: "",
    adjustment: "",
    reason: "",
  });
  const [transfers, setTransfers] = useState([]);
  const [newTransfer, setNewTransfer] = useState({
    product_id: "",
    from_location: "",
    to_location: "",
    quantity: "",
    transfer_date: "",
  });

  // Fetch products and adjustments when component mounts
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));

    fetch("/api/stock-adjustments")
      .then((res) => res.json())
      .then((data) => setAdjustments(data))
      .catch((err) => console.error("Error fetching adjustments:", err));

   fetch("/api/stock-transfers")
    .then((res) => res.json())
    .then((data) => setTransfers(data))
    .catch((err) => console.error("Error fetching transfers:", err));
}, []);
  // Handle stock adjustment submission
  const handleAdjustmentSubmit = async () => {
    if (!newAdjustment.product_id || !newAdjustment.adjustment) {
      alert("Please select a product and enter an adjustment value.");
      return;
    }
  
    console.log("Sending payload:", newAdjustment);
  
    try {
      const response = await fetch("/api/stock-adjustments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdjustment),
      });
  
      const responseText = await response.text();
      console.log("Response:", responseText);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      let data = JSON.parse(responseText);
  
      // Enrich the new adjustment with the product data if missing
      if (!data.product) {
        data.product = products.find(
          (product) =>
            product.id.toString() === newAdjustment.product_id.toString()
        );
      }
  
      setAdjustments([...adjustments, data]);
      setNewAdjustment({ product_id: "", adjustment: "", reason: "" });
      alert("Stock adjustment saved successfully!");
    } catch (error) {
      console.error("Error saving adjustment:", error.message);
      alert(`Error saving adjustment: ${error.message}`);
    }
  };
  const handleTransferSubmit = async () => {
    if (!newTransfer.product_id || !newTransfer.quantity || !newTransfer.transfer_date) {
      alert("Please select a product, enter a quantity, and specify a transfer date.");
      return;
    }
  
    try {
      const response = await fetch("/api/stock-transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransfer),
      });
  
      const responseText = await response.text();
      console.log("Response:", responseText);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = JSON.parse(responseText);
      setTransfers([...transfers, data]);
      setNewTransfer({
        product_id: "",
        from_location: "",
        to_location: "",
        quantity: "",
        transfer_date: "",
      });
      alert("Stock transfer saved successfully!");
    } catch (error) {
      console.error("Error saving transfer:", error.message);
      alert(`Error saving transfer: ${error.message}`);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("stockLevels")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "stockLevels" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Stock Levels
        </button>
        <button
          onClick={() => setActiveTab("stockAdjustments")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "stockAdjustments" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Stock Adjustments
        </button>
        <button
          onClick={() => setActiveTab("stockTransfers")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "stockTransfers" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Stock Transfers
        </button>
        <button
          onClick={() => setActiveTab("lowStockAlerts")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "lowStockAlerts" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Low Stock Alerts
        </button>
        <button
          onClick={() => setActiveTab("physicalInventory")}
          className={`px-4 py-2 ${
            activeTab === "physicalInventory" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Physical Inventory
        </button>
      </div>
      {activeTab === "stockLevels" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Stock Levels</h2>
          <p>Display current stock levels here.</p>
        </div>
      )}
      {activeTab === "stockAdjustments" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Stock Adjustments</h2>
          <div className="mb-4">
            <select
              value={newAdjustment.product_id}
              onChange={(e) => setNewAdjustment({ ...newAdjustment, product_id: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Adjustment (e.g., +10 or -5)"
              value={newAdjustment.adjustment}
              onChange={(e) => setNewAdjustment({ ...newAdjustment, adjustment: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Reason (optional)"
              value={newAdjustment.reason}
              onChange={(e) => setNewAdjustment({ ...newAdjustment, reason: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleAdjustmentSubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              Save Adjustment
            </button>
          </div>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Adjustment</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {adjustments.map((adj) => (
                <tr key={adj.id}>
                 <td className="p-2 border">{adj.product?.name || "Unknown Product"}</td>

                  <td className="p-2 border">{adj.adjustment}</td>
                  <td className="p-2 border">{adj.reason || "N/A"}</td>
                  <td className="p-2 border">{new Date(adj.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "stockTransfers" && (
  <div>
    <h2 className="text-xl font-semibold mb-2">Stock Transfers</h2>
    <div className="mb-4">
      <select
        value={newTransfer.product_id}
        onChange={(e) => setNewTransfer({ ...newTransfer, product_id: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">Select Product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="From Location"
        value={newTransfer.from_location}
        onChange={(e) => setNewTransfer({ ...newTransfer, from_location: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        placeholder="To Location"
        value={newTransfer.to_location}
        onChange={(e) => setNewTransfer({ ...newTransfer, to_location: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newTransfer.quantity}
        onChange={(e) => setNewTransfer({ ...newTransfer, quantity: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="date"
        placeholder="Transfer Date"
        value={newTransfer.transfer_date}
        onChange={(e) => setNewTransfer({ ...newTransfer, transfer_date: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleTransferSubmit}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Save Transfer
      </button>
    </div>
    <table className="w-full table-auto border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Product</th>
          <th className="p-2 border">From Location</th>
          <th className="p-2 border">To Location</th>
          <th className="p-2 border">Quantity</th>
          <th className="p-2 border">Transfer Date</th>
        </tr>
      </thead>
      <tbody>
        {transfers.map((transfer) => (
          <tr key={transfer.id}>
            <td className="p-2 border">{transfer.product?.name || "Unknown Product"}</td>
            <td className="p-2 border">{transfer.from_location || "N/A"}</td>
            <td className="p-2 border">{transfer.to_location || "N/A"}</td>
            <td className="p-2 border">{transfer.quantity}</td>
            <td className="p-2 border">{new Date(transfer.transfer_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
      {activeTab === "lowStockAlerts" && (
  <div>
    <h2 className="text-xl font-semibold mb-2">Low Stock Alerts</h2>
    <table className="w-full table-auto border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Product</th>
          <th className="p-2 border">Stock</th>
        </tr>
      </thead>
      <tbody>
        {products
          .filter((product) => product.stock < 10) // Adjust the threshold as needed
          .map((product) => (
            <tr key={product.id}>
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">{product.stock}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
}

export default Inventory;
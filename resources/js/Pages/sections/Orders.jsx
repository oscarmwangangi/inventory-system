import React, { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    order_type: "sales",
    user_id: "",
    supplier_id: "",
    status: "pending",
    order_date: "",
    total_amount: "",
  });
  const [activeTab, setActiveTab] = useState("salesOrders");

  // Fetch orders when component mounts
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Handle order submission
  const addOrder = async () => {
    if (!newOrder.order_date || !newOrder.total_amount) {
      alert("Please enter an order date and total amount.");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      const responseText = await response.text();
      console.log("Response:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      setOrders([...orders, data]);
      setNewOrder({
        order_type: "sales",
        user_id: "",
        supplier_id: "",
        status: "pending",
        order_date: "",
        total_amount: "",
      });
      alert("Order added successfully!");
    } catch (error) {
      console.error("Error adding order:", error.message);
      alert(`Error adding order: ${error.message}`);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? updatedOrder : order
        )
      );
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error.message);
      alert(`Error updating order status: ${error.message}`);
    }
  };

  // Filter orders by type
  const salesOrders = orders.filter((order) => order.order_type === "sales");
  const purchaseOrders = orders.filter((order) => order.order_type === "purchase");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("salesOrders")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "salesOrders" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Sales Orders
        </button>
        <button
          onClick={() => setActiveTab("purchaseOrders")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "purchaseOrders" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Purchase Orders
        </button>
        <button
          onClick={() => setActiveTab("orderFulfillment")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "orderFulfillment" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Order Fulfillment
        </button>
        <button
          onClick={() => setActiveTab("orderTracking")}
          className={`px-4 py-2 ${
            activeTab === "orderTracking" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Order Tracking
        </button>
      </div>

      {/* Sales Orders Tab */}
      {activeTab === "salesOrders" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Sales Orders</h2>
          <div className="mb-4">
            <select
              value={newOrder.order_type}
              onChange={(e) => setNewOrder({ ...newOrder, order_type: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="sales">Sales Order</option>
            </select>
            <input
              type="date"
              placeholder="Order Date"
              value={newOrder.order_date}
              onChange={(e) => setNewOrder({ ...newOrder, order_date: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              placeholder="Total Amount"
              value={newOrder.total_amount}
              onChange={(e) => setNewOrder({ ...newOrder, total_amount: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <button onClick={addOrder} className="bg-blue-600 text-white py-2 px-4 rounded">
              Add Sales Order
            </button>
          </div>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Order Type</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Order Date</th>
                <th className="p-2 border">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map((order) => (
                <tr key={order.id}>
                  <td className="p-2 border">{order.order_type}</td>
                  <td className="p-2 border">{order.user?.name || "N/A"}</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="p-2 border">{order.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Purchase Orders Tab */}
      {activeTab === "purchaseOrders" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Purchase Orders</h2>
          <div className="mb-4">
            <select
              value={newOrder.order_type}
              onChange={(e) => setNewOrder({ ...newOrder, order_type: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="purchase">Purchase Order</option>
            </select>
            <input
              type="date"
              placeholder="Order Date"
              value={newOrder.order_date}
              onChange={(e) => setNewOrder({ ...newOrder, order_date: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              placeholder="Total Amount"
              value={newOrder.total_amount}
              onChange={(e) => setNewOrder({ ...newOrder, total_amount: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <button onClick={addOrder} className="bg-blue-600 text-white py-2 px-4 rounded">
              Add Purchase Order
            </button>
          </div>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Order Type</th>
                <th className="p-2 border">Supplier</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Order Date</th>
                <th className="p-2 border">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((order) => (
                <tr key={order.id}>
                  <td className="p-2 border">{order.order_type}</td>
                  <td className="p-2 border">{order.supplier?.name || "N/A"}</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="p-2 border">{order.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Fulfillment Tab */}
      {activeTab === "orderFulfillment" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Order Fulfillment</h2>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Order Type</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.order_type}</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="fulfilled">Fulfilled</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Tracking Tab */}
      {activeTab === "orderTracking" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Order Tracking</h2>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Order Type</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Progress</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.order_type}</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          order.status === "pending"
                            ? "bg-red-500 w-1/4"
                            : order.status === "in_progress"
                            ? "bg-yellow-500 w-1/2"
                            : order.status === "fulfilled"
                            ? "bg-green-500 w-full"
                            : "bg-gray-500 w-full"
                        }`}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
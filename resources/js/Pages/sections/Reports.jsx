import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf"; // Import jsPDF

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [activeTab, setActiveTab] = useState("inventoryValuation");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stockAdjustments, setStockAdjustments] = useState([]);
  const [stockTransfers, setStockTransfers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Fetch data from APIs
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));

    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));

    fetch("/api/stock-adjustments")
      .then((res) => res.json())
      .then((data) => setStockAdjustments(data))
      .catch((err) => console.error("Error fetching stock adjustments:", err));

    fetch("/api/stock-transfers")
      .then((res) => res.json())
      .then((data) => setStockTransfers(data))
      .catch((err) => console.error("Error fetching stock transfers:", err));

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));

    fetch("/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error("Error fetching suppliers:", err));
  }, []);

  // Data for Inventory Valuation
  const inventoryValuationData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Inventory Valuation ($)",
        data: products.map((product) => product.stock * product.base_price),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Data for Sales Reports
  const salesData = {
    labels: orders.map((order) => new Date(order.order_date).toLocaleDateString()),
    datasets: [
      {
        label: "Sales ($)",
        data: orders.map((order) => order.total_amount),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  // Data for Inventory Turnover
  const inventoryTurnoverData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Inventory Turnover (times)",
        data: products.map((product) => {
          const adjustments = stockAdjustments.filter(
            (adj) => adj.product_id === product.id
          );
          const totalAdjustments = adjustments.reduce(
            (sum, adj) => sum + adj.adjustment,
            0
          );
          return totalAdjustments / product.stock;
        }),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  // Function to generate and download a PDF report
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.setFontSize(18);
    doc.text("Custom Report", 10, 10);

    // Add a table to the PDF
    const headers = [["Product", "Stock", "Base Price", "Total Value"]];
    const data = products.map((product) => [
      product.name,
      product.stock,
      `$${product.base_price}`,
      `$${product.stock * product.base_price}`,
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
    });

    // Save the PDF
    doc.save("custom_report.pdf");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("inventoryValuation")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "inventoryValuation" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Inventory Valuation
        </button>
        <button
          onClick={() => setActiveTab("salesReports")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "salesReports" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Sales Reports
        </button>
        <button
          onClick={() => setActiveTab("inventoryTurnover")}
          className={`px-4 py-2 mr-2 ${
            activeTab === "inventoryTurnover" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Inventory Turnover
        </button>
        <button
          onClick={() => setActiveTab("customReports")}
          className={`px-4 py-2 ${
            activeTab === "customReports" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Custom Reports
        </button>
      </div>

      {/* Inventory Valuation Tab */}
      {activeTab === "inventoryValuation" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Inventory Valuation</h2>
          <Bar
            data={inventoryValuationData}
            options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
          />
        </div>
      )}

      {/* Sales Reports Tab */}
      {activeTab === "salesReports" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Sales Reports</h2>
          <Line
            data={salesData}
            options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
          />
        </div>
      )}

      {/* Inventory Turnover Tab */}
      {activeTab === "inventoryTurnover" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Inventory Turnover</h2>
          <Bar
            data={inventoryTurnoverData}
            options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
          />
        </div>
      )}

      {/* Custom Reports Tab */}
      {activeTab === "customReports" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Custom Reports</h2>
          <div className="mb-4">
            <label className="block mb-2">Date Range:</label>
            <input
              type="date"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="date"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={downloadPDF}
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              Download PDF
            </button>
          </div>
          <p>Custom reports will be displayed here.</p>
        </div>
      )}
    </div>
  );
}

export default Reports;
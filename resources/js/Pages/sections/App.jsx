import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Modal from "react-modal"; // For modals

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Set app element for accessibility (required by react-modal)
Modal.setAppElement("#root");



function App() {
  const [totalSales, setTotalSales] = useState(0);
  const [inventoryValue, setInventoryValue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from APIs
  useEffect(() => {
    // Fetch total sales
// Fetch total sales
fetch("/api/orders")
  .then((res) => res.json())
  .then((data) => {
    const total = data.reduce((sum, order) => sum + Number(order.total_amount), 0);
    setTotalSales(total);
  })
  .catch((err) => console.error("Error fetching orders:", err));


    // Fetch inventory value
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const total = data.reduce(
          (sum, product) => sum + product.stock * product.base_price,
          0
        );
        setInventoryValue(total);
      })
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch total orders
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setTotalOrders(data.length))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Data for Sales Trends Chart
  const salesTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1200, 1900, 3000, 2500, 2000, 2300],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  // Data for Inventory Turnover Chart
  const inventoryTurnoverData = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        label: "Inventory Turnover (times)",
        data: [5, 3, 7],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-2xl">${totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Inventory Value</h2>
          <p className="text-2xl">${inventoryValue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl">{totalOrders}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Sales Trends</h2>
          <Line
            data={salesTrendsData}
            options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Inventory Turnover</h2>
          <Pie
            data={inventoryTurnoverData}
            options={{ responsive: true }}
          />
        </div>
      </div>

      {/* Rectangular Divs for Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50"
          onClick={openModal}
        >
          <h2 className="text-lg font-semibold">View Orders</h2>
          <p className="text-gray-600">Click to view all orders.</p>
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50"
          onClick={openModal}
        >
          <h2 className="text-lg font-semibold">Manage Inventory</h2>
          <p className="text-gray-600">Click to manage inventory.</p>
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50"
          onClick={openModal}
        >
          <h2 className="text-lg font-semibold">Generate Reports</h2>
          <p className="text-gray-600">Click to generate reports.</p>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p>This is a modal. You can add forms, tables, or other content here.</p>
        <button
          onClick={closeModal}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default App;
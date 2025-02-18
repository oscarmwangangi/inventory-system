import React, { useState, useEffect } from "react";

function Products() {
  const [activeTab, setActiveTab] = useState("addProduct");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category_id: "",
    variation: "",
    base_price: "",
    cost: "",
    description: "",
    stock: "",
  });

  const [newCategory, setNewCategory] = useState("");

  // Fetch categories and products when component mounts
  useEffect(() => {
    // Fetch products from API
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch categories from API
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Add a new product
  const addProduct = () => {
    if (newProduct.name.trim() === "") {
      alert("Please enter a product name.");
      return;
    }
    // POST new product data to the API
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data]); // Add the new product to the list
        setNewProduct({
          name: "",
          category_id: "",
          variation: "",
          base_price: "",
          cost: "",
          description: "",
          stock: "",
        });
        alert("Product added successfully!");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product.");
      });
  };

  // Add a new category
  const addCategory = () => {
    if (newCategory.trim() === "") {
      alert("Please enter a category name.");
      return;
    }
    // POST new category data to the API
    fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories([...categories, data]);
        setNewCategory(""); // Reset category input after adding
        alert("Category added successfully!");
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        alert("Error adding category.");
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("addProduct")}
          className={`px-4 py-2 mr-2 ${activeTab === "addProduct" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
        >
          Add New Product
        </button>
        <button
          onClick={() => setActiveTab("productList")}
          className={`px-4 py-2 mr-2 ${activeTab === "productList" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
        >
          Product List
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 mr-2 ${activeTab === "categories" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab("variations")}
          className={`px-4 py-2 ${activeTab === "variations" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
        >
          Variations
        </button>
      </div>

      {/* Add New Product Tab */}
      {activeTab === "addProduct" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={newProduct.category_id}
            onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Variation"
            value={newProduct.variation}
            onChange={(e) => setNewProduct({ ...newProduct, variation: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="base_price"
            value={newProduct.base_price}
            onChange={(e) => setNewProduct({ ...newProduct, base_price: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="cost"
            value={newProduct.cost}
            onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
           <input
            type="number"
            placeholder="stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={addProduct} className="bg-blue-600 text-white py-2 px-4 rounded">
            Add Product
          </button>
        </div>
      )}

      {/* Product List Tab */}
      {activeTab === "productList" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Product List</h2>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Variation</th>
                <th className="p-2 border">base_price</th>
                <th className="p-2 border">cost</th>
                <th className="p-2 border">description</th>
                <th className="p-2 border">stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={index}>
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">
                    {categories.find((cat) => cat.id === p.category_id)?.name || "N/A"}
                  </td>
                  <td className="p-2 border">{p.variation}</td>
                  <td className="p-2 border">{p.base_price}</td>
                  <td className="p-2 border">{p.cost}</td>
                  <td className="p-2 border">{p.description}</td>
                  <td className="p-2 border">{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="New Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button onClick={addCategory} className="bg-blue-600 text-white py-2 px-4 rounded">
              Add Category
            </button>
          </div>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Variations Tab */}
      {activeTab === "variations" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Variations</h2>
          <p>Manage product variations here (functionality to be implemented).</p>
        </div>
      )}
    </div>
  );
}

export default Products;

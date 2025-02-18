
    // Data Storage
    let inventory = [];
    let users = [];
    let activities = [];

    // DOM Elements
    const inventoryForm = document.getElementById('inventoryForm');
    const inventoryList = document.getElementById('inventoryList');
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const activityLog = document.getElementById('activityLog');

    // Chart Initialization
    const ctx = document.getElementById('reportsChart').getContext('2d');
    const reportsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Stock Levels',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Tab Navigation
    function showTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.add('hidden');
        });
        document.getElementById(tabName).classList.remove('hidden');
    }

    // Inventory Management
    inventoryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const itemName = document.getElementById('itemName').value;
        const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);

        const newItem = {
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice
        };

        inventory.push(newItem);
        updateInventoryList();
        logActivity(`Added new item: ${itemName}`);
        updateChart();
        inventoryForm.reset();
    });

    function updateInventoryList() {
        inventoryList.innerHTML = '';
        inventory.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-2 border border-gray-300">${item.name}</td>
                <td class="p-2 border border-gray-300">${item.quantity}</td>
                <td class="p-2 border border-gray-300">${item.price}</td>
                <td class="p-2 border border-gray-300">
                    <button onclick="editItem(${index})" class="p-1 bg-yellow-500 text-white rounded">Edit</button>
                    <button onclick="deleteItem(${index})" class="p-1 bg-red-500 text-white rounded">Delete</button>
                </td>
            `;
            inventoryList.appendChild(row);
        });
    }

    function editItem(index) {
        const item = inventory[index];
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemQuantity').value = item.quantity;
        document.getElementById('itemPrice').value = item.price;
        inventory.splice(index, 1);
        updateInventoryList();
        logActivity(`Edited item: ${item.name}`);
    }

    function deleteItem(index) {
        const item = inventory[index];
        inventory.splice(index, 1);
        updateInventoryList();
        logActivity(`Deleted item: ${item.name}`);
        updateChart();
    }

    // User Management
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;

        const newUser = {
            name: userName,
            email: userEmail
        };

        users.push(newUser);
        updateUserList();
        logActivity(`Added new user: ${userName}`);
        userForm.reset();
    });

    function updateUserList() {
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-2 border border-gray-300">${user.name}</td>
                <td class="p-2 border border-gray-300">${user.email}</td>
                <td class="p-2 border border-gray-300">
                    <button onclick="deleteUser(${index})" class="p-1 bg-red-500 text-white rounded">Delete</button>
                </td>
            `;
            userList.appendChild(row);
        });
    }

    function deleteUser(index) {
        const user = users[index];
        users.splice(index, 1);
        updateUserList();
        logActivity(`Deleted user: ${user.name}`);
    }

    // Reports
    function updateChart() {
        const salesData = transactions.filter(t => t.type === 'sale').length;
        const purchaseData = transactions.filter(t => t.type === 'purchase').length;
    
        reportsChart.data.labels = ['Sales', 'Purchases'];
        reportsChart.data.datasets[0].data = [salesData, purchaseData];
        reportsChart.update();
    }

    // System Activities
    function logActivity(activity) {
        const logEntry = document.createElement('li');
        logEntry.textContent = `${new Date().toLocaleString()}: ${activity}`;
        activityLog.appendChild(logEntry);
    }

    // Initialize
    showTab('inventory');
// Add reorderPoint to inventory items
const newItem = {
    name: itemName,
    quantity: itemQuantity,
    price: itemPrice,
    reorderPoint: 10 // Set a default reorder point
};

// Function to check low stock
function checkLowStock() {
    const lowStockItems = inventory.filter(item => item.quantity <= item.reorderPoint);
    return lowStockItems;
}

// Display low stock alerts
function displayLowStockAlerts() {
    const lowStockItems = checkLowStock();
    const alertSection = document.getElementById('lowStockAlerts');
    alertSection.innerHTML = '<h3 class="text-xl font-semibold mb-2">Low Stock Alerts</h3>';
    if (lowStockItems.length > 0) {
        lowStockItems.forEach(item => {
            alertSection.innerHTML += `<p class="text-red-500">${item.name} is low in stock (${item.quantity} left).</p>`;
        });
    } else {
        alertSection.innerHTML += `<p class="text-green-500">All items are in stock.</p>`;
    }
}

// Call this function whenever inventory is updated
updateInventoryList();
displayLowStockAlerts();

let transactions = [];

// Show transaction form
function showTransactionForm(type) {
    const form = document.getElementById('transactionForm');
    form.classList.remove('hidden');
    document.getElementById('transactionType').value = type;

    // Populate items dropdown
    const itemSelect = document.getElementById('transactionItem');
    itemSelect.innerHTML = '';
    inventory.forEach(item => {
        itemSelect.innerHTML += `<option value="${item.name}">${item.name}</option>`;
    });
}

// Handle transaction form submission
document.getElementById('transactionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const type = document.getElementById('transactionType').value;
    const itemName = document.getElementById('transactionItem').value;
    const quantity = parseInt(document.getElementById('transactionQuantity').value);

    const item = inventory.find(i => i.name === itemName);
    if (item) {
        if (type === 'purchase') {
            item.quantity += quantity; // Increase stock for purchases
        } else if (type === 'sale') {
            if (item.quantity >= quantity) {
                item.quantity -= quantity; // Decrease stock for sales
            } else {
                alert('Not enough stock!');
                return;
            }
        }

        const transaction = {
            type: type,
            item: itemName,
            quantity: quantity,
            date: new Date().toLocaleString()
        };
        transactions.push(transaction);
        updateTransactionsList();
        updateInventoryList();
        displayLowStockAlerts();
        logActivity(`Added ${type}: ${itemName} (${quantity} units)`);
        transactionForm.reset();
        transactionForm.classList.add('hidden');
    }
});

// Update transactions list
function updateTransactionsList() {
    const transactionsList = document.getElementById('transactionsList');
    transactionsList.innerHTML = '';
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-2 border border-gray-300">${transaction.type}</td>
            <td class="p-2 border border-gray-300">${transaction.item}</td>
            <td class="p-2 border border-gray-300">${transaction.quantity}</td>
            <td class="p-2 border border-gray-300">${transaction.date}</td>
        `;
        transactionsList.appendChild(row);
    });
}
/**
 * GreenHarvest - Admin Dashboard Management Scripts
 * Handles Metrics, Orders, Products CRUD, Inventory, Messages, Settings
 */

// Initial seed orders for demonstration if none exist in localStorage
const DEFAULT_ADMIN_ORDERS = [
  {
    orderId: "GH-894215",
    date: "Nov 16, 2026",
    customer: { name: "Clara Oswald", email: "clara.o@example.com", phone: "+1 555-0192", city: "New York", pin: "10001" },
    items: [
      { name: "Honeycrisp Organic Apples", weight: "1kg", quantity: 2, price: 8.29 },
      { name: "Raw Wildflower Forest Honey", weight: "500g", quantity: 1, price: 8.99 }
    ],
    totals: { subtotal: 25.57, delivery: 0, tax: 1.28, total: 26.85 },
    status: "Delivered",
    paymentMethod: "Credit Card"
  },
  {
    orderId: "GH-762304",
    date: "Nov 16, 2026",
    customer: { name: "David Miller", email: "david.m@example.com", phone: "+1 555-0144", city: "San Francisco", pin: "94103" },
    items: [
      { name: "Cold-Pressed Extra Virgin Coconut Oil", weight: "500ml", quantity: 2, price: 9.99 },
      { name: "Ancient Royal White Quinoa", weight: "500g", quantity: 1, price: 5.49 }
    ],
    totals: { subtotal: 25.47, delivery: 3.99, tax: 1.27, total: 30.73 },
    status: "Processing",
    paymentMethod: "UPI / Instant Pay"
  },
  {
    orderId: "GH-651908",
    date: "Nov 15, 2026",
    customer: { name: "Sophia Zhang", email: "sophia.z@example.com", phone: "+1 555-0187", city: "Beverly Hills", pin: "90210" },
    items: [
      { name: "Alphonso Organic King Mangoes", weight: "1kg", quantity: 3, price: 14.99 },
      { name: "Raw Organic California Almonds", weight: "1kg", quantity: 1, price: 16.99 }
    ],
    totals: { subtotal: 61.96, delivery: 0, tax: 3.10, total: 65.06 },
    status: "Pending",
    paymentMethod: "Cash on Delivery"
  },
  {
    orderId: "GH-541290",
    date: "Nov 14, 2026",
    customer: { name: "Marcus Bennett", email: "marcus.b@example.com", phone: "+1 555-0163", city: "Bangalore", pin: "560001" },
    items: [
      { name: "Royal Himalayan Aged Basmati Rice", weight: "5kg", quantity: 1, price: 31.99 },
      { name: "Vine-Ripened Heirloom Tomatoes", weight: "1kg", quantity: 2, price: 5.99 }
    ],
    totals: { subtotal: 43.97, delivery: 0, tax: 2.20, total: 46.17 },
    status: "Delivered",
    paymentMethod: "Net Banking"
  }
];

// Initial seed customer messages
const DEFAULT_MESSAGES = [
  {
    id: "msg-1",
    date: "Nov 16, 2026",
    name: "Rachel Green",
    email: "rachel@organics.org",
    phone: "+1 555-0912",
    subject: "Bulk Organic Produce for Farm-to-Table Cafe",
    message: "Hi GreenHarvest team, do you offer weekly recurring commercial deliveries of Honeycrisp apples and heirloom tomatoes to local eateries?",
    status: "Unread"
  },
  {
    id: "msg-2",
    date: "Nov 15, 2026",
    name: "Arthur Pendelton",
    email: "arthur.p@example.com",
    phone: "+1 555-0481",
    subject: "Inquiry on Cold-Pressed Sesame Oil Expeller Method",
    message: "Could you share the temperature details for the wood-pressed sesame oil extraction? I am strictly looking for cold processing under 35°C.",
    status: "Replied"
  }
];

function getAdminOrders() {
  const stored = localStorage.getItem("greenharvest_orders");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) return parsed;
    } catch (e) {}
  }
  localStorage.setItem("greenharvest_orders", JSON.stringify(DEFAULT_ADMIN_ORDERS));
  return DEFAULT_ADMIN_ORDERS;
}

function saveAdminOrders(orders) {
  localStorage.setItem("greenharvest_orders", JSON.stringify(orders));
}

function getAdminMessages() {
  const stored = localStorage.getItem("greenharvest_messages");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {}
  }
  localStorage.setItem("greenharvest_messages", JSON.stringify(DEFAULT_MESSAGES));
  return DEFAULT_MESSAGES;
}

function saveAdminMessages(msgs) {
  localStorage.setItem("greenharvest_messages", JSON.stringify(msgs));
}

/**
 * Render Dashboard Overview Metrics
 */
function initAdminDashboard() {
  const orders = getAdminOrders();
  const products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
  
  // Calculate aggregates
  const totalSales = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending" || o.status === "Processing").length;
  const lowStockProducts = products.filter(p => p.stockCount < 50).length;

  const totalSalesEl = document.getElementById("admin-total-sales");
  const totalOrdersEl = document.getElementById("admin-total-orders");
  const pendingOrdersEl = document.getElementById("admin-pending-orders");
  const lowStockEl = document.getElementById("admin-low-stock");
  const totalProductsEl = document.getElementById("admin-total-products");

  if (totalSalesEl) totalSalesEl.textContent = `$${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
  if (pendingOrdersEl) pendingOrdersEl.textContent = pendingOrders;
  if (lowStockEl) lowStockEl.textContent = lowStockProducts;
  if (totalProductsEl) totalProductsEl.textContent = products.length;

  // Render recent orders table
  const recentOrdersTable = document.getElementById("admin-recent-orders-tbody");
  if (recentOrdersTable) {
    recentOrdersTable.innerHTML = orders.slice(0, 5).map(o => `
      <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
        <td class="py-3 px-4 text-xs font-semibold text-gray-900 dark:text-white">${o.orderId}</td>
        <td class="py-3 px-4 text-xs text-gray-600 dark:text-gray-300">${o.customer?.name || "Customer"}</td>
        <td class="py-3 px-4 text-xs text-gray-500 dark:text-gray-400">${o.date}</td>
        <td class="py-3 px-4 text-xs font-bold text-[#315C3B] dark:text-[#D6A85F]">$${(o.totals?.total || 0).toFixed(2)}</td>
        <td class="py-3 px-4 text-xs">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${getOrderStatusClass(o.status)}">
            ${o.status}
          </span>
        </td>
        <td class="py-3 px-4 text-xs text-right">
          <a href="orders.html" class="text-xs font-medium text-[#315C3B] dark:text-[#8FD69E] hover:underline">Manage</a>
        </td>
      </tr>
    `).join("");
  }
}

function getOrderStatusClass(status) {
  switch (status) {
    case "Delivered":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
    case "Processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
    case "Pending":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
    case "Cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
}

/**
 * Admin Orders Management Page
 */
function initAdminOrdersPage() {
  const tbody = document.getElementById("admin-orders-tbody");
  if (!tbody) return;

  const orders = getAdminOrders();
  renderOrdersTable(orders);

  // Filter listener
  const filterSelect = document.getElementById("order-status-filter");
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if (!val || val === "All") {
        renderOrdersTable(orders);
      } else {
        renderOrdersTable(orders.filter(o => o.status === val));
      }
    });
  }
}

function renderOrdersTable(list) {
  const tbody = document.getElementById("admin-orders-tbody");
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-gray-400">No orders found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(o => `
    <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
      <td class="py-3 px-4 font-semibold text-xs text-gray-900 dark:text-white">
        ${o.orderId}
        <div class="text-[10px] text-gray-400 font-normal">${o.paymentMethod || 'Online'}</div>
      </td>
      <td class="py-3 px-4 text-xs">
        <div class="font-medium text-gray-900 dark:text-white">${o.customer?.name}</div>
        <div class="text-[11px] text-gray-400">${o.customer?.city} (PIN: ${o.customer?.pin})</div>
      </td>
      <td class="py-3 px-4 text-xs text-gray-500 dark:text-gray-400">
        ${o.items?.length || 1} items (${o.items?.map(i => i.name).slice(0, 2).join(", ")}...)
      </td>
      <td class="py-3 px-4 text-xs font-bold text-[#315C3B] dark:text-[#D6A85F]">$${(o.totals?.total || 0).toFixed(2)}</td>
      <td class="py-3 px-4 text-xs">
        <select onchange="changeOrderStatus('${o.orderId}', this.value)" class="text-xs font-medium py-1 px-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A211D] text-gray-800 dark:text-gray-200">
          <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
          <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </td>
      <td class="py-3 px-4 text-xs text-right">
        <button type="button" onclick="viewOrderDetails('${o.orderId}')" class="btn-secondary !min-h-[32px] !py-1 !px-2.5 text-xs font-medium">
          View
        </button>
      </td>
    </tr>
  `).join("");
}

function changeOrderStatus(orderId, newStatus) {
  let orders = getAdminOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (order) {
    order.status = newStatus;
    saveAdminOrders(orders);
    showToast(`Order ${orderId} updated to ${newStatus}`);
  }
}

/**
 * Admin Products Page CRUD
 */
function initAdminProductsPage() {
  const tbody = document.getElementById("admin-products-tbody");
  if (!tbody) return;

  const products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
  renderAdminProductsTable(products);

  // Search input
  const searchInput = document.getElementById("admin-product-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
      renderAdminProductsTable(filtered);
    });
  }
}

function renderAdminProductsTable(list) {
  const tbody = document.getElementById("admin-products-tbody");
  if (!tbody) return;

  tbody.innerHTML = list.map(p => `
    <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
      <td class="py-3 px-4 flex items-center gap-3">
        <img src="${p.image}" alt="${p.name}" class="w-10 h-10 rounded-lg object-cover">
        <div>
          <div class="text-xs font-semibold text-gray-900 dark:text-white">${p.name}</div>
          <div class="text-[10px] text-gray-400">${p.farmOrigin || 'Organic Farm'}</div>
        </div>
      </td>
      <td class="py-3 px-4 text-xs text-gray-600 dark:text-gray-300">${p.category}</td>
      <td class="py-3 px-4 text-xs font-bold text-[#315C3B] dark:text-[#D6A85F]">$${p.price.toFixed(2)}</td>
      <td class="py-3 px-4 text-xs">
        <span class="font-medium ${p.stockCount < 50 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}">
          ${p.stockCount || 50} units
        </span>
      </td>
      <td class="py-3 px-4 text-xs">
        <button onclick="toggleProductStock('${p.id}')" class="px-2 py-0.5 rounded-full text-[11px] font-semibold ${p.inStock ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}">
          ${p.inStock ? 'In Stock' : 'Out of Stock'}
        </button>
      </td>
      <td class="py-3 px-4 text-xs text-right space-x-2">
        <button onclick="deleteProduct('${p.id}')" class="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
      </td>
    </tr>
  `).join("");
}

function toggleProductStock(id) {
  let products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
  const p = products.find(prod => prod.id === id);
  if (p) {
    p.inStock = !p.inStock;
    saveProducts(products);
    showToast(`${p.name} marked as ${p.inStock ? 'In Stock' : 'Out of Stock'}`);
    renderAdminProductsTable(products);
  }
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to remove this product from the organic store?")) {
    let products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    showToast("Product deleted successfully.");
    renderAdminProductsTable(products);
  }
}

function handleAddProductSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector("#new-prod-name").value.trim();
  const category = form.querySelector("#new-prod-category").value;
  const price = parseFloat(form.querySelector("#new-prod-price").value) || 3.99;
  const originalPrice = parseFloat(form.querySelector("#new-prod-orig-price").value) || (price * 1.2);
  const stockCount = parseInt(form.querySelector("#new-prod-stock").value, 10) || 60;
  const image = form.querySelector("#new-prod-image").value.trim() || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80";
  const description = form.querySelector("#new-prod-desc").value.trim();

  const newProd = {
    id: "prod-" + Date.now(),
    name,
    category,
    price,
    originalPrice,
    discount: "New",
    rating: 5.0,
    reviewsCount: 1,
    badge: "Fresh Arrival",
    isBestseller: false,
    isFreshPick: true,
    isSpecialOffer: false,
    inStock: true,
    stockCount,
    unit: "500g",
    weightOptions: [{ label: "500g", price }, { label: "1kg", price: price * 1.85 }],
    image,
    gallery: [image],
    description: description || "Freshly harvested organic food sourced directly from partner farms.",
    farmOrigin: "Local Organic Collective",
    harvestDate: "Fresh harvest",
    certification: "100% Certified Organic",
    storage: "Keep in a cool dry pantry or refrigerator.",
    nutrition: { calories: "60 kcal", carbs: "12g", protein: "1g", fat: "0.2g", fiber: "2g" }
  };

  const products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
  products.unshift(newProd);
  saveProducts(products);

  showToast(`Product "${name}" successfully added to Organic Harvest!`, "success");
  
  // Close modal if open
  const modal = document.getElementById("add-product-modal");
  if (modal) modal.classList.add("hidden");
  form.reset();
  renderAdminProductsTable(products);
}

/**
 * ========================================================
 * Admin Inventory Management Page
 * ========================================================
 */
function initAdminInventoryPage() {
  const tbody = document.getElementById("admin-inventory-tbody");
  if (!tbody) return;

  const products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
  renderInventoryTable(products);

  const filterSelect = document.getElementById("inventory-filter");
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === "low") {
        renderInventoryTable(products.filter(p => p.stockCount < 50 && p.stockCount > 0));
      } else if (val === "out") {
        renderInventoryTable(products.filter(p => p.stockCount <= 0 || !p.inStock));
      } else {
        renderInventoryTable(products);
      }
    });
  }

  const searchInput = document.getElementById("inventory-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
      renderInventoryTable(filtered);
    });
  }
}

function renderInventoryTable(list) {
  const tbody = document.getElementById("admin-inventory-tbody");
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-gray-400">No inventory records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(p => {
    const isOut = p.stockCount <= 0 || !p.inStock;
    const isLow = p.stockCount < 50 && !isOut;
    let badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
    let badgeText = "Adequate Stock";

    if (isOut) {
      badgeClass = "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
      badgeText = "Out of Stock";
    } else if (isLow) {
      badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
      badgeText = "Low Stock Alert";
    }

    return `
      <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
        <td class="py-3 px-4 flex items-center gap-3">
          <img src="${p.image}" alt="${p.name}" class="w-10 h-10 rounded-lg object-cover">
          <div>
            <div class="text-xs font-semibold text-gray-900 dark:text-white">${p.name}</div>
            <div class="text-[10px] text-gray-400">SKU: GH-${p.id.toUpperCase()}</div>
          </div>
        </td>
        <td class="py-3 px-4 text-xs text-gray-600 dark:text-gray-300">${p.category}</td>
        <td class="py-3 px-4 text-xs font-bold text-gray-900 dark:text-white">
          <div class="flex items-center gap-2">
            <span id="stock-display-${p.id}">${p.stockCount || 0}</span>
            <span class="text-[10px] text-gray-400 font-normal">units</span>
          </div>
        </td>
        <td class="py-3 px-4 text-xs">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${badgeClass}">
            ${badgeText}
          </span>
        </td>
        <td class="py-3 px-4 text-xs">
          <div class="flex items-center gap-1.5">
            <button onclick="quickRestock('${p.id}', 25)" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-[#315C3B] hover:text-white dark:hover:bg-[#315C3B] rounded text-[11px] font-medium transition-colors">+25</button>
            <button onclick="quickRestock('${p.id}', 50)" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-[#315C3B] hover:text-white dark:hover:bg-[#315C3B] rounded text-[11px] font-medium transition-colors">+50</button>
            <button onclick="quickRestock('${p.id}', 100)" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-[#315C3B] hover:text-white dark:hover:bg-[#315C3B] rounded text-[11px] font-medium transition-colors">+100</button>
          </div>
        </td>
        <td class="py-3 px-4 text-xs text-right">
          <button onclick="toggleProductStock('${p.id}')" class="text-xs text-[#315C3B] dark:text-[#8FD69E] hover:underline font-medium">
            ${p.inStock ? 'Set Inactive' : 'Set Active'}
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function quickRestock(productId, amount) {
  let products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
  const prod = products.find(p => p.id === productId);
  if (prod) {
    prod.stockCount = (prod.stockCount || 0) + amount;
    prod.inStock = true;
    saveProducts(products);
    showToast(`Added ${amount} units to ${prod.name}. Total: ${prod.stockCount}`, "success");
    initAdminInventoryPage();
  }
}

/**
 * ========================================================
 * Admin Customer Messages / Inquiries
 * ========================================================
 */
function initAdminMessagesPage() {
  const tbody = document.getElementById("admin-messages-tbody");
  if (!tbody) return;

  const messages = getAdminMessages();
  renderMessagesTable(messages);

  const filterSelect = document.getElementById("message-status-filter");
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if (!val || val === "All") {
        renderMessagesTable(messages);
      } else {
        renderMessagesTable(messages.filter(m => m.status === val));
      }
    });
  }
}

function renderMessagesTable(list) {
  const tbody = document.getElementById("admin-messages-tbody");
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-gray-400">No customer messages found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(m => {
    let statusClass = "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
    if (m.status === "Replied") statusClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
    if (m.status === "Resolved") statusClass = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";

    return `
      <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
        <td class="py-3 px-4 text-xs font-semibold text-gray-900 dark:text-white">
          <div>${m.name}</div>
          <div class="text-[10px] text-gray-400 font-normal">${m.email}</div>
        </td>
        <td class="py-3 px-4 text-xs text-gray-700 dark:text-gray-300 max-w-xs">
          <div class="font-medium truncate">${m.subject}</div>
          <div class="text-[11px] text-gray-400 truncate">${m.message}</div>
        </td>
        <td class="py-3 px-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">${m.date}</td>
        <td class="py-3 px-4 text-xs">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusClass}">
            ${m.status}
          </span>
        </td>
        <td class="py-3 px-4 text-xs space-x-1 text-right whitespace-nowrap">
          <button onclick="openMessageModal('${m.id}')" class="px-2.5 py-1 text-xs font-medium text-[#315C3B] dark:text-[#8FD69E] bg-emerald-50 dark:bg-emerald-950/40 rounded hover:bg-emerald-100 transition-colors">Read</button>
          <button onclick="toggleMessageResolved('${m.id}')" class="px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 transition-colors">${m.status === 'Resolved' ? 'Reopen' : 'Resolve'}</button>
          <button onclick="deleteMessage('${m.id}')" class="px-2 py-1 text-xs font-medium text-red-500 hover:text-red-700 transition-colors">✕</button>
        </td>
      </tr>
    `;
  }).join("");
}

function openMessageModal(id) {
  const messages = getAdminMessages();
  const msg = messages.find(m => m.id === id);
  if (!msg) return;

  const modal = document.getElementById("message-modal");
  if (!modal) return;

  document.getElementById("modal-msg-from").textContent = `${msg.name} (${msg.email} | ${msg.phone || 'No phone'})`;
  document.getElementById("modal-msg-subject").textContent = msg.subject;
  document.getElementById("modal-msg-date").textContent = msg.date;
  document.getElementById("modal-msg-body").textContent = msg.message;
  document.getElementById("modal-reply-id").value = msg.id;

  modal.classList.remove("hidden");
}

function sendReplyToMessage(event) {
  event.preventDefault();
  const id = document.getElementById("modal-reply-id").value;
  const replyText = document.getElementById("modal-reply-text").value.trim();
  if (!replyText) return;

  let messages = getAdminMessages();
  const msg = messages.find(m => m.id === id);
  if (msg) {
    msg.status = "Replied";
    saveAdminMessages(messages);
    showToast(`Reply sent successfully to ${msg.email}!`, "success");
    document.getElementById("message-modal").classList.add("hidden");
    document.getElementById("modal-reply-text").value = "";
    initAdminMessagesPage();
  }
}

function toggleMessageResolved(id) {
  let messages = getAdminMessages();
  const msg = messages.find(m => m.id === id);
  if (msg) {
    msg.status = msg.status === "Resolved" ? "Unread" : "Resolved";
    saveAdminMessages(messages);
    showToast(`Inquiry marked as ${msg.status}.`);
    initAdminMessagesPage();
  }
}

function deleteMessage(id) {
  if (confirm("Delete this customer message?")) {
    let messages = getAdminMessages();
    messages = messages.filter(m => m.id !== id);
    saveAdminMessages(messages);
    showToast("Message deleted.");
    initAdminMessagesPage();
  }
}

/**
 * ========================================================
 * Admin Delivery Management
 * ========================================================
 */
const DEFAULT_DELIVERY_ZONES = [
  { pin: "10001", zone: "Manhattan Central", speed: "Same-Day Delivery", active: true, fee: "$0.00 (Orders >$35)" },
  { pin: "10002", zone: "Lower East Side", speed: "Same-Day Delivery", active: true, fee: "$0.00 (Orders >$35)" },
  { pin: "90210", zone: "Beverly Hills West", speed: "Next-Day Morning", active: true, fee: "$3.99" },
  { pin: "94103", zone: "San Francisco Bay", speed: "Same-Day Delivery", active: true, fee: "$0.00 (Orders >$35)" },
  { pin: "60601", zone: "Chicago Loop", speed: "Next-Day Morning", active: true, fee: "$3.99" },
  { pin: "560001", zone: "Bangalore Central Hub", speed: "Express 4-Hour", active: true, fee: "Free" }
];

function getDeliveryZones() {
  const stored = localStorage.getItem("greenharvest_delivery_zones");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch(e) {}
  }
  localStorage.setItem("greenharvest_delivery_zones", JSON.stringify(DEFAULT_DELIVERY_ZONES));
  return DEFAULT_DELIVERY_ZONES;
}

function saveDeliveryZones(zones) {
  localStorage.setItem("greenharvest_delivery_zones", JSON.stringify(zones));
}

function initAdminDeliveryPage() {
  const tbody = document.getElementById("admin-delivery-tbody");
  if (!tbody) return;

  const zones = getDeliveryZones();
  renderDeliveryZonesTable(zones);
}

function renderDeliveryZonesTable(list) {
  const tbody = document.getElementById("admin-delivery-tbody");
  if (!tbody) return;

  tbody.innerHTML = list.map(z => `
    <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
      <td class="py-3 px-4 font-bold text-xs text-gray-900 dark:text-white">${z.pin}</td>
      <td class="py-3 px-4 text-xs text-gray-600 dark:text-gray-300">${z.zone}</td>
      <td class="py-3 px-4 text-xs font-medium text-[#315C3B] dark:text-[#8FD69E]">${z.speed}</td>
      <td class="py-3 px-4 text-xs text-gray-500 dark:text-gray-400">${z.fee}</td>
      <td class="py-3 px-4 text-xs">
        <button onclick="toggleZoneActive('${z.pin}')" class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${z.active ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'}">
          ${z.active ? 'Serviceable' : 'Suspended'}
        </button>
      </td>
      <td class="py-3 px-4 text-xs text-right">
        <button onclick="removeDeliveryZone('${z.pin}')" class="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
      </td>
    </tr>
  `).join("");
}

function toggleZoneActive(pin) {
  let zones = getDeliveryZones();
  const z = zones.find(item => item.pin === pin);
  if (z) {
    z.active = !z.active;
    saveDeliveryZones(zones);
    showToast(`PIN ${pin} serviceability updated.`);
    initAdminDeliveryPage();
  }
}

function removeDeliveryZone(pin) {
  if (confirm(`Remove PIN code ${pin}?`)) {
    let zones = getDeliveryZones();
    zones = zones.filter(z => z.pin !== pin);
    saveDeliveryZones(zones);
    showToast(`PIN ${pin} removed.`);
    initAdminDeliveryPage();
  }
}

function handleAddDeliveryZone(event) {
  event.preventDefault();
  const form = event.target;
  const pin = form.querySelector("#zone-pin").value.trim();
  const zone = form.querySelector("#zone-name").value.trim();
  const speed = form.querySelector("#zone-speed").value;
  const fee = form.querySelector("#zone-fee").value.trim() || "$3.99";

  let zones = getDeliveryZones();
  if (zones.some(z => z.pin === pin)) {
    alert("PIN code already registered.");
    return;
  }

  zones.unshift({ pin, zone, speed, active: true, fee });
  saveDeliveryZones(zones);
  showToast(`PIN ${pin} added to serviceable zones!`, "success");
  form.reset();
  initAdminDeliveryPage();
}

/**
 * ========================================================
 * Admin Reports & Analytics Page
 * ========================================================
 */
function initAdminReportsPage() {
  const container = document.getElementById("admin-reports-container");
  if (!container) return;

  const orders = getAdminOrders();
  const totalSales = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);
  const avgOrderVal = orders.length ? (totalSales / orders.length) : 0;

  const revEl = document.getElementById("report-total-revenue");
  if (revEl) revEl.textContent = `$${totalSales.toFixed(2)}`;
  const aovEl = document.getElementById("report-aov");
  if (aovEl) aovEl.textContent = `$${avgOrderVal.toFixed(2)}`;
}

function exportCsvReport() {
  const orders = getAdminOrders();
  let csvContent = "data:text/csv;charset=utf-8,Order ID,Customer,Date,Total,Status,Payment\n";
  orders.forEach(o => {
    csvContent += `"${o.orderId}","${o.customer?.name}","${o.date}",${o.totals?.total || 0},"${o.status}","${o.paymentMethod}"\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `GreenHarvest_Orders_Report_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Orders report exported to CSV successfully!", "success");
}

/**
 * ========================================================
 * Admin Settings
 * ========================================================
 */
function initAdminSettingsPage() {
  const form = document.getElementById("admin-settings-form");
  if (!form) return;

  const settings = JSON.parse(localStorage.getItem("greenharvest_settings") || "{}");
  if (settings.storeName) form.querySelector("#setting-store-name").value = settings.storeName;
  if (settings.storeEmail) form.querySelector("#setting-store-email").value = settings.storeEmail;
  if (settings.storePhone) form.querySelector("#setting-store-phone").value = settings.storePhone;
  if (settings.freeThreshold) form.querySelector("#setting-free-threshold").value = settings.freeThreshold;
  if (settings.deliveryFee) form.querySelector("#setting-delivery-fee").value = settings.deliveryFee;
  if (settings.taxRate) form.querySelector("#setting-tax-rate").value = settings.taxRate;
}

function handleSaveSettings(event) {
  event.preventDefault();
  const form = event.target;
  const settings = {
    storeName: form.querySelector("#setting-store-name").value.trim(),
    storeEmail: form.querySelector("#setting-store-email").value.trim(),
    storePhone: form.querySelector("#setting-store-phone").value.trim(),
    freeThreshold: parseFloat(form.querySelector("#setting-free-threshold").value) || 35.00,
    deliveryFee: parseFloat(form.querySelector("#setting-delivery-fee").value) || 3.99,
    taxRate: parseFloat(form.querySelector("#setting-tax-rate").value) || 5.0
  };

  localStorage.setItem("greenharvest_settings", JSON.stringify(settings));
  showToast("Store settings saved and updated successfully!", "success");
}

// Global hookup on DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("admin-total-sales")) initAdminDashboard();
  if (document.getElementById("admin-orders-tbody")) initAdminOrdersPage();
  if (document.getElementById("admin-products-tbody")) initAdminProductsPage();
  if (document.getElementById("admin-inventory-tbody")) initAdminInventoryPage();
  if (document.getElementById("admin-messages-tbody")) initAdminMessagesPage();
  if (document.getElementById("admin-delivery-tbody")) initAdminDeliveryPage();
  if (document.getElementById("admin-reports-container")) initAdminReportsPage();
  if (document.getElementById("admin-settings-form")) initAdminSettingsPage();
});

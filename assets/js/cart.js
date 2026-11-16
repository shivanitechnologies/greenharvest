/**
 * GreenHarvest - Shopping Cart Management
 * Full Interactive Cart with LocalStorage Persistence
 */

const CART_STORAGE_KEY = "greenharvest_cart";
const COUPON_STORAGE_KEY = "greenharvest_coupon";

// Coupon registry
const VALID_COUPONS = {
  "ORGANIC10": { type: "percent", value: 10, label: "10% Off Entire Order" },
  "HARVEST20": { type: "percent", value: 20, minSubtotal: 50, label: "20% Off Orders over $50" },
  "FREESHIP": { type: "shipping", value: 100, label: "Free Farm Delivery" }
};

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse cart", e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadges();
}

function getActiveCoupon() {
  try {
    const raw = localStorage.getItem(COUPON_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setActiveCoupon(coupon) {
  if (coupon) {
    localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
  } else {
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }
}

/**
 * Add product to cart with weight variant and quantity
 */
function addToCart(productId, weight = "500g", quantity = 1, event = null) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
  const product = products.find(p => p.id === productId);
  if (!product) {
    showToast("Product not found!", "error");
    return;
  }

  // Calculate price based on selected weight option if available
  let itemPrice = product.price;
  if (product.weightOptions && product.weightOptions.length > 0) {
    const match = product.weightOptions.find(w => w.label === weight);
    if (match) itemPrice = match.price;
  }

  const cart = getCart();
  const cartItemId = `${productId}-${weight}`;
  const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += parseInt(quantity, 10);
  } else {
    cart.push({
      cartItemId: cartItemId,
      productId: product.id,
      name: product.name,
      category: product.category,
      weight: weight,
      price: itemPrice,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: parseInt(quantity, 10)
    });
  }

  saveCart(cart);
  showToast(`Added ${quantity}x ${product.name} (${weight}) to your cart!`);

  // If on cart page, re-render
  if (document.getElementById("cart-items-container")) {
    renderCartPage();
  }
}

/**
 * Remove an item completely
 */
function removeFromCart(cartItemId) {
  let cart = getCart();
  const item = cart.find(i => i.cartItemId === cartItemId);
  cart = cart.filter(i => i.cartItemId !== cartItemId);
  saveCart(cart);

  if (item) {
    showToast(`Removed ${item.name} from your cart.`);
  }

  if (document.getElementById("cart-items-container")) {
    renderCartPage();
  }
}

/**
 * Update quantity of an item
 */
function updateCartQuantity(cartItemId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(cartItemId);
    return;
  }

  saveCart(cart);
  if (document.getElementById("cart-items-container")) {
    renderCartPage();
  }
}

/**
 * Compute totals: subtotal, discount, delivery, tax, total
 */
function getCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let delivery = subtotal > 0 ? (subtotal >= 35 ? 0 : 3.99) : 0;
  let discount = 0;

  const coupon = getActiveCoupon();
  if (coupon && subtotal > 0) {
    if (coupon.type === "percent") {
      discount = (subtotal * coupon.value) / 100;
    } else if (coupon.type === "shipping") {
      delivery = 0;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = subtotal > 0 ? taxableAmount * 0.05 : 0; // 5% tax
  const total = Math.max(0, taxableAmount + delivery + tax);

  return {
    itemCount: cart.reduce((count, item) => count + item.quantity, 0),
    subtotal,
    delivery,
    discount,
    tax,
    total,
    coupon
  };
}

/**
 * Apply Promo Coupon
 */
function applyCouponCode(code) {
  if (!code) {
    showToast("Please enter a promo code", "warning");
    return;
  }
  const cleanCode = code.trim().toUpperCase();
  const match = VALID_COUPONS[cleanCode];

  if (!match) {
    showToast("Invalid promo code. Try 'ORGANIC10' or 'HARVEST20'", "error");
    return;
  }

  const totals = getCartTotals();
  if (match.minSubtotal && totals.subtotal < match.minSubtotal) {
    showToast(`Code requires a minimum subtotal of $${match.minSubtotal}`, "warning");
    return;
  }

  setActiveCoupon({ code: cleanCode, ...match });
  showToast(`Coupon '${cleanCode}' applied: ${match.label}!`);
  
  if (document.getElementById("cart-items-container")) {
    renderCartPage();
  }
}

function removeCoupon() {
  setActiveCoupon(null);
  showToast("Coupon removed.");
  if (document.getElementById("cart-items-container")) {
    renderCartPage();
  }
}

/**
 * Update badge indicators in the header
 */
function updateCartBadges() {
  const badges = document.querySelectorAll(".cart-count-badge");
  const totals = getCartTotals();
  badges.forEach(badge => {
    badge.textContent = totals.itemCount;
    if (totals.itemCount > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  });
}

/**
 * Render the dedicated Cart Page
 */
function renderCartPage() {
  const container = document.getElementById("cart-items-container");
  const emptyView = document.getElementById("cart-empty-view");
  const filledView = document.getElementById("cart-filled-view");
  if (!container) return;

  const cart = getCart();
  const totals = getCartTotals();

  if (cart.length === 0) {
    if (emptyView) emptyView.classList.remove("hidden");
    if (filledView) filledView.classList.add("hidden");
    return;
  }

  if (emptyView) emptyView.classList.add("hidden");
  if (filledView) filledView.classList.remove("hidden");

  // Render items rows
  container.innerHTML = cart.map(item => `
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-[#222B25] rounded-xl border border-gray-100 dark:border-gray-800 gap-4 transition-all">
      <div class="flex items-center gap-4 w-full sm:w-auto">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0">
        <div>
          <span class="text-xs font-medium text-[#315C3B] dark:text-[#8FD69E] uppercase tracking-wider">${item.category}</span>
          <h4 class="font-heading font-semibold text-gray-900 dark:text-white text-base">
            <a href="product-details.html?id=${item.productId}" class="hover:text-[#315C3B] dark:hover:text-[#D6A85F]">${item.name}</a>
          </h4>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Unit: <span class="font-medium">${item.weight}</span></div>
          <div class="text-sm font-bold text-[#315C3B] dark:text-[#D6A85F] sm:hidden mt-1">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      </div>

      <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
        <!-- Quantity control -->
        <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-[#1A211D]">
          <button type="button" onclick="updateCartQuantity('${item.cartItemId}', -1)" class="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-bold transition-colors">−</button>
          <span class="w-10 text-center text-sm font-semibold text-gray-800 dark:text-white">${item.quantity}</span>
          <button type="button" onclick="updateCartQuantity('${item.cartItemId}', 1)" class="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-bold transition-colors">+</button>
        </div>

        <!-- Item subtotal (Desktop) -->
        <div class="hidden sm:block text-right min-w-[80px]">
          <span class="text-base font-bold text-[#315C3B] dark:text-[#D6A85F]">$${(item.price * item.quantity).toFixed(2)}</span>
          <div class="text-xs text-gray-400">($${item.price.toFixed(2)} each)</div>
        </div>

        <!-- Delete button -->
        <button type="button" onclick="removeFromCart('${item.cartItemId}')" class="text-gray-400 hover:text-red-500 p-1.5 transition-colors" title="Remove Item">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    </div>
  `).join("");

  // Render Summary
  const subtotalEl = document.getElementById("cart-subtotal");
  const deliveryEl = document.getElementById("cart-delivery");
  const discountRowEl = document.getElementById("cart-discount-row");
  const discountValEl = document.getElementById("cart-discount-val");
  const taxEl = document.getElementById("cart-tax");
  const totalEl = document.getElementById("cart-total");
  const couponBadgeEl = document.getElementById("active-coupon-badge");

  if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
  if (deliveryEl) deliveryEl.textContent = totals.delivery === 0 ? "FREE" : `$${totals.delivery.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;

  if (totals.discount > 0 && discountRowEl && discountValEl) {
    discountRowEl.classList.remove("hidden");
    discountValEl.textContent = `-$${totals.discount.toFixed(2)}`;
  } else if (discountRowEl) {
    discountRowEl.classList.add("hidden");
  }

  if (couponBadgeEl) {
    if (totals.coupon) {
      couponBadgeEl.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          Coupon: ${totals.coupon.code} (${totals.coupon.label})
          <button type="button" onclick="removeCoupon()" class="hover:text-red-600 font-bold ml-1">×</button>
        </span>
      `;
      couponBadgeEl.classList.remove("hidden");
    } else {
      couponBadgeEl.classList.add("hidden");
      couponBadgeEl.innerHTML = "";
    }
  }
}

// Global setup on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();
  if (document.getElementById("cart-items-container")) {
    renderCartPage();
  }
});

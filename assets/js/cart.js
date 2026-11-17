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

  // Trigger smooth fly-to-cart animation with size expansion and impact
  animateFlyToCart(event, product, parseInt(quantity, 10));

  // If on cart page, re-render
  if (document.getElementById("cart-items-container")) {
    renderCartPage();
  }
}

/**
 * Smooth Fly-to-Cart Animation
 * Animates a glowing product thumbnail flying from the clicked button/card up to the header cart icon
 * Increases in size during flight and triggers bag expansion & counter punch on arrival
 */
function animateFlyToCart(event, product, quantity = 1) {
  try {
    // 1. Find Destination: The cart icon in the header
    const cartIcon = document.querySelector('header a[href="cart.html"]') ||
                     document.querySelector('a[href="cart.html"]');
    if (!cartIcon) return;

    const destRect = cartIcon.getBoundingClientRect();
    const destX = destRect.left + destRect.width / 2;
    const destY = destRect.top + destRect.height / 2;

    // 2. Button tactile feedback
    const trigger = (event && (event.currentTarget || event.target)) ? (event.currentTarget || event.target) : null;
    if (trigger && trigger.classList) {
      trigger.classList.add("btn-add-clicked");
      setTimeout(() => trigger.classList.remove("btn-add-clicked"), 160);
    }

    // 3. Find Launch Point: Clicked button, card image, or detail hero image
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;
    let imgSrc = (product && product.image) ? product.image : "";
    let sourceElement = null;

    if (trigger && typeof trigger.getBoundingClientRect === "function") {
      sourceElement = trigger;
      const card = trigger.closest(".card-clean, [data-product-id], .group, section");
      if (card) {
        const foundImg = card.querySelector("img");
        if (foundImg) {
          sourceElement = foundImg;
          if (!imgSrc) imgSrc = foundImg.src;
        }
      }
    } else if (product && product.id) {
      const card = document.querySelector(`[data-product-id="${product.id}"]`);
      if (card) {
        const foundImg = card.querySelector("img");
        if (foundImg) {
          sourceElement = foundImg;
          if (!imgSrc) imgSrc = foundImg.src;
        }
      }
    }

    if (!sourceElement && document.getElementById("detail-main-img")) {
      sourceElement = document.getElementById("detail-main-img");
      if (!imgSrc && sourceElement.src) imgSrc = sourceElement.src;
    }

    if (sourceElement && typeof sourceElement.getBoundingClientRect === "function") {
      const sRect = sourceElement.getBoundingClientRect();
      if (sRect.width > 0 && sRect.height > 0) {
        startX = sRect.left + sRect.width / 2;
        startY = sRect.top + sRect.height / 2;
      }
    }

    // 4. Create the Flying Element with Larger Size (76px desktop / 64px mobile)
    const flyerSize = window.innerWidth >= 640 ? 76 : 64;
    const flyer = document.createElement("div");
    flyer.className = "fly-to-cart-item";
    flyer.style.width = `${flyerSize}px`;
    flyer.style.height = `${flyerSize}px`;
    flyer.style.left = `${startX - flyerSize / 2}px`;
    flyer.style.top = `${startY - flyerSize / 2}px`;

    const itemName = (product && product.name) ? product.name : 'Fresh Harvest';
    if (imgSrc) {
      flyer.innerHTML = `
        <div class="relative w-full h-full">
          <img src="${imgSrc}" alt="${itemName}" class="w-full h-full object-cover">
          <div class="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#315C3B] border border-white dark:border-[#D6A85F] text-[#D6A85F] flex items-center justify-center shadow-md">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>
          </div>
        </div>
      `;
    } else {
      flyer.innerHTML = `
        <div class="w-full h-full flex items-center justify-center bg-[#315C3B] text-white">
          <svg class="w-7 h-7 text-[#D6A85F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
        </div>
      `;
    }

    document.body.appendChild(flyer);

    // 5. Parabolic Arc Flight with Size Expansion (Blooms up to 1.4x scale at flight peak)
    const deltaX = destX - startX;
    const deltaY = destY - startY;
    const arcHeight = Math.min(Math.abs(deltaX) * 0.4, 180) + 55;
    const midX = deltaX * 0.45;
    const midY = (deltaY * 0.45) - arcHeight;

    const animation = flyer.animate([
      {
        transform: "translate(0px, 0px) scale(0.9) rotate(0deg)",
        opacity: 0.95
      },
      {
        transform: `translate(${midX * 0.35}px, ${midY * 0.65}px) scale(1.35) rotate(-10deg)`,
        opacity: 1,
        offset: 0.22
      },
      {
        transform: `translate(${midX}px, ${midY}px) scale(1.4) rotate(-16deg)`,
        opacity: 1,
        offset: 0.48
      },
      {
        transform: `translate(${deltaX * 0.78}px, ${deltaY * 0.78}px) scale(0.85) rotate(8deg)`,
        opacity: 0.95,
        offset: 0.76
      },
      {
        transform: `translate(${deltaX * 0.95}px, ${deltaY * 0.95}px) scale(0.35) rotate(2deg)`,
        opacity: 0.75,
        offset: 0.94
      },
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0.08) rotate(0deg)`,
        opacity: 0,
        offset: 1
      }
    ], {
      duration: 820,
      easing: "cubic-bezier(0.18, 0.89, 0.32, 1.05)",
      fill: "forwards"
    });

    let landed = false;
    const onLand = () => {
      if (landed) return;
      landed = true;
      if (document.body.contains(flyer)) {
        flyer.remove();
      }
      triggerCartImpact(cartIcon, destX, destY, quantity);
    };

    animation.onfinish = onLand;
    setTimeout(onLand, 840);

  } catch (err) {
    console.warn("Fly-to-cart animation notice:", err);
  }
}

/**
 * Trigger celebration bounce and sparkle effect on cart icon when item lands
 */
function triggerCartImpact(cartIcon, centerX, centerY, quantity = 1) {
  if (!cartIcon) return;

  // 1. Cart Icon Bounce & Expansion (scale to 1.55x)
  cartIcon.classList.remove("cart-bounce");
  void cartIcon.offsetWidth;
  cartIcon.classList.add("cart-bounce");
  setTimeout(() => cartIcon.classList.remove("cart-bounce"), 720);

  // 2. Cart Count Badge Punch & Size Expansion (scale to 1.85x)
  const badge = cartIcon.querySelector(".cart-count-badge");
  if (badge) {
    badge.classList.remove("badge-punch");
    void badge.offsetWidth;
    badge.classList.add("badge-punch");
    setTimeout(() => badge.classList.remove("badge-punch"), 580);
  }

  // 3. Floating +1 Notification Pill
  const plusOne = document.createElement("div");
  plusOne.className = "cart-plus-one";
  plusOne.textContent = `+${quantity}`;
  plusOne.style.left = `${centerX - 14}px`;
  plusOne.style.top = `${centerY - 22}px`;
  document.body.appendChild(plusOne);
  setTimeout(() => plusOne.remove(), 800);

  // 4. Golden, Mint & Emerald Sparkle Burst
  const colors = ["#315C3B", "#D6A85F", "#10B981", "#F59E0B", "#8FD69E", "#34D399"];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
    const distance = 26 + Math.random() * 22;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const size = 6 + Math.random() * 4;

    const sparkle = document.createElement("div");
    sparkle.className = "cart-sparkle";
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.backgroundColor = colors[i % colors.length];
    sparkle.style.left = `${centerX - size / 2}px`;
    sparkle.style.top = `${centerY - size / 2}px`;
    sparkle.style.setProperty("--tx", `${tx}px`);
    sparkle.style.setProperty("--ty", `${ty}px`);

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
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

/**
 * GreenHarvest - Checkout Process & Order Placement
 * Validates shipping, PIN serviceability, payment choices, and handles order creation.
 */

// Serviceable PIN codes / zip codes list
const SERVICEABLE_PINS = {
  "10001": { city: "New York", state: "NY", sameDay: true, fee: 0 },
  "90210": { city: "Beverly Hills", state: "CA", sameDay: true, fee: 0 },
  "94103": { city: "San Francisco", state: "CA", sameDay: true, fee: 0 },
  "560001": { city: "Bangalore", state: "Karnataka", sameDay: true, fee: 0 },
  "110001": { city: "New Delhi", state: "Delhi", sameDay: true, fee: 0 },
  "400001": { city: "Mumbai", state: "Maharashtra", sameDay: true, fee: 0 },
  "600001": { city: "Chennai", state: "Tamil Nadu", sameDay: true, fee: 0 },
  "700001": { city: "Kolkata", state: "West Bengal", sameDay: true, fee: 0 }
};

function checkPinServiceability(pin) {
  const clean = (pin || "").toString().trim();
  if (!clean) return null;

  if (SERVICEABLE_PINS[clean]) {
    return {
      serviceable: true,
      city: SERVICEABLE_PINS[clean].city,
      state: SERVICEABLE_PINS[clean].state,
      sameDay: SERVICEABLE_PINS[clean].sameDay,
      message: `Great news! Express doorstep delivery available for ${SERVICEABLE_PINS[clean].city}.`
    };
  }

  // Any other 5 or 6 digit PIN is standard delivery
  if (clean.length === 5 || clean.length === 6) {
    return {
      serviceable: true,
      city: "Serviceable Region",
      state: "Standard Route",
      sameDay: false,
      message: "Standard organic farm delivery available (2-3 business days)."
    };
  }

  return {
    serviceable: false,
    message: "Sorry, this postal code is outside our direct farm delivery network right now."
  };
}

function initCheckoutPage() {
  const orderSummaryContainer = document.getElementById("checkout-order-items");
  const subtotalEl = document.getElementById("checkout-subtotal");
  const deliveryEl = document.getElementById("checkout-delivery");
  const discountRowEl = document.getElementById("checkout-discount-row");
  const discountValEl = document.getElementById("checkout-discount-val");
  const taxEl = document.getElementById("checkout-tax");
  const totalEl = document.getElementById("checkout-total");
  const pinInput = document.getElementById("shipping-pin");
  const pinStatusEl = document.getElementById("pin-status-feedback");

  const cart = getCart();
  const totals = getCartTotals();

  // Redirect if cart is empty
  if (cart.length === 0) {
    showToast("Your cart is empty. Redirecting to shop...", "warning");
    setTimeout(() => {
      window.location.href = "products.html";
    }, 1200);
    return;
  }

  // Render items in summary
  if (orderSummaryContainer) {
    orderSummaryContainer.innerHTML = cart.map(item => `
      <div class="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-lg flex-shrink-0">
        <div class="flex-grow min-w-0">
          <p class="text-xs font-semibold text-gray-900 dark:text-white truncate">${item.name}</p>
          <p class="text-[11px] text-gray-400">${item.weight} × ${item.quantity}</p>
        </div>
        <span class="text-xs font-bold text-gray-900 dark:text-white font-heading">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join("");
  }

  // Update summary numbers
  if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
  if (deliveryEl) deliveryEl.textContent = totals.delivery === 0 ? "FREE" : `$${totals.delivery.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;

  if (totals.discount > 0 && discountRowEl && discountValEl) {
    discountRowEl.classList.remove("hidden");
    discountValEl.textContent = `-$${totals.discount.toFixed(2)}`;
  }

  // Live PIN Code Checker
  if (pinInput && pinStatusEl) {
    pinInput.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      if (val.length >= 5) {
        const check = checkPinServiceability(val);
        if (check.serviceable) {
          pinStatusEl.className = "text-xs mt-1.5 text-emerald-600 dark:text-emerald-400 font-medium";
          pinStatusEl.textContent = `✓ ${check.message}`;
          
          const cityField = document.getElementById("shipping-city");
          const stateField = document.getElementById("shipping-state");
          if (cityField && check.city !== "Serviceable Region" && !cityField.value) cityField.value = check.city;
          if (stateField && check.state !== "Standard Route" && !stateField.value) stateField.value = check.state;
        } else {
          pinStatusEl.className = "text-xs mt-1.5 text-red-500 font-medium";
          pinStatusEl.textContent = `✗ ${check.message}`;
        }
      } else {
        pinStatusEl.textContent = "";
      }
    });
  }

  // Pre-fill user data if signed in
  const currentUser = getCurrentUser();
  if (currentUser) {
    const nameField = document.getElementById("shipping-name");
    const emailField = document.getElementById("shipping-email");
    const phoneField = document.getElementById("shipping-phone");
    if (nameField && !nameField.value) nameField.value = currentUser.name;
    if (emailField && !emailField.value) emailField.value = currentUser.email;
    if (phoneField && !phoneField.value && currentUser.phone) phoneField.value = currentUser.phone;
  }
}

/**
 * Handle Order Submission
 */
function handlePlaceOrder(event) {
  event.preventDefault();
  const form = document.getElementById("checkout-form");
  if (!form) return;

  const name = document.getElementById("shipping-name")?.value.trim();
  const email = document.getElementById("shipping-email")?.value.trim();
  const phone = document.getElementById("shipping-phone")?.value.trim();
  const address = document.getElementById("shipping-address")?.value.trim();
  const city = document.getElementById("shipping-city")?.value.trim();
  const pin = document.getElementById("shipping-pin")?.value.trim();

  if (!name || !email || !phone || !address || !city || !pin) {
    showToast("Please complete all required shipping fields.", "warning");
    return;
  }

  const pinCheck = checkPinServiceability(pin);
  if (pinCheck && !pinCheck.serviceable) {
    showToast("Please enter a serviceable postal PIN code.", "error");
    return;
  }

  const paymentMethodInput = form.querySelector('input[name="payment_method"]:checked');
  const paymentMethod = paymentMethodInput ? paymentMethodInput.value : "card";

  const deliverySlotInput = form.querySelector('input[name="delivery_slot"]:checked');
  const deliverySlot = deliverySlotInput ? deliverySlotInput.value : "Standard Next-Day";

  const cart = getCart();
  const totals = getCartTotals();
  const orderId = "GH-" + Math.floor(100000 + Math.random() * 900000);

  const newOrder = {
    orderId: orderId,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    timestamp: new Date().toISOString(),
    customer: {
      name,
      email,
      phone,
      address,
      city,
      pin
    },
    items: cart,
    totals: totals,
    deliverySlot: deliverySlot,
    paymentMethod: paymentMethod,
    status: "Processing",
    estimatedDelivery: "Tomorrow between 8:00 AM - 12:00 PM"
  };

  // Show processing button state
  const submitBtn = document.getElementById("place-order-btn");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      Confirming Organic Harvest...
    `;
  }

  // Save to stored orders
  setTimeout(() => {
    const existingOrders = JSON.parse(localStorage.getItem("greenharvest_orders") || "[]");
    existingOrders.unshift(newOrder);
    localStorage.setItem("greenharvest_orders", JSON.stringify(existingOrders));

    // Clear active cart & active coupon
    localStorage.removeItem("greenharvest_cart");
    localStorage.removeItem("greenharvest_coupon");
    updateCartBadges();

    // Redirect to Order Confirmation page
    window.location.href = `order-success.html?orderId=${orderId}`;
  }, 1200);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("checkout-form")) {
    initCheckoutPage();
  }
});

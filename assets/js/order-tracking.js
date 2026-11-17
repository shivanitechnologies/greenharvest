/**
 * GreenHarvest - Order Tracking Engine
 * Simple, clean, human-friendly order tracking with real-time status and demo data.
 */

const DEMO_ORDERS = {
  "GH-84291": {
    orderId: "GH-84291",
    date: "Today, Nov 17, 2026",
    time: "6:15 AM",
    status: "On the Way",
    stage: 3, // 1: Placed, 2: Packed, 3: On the Way, 4: Delivered
    estimatedArrival: "Today, 8:45 AM – 10:15 AM",
    etaText: "About 30–40 minutes away",
    courier: {
      name: "Marcus Lin",
      van: "GreenHarvest Delivery Van",
      status: "On route to your neighborhood",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: "Eleanor Vance",
      phone: "+1 (555) 234-5678",
      address: "742 Evergreen Terrace, Apt 4B",
      city: "New York, NY",
      pin: "10001",
      deliverySlot: "Morning (7:00 AM – 11:00 AM)",
      instructions: "Ring buzzer 4B. Leave by the door if no answer."
    },
    timeline: [
      { step: 1, title: "Order Confirmed", desc: "We received your order and sent it to the farm.", time: "6:15 AM", done: true },
      { step: 2, title: "Packed at Farm", desc: "Harvested fresh and packed in a chilled eco-box.", time: "7:30 AM", done: true },
      { step: 3, title: "Out for Delivery", desc: "Driver Marcus is on the way in a chilled van.", time: "8:15 AM", done: true, active: true },
      { step: 4, title: "Delivered", desc: "Handed over safely to your doorstep.", time: "Est. 9:45 AM", done: false }
    ],
    items: [
      { name: "Honeycrisp Organic Apples", category: "Fresh Fruits", weight: "1kg", price: 8.29, quantity: 1, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80" },
      { name: "Crisp Organic Baby Spinach", category: "Vegetables", weight: "250g", price: 3.49, quantity: 2, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80" },
      { name: "Cold-Pressed Extra Virgin Olive Oil", category: "Natural Oils", weight: "500ml", price: 11.99, quantity: 1, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80" }
    ],
    totals: {
      subtotal: 27.26,
      delivery: 0.00,
      discount: 0.00,
      total: 27.26
    },
    paymentMethod: "Credit Card (Ending in 4242)"
  },
  "GH-90412": {
    orderId: "GH-90412",
    date: "Today, Nov 17, 2026",
    time: "7:00 AM",
    status: "Packed at Farm",
    stage: 2,
    estimatedArrival: "Today, 4:00 PM – 8:00 PM",
    etaText: "Scheduled for afternoon delivery",
    courier: {
      name: "Sophia Martinez",
      van: "GreenHarvest Delivery Van",
      status: "Packing completed, preparing for route dispatch",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: "David Kim",
      phone: "+1 (555) 876-5432",
      address: "128 Orchard Lane",
      city: "San Francisco, CA",
      pin: "94103",
      deliverySlot: "Evening (4:00 PM – 8:00 PM)",
      instructions: "Leave at side gate, gate code #4821."
    },
    timeline: [
      { step: 1, title: "Order Confirmed", desc: "Your order is confirmed and scheduled.", time: "7:00 AM", done: true },
      { step: 2, title: "Packed at Farm", desc: "Hand-picked and chilled in insulated box.", time: "8:45 AM", done: true, active: true },
      { step: 3, title: "Out for Delivery", desc: "Will leave the farm on the afternoon route.", time: "Est. 1:30 PM", done: false },
      { step: 4, title: "Delivered", desc: "Handed over safely to your doorstep.", time: "Est. 5:15 PM", done: false }
    ],
    items: [
      { name: "Heirloom Vine Tomatoes", category: "Vegetables", weight: "1kg", price: 3.99, quantity: 2, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80" },
      { name: "Farm Fresh Organic Carrots", category: "Vegetables", weight: "500g", price: 2.79, quantity: 1, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80" },
      { name: "Raw Wildflower Forest Honey", category: "Natural Foods", weight: "500g", price: 14.50, quantity: 1, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80" }
    ],
    totals: {
      subtotal: 25.27,
      delivery: 0.00,
      discount: 0.00,
      total: 25.27
    },
    paymentMethod: "Apple Pay"
  },
  "GH-63018": {
    orderId: "GH-63018",
    date: "Today, Nov 17, 2026",
    time: "7:45 AM",
    status: "Order Confirmed",
    stage: 1,
    estimatedArrival: "Tomorrow Morning (7:00 AM – 11:00 AM)",
    etaText: "Scheduled for early morning harvest",
    courier: {
      name: "Morning Route Driver",
      van: "GreenHarvest Van",
      status: "Scheduled for tomorrow morning delivery",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: "Sarah Jenkins",
      phone: "+1 (555) 345-6789",
      address: "405 Sunset Blvd",
      city: "Beverly Hills, CA",
      pin: "90210",
      deliverySlot: "Morning (7:00 AM – 11:00 AM)",
      instructions: "Please leave on porch table."
    },
    timeline: [
      { step: 1, title: "Order Confirmed", desc: "Payment received. Farm harvest scheduled.", time: "7:45 AM", done: true, active: true },
      { step: 2, title: "Packed at Farm", desc: "Will be picked fresh at sunrise tomorrow.", time: "Tomorrow 6:00 AM", done: false },
      { step: 3, title: "Out for Delivery", desc: "Van departure for your area.", time: "Tomorrow 7:30 AM", done: false },
      { step: 4, title: "Delivered", desc: "Doorstep delivery.", time: "Tomorrow 9:00 AM", done: false }
    ],
    items: [
      { name: "Alphonso Organic King Mangoes", category: "Fresh Fruits", weight: "1kg", price: 14.99, quantity: 1, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80" },
      { name: "Cold-Pressed Virgin Coconut Oil", category: "Natural Oils", weight: "500ml", price: 9.99, quantity: 1, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80" }
    ],
    totals: {
      subtotal: 24.98,
      delivery: 0.00,
      discount: 0.00,
      total: 24.98
    },
    paymentMethod: "Credit Card (Ending in 8891)"
  },
  "GH-45120": {
    orderId: "GH-45120",
    date: "Yesterday, Nov 16, 2026",
    time: "5:50 AM",
    status: "Delivered",
    stage: 4,
    estimatedArrival: "Delivered at 8:24 AM",
    etaText: "Delivered to your front door",
    courier: {
      name: "Marcus Lin",
      van: "GreenHarvest Delivery Van",
      status: "Package delivered safely",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: "Michael Chen",
      phone: "+1 (555) 901-2345",
      address: "88 Market St, Suite 1200",
      city: "New York, NY",
      pin: "10001",
      deliverySlot: "Morning (7:00 AM – 11:00 AM)",
      instructions: "Leave with front desk concierge."
    },
    timeline: [
      { step: 1, title: "Order Confirmed", desc: "Order received and confirmed.", time: "5:50 AM", done: true },
      { step: 2, title: "Packed at Farm", desc: "Fresh produce packed in insulated box.", time: "6:40 AM", done: true },
      { step: 3, title: "Out for Delivery", desc: "Driver Marcus was on route.", time: "7:20 AM", done: true },
      { step: 4, title: "Delivered", desc: "Package left safely at front desk.", time: "8:24 AM", done: true, active: true }
    ],
    items: [
      { name: "Valencia Sun-Kissed Oranges", category: "Fresh Fruits", weight: "1kg", price: 6.99, quantity: 2, image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80" },
      { name: "Farm Fresh Organic Carrots", category: "Vegetables", weight: "500g", price: 2.79, quantity: 2, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80" }
    ],
    totals: {
      subtotal: 19.56,
      delivery: 0.00,
      discount: 0.00,
      total: 19.56
    },
    paymentMethod: "Credit Card (Ending in 1042)"
  }
};

/**
 * Retrieve order data from localStorage or demo data, or generate fallback
 */
function findOrderData(orderId) {
  if (!orderId) return null;
  const cleanId = orderId.toString().trim().toUpperCase();

  // 1. Check Demo orders
  if (DEMO_ORDERS[cleanId]) {
    return DEMO_ORDERS[cleanId];
  }

  // 2. Check localStorage placed orders
  const storedOrders = JSON.parse(localStorage.getItem("greenharvest_orders") || "[]");
  const found = storedOrders.find(o => (o.orderId || "").toUpperCase() === cleanId);
  if (found) {
    return adaptStoredOrderToTracking(found);
  }

  // 3. Fallback: generate a clean active view
  return generateSimulatedOrder(cleanId);
}

/**
 * Adapt a localStorage checkout order object into full tracking schema
 */
function adaptStoredOrderToTracking(stored) {
  let stage = 1;
  let statusText = "Order Confirmed";
  const st = (stored.status || "").toLowerCase();

  if (st.includes("deliver")) {
    stage = 4;
    statusText = "Delivered";
  } else if (st.includes("dispatch") || st.includes("out")) {
    stage = 3;
    statusText = "On the Way";
  } else if (st.includes("harvest") || st.includes("pack")) {
    stage = 2;
    statusText = "Packed at Farm";
  } else {
    stage = 1;
    statusText = "Order Confirmed";
  }

  return {
    orderId: stored.orderId,
    date: stored.date || "Recent Order",
    time: "Today",
    status: statusText,
    stage: stage,
    estimatedArrival: stored.deliverySlot || "Tomorrow Morning (7:00 AM – 11:00 AM)",
    etaText: stage === 4 ? "Delivered to your door" : "In Progress",
    courier: {
      name: "Marcus Lin",
      van: "GreenHarvest Delivery Van",
      status: stage >= 3 ? "On the way to your address" : "Preparing morning route",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: stored.customer?.name || "Customer",
      phone: stored.customer?.phone || "+1 (555) 000-0000",
      address: stored.customer?.address || "Delivery Address",
      city: stored.customer?.city || "Local City",
      pin: stored.customer?.pin || "Serviceable",
      deliverySlot: stored.deliverySlot || "Standard Next-Day",
      instructions: "Leave package at front door."
    },
    timeline: [
      { step: 1, title: "Order Confirmed", desc: "Your order was received and confirmed.", time: "Confirmed", done: true, active: stage === 1 },
      { step: 2, title: "Packed at Farm", desc: "Fresh organic items packed in an insulated box.", time: stage >= 2 ? "Completed" : "Scheduled", done: stage >= 2, active: stage === 2 },
      { step: 3, title: "Out for Delivery", desc: "Driver is on route with climate-controlled van.", time: stage >= 3 ? "On the way" : "Upcoming", done: stage >= 3, active: stage === 3 },
      { step: 4, title: "Delivered", desc: "Delivered to your address.", time: stage >= 4 ? "Delivered" : "Pending", done: stage >= 4, active: stage === 4 }
    ],
    items: stored.items || [],
    totals: stored.totals || {
      subtotal: 0,
      delivery: 0,
      discount: 0,
      total: 0
    },
    paymentMethod: stored.paymentMethod === "cod" ? "Cash on Delivery" : "Online Card Payment"
  };
}

/**
 * Generate a clean simulated order if an unknown ID is entered
 */
function generateSimulatedOrder(id) {
  return {
    orderId: id,
    date: "Today, Nov 17, 2026",
    time: "Recent",
    status: "Packed at Farm",
    stage: 2,
    estimatedArrival: "Today, 4:00 PM – 8:00 PM",
    etaText: "Packed and ready for delivery route",
    courier: {
      name: "Marcus Lin",
      van: "GreenHarvest Delivery Van",
      status: "Assigned to delivery route",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: "Customer",
      phone: "+1 (800) 473-3642",
      address: "Delivery Address",
      city: "Service Area",
      pin: "Serviceable",
      deliverySlot: "Evening Slot (4 PM – 8 PM)",
      instructions: "Leave at front doorstep."
    },
    timeline: [
      { step: 1, title: "Order Confirmed", desc: "Order verified and sent to harvest team.", time: "7:15 AM", done: true },
      { step: 2, title: "Packed at Farm", desc: "Picked fresh and packed in chilled box.", time: "8:30 AM", done: true, active: true },
      { step: 3, title: "Out for Delivery", desc: "Driver will depart on afternoon route.", time: "Est. 1:30 PM", done: false },
      { step: 4, title: "Delivered", desc: "Doorstep delivery.", time: "Est. 5:00 PM", done: false }
    ],
    items: [
      { name: "Honeycrisp Organic Apples", category: "Fresh Fruits", weight: "1kg", price: 8.29, quantity: 1, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80" },
      { name: "Heirloom Vine Tomatoes", category: "Vegetables", weight: "1kg", price: 3.99, quantity: 2, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80" },
      { name: "Raw Wildflower Forest Honey", category: "Natural Foods", weight: "500g", price: 14.50, quantity: 1, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80" }
    ],
    totals: {
      subtotal: 30.77,
      delivery: 0.00,
      discount: 0.00,
      total: 30.77
    },
    paymentMethod: "Card Payment (Confirmed)"
  };
}

/**
 * Render the clean, user-attractive order tracking view
 */
function renderOrderTracking(order) {
  const container = document.getElementById("order-tracking-display");
  if (!container) return;

  if (!order) {
    container.innerHTML = `
      <div class="card-clean p-8 sm:p-10 text-center space-y-4 max-w-md mx-auto">
        <div class="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#D6A85F] mx-auto flex items-center justify-center text-2xl font-bold">
          🔍
        </div>
        <h3 class="font-heading font-bold text-lg text-gray-900 dark:text-white">Order Not Found</h3>
        <p class="text-xs text-gray-500 leading-relaxed">
          We couldn't find that Order ID. Please check the ID in your email confirmation, or tap one of the demo orders below.
        </p>
        <button type="button" onclick="loadOrderById('GH-84291')" class="btn-primary text-xs !min-h-[40px] px-5">
          View Demo Order #GH-84291
        </button>
      </div>
    `;
    return;
  }

  // Calculate progress bar percent
  const progressPercents = [0, 25, 50, 75, 100];
  const percent = progressPercents[order.stage] || 50;

  // Status Badge styles
  let statusBadgeHtml = '';
  if (order.stage === 4) {
    statusBadgeHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> ${order.status}</span>`;
  } else if (order.stage === 3) {
    statusBadgeHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#315C3B] dark:text-[#8FD69E] border border-emerald-300 dark:border-emerald-800 font-bold text-xs"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> 🚚 ${order.status}</span>`;
  } else if (order.stage === 2) {
    statusBadgeHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-bold text-xs"><span class="w-2 h-2 rounded-full bg-[#D6A85F] animate-pulse"></span> 📦 ${order.status}</span>`;
  } else {
    statusBadgeHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold text-xs">✓ ${order.status}</span>`;
  }

  // Build items HTML
  const itemsHtml = order.items.map(item => `
    <div class="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-xl flex-shrink-0 border border-gray-100 dark:border-gray-700">
      <div class="flex-grow min-w-0">
        <h5 class="text-xs font-semibold text-gray-900 dark:text-white truncate">${item.name}</h5>
        <p class="text-[11px] text-gray-500 mt-0.5">${item.weight || 'Standard'} • Qty: ${item.quantity}</p>
      </div>
      <div class="text-right flex-shrink-0">
        <span class="font-heading font-bold text-xs text-gray-900 dark:text-white">$${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
      </div>
    </div>
  `).join("");

  // 4-step stepper nodes
  const stepsData = [
    { num: 1, title: "Order Placed", subtitle: "Confirmed" },
    { num: 2, title: "Packed", subtitle: "Chilled & fresh" },
    { num: 3, title: "On the Way", subtitle: "In delivery van" },
    { num: 4, title: "Delivered", subtitle: "At your door" }
  ];

  const stepperHtml = stepsData.map(s => {
    const isPast = order.stage > s.num;
    const isCurrent = order.stage === s.num;

    let iconBg = "bg-gray-100 dark:bg-gray-800 text-gray-400 border border-gray-200 dark:border-gray-700";
    let textStyle = "text-gray-400";
    let iconContent = s.num;

    if (isPast) {
      iconBg = "bg-[#315C3B] text-white shadow-sm";
      textStyle = "text-[#315C3B] dark:text-[#8FD69E] font-semibold";
      iconContent = "✓";
    } else if (isCurrent) {
      iconBg = "bg-[#D6A85F] text-[#1A3320] ring-4 ring-[#D6A85F]/20 font-bold shadow-sm";
      textStyle = "text-gray-900 dark:text-white font-bold";
      iconContent = s.num;
    }

    return `
      <div class="flex-1 text-center relative z-10 px-1">
        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full ${iconBg} mx-auto flex items-center justify-center text-xs font-heading font-bold mb-1.5 transition-all">
          ${iconContent}
        </div>
        <p class="text-xs ${textStyle} leading-tight truncate font-heading">${s.title}</p>
        <p class="text-[10px] text-gray-400 hidden sm:block mt-0.5 truncate">${s.subtitle}</p>
      </div>
    `;
  }).join("");

  // Simple, clean timeline logs
  const timelineLogsHtml = order.timeline.map((item, idx) => {
    let circleClass = "bg-gray-200 dark:bg-gray-700 text-gray-400";
    if (item.done && !item.active) circleClass = "bg-[#315C3B] text-white";
    if (item.active) circleClass = "bg-[#D6A85F] text-[#1A3320] ring-4 ring-[#D6A85F]/20 font-bold";

    return `
      <li class="relative pb-5 last:pb-0 pl-8">
        ${idx < order.timeline.length - 1 ? '<span class="absolute top-4 left-3 -ml-[1px] h-full w-0.5 bg-gray-200 dark:bg-gray-800"></span>' : ''}
        <div class="absolute left-0 top-0.5 w-6 h-6 rounded-full ${circleClass} flex items-center justify-center text-[10px] font-bold">
          ${item.done && !item.active ? '✓' : item.step}
        </div>
        <div class="flex items-center justify-between gap-2">
          <h6 class="font-heading font-semibold text-xs text-gray-900 dark:text-white ${item.active ? 'text-[#315C3B] dark:text-[#D6A85F]' : ''}">${item.title}</h6>
          <span class="text-[11px] text-gray-400 font-medium">${item.time}</span>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${item.desc}</p>
      </li>
    `;
  }).join("");

  container.innerHTML = `
    <!-- Order Card -->
    <div class="bg-white dark:bg-[#1A211D] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
      
      <!-- Top Order Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="text-xs font-medium text-gray-400">Order:</span>
            <span class="font-heading font-bold text-lg sm:text-xl text-gray-900 dark:text-white font-mono">${order.orderId}</span>
            ${statusBadgeHtml}
          </div>
          <p class="text-xs text-gray-500 mt-1">Placed on ${order.date}</p>
        </div>

        <!-- Estimated Window -->
        <div class="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-4 py-2 text-left sm:text-right">
          <span class="text-[10px] font-semibold uppercase text-emerald-800 dark:text-emerald-400 block tracking-wider">Estimated Delivery</span>
          <span class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white font-heading">${order.estimatedArrival}</span>
        </div>
      </div>

      <!-- 4-Stage Progress Stepper -->
      <div class="pt-2 pb-2">
        <div class="relative max-w-3xl mx-auto">
          <!-- Background track -->
          <div class="absolute top-4 sm:top-5 left-6 right-6 h-1 bg-gray-200 dark:bg-gray-800 z-0"></div>
          <!-- Active fill line -->
          <div class="absolute top-4 sm:top-5 left-6 h-1 bg-[#315C3B] z-0 transition-all duration-500" style="width: ${percent}%;"></div>
          
          <div class="flex justify-between items-start">
            ${stepperHtml}
          </div>
        </div>
      </div>

    </div>

    <!-- 2-Column Info Grid: Left is Delivery Info, Right is Items -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Delivery Details (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- Driver Card -->
        <div class="bg-white dark:bg-[#1A211D] rounded-2xl p-5 sm:p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-3">
          <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Delivery Driver
            </h4>
            <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">● Active Delivery</span>
          </div>

          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-[#315C3B] text-white font-heading font-bold flex items-center justify-center flex-shrink-0 text-base">
              ${order.courier.name.charAt(0)}
            </div>
            <div class="flex-grow min-w-0">
              <h5 class="text-sm font-bold text-gray-900 dark:text-white truncate">${order.courier.name}</h5>
              <p class="text-xs text-gray-500 truncate">${order.courier.van}</p>
              <p class="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 truncate">${order.courier.status}</p>
            </div>
            <a href="tel:${order.courier.phone}" class="btn-secondary !min-h-[36px] !py-1 !px-3.5 text-xs font-semibold whitespace-nowrap">
              Call Driver
            </a>
          </div>
        </div>

        <!-- Recipient & Address -->
        <div class="bg-white dark:bg-[#1A211D] rounded-2xl p-5 sm:p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
          <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-100 dark:border-gray-800">
            Delivery Address
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span class="text-gray-400 text-[11px] block">Recipient:</span>
              <p class="font-bold text-gray-900 dark:text-white text-sm mt-0.5">${order.customer.name}</p>
              <p class="text-gray-500 font-mono mt-0.5">${order.customer.phone}</p>
            </div>
            <div>
              <span class="text-gray-400 text-[11px] block">Delivery Slot:</span>
              <p class="font-bold text-[#315C3B] dark:text-[#D6A85F] text-sm mt-0.5">${order.customer.deliverySlot}</p>
              <p class="text-gray-500 mt-0.5">Pincode: <span class="font-mono font-bold">${order.customer.pin}</span></p>
            </div>
          </div>

          <div class="pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
            <span class="text-gray-400 text-[11px] block mb-1">Address:</span>
            <p class="text-gray-800 dark:text-gray-200 font-medium">${order.customer.address}, ${order.customer.city}</p>
            <p class="text-gray-400 text-[11px] mt-1">Note: "${order.customer.instructions}"</p>
          </div>
        </div>

        <!-- Progress Timeline Log -->
        <div class="bg-white dark:bg-[#1A211D] rounded-2xl p-5 sm:p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm">
          <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
            Order Timeline
          </h4>
          <ul class="relative">
            ${timelineLogsHtml}
          </ul>
        </div>

      </div>

      <!-- Right Column: Ordered Items & Billing (5 cols) -->
      <div class="lg:col-span-5 space-y-6">
        
        <div class="bg-white dark:bg-[#1A211D] rounded-2xl p-5 sm:p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Items in this Order
            </h4>
            <span class="text-xs text-gray-400">${order.items.length} ${order.items.length === 1 ? 'item' : 'items'}</span>
          </div>

          <!-- Items list -->
          <div class="divide-y divide-gray-100 dark:divide-gray-800 max-h-72 overflow-y-auto pr-1">
            ${itemsHtml}
          </div>

          <!-- Price Summary -->
          <div class="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs">
            <div class="flex justify-between text-gray-500">
              <span>Subtotal:</span>
              <span class="font-medium text-gray-900 dark:text-white">$${(order.totals.subtotal || 0).toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Delivery:</span>
              <span class="font-medium text-emerald-600 dark:text-emerald-400">${order.totals.delivery === 0 ? 'FREE' : '$' + (order.totals.delivery || 0).toFixed(2)}</span>
            </div>
            ${order.totals.discount > 0 ? `
              <div class="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Discount:</span>
                <span>-$${(order.totals.discount || 0).toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm font-bold text-gray-900 dark:text-white font-heading">
              <span>Total Paid:</span>
              <span class="text-base text-[#315C3B] dark:text-[#D6A85F]">$${(order.totals.total || 0).toFixed(2)}</span>
            </div>
            <p class="text-[11px] text-gray-400 pt-0.5">Paid via ${order.paymentMethod}</p>
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <button type="button" onclick="window.print()" class="btn-secondary w-full text-xs !min-h-[38px] justify-center">
              Print Receipt
            </button>
            <a href="contact.html" class="btn-secondary w-full text-xs !min-h-[38px] justify-center">
              Need Help?
            </a>
          </div>

        </div>

      </div>

    </div>
  `;
}

/**
 * Handle user clicking Track Order button or pressing Enter
 */
function handleTrackOrderSubmit() {
  const input = document.getElementById("order-search-input");
  if (!input) return;

  const val = input.value.trim();
  if (!val) {
    if (typeof showToast === 'function') {
      showToast("Please enter an Order ID.", "warning");
    } else {
      alert("Please enter an Order ID.");
    }
    return;
  }

  loadOrderById(val);
}

/**
 * Load and display order by ID
 */
function loadOrderById(orderId) {
  const input = document.getElementById("order-search-input");
  if (input) input.value = orderId;

  const orderData = findOrderData(orderId);
  renderOrderTracking(orderData);

  // Update URL hash without reload
  if (history.replaceState) {
    const cleanUrl = `${window.location.pathname}?orderId=${encodeURIComponent(orderId)}#order-tracking`;
    history.replaceState(null, '', cleanUrl);
  }

  // Scroll smoothly to tracking display
  const target = document.getElementById("order-tracking");
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Populate recent orders chips from localStorage if present
 */
function populateRecentOrdersBar() {
  const bar = document.getElementById("recent-user-orders-bar");
  const chipsContainer = document.getElementById("recent-user-orders-chips");
  if (!bar || !chipsContainer) return;

  const storedOrders = JSON.parse(localStorage.getItem("greenharvest_orders") || "[]");
  if (storedOrders.length === 0) {
    bar.classList.add("hidden");
    return;
  }

  bar.classList.remove("hidden");
  chipsContainer.innerHTML = storedOrders.slice(0, 3).map(order => `
    <button 
      type="button" 
      onclick="loadOrderById('${order.orderId}')" 
      class="px-2.5 py-1 text-xs rounded-lg bg-[#315C3B]/10 dark:bg-[#315C3B]/20 text-[#315C3B] dark:text-[#8FD69E] hover:bg-[#315C3B] hover:text-white transition-colors font-mono font-medium"
    >
      ${order.orderId} (${order.status || 'Placed'})
    </button>
  `).join("");
}

/**
 * Initialize on DOM Content Loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("order-tracking")) return;

  populateRecentOrdersBar();

  const input = document.getElementById("order-search-input");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleTrackOrderSubmit();
      }
    });
  }

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("orderId");

  if (requestedId) {
    loadOrderById(requestedId);
  } else {
    const storedOrders = JSON.parse(localStorage.getItem("greenharvest_orders") || "[]");
    if (storedOrders.length > 0) {
      loadOrderById(storedOrders[0].orderId);
    } else {
      loadOrderById("GH-84291");
    }
  }
});

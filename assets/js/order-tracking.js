/**
 * GreenHarvest - Order Tracking & Delivery Progress Engine
 * Provides live telemetry, 4-stage harvest-to-doorstep timeline,
 * courier transit details, and seamless integration with localStorage orders.
 */

const DEMO_ORDERS = {
  "GH-84291": {
    orderId: "GH-84291",
    date: "Today, Nov 17, 2026",
    time: "06:15 AM",
    status: "Out for Delivery",
    stage: 3, // 1: Placed, 2: Harvested, 3: Out for Delivery, 4: Delivered
    coldTemp: "3.6°C",
    humidity: "92% RH",
    transitVan: "Electric Van #EV-42 (Eco-Regulated)",
    estimatedArrival: "Today, Morning Slot (8:45 AM – 10:15 AM)",
    etaText: "Arriving in approx. 30–45 mins",
    courier: {
      name: "Marcus Lin",
      van: "GreenHarvest Eco-Transit #EV-42",
      status: "In Transit • 2.4 miles away (Next drop in queue)",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: "Eleanor Vance",
      phone: "+1 (555) 234-5678",
      address: "742 Evergreen Terrace, Apt 4B",
      city: "New York, NY",
      pin: "10001",
      deliverySlot: "Morning Slot (7:00 AM – 11:00 AM)",
      instructions: "Ring buzzer 4B, please leave in thermal shaded tote if not answered."
    },
    timeline: [
      { step: 1, title: "Order Placed & Confirmed", desc: "Payment verified; harvest queue dispatched to Highland Orchard hub.", time: "06:15 AM", done: true },
      { step: 2, title: "Farm Harvested & Cold Packaged", desc: "Hand-picked from certified living soil; zero-plastic compostable liner, pre-cooled to 3.6°C.", time: "07:30 AM", done: true },
      { step: 3, title: "Dispatched in Electric Cool-Van", desc: "Loaded onto climate-regulated EV-42. Cold-chain continuous telemetry active.", time: "08:15 AM", done: true, active: true },
      { step: 4, title: "Doorstep Handover", desc: "Touchless drop-off and collection of previous delivery carton.", time: "Est. 09:45 AM", done: false }
    ],
    items: [
      { name: "Honeycrisp Organic Apples", category: "Fresh Fruits", weight: "1kg", price: 8.29, quantity: 1, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80" },
      { name: "Crisp Organic Baby Spinach", category: "Vegetables", weight: "250g", price: 3.49, quantity: 2, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80" },
      { name: "Cold-Pressed Extra Virgin Olive Oil", category: "Natural Oils", weight: "500ml", price: 11.99, quantity: 1, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80" }
    ],
    totals: {
      subtotal: 27.26,
      delivery: 0.00,
      packaging: 0.00,
      discount: 0.00,
      total: 27.26
    },
    paymentMethod: "Credit Card (Ending in 4242)"
  },
  "GH-90412": {
    orderId: "GH-90412",
    date: "Today, Nov 17, 2026",
    time: "07:00 AM",
    status: "Harvested & Cold Packaged",
    stage: 2,
    coldTemp: "4.0°C",
    humidity: "90% RH",
    transitVan: "Electric Van #EV-19 (Pre-departure)",
    estimatedArrival: "Today, Evening Slot (4:00 PM – 8:00 PM)",
    etaText: "Scheduled for afternoon dispatch",
    courier: {
      name: "Sophia Martinez",
      van: "GreenHarvest Eco-Transit #EV-19",
      status: "Quality screening at Central Farm Pre-Cooling Hub",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: "David Kim",
      phone: "+1 (555) 876-5432",
      address: "128 Orchard Lane",
      city: "San Francisco, CA",
      pin: "94103",
      deliverySlot: "Evening Slot (4:00 PM – 8:00 PM)",
      instructions: "Leave at side gate; passcode #4821."
    },
    timeline: [
      { step: 1, title: "Order Placed & Confirmed", desc: "Order received and routed to morning harvest team.", time: "07:00 AM", done: true },
      { step: 2, title: "Harvested & Cold Packaged", desc: "Harvested from field plot B; quality screened for blemish-free standard.", time: "08:45 AM", done: true, active: true },
      { step: 3, title: "Dispatched in Electric Cool-Van", desc: "Scheduled for 1:30 PM route departure.", time: "Est. 01:30 PM", done: false },
      { step: 4, title: "Doorstep Handover", desc: "Delivered to your doorstep in insulated packaging.", time: "Est. 05:15 PM", done: false }
    ],
    items: [
      { name: "Heirloom Vine Tomatoes", category: "Vegetables", weight: "1kg", price: 3.99, quantity: 2, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80" },
      { name: "Farm Fresh Organic Carrots", category: "Vegetables", weight: "500g", price: 2.79, quantity: 1, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80" },
      { name: "Raw Wildflower Forest Honey", category: "Natural Foods", weight: "500g", price: 14.50, quantity: 1, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80" }
    ],
    totals: {
      subtotal: 25.27,
      delivery: 0.00,
      packaging: 0.00,
      discount: 0.00,
      total: 25.27
    },
    paymentMethod: "Apple Pay"
  },
  "GH-63018": {
    orderId: "GH-63018",
    date: "Today, Nov 17, 2026",
    time: "07:45 AM",
    status: "Order Placed & Scheduled",
    stage: 1,
    coldTemp: "Ambient / Queue",
    humidity: "Farm Weather Normal",
    transitVan: "Pending Dawn Route Allocation",
    estimatedArrival: "Tomorrow Morning (7:00 AM – 11:00 AM)",
    etaText: "Scheduled for Dawn Harvest (5:00 AM)",
    courier: {
      name: "Farm Logistics Dispatch",
      van: "Pending Morning Route Assignment",
      status: "Harvest batch queued for Sunrise picking",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: "Sarah Jenkins",
      phone: "+1 (555) 345-6789",
      address: "405 Sunset Blvd",
      city: "Beverly Hills, CA",
      pin: "90210",
      deliverySlot: "Morning Slot (7:00 AM – 11:00 AM)",
      instructions: "Place box on table on porch."
    },
    timeline: [
      { step: 1, title: "Order Placed & Confirmed", desc: "Order received; harvest checklist assigned to morning growers.", time: "07:45 AM", done: true, active: true },
      { step: 2, title: "Harvested & Cold Packaged", desc: "Will be harvested fresh at sunrise tomorrow morning.", time: "Tomorrow 05:30 AM", done: false },
      { step: 3, title: "Dispatched in Electric Cool-Van", desc: "Loading onto cold-van route A.", time: "Tomorrow 07:15 AM", done: false },
      { step: 4, title: "Doorstep Handover", desc: "Fresh doorstep drop-off.", time: "Tomorrow 08:30 AM", done: false }
    ],
    items: [
      { name: "Alphonso Organic King Mangoes", category: "Fresh Fruits", weight: "1kg", price: 14.99, quantity: 1, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80" },
      { name: "Cold-Pressed Virgin Coconut Oil", category: "Natural Oils", weight: "500ml", price: 9.99, quantity: 1, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80" },
      { name: "Valencia Sun-Kissed Oranges", category: "Fresh Fruits", weight: "1kg", price: 6.99, quantity: 1, image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80" }
    ],
    totals: {
      subtotal: 31.97,
      delivery: 0.00,
      packaging: 0.00,
      discount: 0.00,
      total: 31.97
    },
    paymentMethod: "Credit Card (Ending in 8891)"
  },
  "GH-45120": {
    orderId: "GH-45120",
    date: "Yesterday, Nov 16, 2026",
    time: "05:50 AM",
    status: "Delivered",
    stage: 4,
    coldTemp: "4.1°C at Handover",
    humidity: "89% RH Verified",
    transitVan: "Electric Van #EV-42 (Completed)",
    estimatedArrival: "Delivered at 08:24 AM (Front Porch Handover)",
    etaText: "Successfully Delivered",
    courier: {
      name: "Marcus Lin",
      van: "GreenHarvest Eco-Transit #EV-42",
      status: "Handover Completed • Photo Proof Recorded",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: "Michael Chen",
      phone: "+1 (555) 901-2345",
      address: "88 Market St, Suite 1200",
      city: "New York, NY",
      pin: "10001",
      deliverySlot: "Morning Slot (7:00 AM – 11:00 AM)",
      instructions: "Hand over to front desk concierge."
    },
    timeline: [
      { step: 1, title: "Order Placed & Confirmed", desc: "Payment received and harvest checklist verified.", time: "05:50 AM", done: true },
      { step: 2, title: "Harvested & Cold Packaged", desc: "Fresh harvest packed with biodegradable insulated bubble.", time: "06:40 AM", done: true },
      { step: 3, title: "Dispatched in Electric Cool-Van", desc: "Out on morning route with driver Marcus Lin.", time: "07:20 AM", done: true },
      { step: 4, title: "Doorstep Handover", desc: "Successfully delivered. Safe thermal envelope maintained.", time: "08:24 AM", done: true, active: true }
    ],
    items: [
      { name: "Valencia Sun-Kissed Oranges", category: "Fresh Fruits", weight: "1kg", price: 6.99, quantity: 2, image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80" },
      { name: "Farm Fresh Organic Carrots", category: "Vegetables", weight: "500g", price: 2.79, quantity: 2, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80" },
      { name: "Crisp Organic Baby Spinach", category: "Vegetables", weight: "250g", price: 3.49, quantity: 1, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80" }
    ],
    totals: {
      subtotal: 23.05,
      delivery: 0.00,
      packaging: 0.00,
      discount: 0.00,
      total: 23.05
    },
    paymentMethod: "Credit Card (Ending in 1042)"
  }
};

/**
 * Retrieve an order by ID from localStorage or demo data, or generate realistic fallback
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

  // 3. Fallback: generate a realistic active order if user entered any other GH- ID
  return generateSimulatedOrder(cleanId);
}

/**
 * Adapt a localStorage checkout order object into full tracking schema
 */
function adaptStoredOrderToTracking(stored) {
  let stage = 1;
  let statusText = "Order Placed & Scheduled";
  const st = (stored.status || "").toLowerCase();

  if (st.includes("deliver")) {
    stage = 4;
    statusText = "Delivered";
  } else if (st.includes("dispatch") || st.includes("out")) {
    stage = 3;
    statusText = "Out for Delivery";
  } else if (st.includes("harvest")) {
    stage = 2;
    statusText = "Harvested & Cold Packaged";
  } else {
    stage = 1;
    statusText = "Order Placed & Confirmed";
  }

  return {
    orderId: stored.orderId,
    date: stored.date || "Recent Order",
    time: "Placed Recently",
    status: statusText,
    stage: stage,
    coldTemp: stage >= 2 ? "3.8°C" : "Pre-Chill Cellar",
    humidity: "91% RH",
    transitVan: "Electric Van #EV-42 (Climate Protected)",
    estimatedArrival: stored.deliverySlot || "Tomorrow Morning (7:00 AM – 11:00 AM)",
    etaText: stage === 4 ? "Delivered" : "In Progress",
    courier: {
      name: "Marcus Lin",
      van: "GreenHarvest Eco-Transit #EV-42",
      status: stage >= 3 ? "On Route to your PIN area" : "Assigned to Morning Route B",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: stored.customer?.name || "Customer",
      phone: stored.customer?.phone || "+1 (555) 000-0000",
      address: stored.customer?.address || "Delivery Address",
      city: stored.customer?.city || "Local City",
      pin: stored.customer?.pin || "Serviceable",
      deliverySlot: stored.deliverySlot || "Standard Next-Day",
      instructions: "Direct doorstep delivery inside insulated compostable packaging."
    },
    timeline: [
      { step: 1, title: "Order Placed & Confirmed", desc: "Payment received & verified by GreenHarvest hub.", time: "Step Done", done: true, active: stage === 1 },
      { step: 2, title: "Farm Harvested & Cold Packaged", desc: "Fresh harvest packed with chilled botanical thermal packs.", time: stage >= 2 ? "Completed" : "Scheduled", done: stage >= 2, active: stage === 2 },
      { step: 3, title: "Dispatched in Electric Cool-Van", desc: "Climate-regulated EV delivery vehicle.", time: stage >= 3 ? "In Transit" : "Upcoming", done: stage >= 3, active: stage === 3 },
      { step: 4, title: "Doorstep Handover", desc: "Delivered to your address in zero-waste insulated carton.", time: stage >= 4 ? "Delivered" : "Pending", done: stage >= 4, active: stage === 4 }
    ],
    items: stored.items || [],
    totals: stored.totals || {
      subtotal: 0,
      delivery: 0,
      packaging: 0,
      discount: 0,
      total: 0
    },
    paymentMethod: stored.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment (Confirmed)"
  };
}

/**
 * Generate a simulated order for any arbitrary order ID searched
 */
function generateSimulatedOrder(id) {
  return {
    orderId: id,
    date: "Today, Nov 17, 2026",
    time: "Live Session",
    status: "Harvested & Cold Packaged",
    stage: 2,
    coldTemp: "3.9°C",
    humidity: "91% RH",
    transitVan: "Electric Van #EV-28",
    estimatedArrival: "Today, Evening Slot (4:00 PM – 8:00 PM)",
    etaText: "Harvest screened & packing completed",
    courier: {
      name: "Marcus Lin",
      van: "GreenHarvest Eco-Transit #EV-28",
      status: "Assigned to regional dispatch",
      phone: "+1 (800) 473-3642"
    },
    customer: {
      name: "Verified Customer",
      phone: "+1 (800) 473-3642",
      address: "Registered GreenHarvest Service Address",
      city: "Active Metro Hub",
      pin: "Serviceable",
      deliverySlot: "Standard Organic Route",
      instructions: "Keep inside shaded thermal bag."
    },
    timeline: [
      { step: 1, title: "Order Placed & Confirmed", desc: "Order authenticated in system registry.", time: "07:15 AM", done: true },
      { step: 2, title: "Farm Harvested & Cold Packaged", desc: "Organic produce picked, cooled to 3.9°C in cellar.", time: "08:30 AM", done: true, active: true },
      { step: 3, title: "Dispatched in Electric Cool-Van", desc: "Transit route scheduled for afternoon departure.", time: "Est. 01:00 PM", done: false },
      { step: 4, title: "Doorstep Handover", desc: "Direct touchless drop-off.", time: "Est. 04:30 PM", done: false }
    ],
    items: [
      { name: "Honeycrisp Organic Apples", category: "Fresh Fruits", weight: "1kg", price: 8.29, quantity: 1, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80" },
      { name: "Heirloom Vine Tomatoes", category: "Vegetables", weight: "1kg", price: 3.99, quantity: 2, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80" },
      { name: "Raw Wildflower Forest Honey", category: "Natural Foods", weight: "500g", price: 14.50, quantity: 1, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80" }
    ],
    totals: {
      subtotal: 30.77,
      delivery: 0.00,
      packaging: 0.00,
      discount: 0.00,
      total: 30.77
    },
    paymentMethod: "Credit Card (Verified)"
  };
}

/**
 * Render the full order tracking view
 */
function renderOrderTracking(order) {
  const container = document.getElementById("order-tracking-display");
  if (!container) return;

  if (!order) {
    container.innerHTML = `
      <div class="card-clean p-10 text-center space-y-4 max-w-xl mx-auto">
        <div class="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#D6A85F] mx-auto flex items-center justify-center text-2xl font-bold">
          🔍
        </div>
        <h3 class="font-heading font-bold text-xl text-gray-900 dark:text-white">Order Not Found</h3>
        <p class="text-xs text-gray-500 leading-relaxed">
          We could not locate that Order ID. Please check the ID printed on your confirmation email or try one of the quick test demo orders above.
        </p>
        <button type="button" onclick="loadOrderById('GH-84291')" class="btn-primary text-xs !min-h-[40px] px-5">
          View Demo Order #GH-84291
        </button>
      </div>
    `;
    return;
  }

  // Calculate progress bar percent
  const progressPercents = [0, 20, 50, 80, 100];
  const percent = progressPercents[order.stage] || 50;

  // Status Badge styles
  let statusBadgeHtml = '';
  if (order.stage === 4) {
    statusBadgeHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> ${order.status}</span>`;
  } else if (order.stage === 3) {
    statusBadgeHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#315C3B] dark:text-[#8FD69E] border border-emerald-300 dark:border-emerald-800 font-bold text-xs"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> ⚡ ${order.status}</span>`;
  } else if (order.stage === 2) {
    statusBadgeHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-bold text-xs"><span class="w-2 h-2 rounded-full bg-[#D6A85F] animate-pulse"></span> 🌱 ${order.status}</span>`;
  } else {
    statusBadgeHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold text-xs">📦 ${order.status}</span>`;
  }

  // Build items HTML
  const itemsHtml = order.items.map(item => `
    <div class="flex items-center gap-3.5 py-3 border-b border-gray-100 dark:border-gray-800/80 last:border-0">
      <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-xl flex-shrink-0 border border-gray-200/60 dark:border-gray-700">
      <div class="flex-grow min-w-0">
        <h5 class="text-xs font-semibold text-gray-900 dark:text-white truncate">${item.name}</h5>
        <div class="flex items-center gap-2 mt-0.5">
          <span class="text-[11px] font-medium text-[#315C3B] dark:text-[#D6A85F]">${item.weight || 'Standard'}</span>
          <span class="text-gray-300 dark:text-gray-700">•</span>
          <span class="text-[11px] text-gray-500">Qty: ${item.quantity}</span>
        </div>
      </div>
      <div class="text-right flex-shrink-0">
        <span class="font-heading font-bold text-xs text-gray-900 dark:text-white">$${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
      </div>
    </div>
  `).join("");

  // Build 4-step stepper HTML
  const stepsData = [
    { num: 1, title: "1. Order Placed", subtitle: "Confirmed & Sent to Farm" },
    { num: 2, title: "2. Morning Harvest", subtitle: "Pre-Cooled (3.8°C)" },
    { num: 3, title: "3. Cold-Van Transit", subtitle: "Climate-Regulated EV" },
    { num: 4, title: "4. Doorstep Drop", subtitle: "Touchless & Reusable Tote" }
  ];

  const stepperHtml = stepsData.map(s => {
    const isPast = order.stage > s.num;
    const isCurrent = order.stage === s.num;

    let iconBg = "bg-gray-100 dark:bg-gray-800 text-gray-400 border border-gray-200 dark:border-gray-700";
    let textStyle = "text-gray-400";
    let iconContent = s.num;

    if (isPast) {
      iconBg = "bg-[#315C3B] text-white shadow-md";
      textStyle = "text-[#315C3B] dark:text-[#8FD69E] font-bold";
      iconContent = "✓";
    } else if (isCurrent) {
      iconBg = "bg-[#D6A85F] text-[#1A3320] ring-4 ring-[#D6A85F]/20 font-bold shadow-md";
      textStyle = "text-gray-900 dark:text-white font-bold";
      iconContent = `<span class="animate-pulse">${s.num}</span>`;
    }

    return `
      <div class="flex-1 text-center relative z-10 px-1">
        <div class="w-10 h-10 rounded-full ${iconBg} mx-auto flex items-center justify-center text-xs font-heading font-bold mb-2 transition-all">
          ${iconContent}
        </div>
        <p class="text-xs ${textStyle} leading-tight truncate">${s.title}</p>
        <p class="text-[10px] text-gray-500 dark:text-gray-400 hidden sm:block mt-0.5 truncate">${s.subtitle}</p>
      </div>
    `;
  }).join("");

  // Build timeline logs
  const timelineLogsHtml = order.timeline.map((item, idx) => {
    let circleClass = "bg-gray-200 dark:bg-gray-700 text-gray-400";
    if (item.done && !item.active) circleClass = "bg-[#315C3B] text-white";
    if (item.active) circleClass = "bg-[#D6A85F] text-[#1A3320] ring-4 ring-[#D6A85F]/25 animate-pulse font-bold";

    return `
      <li class="relative pb-6 last:pb-0 pl-8">
        ${idx < order.timeline.length - 1 ? '<span class="absolute top-4 left-3 -ml-[1px] h-full w-0.5 bg-gray-200 dark:bg-gray-800"></span>' : ''}
        <div class="absolute left-0 top-1 w-6 h-6 rounded-full ${circleClass} flex items-center justify-center text-[10px] font-bold">
          ${item.done && !item.active ? '✓' : item.step}
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h6 class="font-heading font-semibold text-xs sm:text-sm text-gray-900 dark:text-white ${item.active ? 'text-[#315C3B] dark:text-[#D6A85F]' : ''}">${item.title}</h6>
          <span class="text-[11px] font-mono font-medium text-gray-400">${item.time}</span>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">${item.desc}</p>
      </li>
    `;
  }).join("");

  container.innerHTML = `
    <!-- Top Status Banner Card -->
    <div class="bg-white dark:bg-[#222B25] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
      
      <!-- ID, Status & Cold-chain Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div class="flex items-center gap-3 flex-wrap">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Tracking Order:</span>
            <span class="font-heading font-extrabold text-xl sm:text-2xl text-[#315C3B] dark:text-[#D6A85F] tracking-wide font-mono">${order.orderId}</span>
            ${statusBadgeHtml}
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Ordered on <span class="font-semibold text-gray-700 dark:text-gray-300">${order.date}</span> at ${order.time}
          </p>
        </div>

        <!-- Cold Chain Live Badge -->
        <div class="flex items-center gap-3 bg-[#F4EFEA] dark:bg-[#1A211D] px-4 py-2.5 rounded-2xl border border-gray-200/80 dark:border-gray-800">
          <div class="w-9 h-9 rounded-xl bg-[#315C3B] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
            ❄️
          </div>
          <div class="text-left">
            <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Van Cold-Chain Sensor</span>
            <span class="text-xs font-bold text-gray-900 dark:text-white font-mono">${order.coldTemp}</span>
            <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium ml-1">(${order.humidity})</span>
          </div>
        </div>
      </div>

      <!-- ETA Banner -->
      <div class="bg-gradient-to-r from-[#315C3B]/10 via-[#D6A85F]/15 to-[#315C3B]/10 dark:from-[#315C3B]/20 dark:via-[#D6A85F]/15 dark:to-[#315C3B]/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#315C3B]/15">
        <div class="flex items-center gap-3 text-center sm:text-left">
          <div class="w-10 h-10 rounded-xl bg-[#315C3B] text-[#D6A85F] flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#315C3B] dark:text-[#8FD69E] block">Estimated Doorstep Window</span>
            <span class="text-sm sm:text-base font-heading font-bold text-gray-900 dark:text-white">${order.estimatedArrival}</span>
          </div>
        </div>
        <div class="text-center sm:text-right">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#1A211D] shadow-sm text-xs font-semibold text-gray-800 dark:text-gray-200">
            <span class="w-2 h-2 rounded-full bg-[#315C3B]"></span> ${order.etaText}
          </span>
        </div>
      </div>

      <!-- 4-Stage Stepper with Progress Bar -->
      <div class="pt-4 pb-2">
        <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 text-center mb-6">Live Fulfillment Stepper</h4>
        <div class="relative max-w-4xl mx-auto">
          <!-- Background track line -->
          <div class="absolute top-5 left-8 right-8 h-1 bg-gray-200 dark:bg-gray-800 z-0"></div>
          <!-- Filled progress line -->
          <div class="absolute top-5 left-8 h-1 bg-gradient-to-r from-[#315C3B] to-[#D6A85F] z-0 transition-all duration-700" style="width: ${percent}%;"></div>
          
          <!-- Stepper Nodes -->
          <div class="flex justify-between items-start">
            ${stepperHtml}
          </div>
        </div>
      </div>

    </div>

    <!-- Details Grid: Delivery Info & Itemized Receipt -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left: Delivery Address & Eco-Courier (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- Courier Card -->
        <div class="bg-white dark:bg-[#222B25] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-gray-800 shadow-md space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <svg class="w-4 h-4 text-[#315C3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Assigned Eco-Courier & Van
            </h4>
            <span class="badge-gold text-[10px]">Zero Emission Transit</span>
          </div>

          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#315C3B] to-[#4B8359] text-white font-heading font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-md">
              ${order.courier.name.charAt(0)}
            </div>
            <div class="flex-grow min-w-0">
              <h5 class="text-sm font-bold text-gray-900 dark:text-white truncate">${order.courier.name}</h5>
              <p class="text-xs text-gray-500 truncate">${order.courier.van}</p>
              <p class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">${order.courier.status}</p>
            </div>
            <a href="tel:${order.courier.phone}" class="btn-secondary !min-h-[38px] !py-1.5 !px-3.5 text-xs font-semibold whitespace-nowrap">
              📞 Call Van
            </a>
          </div>

          <div class="bg-gray-50 dark:bg-[#1A211D] p-3.5 rounded-xl border border-gray-200/60 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2.5">
            <span class="text-base">📦</span>
            <div>
              <strong class="text-gray-900 dark:text-white">Eco Carton Exchange:</strong> Leave your previous GreenHarvest insulated carton and frozen ice pack on your doorstep. The driver will collect and sanitize them for zero waste.
            </div>
          </div>
        </div>

        <!-- Recipient & Shipping Location -->
        <div class="bg-white dark:bg-[#222B25] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-gray-800 shadow-md space-y-4">
          <h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
            Delivery Destination & Slot
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="space-y-1">
              <span class="text-gray-400 text-[11px] block">Customer / Recipient:</span>
              <p class="font-bold text-gray-900 dark:text-white text-sm">${order.customer.name}</p>
              <p class="text-gray-500 font-mono">${order.customer.phone}</p>
            </div>

            <div class="space-y-1">
              <span class="text-gray-400 text-[11px] block">Selected Arrival Slot:</span>
              <p class="font-bold text-[#315C3B] dark:text-[#D6A85F] text-sm">${order.customer.deliverySlot}</p>
              <p class="text-gray-500">Serviceable PIN: <span class="font-mono font-bold">${order.customer.pin}</span></p>
            </div>
          </div>

          <div class="pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
            <span class="text-gray-400 text-[11px] block mb-1">Street Address:</span>
            <p class="text-gray-800 dark:text-gray-200 font-medium">${order.customer.address}, ${order.customer.city}</p>
            <p class="text-gray-400 text-[11px] mt-1 italic">Note: "${order.customer.instructions}"</p>
          </div>
        </div>

        <!-- Harvest Progress Milestones Log -->
        <div class="bg-white dark:bg-[#222B25] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-gray-800 shadow-md">
          <h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-gray-800 mb-5">
            Harvest & Delivery Timeline Log
          </h4>
          <ul class="relative">
            ${timelineLogsHtml}
          </ul>
        </div>

      </div>

      <!-- Right: Itemized Produce Receipt & Totals (5 cols) -->
      <div class="lg:col-span-5 space-y-6">
        
        <div class="bg-white dark:bg-[#222B25] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-gray-800 shadow-md space-y-5">
          <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white">
              Itemized Organic Produce
            </h4>
            <span class="text-xs text-gray-400">${order.items.length} ${order.items.length === 1 ? 'item' : 'items'}</span>
          </div>

          <!-- Items list -->
          <div class="divide-y divide-gray-100 dark:divide-gray-800/80 max-h-80 overflow-y-auto pr-1">
            ${itemsHtml}
          </div>

          <!-- Price breakdown -->
          <div class="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs">
            <div class="flex justify-between text-gray-500">
              <span>Subtotal:</span>
              <span class="font-medium text-gray-900 dark:text-white">$${(order.totals.subtotal || 0).toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Cold-Chain Insulated Box:</span>
              <span class="text-emerald-600 dark:text-emerald-400 font-medium">FREE (Eco-Return)</span>
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Doorstep Delivery:</span>
              <span class="font-medium text-gray-900 dark:text-white">${order.totals.delivery === 0 ? 'FREE' : '$' + (order.totals.delivery || 0).toFixed(2)}</span>
            </div>
            ${order.totals.discount > 0 ? `
              <div class="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Discount / Promo:</span>
                <span>-$${(order.totals.discount || 0).toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="pt-3 border-t border-gray-200/80 dark:border-gray-700 flex justify-between items-center text-sm font-bold text-gray-900 dark:text-white font-heading">
              <span>Total Paid:</span>
              <span class="text-lg text-[#315C3B] dark:text-[#D6A85F]">$${(order.totals.total || 0).toFixed(2)}</span>
            </div>
            <p class="text-[11px] text-gray-400 pt-1">Payment Method: <span class="font-medium text-gray-600 dark:text-gray-300">${order.paymentMethod}</span></p>
          </div>

          <!-- Interactive Action Buttons -->
          <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2.5">
            <button type="button" onclick="refreshLiveTelemetry()" id="refresh-telemetry-btn" class="btn-primary w-full text-xs font-semibold !min-h-[42px] justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Refresh Van GPS Telemetry
            </button>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" onclick="window.print()" class="btn-secondary text-xs !min-h-[40px] justify-center">
                🖨️ Print Receipt
              </button>
              <a href="contact.html" class="btn-secondary text-xs !min-h-[40px] justify-center">
                💬 Courier Help
              </a>
            </div>
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
      showToast("Please enter an Order ID to track.", "warning");
    } else {
      alert("Please enter an Order ID to track.");
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
 * Simulate live telemetry refresh with subtle temperature jitter and toast
 */
function refreshLiveTelemetry() {
  const btn = document.getElementById("refresh-telemetry-btn");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      Pinging Van EV-42 Sensors...
    `;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        Refresh Van GPS Telemetry
      `;

      if (typeof showToast === 'function') {
        showToast("Telemetry updated: Van cold compartment stable at 3.6°C (GPS verified).", "success");
      }
    }, 800);
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
      class="px-2.5 py-1 text-[11px] rounded-lg bg-[#315C3B]/10 dark:bg-[#315C3B]/25 text-[#315C3B] dark:text-[#8FD69E] hover:bg-[#315C3B] hover:text-white transition-colors font-mono font-medium"
    >
      ${order.orderId} (${order.status || 'Placed'})
    </button>
  `).join("");
}

/**
 * Initialize on DOM Content Loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Only execute on pages that have the tracking section
  if (!document.getElementById("order-tracking")) return;

  populateRecentOrdersBar();

  // Listen for Enter key on search input
  const input = document.getElementById("order-search-input");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleTrackOrderSubmit();
      }
    });
  }

  // Check URL params for orderId
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("orderId");

  if (requestedId) {
    loadOrderById(requestedId);
  } else {
    // If user has orders in localStorage, load the latest order; else load demo order GH-84291
    const storedOrders = JSON.parse(localStorage.getItem("greenharvest_orders") || "[]");
    if (storedOrders.length > 0) {
      loadOrderById(storedOrders[0].orderId);
    } else {
      loadOrderById("GH-84291");
    }
  }
});

/**
 * GreenHarvest - Main Application Scripts
 * Theme (Dark/Light), RTL, Navigation, Search, Toasts, Header
 */

// 1. THEME HANDLING (Light / Dark)
function initTheme() {
  const savedTheme = localStorage.getItem("greenharvest_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  updateThemeIcons();
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("greenharvest_theme", isDark ? "dark" : "light");
  updateThemeIcons();
  showToast(isDark ? "Switched to Dark Mode" : "Switched to Light Mode");
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains("dark");
  const themeBtns = document.querySelectorAll(".theme-toggle-btn");
  themeBtns.forEach(btn => {
    btn.setAttribute("title", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
    btn.innerHTML = isDark
      ? `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
      : `<svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
  });
}

// 2. RTL HANDLING
function initRTL() {
  const savedRTL = localStorage.getItem("greenharvest_rtl");
  if (savedRTL === "rtl") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }
  updateRTLButtons();
}

function toggleRTL() {
  const current = document.documentElement.getAttribute("dir") || "ltr";
  const newDir = current === "rtl" ? "ltr" : "rtl";
  document.documentElement.setAttribute("dir", newDir);
  localStorage.setItem("greenharvest_rtl", newDir);
  updateRTLButtons();
  showToast(newDir === "rtl" ? "RTL layout enabled" : "LTR layout enabled");
}

function updateRTLButtons() {
  const isRTL = document.documentElement.getAttribute("dir") === "rtl";
  const rtlBtns = document.querySelectorAll(".rtl-toggle-btn");
  rtlBtns.forEach(btn => {
    btn.innerHTML = `<span class="text-xs font-bold tracking-wider">${isRTL ? "LTR" : "RTL"}</span>`;
    btn.setAttribute("title", isRTL ? "Switch to Left-to-Right" : "Switch to Right-to-Left");
  });
}

// 3. TOAST SYSTEM
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast-error" : type === "warning" ? "toast-warning" : ""}`;

  let iconSVG = `
    <svg class="w-5 h-5 text-[#315C3B] dark:text-[#D6A85F] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
  `;
  if (type === "error") {
    iconSVG = `
      <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    `;
  } else if (type === "warning") {
    iconSVG = `
      <svg class="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    `;
  }

  toast.innerHTML = `
    ${iconSVG}
    <span class="flex-grow">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

// 4. MOBILE NAVIGATION
function initMobileNav() {
  const openBtn = document.getElementById("mobile-menu-open-btn");
  const closeBtn = document.getElementById("mobile-menu-close-btn");
  const drawer = document.getElementById("mobile-menu-drawer");
  const backdrop = document.getElementById("mobile-menu-backdrop");

  if (!drawer) return;

  function openMenu(e) {
    if (e && e.preventDefault) e.preventDefault();
    drawer.classList.remove("-translate-x-full", "translate-x-full");
    drawer.classList.add("open", "translate-x-0");
    if (backdrop) backdrop.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeMenu(e) {
    if (e && e.preventDefault) e.preventDefault();
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";
    drawer.classList.remove("open", "translate-x-0");
    drawer.classList.add(isRTL ? "translate-x-full" : "-translate-x-full");
    if (backdrop) backdrop.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  if (openBtn) openBtn.onclick = openMenu;
  if (closeBtn) closeBtn.onclick = closeMenu;
  if (backdrop) backdrop.onclick = closeMenu;

  // Close when pressing Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && (drawer.classList.contains("open") || drawer.classList.contains("translate-x-0"))) {
      closeMenu();
    }
  });

  // Close when clicking nav links inside drawer
  const drawerLinks = drawer.querySelectorAll("nav a");
  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

// 5. SEARCH MODAL / POPUP
function initSearchModal() {
  const openBtns = document.querySelectorAll(".search-modal-open-btn");
  const modal = document.getElementById("search-modal");
  const closeBtn = document.getElementById("search-modal-close-btn");
  const searchInput = document.getElementById("header-search-input");
  const resultsContainer = document.getElementById("search-results-dropdown");

  if (!modal) return;

  function openSearch() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
  }

  function closeSearch() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    if (resultsContainer) resultsContainer.innerHTML = "";
    if (searchInput) searchInput.value = "";
  }

  openBtns.forEach(btn => btn.addEventListener("click", openSearch));
  if (closeBtn) closeBtn.addEventListener("click", closeSearch);

  // Close on backdrop click or ESC
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeSearch();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeSearch();
    }
  });

  // Search input typing
  if (searchInput && resultsContainer) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        resultsContainer.innerHTML = `
          <div class="p-6 text-center text-xs text-gray-400">
            Type to search organic fruits, vegetables, oils, honey, grains...
          </div>
        `;
        return;
      }

      const products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
      const matches = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ).slice(0, 5);

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div class="p-6 text-center text-sm text-gray-500">
            No organic products found matching "<span class="font-medium text-gray-700 dark:text-gray-300">${q}</span>"
          </div>
        `;
        return;
      }

      resultsContainer.innerHTML = matches.map(p => `
        <a href="product-details.html?id=${p.id}" class="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-[#1A211D] rounded-xl transition-colors">
          <img src="${p.image}" alt="${p.name}" class="w-12 h-12 rounded-lg object-cover">
          <div class="flex-grow">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white">${p.name}</h4>
            <span class="text-xs text-[#315C3B] dark:text-[#8FD69E]">${p.category}</span>
          </div>
          <span class="text-sm font-bold text-[#315C3B] dark:text-[#D6A85F] font-heading">$${p.price.toFixed(2)}</span>
        </a>
      `).join("");
    });
  }
}

// 6. STICKY HEADER
function initStickyHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("is-sticky", "backdrop-blur-md", "bg-white/95", "dark:bg-[#121614]/95");
    } else {
      header.classList.remove("is-sticky", "backdrop-blur-md", "bg-white/95", "dark:bg-[#121614]/95");
    }
  });
}

// 7. NEWSLETTER FORM HANDLER
function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector("input[type='email']");
  if (input && input.value.trim()) {
    showToast(`Thank you! You've subscribed with ${input.value.trim()}`);
    input.value = "";
  }
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initRTL();
  initMobileNav();
  initSearchModal();
  initStickyHeader();

  if (window.lucide) {
    try {
      lucide.createIcons();
    } catch (e) {
      console.warn("Lucide auto-init deferred", e);
    }
  }
});

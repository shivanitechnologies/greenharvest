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

// 8. SCROLL READING PROGRESS BAR
function initScrollProgressBar() {
  if (document.getElementById("scroll-progress-bar")) return;

  const bar = document.createElement("div");
  bar.id = "scroll-progress-bar";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  let ticking = false;
  function updateProgress() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, progress)) + "%";
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  updateProgress();
}

// 9. FLOATING BACK TO TOP BUTTON
function initBackToTopButton() {
  if (document.getElementById("back-to-top-btn")) return;

  const btn = document.createElement("button");
  btn.id = "back-to-top-btn";
  btn.setAttribute("aria-label", "Back to top");
  btn.setAttribute("title", "Back to top");
  btn.innerHTML = `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/>
    </svg>
  `;
  document.body.appendChild(btn);

  let ticking = false;
  function toggleButton() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 320) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(toggleButton);
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  toggleButton();
}

// 10. DYNAMIC NUMBER COUNTERS ON SCROLL
function animateCounter(el) {
  if (el.dataset.counterAnimated === "true") return;
  el.dataset.counterAnimated = "true";

  const rawText = el.getAttribute("data-counter") || el.textContent.trim();
  const match = rawText.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return;

  const prefix = match[1] || "";
  const numStr = match[2].replace(/,/g, "");
  const suffix = match[3] || "";
  const isFloat = numStr.includes(".");
  const targetVal = parseFloat(numStr);
  const hasComma = match[2].includes(",");
  const decimals = isFloat ? numStr.split(".")[1].length : 0;

  if (isNaN(targetVal) || targetVal === 0) return;

  const duration = 1400; // ms
  const startTime = performance.now();

  function formatNum(val) {
    let str = isFloat ? val.toFixed(decimals) : Math.round(val).toString();
    if (hasComma) {
      const parts = str.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      str = parts.join(".");
    }
    return prefix + str + suffix;
  }

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Cubic ease-out: 1 - (1 - progress)^3
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = targetVal * ease;

    el.textContent = formatNum(current);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = rawText; // restore exact original formatted string
    }
  }

  requestAnimationFrame(tick);
}

function triggerCountersIn(container) {
  const counterEls = container.querySelectorAll("[data-counter]");
  counterEls.forEach(el => animateCounter(el));

  if (container.hasAttribute("data-counter")) {
    animateCounter(container);
  }
}

// 11. GLOBAL SCROLL REVEAL ENGINE
function initScrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Auto-discover and enrich sections & card grids across any page
  const sections = Array.from(document.querySelectorAll("section, main > div, footer"));
  sections.forEach((sec, idx) => {
    // Skip exclusions
    if (
      sec.closest("header") ||
      sec.closest("#mobile-menu-drawer") ||
      sec.closest("#traveling-produce-actor") ||
      sec.id === "traveling-produce-actor" ||
      sec.classList.contains("no-reveal")
    ) {
      return;
    }

    // Skip the first hero section if at top of page, reveal it immediately
    const rect = sec.getBoundingClientRect();
    const isHero = idx === 0 || sec.id === "hero" || sec.id === "why-organic-hero" || rect.top < 150;

    if (!sec.classList.contains("reveal") &&
        !sec.classList.contains("reveal-up") &&
        !sec.classList.contains("reveal-left") &&
        !sec.classList.contains("reveal-right") &&
        !sec.classList.contains("reveal-zoom") &&
        !sec.classList.contains("reveal-fade")) {
      if (!isHero) {
        sec.classList.add("reveal-up");
      }
    }

    // Stagger child grids if present
    const grids = sec.querySelectorAll(".grid, .reveal-stagger");
    grids.forEach(grid => {
      if (grid.closest("header") || grid.closest("#mobile-menu-drawer")) return;
      if (!grid.classList.contains("reveal-stagger") && grid.children.length >= 2) {
        grid.classList.add("reveal-stagger");
      }
      Array.from(grid.children).forEach((child, i) => {
        child.style.setProperty("--stagger-i", i);
      });
    });
  });

  // Query all reveal elements
  const revealElements = Array.from(document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fade, .reveal-stagger, [data-reveal]"
  ));

  if (revealElements.length === 0) return;

  if (prefersReduced) {
    revealElements.forEach(el => {
      el.classList.add("is-revealed", "reveal-done");
      triggerCountersIn(el);
    });
    return;
  }

  // Pre-reveal elements already visible in viewport on page load
  const windowHeight = window.innerHeight;
  const toObserve = [];

  revealElements.forEach(el => {
    // If element or an ancestor is excluded
    if (el.closest("header") || el.closest("#traveling-produce-actor")) {
      el.classList.add("is-revealed", "reveal-done");
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
      el.classList.add("is-revealed");
      if (el.classList.contains("reveal-stagger")) {
        Array.from(el.children).forEach((c, idx) => {
          c.style.setProperty("--stagger-i", idx);
          c.classList.add("is-revealed");
        });
      }
      triggerCountersIn(el);
      setTimeout(() => {
        el.classList.add("reveal-done");
        if (el.classList.contains("reveal-stagger")) {
          Array.from(el.children).forEach(c => c.classList.add("reveal-done"));
        }
      }, 750);
    } else {
      toObserve.push(el);
    }
  });

  if (!("IntersectionObserver" in window)) {
    toObserve.forEach(el => el.classList.add("is-revealed", "reveal-done"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("is-revealed");

        if (el.classList.contains("reveal-stagger")) {
          Array.from(el.children).forEach((c, idx) => {
            c.style.setProperty("--stagger-i", idx);
            c.classList.add("is-revealed");
          });
        }

        triggerCountersIn(el);

        setTimeout(() => {
          el.classList.add("reveal-done");
          if (el.classList.contains("reveal-stagger")) {
            Array.from(el.children).forEach(c => c.classList.add("reveal-done"));
          }
        }, 850);

        obs.unobserve(el);
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.08
  });

  toObserve.forEach(el => observer.observe(el));
}

// 12. INITIALIZE ALL SCROLL ENHANCEMENTS
function initAllScrollAnimations() {
  initScrollProgressBar();
  initBackToTopButton();
  initScrollReveal();
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initRTL();
  initMobileNav();
  initSearchModal();
  initStickyHeader();
  initAllScrollAnimations();

  if (window.lucide) {
    try {
      lucide.createIcons();
    } catch (e) {
      console.warn("Lucide auto-init deferred", e);
    }
  }
});

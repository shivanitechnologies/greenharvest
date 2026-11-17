/**
 * GreenHarvest - Wishlist Management
 * Save Favorites with LocalStorage Persistence
 */

const WISHLIST_STORAGE_KEY = "greenharvest_wishlist";

function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
  updateWishlistBadges();
}

function isInWishlist(productId) {
  const list = getWishlist();
  return list.includes(productId);
}

function toggleWishlist(productId, event = null) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  let list = getWishlist();
  const products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
  const product = products.find(p => p.id === productId);
  const title = product ? product.name : "Product";

  const index = list.indexOf(productId);
  let added = false;

  if (index > -1) {
    list.splice(index, 1);
    showToast(`Removed ${title} from your wishlist.`);
  } else {
    list.push(productId);
    added = true;
    showToast(`Saved ${title} to your wishlist!`);
  }

  saveWishlist(list);

  // Update button visual state if clicked
  const btns = document.querySelectorAll(`[data-wishlist-btn="${productId}"]`);
  btns.forEach(btn => {
    const svg = btn.querySelector("svg");
    if (added) {
      btn.classList.add("text-red-500");
      if (svg) svg.classList.add("fill-red-500", "text-red-500");
    } else {
      btn.classList.remove("text-red-500");
      if (svg) svg.classList.remove("fill-red-500", "text-red-500");
    }
  });

  if (document.getElementById("wishlist-items-container")) {
    renderWishlistPage();
  }
}

function moveWishlistToCart(productId, event = null) {
  addToCart(productId, "500g", 1, event);
  toggleWishlist(productId); // Remove from wishlist once added to cart
}

function updateWishlistBadges() {
  const badges = document.querySelectorAll(".wishlist-count-badge");
  const list = getWishlist();
  badges.forEach(badge => {
    badge.textContent = list.length;
    if (list.length > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  });
}

function renderWishlistPage() {
  const container = document.getElementById("wishlist-items-container");
  const emptyView = document.getElementById("wishlist-empty-view");
  if (!container) return;

  const list = getWishlist();
  const products = (typeof getStoredProducts === "function") ? getStoredProducts() : [];
  const savedProducts = products.filter(p => list.includes(p.id));

  if (savedProducts.length === 0) {
    container.innerHTML = "";
    if (emptyView) emptyView.classList.remove("hidden");
    return;
  }

  if (emptyView) emptyView.classList.add("hidden");

  container.innerHTML = savedProducts.map(p => `
    <div class="card-clean flex flex-col justify-between overflow-hidden relative">
      <div class="aspect-product">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
        <button 
          onclick="toggleWishlist('${p.id}', event)" 
          class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center text-red-500"
          title="Remove from Wishlist"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
      <div class="p-4 flex flex-col flex-grow">
        <span class="text-xs text-[#315C3B] dark:text-[#8FD69E] font-medium">${p.category}</span>
        <h3 class="font-heading font-semibold text-gray-900 dark:text-white mt-1 mb-2">
          <a href="product-details.html?id=${p.id}" class="hover:text-[#315C3B]">${p.name}</a>
        </h3>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-lg font-bold text-[#315C3B] dark:text-[#D6A85F] font-heading">$${p.price.toFixed(2)}</span>
          <span class="text-xs text-gray-400 line-through">$${p.originalPrice.toFixed(2)}</span>
          <span class="text-xs ${p.inStock ? 'text-emerald-600' : 'text-red-500'} font-medium ml-auto">
            ${p.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div class="mt-auto">
          <button 
            type="button" 
            onclick="moveWishlistToCart('${p.id}', event)"
            class="btn-primary w-full text-xs !min-h-[38px] !py-2"
          >
            Move to Cart
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  updateWishlistBadges();
  if (document.getElementById("wishlist-items-container")) {
    renderWishlistPage();
  }
});

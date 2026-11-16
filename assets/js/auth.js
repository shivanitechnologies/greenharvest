/**
 * GreenHarvest - Authentication & Session Management
 * Handles Login, Registration, Password Toggle, Demo Credentials
 */

const USER_STORAGE_KEY = "greenharvest_user";

// Demo accounts pre-configured
const DEMO_USERS = [
  {
    name: "Eleanor Green",
    email: "admin@greenharvest.com",
    password: "admin123",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    name: "Sarah Jenkins",
    email: "user@example.com",
    password: "password123",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  }
];

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
  updateAuthUI();
}

function logoutUser() {
  setCurrentUser(null);
  showToast("You have been safely signed out.");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 600);
}

/**
 * Handle Login Form Submit
 */
function handleLoginSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = form.querySelector("#login-email") || form.querySelector("input[type='email']");
  const passwordInput = form.querySelector("#login-password") || form.querySelector("input[type='password']");

  const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!email || !password) {
    showToast("Please fill in both email and password.", "error");
    return;
  }

  // Check demo users or registered users in localStorage
  const registeredUsers = JSON.parse(localStorage.getItem("greenharvest_registered_users") || "[]");
  const allUsers = [...DEMO_USERS, ...registeredUsers];

  const matched = allUsers.find(u => u.email.toLowerCase() === email && u.password === password);

  if (matched) {
    setCurrentUser(matched);
    showToast(`Welcome back, ${matched.name}!`, "success");
    setTimeout(() => {
      if (matched.role === "admin") {
        window.location.href = "admin/dashboard.html";
      } else {
        const redirect = new URLSearchParams(window.location.search).get("redirect");
        window.location.href = redirect || "products.html";
      }
    }, 700);
  } else {
    // If entered admin credentials loosely or demo ease
    if (email === "admin@greenharvest.com") {
      showToast("Password for demo admin is 'admin123'", "warning");
    } else {
      showToast("Invalid credentials. Try admin@greenharvest.com (admin123) or user@example.com (password123)", "error");
    }
  }
}

/**
 * Handle Register Form Submit
 */
function handleRegisterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector("#register-name").value.trim();
  const email = form.querySelector("#register-email").value.trim().toLowerCase();
  const phone = form.querySelector("#register-phone").value.trim();
  const password = form.querySelector("#register-password").value;
  const confirmPassword = form.querySelector("#register-confirm-password").value;
  const terms = form.querySelector("#register-terms").checked;

  if (!terms) {
    showToast("Please accept the Terms & Privacy Policy to continue.", "warning");
    return;
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match. Please verify.", "error");
    return;
  }

  if (password.length < 6) {
    showToast("Password must be at least 6 characters long.", "warning");
    return;
  }

  const registeredUsers = JSON.parse(localStorage.getItem("greenharvest_registered_users") || "[]");
  if (registeredUsers.some(u => u.email === email) || DEMO_USERS.some(u => u.email === email)) {
    showToast("An account with this email already exists.", "warning");
    return;
  }

  const newUser = {
    name,
    email,
    phone,
    password,
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    createdAt: new Date().toISOString()
  };

  registeredUsers.push(newUser);
  localStorage.setItem("greenharvest_registered_users", JSON.stringify(registeredUsers));
  setCurrentUser(newUser);

  showToast(`Welcome to GreenHarvest, ${name}! Your account has been created.`, "success");
  setTimeout(() => {
    window.location.href = "products.html";
  }, 800);
}

/**
 * Toggle Password Visibility Eye
 */
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    btn.innerHTML = `
      <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path></svg>
    `;
  } else {
    input.type = "password";
    btn.innerHTML = `
      <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
    `;
  }
}

/**
 * Update Header login/profile UI dynamically
 */
function updateAuthUI() {
  const authContainer = document.getElementById("header-auth-container");
  if (!authContainer) return;

  const user = getCurrentUser();
  if (user) {
    authContainer.innerHTML = `
      <div class="relative group">
        <button class="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-[#315C3B] focus:outline-none">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}" alt="${user.name}" class="w-8 h-8 rounded-full object-cover border border-[#315C3B]">
          <span class="hidden md:inline">${user.name.split(' ')[0]}</span>
          <svg class="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-[#222B25] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
            <p class="text-xs text-gray-400">Signed in as</p>
            <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">${user.email}</p>
          </div>
          ${user.role === 'admin' ? `
            <a href="admin/dashboard.html" class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              Admin Dashboard
            </a>
          ` : ''}
          <a href="wishlist.html" class="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            My Wishlist
          </a>
          <button type="button" onclick="logoutUser()" class="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-gray-50 dark:hover:bg-gray-800">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Sign Out
          </button>
        </div>
      </div>
    `;
  } else {
    authContainer.innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateAuthUI();
});

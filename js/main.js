let cart = JSON.parse(localStorage.getItem("magicalCart")) || [];

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountSpan = document.getElementById("cart-count");

  if (cartCountSpan) {
    cartCountSpan.textContent = totalQuantity > 0 ? `(${totalQuantity})` : "";
  }

  // updating the modal whenever the cart icon updates
  renderCartModal();
}

window.addToCart = function (
  productId,
  productName,
  productPrice,
  buttonElement,
) {
  const sellItem = buttonElement.closest(".sell_item");
  const input = sellItem.querySelector('input[type="number"]');
  const quantity = parseInt(input.value);

  if (quantity === 0) {
    return; // does noting if 0
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: quantity,
    });
  }

  localStorage.setItem("magicalCart", JSON.stringify(cart));
  updateCartIcon();

  input.value = 0;
  const originalText = buttonElement.textContent;
  buttonElement.textContent = "✓ Added!";

  setTimeout(() => {
    buttonElement.textContent = originalText;
  }, 1500);
};

// model
function renderCartModal() {
  const container = document.getElementById("cart-items-container");
  const emptyMessage = document.getElementById("cart-empty-message");
  const totalPriceSpan = document.getElementById("cart-total-price");

  if (!container) return; // only work on the adoption page

  container.innerHTML = ""; // delete out old items

  if (cart.length === 0) {
    emptyMessage.style.display = "block";
    totalPriceSpan.textContent = "0";
  } else {
    emptyMessage.style.display = "none";
    let totalCost = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      totalCost += itemTotal;

      const html = `
        <div class="popout-card mb-3 pb-3">
              <div class="flex-grow-1 me-3 d-flex align-items-baseline justify-content-between">
              <h2 class="h6 mb-1">${item.name}</h2>
            <div class="price d-flex">
              <h4 class="h6 me-2">R ${item.price}</h4>
              ${item.markdownPrice ? `<h4 class="h6 text-muted"><s>R ${item.markdownPrice}</s></h4>` : ""}
            </div>
          </div>
          <div class="stepper">
            <button onclick="updateModalQuantity('${item.id}', -1)">−</button>
            <input type="number" value="${item.quantity}" min="0" max="1000" readonly style="width: 40px; text-align: center;" />
            <button onclick="updateModalQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
      `;

      container.insertAdjacentHTML("beforeend", html);
    });

    totalPriceSpan.textContent = totalCost.toLocaleString();
  }
}

window.updateModalQuantity = function (productId, change) {
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;

    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    localStorage.setItem("magicalCart", JSON.stringify(cart));
    updateCartIcon();
  }
};

window.clearCart = function () {
  cart = [];

  localStorage.removeItem("magicalCart");

  updateCartIcon();
};

document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();

    // search bar
  const searchBar = document.getElementById("search-bar");
  
  if (searchBar) {
    searchBar.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); 
        
        const searchQuery = searchBar.value;
        
        const currentPage = window.location.pathname;
        
       if (currentPage.includes("adopt.html")) {
          return;
        } 
        else if (currentPage.includes("contact.html")) {
          window.location.href = `adopt.html?search=${searchQuery}`;
        } 
        else {
          window.location.href = `pages/adopt.html?search=${searchQuery}`;
        }
      }
    });
  }
});

let cart = JSON.parse(localStorage.getItem("magicalCart")) || [];

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountSpan = document.getElementById("cart-count");

  if (cartCountSpan) {
    cartCountSpan.textContent = totalQuantity > 0 ? `(${totalQuantity})` : "";
  }
}

window.addToCart = function (
  productId,
  productName,
  productPrice,
  buttonElement,
) {
  // Find the stepper input next to the button that was clicked
  const sellItem = buttonElement.closest(".sell_item");
  const input = sellItem.querySelector('input[type="number"]');
  const quantity = parseInt(input.value);

  if (quantity === 0) {
    alert("Please select at least 1 creature!");
    return;
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

document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();
});


const html = `
    <div class="popout-card navbar">
      <h2>${item.name}</h2>
      <div class="price">
        <h4>R ${item.price}</h4>
      </div>
      <div class="price">
       <h4><s>${item.markdownPrice ? "<s>R" + item.markdownPrice + "</s>" : ""}</s></h4> 
      </div>
      <div class="stepper">
        <button onclick="this.parentNode.querySelector('input').stepDown()">
          −
        </button>
        <input type="number" value="0" min="0" max="1000" />
        <button onclick="this.parentNode.querySelector('input').stepUp()">
          +
        </button>
      </div>
    </div>
    `;
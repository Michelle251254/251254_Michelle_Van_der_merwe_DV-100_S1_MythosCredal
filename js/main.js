// cart
let cart = JSON.parse(localStorage.getItem("magicalCart")) || [];

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountSpan = document.getElementById("cart-count");

  if (cartCountSpan) {
    cartCountSpan.textContent = totalQuantity > 0 ? `(${totalQuantity})` : "";
  }
}

// input counter

window.changeQuantity = function(buttonElement, change) {
  const stepper = buttonElement.parentNode;
  const input = stepper.querySelector('input[type="number"]');
  let currentValue = parseInt(input.value) || 0;
  
  currentValue += change;
  
  if (currentValue < 0) currentValue = 0;
  
  input.value = currentValue;
  
  updateCartFromInput(input);
};

window.updateCartFromInput = function(inputElement) {
  const productId = inputElement.dataset.productId;
  const productName = inputElement.dataset.name;
  const productPrice = parseFloat(inputElement.dataset.price);
  let newQuantity = parseInt(inputElement.value) || 0;

  if (newQuantity < 0) {
    newQuantity = 0;
    inputElement.value = 0;
  }

  const existingItemIndex = cart.findIndex(item => item.id === productId);

  if (newQuantity === 0) {
    if (existingItemIndex !== -1) {
      cart.splice(existingItemIndex, 1);
    }
  } else {
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = newQuantity;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, quantity: newQuantity });
    }
  }

  localStorage.setItem('magicalCart', JSON.stringify(cart));
  updateCartIcon();
};

//sinking the input counter 
function syncCountersWithCart() {
  const inputs = document.querySelectorAll('input[data-product-id]');
  
  inputs.forEach(input => {
    const productId = input.dataset.productId;
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
      input.value = cartItem.quantity;
    } else {
      input.value = 0;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();
  syncCountersWithCart();
});
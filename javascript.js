document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");
  
    let itemCount = 0;
    let totalPrice = 0;
  
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", () => {
        const productName = button.getAttribute("data-name");
        const productPrice = parseInt(button.getAttribute("data-price"));
        const productImg = button.getAttribute("data-img");
  
        const existingRow = Array.from(cartItems.rows).find(
          (row) => row.cells[1].innerText === productName
        );
  
        if (existingRow) {
          const quantityCell = existingRow.cells[3];
          quantityCell.innerText = parseInt(quantityCell.innerText) + 1;
        } else {
          const newRow = cartItems.insertRow();
          newRow.innerHTML = `
            <td><img src="${productImg}" width="50"></td>
            <td>${productName}</td>
            <td>$${productPrice.toLocaleString()}</td>
            <td>1</td>
            <td><button class="btn btn-danger btn-sm remove-item">Eliminar</button></td>
          `;
          newRow.querySelector(".remove-item").addEventListener("click", () => {
            const quantity = parseInt(newRow.cells[3].innerText);
            const price = productPrice * quantity;
            newRow.remove();
            updateCartCount(-quantity);
            updateTotalPrice(-price);
          });
        }
        updateCartCount(1);
        updateTotalPrice(productPrice);
      });
    });
  
    function updateCartCount(change) {
      itemCount += change;
      cartCount.innerText = itemCount;
    }
  
    function updateTotalPrice(amount) {
      totalPrice += amount;
      totalPriceElement.innerText = totalPrice.toLocaleString();
    }
  
    checkoutBtn.addEventListener("click", () => {
      if (itemCount > 0) {
        alert(`Compra finalizada por un total de $${totalPrice.toLocaleString()}`);
        cartItems.innerHTML = "";
        updateCartCount(-itemCount);
        updateTotalPrice(-totalPrice);
      } else {
        alert("El carrito está vacío.");
      }
    });
  });
  
function sendEmail(event) {
    event.preventDefault();
     alert("Mensaje enviado correctamente!");
}
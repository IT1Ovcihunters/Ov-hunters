
let cart = [];

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartIcon();
    alert('Produkt přidán do košíku.');
}

function updateCartIcon() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function showCart() {
    let itemsHTML = '';
    cart.forEach((item, index) => {
        itemsHTML += `
            <li>
                <div class="cart-item-info">
                    ${item.name} - ${item.price} Kč
                </div>
                <div class="cart-item-actions">
                    <input type="number" min="1" value="${item.quantity}" onchange="changeQuantity(${index}, this.value)">
                    <button onclick="removeItem(${index})">🗑️</button>
                </div>
            </li>`;
    });

    document.getElementById('cart-items').innerHTML = itemsHTML || "<li>Košík je prázdný.</li>";
    updateTotal();
    document.getElementById('cart-modal').style.display = 'block';
}

function changeQuantity(index, value) {
    const qty = parseInt(value);
    if (qty > 0) {
        cart[index].quantity = qty;
    } else {
        removeItem(index);
    }
    showCart();
    updateCartIcon();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = `Celkem: ${total.toLocaleString()} Kč`;
}

function removeItem(index) {
    cart.splice(index, 1);
    showCart();
    updateCartIcon();
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}
function placeOrder() {
    if (cart.length === 0) {
        alert("Váš košík je prázdný!");
        return;
    }

    let summary = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
    alert(`Děkujeme za objednávku!\n\nObjednal jste:\n${summary}`);

    // Очистить корзину
    cart = [];
    updateCartIcon();
    closeCart();
}
function removeFromCartAll() {
    cart = [];
    alert('Odebraly  jste vse!')
    updateCartIcon();
    closeCart();
}
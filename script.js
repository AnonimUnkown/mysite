let count = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    setupAddButtons();
    renderCustomProducts(); // Отрисовка товаров, добавленных через форму
});

function updateCartDisplay() {
    const display = document.getElementById('cart-count');
    if (display) display.innerText = count;
}

function setupAddButtons() {
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const name = card.querySelector('h3').innerText;
            const price = card.querySelector('.price').innerText.replace(' ₽', '');

            count++;
            cartItems.push({ name, price });

            localStorage.setItem('cartCount', count);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            updateCartDisplay();
            alert(name + " добавлен в корзину!");
        });
    });
}

function renderCustomProducts() {
    const grid = document.querySelector('.products-grid');
    const customProducts = JSON.parse(localStorage.getItem('customProducts')) || [];
    
    customProducts.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="${p.img}" alt="product">
            <h3>${p.name}</h3>
            <p class="price">${p.price} ₽</p>
            <button class="btn btn-primary btn-add-cart"><i class="fas fa-cart-plus"></i> В корзину</button>
        `;
        if (grid) grid.appendChild(div);
    });
    // Переподключаем кнопки для новых товаров
    setupAddButtons();
}
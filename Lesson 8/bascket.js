'use strict';

const addToCartBtn = document.querySelectorAll('.featuredItems');
const cartSpan = document.querySelector('.cartIconWrap span');
const basket = {};
const cartBodyDiv = document.querySelector('.basket');
const cartBtnToggle = document.querySelector('.cartIconWrap');
const basketTotalPrice = document.querySelector('.basketTotalValue');
const basketTotal = document.querySelector('.basketTotal');

cartBtnToggle.addEventListener('click', ev => {
    cartBodyDiv.classList.toggle('hidden');
});


function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 }
    }
    basket[id].count++;
    cartSpan.textContent = getTotalCount().toString();
    basketTotalPrice.textContent = getTotalPrice();
    renderProductInBasket(id);
}

addToCartBtn.forEach(el => el.addEventListener('click', ev => {
    if (!ev.target.closest('.addToCart')) {
        return;
    }
    const productData = ev.target.closest('.featuredItem');
    const id = +productData.dataset.id;
    const name = productData.dataset.name;
    const price = +productData.dataset.price;
    addToCart(id, name, price);
}));

function getTotalCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0)
}

function getTotalPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.price * product.count, 0)
}

function renderProductInBasket(id) {
    const basketRowEl = document
        .querySelector(`.basketRow[data-product="${id}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow')
        .textContent = basket[id].count * basket[id].price;
}

function renderNewProductInBasket(id) {
    const productRow = `
        <div class="basketRow" data-product="${id}">
            <div>${basket[id].name}</div>
            <div>
                <span class="productCount">${basket[id].count}</span> шт.
            </div>
            <div>$${basket[id].price}</div>
            <div>
                $<span class="productTotalRow">
                    ${basket[id].price * basket[id].count}
                </span>
            </div>
        </div>
    `;
    basketTotal.insertAdjacentHTML('beforebegin', productRow);
}
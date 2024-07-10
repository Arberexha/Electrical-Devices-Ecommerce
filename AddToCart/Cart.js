document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const btnRemoveAll = document.querySelector('.btn-remove-all');
    const totalPriceElement = document.getElementById('cart-total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');

            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.product.title}</h3>
                        <p style="text-align: center;" class="price"><b>${item.product.price}</b></p>
                        <p class="cart-item-description">${item.product.description}</p>
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="btn-remove-item">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="btn-add-item">+</button>
                </div>
            `;

            cartItemsContainer.appendChild(itemElement);

            const btnAdd = itemElement.querySelector('.btn-add-item');
            const btnRemove = itemElement.querySelector('.btn-remove-item');

            btnAdd.addEventListener('click', function() {
                item.quantity++;
                updateCart();
            });

            btnRemove.addEventListener('click', function() {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        updateTotalPrice();
    }

    function updateTotalPrice() {
        let totalPrice = 0;
        cart.forEach(item => {
            const price = parseFloat(item.product.price.replace('$', ''));
            totalPrice += price * item.quantity;
        });
        totalPriceElement.innerText = `${totalPrice.toFixed(2)}$`;
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    renderCartItems();

    btnRemoveAll.addEventListener('click', function() {
        if (confirm("Are you sure you want to remove all the products?")) {
            cart = [];
            updateCart();
        }
    });

    function addProductToCart(product) {
        const existingProductIndex = cart.findIndex(item => item.product.id === product.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push({ product: product, quantity: 1 });
        }

        updateCart();
    }

    const addToCartButtons = document.querySelectorAll('.btnAddToCart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = button.closest('.card');
            const title = card.querySelector('.CardTitle').innerText;
            const imageSrc = card.querySelector('.cardImage').src;
            const price = card.querySelector('.price b').innerText;
            const description = card.querySelector('.cardDescription').innerText;
            const productId = button.getAttribute('data-product-id');

            const product = {
                id: productId,
                title: title,
                image: imageSrc,
                price: price,
                description: description
            };

            addProductToCart(product);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".btnAddToCart");
    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".card");

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const card = button.closest(".card");
        const title = card.querySelector(".CardTitle").innerText;
        const imageSrc = card.querySelector(".cardImage").src;
        const price = card.querySelector(".price b").innerText;
        const description =
          card.querySelector(".cardDescription").innerText;
        const productId = button.getAttribute("data-product-id");

        const product = {
          title: title,
          image: imageSrc,
          price: price,
          description: description,
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProductIndex = cart.findIndex(
          (item) => item.id === productId
        );
        if (existingProductIndex !== -1) {
          alert("Product already in cart!");
        } else {
          cart.push({ id: productId, product: product, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Product added to cart!");
        }
      });
    });

    searchInput.addEventListener("keyup", function () {
      const searchQuery = searchInput.value.toLowerCase();

      cards.forEach((card) => {
        const cardTitle =
          card.querySelector(".CardTitle").innerText.toLowerCase();
        if (cardTitle.includes(searchQuery)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
      
    });
    document.querySelectorAll('.btnBuy').forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation();
        window.location.href = '../Buy/Buy.html'; 
      });
    });
  

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        const productId = card.getAttribute('data-product-id');
        window.location.href = `productPage.html?productId=${productId}`;
      });
    });
  

    document.querySelectorAll('.btnAddToCart').forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation(); 
       
        console.log('Product added to cart:', button.getAttribute('data-product-id'));
      });
    });
  });
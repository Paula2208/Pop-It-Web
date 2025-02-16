document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".header__link");
    const linksFooter = document.querySelectorAll(".footer__link");
    const content = document.getElementById("content");

    // Rendering Navigation
    async function loadPage(page) {
        const response = await fetch(`components/${page}.html`);
        const html = await response.text();
        content.innerHTML = html;

        window.scrollTo({ top: 0, behavior: "smooth" });

        if (page === 'home') setupProductSlider();
    }

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");
            loadPage(page);
            window.history.pushState({ page }, "", `#${page}`);
        });
    });

    linksFooter.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");
            loadPage(page);
            window.history.pushState({ page }, "", `#${page}`);
        });
    });

    // Navigation History
    window.addEventListener("popstate", function (event) {
        if (event.state) {
            const pageEvent = event.state.page;
            loadPage(pageEvent);
        }
    });

    // Load home Page
    const initialPage = window.location.hash.replace("#", "") || "home";
    loadPage(initialPage);

    // Header Animation
    let lastScrollY = window.scrollY;
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY) {
            // Scroll Down - hide
            header.classList.add("header--hidden");
        } else {
            // Scroll Up - Show
            header.classList.remove("header--hidden");
        }
        lastScrollY = window.scrollY;
    });

    // Mobile Hamburger Menu
    const menuBtn = document.getElementById("burger_btn");
    const menuBtnClose = document.getElementById("burger_btn--close");
    const nav = document.getElementById("burger_menu");

    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("header__list--open");
    });

    menuBtnClose.addEventListener("click", () => {
        nav.classList.toggle("header__list--open");
    });
});

function setupProductSlider() {
    const products = [
        { name: "Cuadrado Multicolor", image: "assets/products/square.png" },
        { name: "Among Us | Mármol", image: "assets/products/amongus.png" },
        { name: "Círculo Multicolor", image: "assets/products/round.png" },
        { name: "Ice Cream Multicolor", image: "assets/products/ice_cream.png" },
        { name: "Mini Llavero", image: "assets/products/mini.png" }
    ];

    const slider = document.getElementById("product_slider");

    function renderProducts() {
        slider.innerHTML = "";
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("home__product");
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="home__product-img">
                <p class="home__product-name">${product.name}</p>
                <button class="home__product-buy-btn">Comprar</button>
            `;
            slider.appendChild(productDiv);
        });
    }

    renderProducts();

    let index = 0;

    function updateSlider() {
        if(window.innerWidth > 768){
            slider.style.transform = `translateX(-${index * (100 / 3)}%)`;
        }
        else {
            // Mobile
            slider.style.transform = `translateX(-${index * (100/products.length)}%)`;
        }
    }

    function nextSlide() {
        let productsPerView = window.innerWidth > 768 ? 3 : 1;
        if (index < products.length - productsPerView) {
            index++;
        } else {
            index = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        let productsPerView = window.innerWidth > 768 ? 3 : 1;
        if (index > 0) {
            index--;
        } else {
            index = products.length - productsPerView;
        }
        updateSlider();
    }

    document.getElementById("Product_Slider_btn-left").addEventListener("click", prevSlide);
    document.getElementById("Product_Slider_btn-right").addEventListener("click", nextSlide);

    updateSlider();

    //setInterval(nextSlide, 4000);
}
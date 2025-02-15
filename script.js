document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".header__link");
    const content = document.getElementById("content");

    async function loadPage(page) {
        const response = await fetch(`components/${page}.html`);
        const html = await response.text();
        content.innerHTML = html;
    }

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");
            loadPage(page);
            window.history.pushState({ page }, "", `#${page}`);
        });
    });

    // Manejo de navegación con el historial
    window.addEventListener("popstate", function (event) {
        if (event.state) {
            loadPage(event.state.page);
        }
    });

    // Cargar la página inicial
    const initialPage = window.location.hash.replace("#", "") || "home";
    loadPage(initialPage);
});
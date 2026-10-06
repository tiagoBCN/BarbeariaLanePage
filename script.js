// =================================
// HERO / INTERAÇÃO BÁSICA
// =================================

const heroButtons =
    document.querySelector(".hero-buttons");

if (heroButtons) {
    heroButtons.classList.remove("is-hidden");
}


// =================================
// MENU MOBILE
// =================================

const mobileMenuToggle =
    document.querySelector(".mobile-menu-toggle");

const mainNav =
    document.querySelector("#mainNav");

if (mobileMenuToggle && mainNav) {

    const closeMenu = () => {
        mainNav.classList.remove("is-open");
        mobileMenuToggle.classList.remove("is-active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
        const isOpen = mainNav.classList.toggle("is-open");
        mobileMenuToggle.classList.toggle("is-active", isOpen);
        mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    };

    mobileMenuToggle.addEventListener("click", toggleMenu);

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        const clickedInsideMenu =
            mainNav.contains(event.target) ||
            mobileMenuToggle.contains(event.target);

        if (!clickedInsideMenu) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) {
            closeMenu();
        }
    });

}


// =================================
// CARROSSEL DE SERVIÇOS
// =================================

const servicesCarousel =
    document.querySelector("#servicesCarousel");

if (servicesCarousel) {
    const carouselButtons =
        document.querySelectorAll("[data-carousel-direction]");

    const updateCarouselButtons = () => {
        const maxScroll = servicesCarousel.scrollWidth - servicesCarousel.clientWidth;

        carouselButtons.forEach(button => {
            const direction = Number(button.dataset.carouselDirection);
            button.disabled = direction < 0
                ? servicesCarousel.scrollLeft <= 1
                : servicesCarousel.scrollLeft >= maxScroll - 1;
        });
    };

    carouselButtons.forEach(button => {
        button.addEventListener("click", () => {
            const firstCard = servicesCarousel.querySelector(".service-card");
            const gap = Number.parseFloat(getComputedStyle(servicesCarousel).gap) || 0;
            const direction = Number(button.dataset.carouselDirection);

            servicesCarousel.scrollBy({
                left: direction * (firstCard.getBoundingClientRect().width + gap),
                behavior: "smooth"
            });
        });
    });

    servicesCarousel.addEventListener("scroll", updateCarouselButtons, { passive: true });
    window.addEventListener("resize", updateCarouselButtons);
    updateCarouselButtons();
}

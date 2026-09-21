javascript
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

        });


        // Fecha o menu ao clicar em um link
        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.classList.remove("active");

            });

        });

    }


    /* =====================================================
       BUSCA E FILTRO DE SERVIÇOS
    ===================================================== */

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const serviceCards =
        document.querySelectorAll(".service-card");

    const noResults =
        document.getElementById("noResults");


    function filterServices() {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        const category =
            categoryFilter.value;

        let visibleCards = 0;


        serviceCards.forEach(card => {

            const name =
                card.dataset.name
                    .toLowerCase();

            const cardCategory =
                card.dataset.category;


            const matchesSearch =
                name.includes(search);

            const matchesCategory =
                category === "todos" ||
                cardCategory === category;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.style.display = "";

                visibleCards++;

            } else {

                card.style.display = "none";

            }

        });


        if (noResults) {

            noResults.style.display =
                visibleCards === 0
                    ? "block"
                    : "none";

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterServices
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterServices
        );

    }


    /* =====================================================
       LINK ATIVO DO MENU
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id], main[id]"
        );

    const navLinks =
        document.querySelectorAll(".nav-link");


    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );


    /* =====================================================
       ANIMAÇÃO DOS CARDS
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".service-card"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    cards.forEach(card => {

        card.classList.add("animate");

        observer.observe(card);

    });


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

});
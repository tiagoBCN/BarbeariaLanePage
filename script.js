// =================================
// MENU MOBILE
// =================================

const mobileMenuToggle = document.querySelector('#mobileMenuToggle');
const mainNav = document.querySelector('#mainNav');

if (mobileMenuToggle && mainNav) {

    const closeMenu = () => {
        mainNav.classList.remove('is-open');
        mobileMenuToggle.classList.remove('is-active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        const isOpen = mainNav.classList.toggle('is-open');
        mobileMenuToggle.classList.toggle('is-active', isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', event => {
        const clickedInsideMenu =
            mainNav.contains(event.target) ||
            mobileMenuToggle.contains(event.target);
        if (!clickedInsideMenu) closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 640) closeMenu();
    });

}


// =================================
// SCROLL REVEAL — ANIMAÇÕES
// =================================

const animatedElements = document.querySelectorAll('[data-animate]');

if (animatedElements.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    animatedElements.forEach(el => observer.observe(el));
}


// =================================
// HEADER — TRANSPARENTE NO TOPO
// =================================

const header = document.querySelector('#header');

if (header) {
    const updateHeader = () => {
        if (window.scrollY > 40) {
            header.style.background = 'rgba(5, 7, 11, 0.97)';
        } else {
            header.style.background = 'rgba(5, 7, 11, 0.75)';
        }
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
}


// =================================
// CARROSSEL DE GALERIA
// =================================

const servicesCarousel = document.querySelector('#servicesCarousel');

if (servicesCarousel) {
    const carouselButtons = document.querySelectorAll('[data-carousel-direction]');

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
        button.addEventListener('click', () => {
            const firstCard = servicesCarousel.querySelector('.service-card');
            if (!firstCard) return;
            const gap = Number.parseFloat(getComputedStyle(servicesCarousel).gap) || 0;
            const direction = Number(button.dataset.carouselDirection);
            servicesCarousel.scrollBy({
                left: direction * (firstCard.getBoundingClientRect().width + gap),
                behavior: 'smooth'
            });
        });
    });

    servicesCarousel.addEventListener('scroll', updateCarouselButtons, { passive: true });
    window.addEventListener('resize', updateCarouselButtons);
    updateCarouselButtons();

    // Drag-to-scroll
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    servicesCarousel.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.pageX - servicesCarousel.offsetLeft;
        startScrollLeft = servicesCarousel.scrollLeft;
        servicesCarousel.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        servicesCarousel.style.cursor = 'grab';
    });

    servicesCarousel.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - servicesCarousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        servicesCarousel.scrollLeft = startScrollLeft - walk;
    });
}


// =================================
// SCROLL HINT — OCULTAR AO ROLAR
// =================================

const scrollHint = document.querySelector('#scrollHint');

if (scrollHint) {
    const hideScrollHint = () => {
        if (window.scrollY > 100) {
            scrollHint.style.opacity = '0';
            scrollHint.style.pointerEvents = 'none';
        } else {
            scrollHint.style.opacity = '1';
            scrollHint.style.pointerEvents = 'auto';
        }
    };
    scrollHint.style.transition = 'opacity 0.4s ease';
    window.addEventListener('scroll', hideScrollHint, { passive: true });
}

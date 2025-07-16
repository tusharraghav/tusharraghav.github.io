document.addEventListener('DOMContentLoaded', function () {
    const html = document.documentElement;

    // Disable default smooth scrolling temporarily
    html.style.scrollBehavior = 'auto';

    // Remove conflicting animations (optional, may cause layout shifts)
    document.querySelectorAll('*').forEach(el => {
        el.style.transform = 'none';
        el.style.animation = 'none';
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Close mobile menu
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
            }
        });
    });

    // Carousel initialization
    const myCarousel = document.getElementById('carouselExampleIndicators');
    if (myCarousel) {
        const carousel = new bootstrap.Carousel(myCarousel, {
            interval: 5000,
            ride: 'carousel',
            wrap: true,
            pause: 'hover'
        });

        // Carousel slide animation logic
        myCarousel.addEventListener('slid.bs.carousel', function () {
            const activeItem = this.querySelector('.active');
            const captions = activeItem.querySelectorAll('.carousel-caption');
            const animations = ['animate__fadeInDown', 'animate__fadeInRight', 'animate__fadeInUp'];
            const activeIndex = [...this.querySelectorAll('.carousel-item')].indexOf(activeItem);

            captions.forEach(caption => {
                caption.classList.remove(...animations);
                caption.classList.add(animations[activeIndex % animations.length]);
            });
        });
    }

    // Theme toggle logic
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    function setTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-bs-theme', 'dark');
            themeIcon?.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-bs-theme', 'light');
            themeIcon?.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    themeToggle?.addEventListener('click', function () {
        const currentTheme = html.getAttribute('data-bs-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Listen to system theme changes (only if no manual preference set)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Navbar scroll shadow
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Active section highlight in navbar
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function updateActiveLinks() {
        const scrollPosition = window.scrollY + 100;

        navLinks.forEach(link => {
            const sectionId = link.getAttribute('href');
            if (sectionId && sectionId !== '#') {
                const section = document.querySelector(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const isActive = scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight;
                    link.classList.toggle('active', isActive);
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLinks);
    updateActiveLinks();

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('active', window.pageYOffset > 300);
        });

        backToTopButton.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Bootstrap form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.project-item, .card, .skill-item');

    function animateOnScroll() {
        const screenPosition = window.innerHeight / 1.3;

        animatedElements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            if (position < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial run
});

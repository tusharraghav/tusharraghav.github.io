// Add this script before closing </body> tag
document.addEventListener('DOMContentLoaded', function() {
    // Disable smooth scrolling temporarily
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';
    
    // Check for any conflicting animations
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.transform = 'none';
        el.style.animation = 'none';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Close mobile menu when clicking a link
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }

        });
    });

    // Initialize carousel with custom interval
    const myCarousel = document.getElementById('carouselExampleIndicators');
    const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 5000, // Change slide every 5 seconds
        ride: 'carousel',
        wrap: true,
        pause: 'hover'
    });

    // Add animation classes when slide changes
    myCarousel.addEventListener('slid.bs.carousel', function () {
        const activeItem = this.querySelector('.active');
        const captions = activeItem.querySelectorAll('.carousel-caption');

        // // Remove all animation classes first
        captions.forEach(caption => {
            caption.classList.remove(
                'animate__fadeInDown', 
                'animate__fadeInUp', 
                'animate__fadeInRight',
                'animate__fadeInLeft'
            );
        });

        // Add appropriate animation class based on slide index
        const activeIndex = Array.from(this.querySelectorAll('.carousel-item')).indexOf(activeItem);
        const animations = ['animate__fadeInDown', 'animate__fadeInRight', 'animate__fadeInUp'];
        captions.forEach(caption => {
            caption.classList.add(animations[activeIndex % animations.length]);
        });
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Apply the saved theme
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        htmlElement.setAttribute('data-bs-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Dark/Light Toggle JS
    themeToggle.addEventListener('click', function() {
        if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
            htmlElement.setAttribute('data-bs-theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const sectionId = link.getAttribute('href');
            if (sectionId !== '#') {
                const section = document.querySelector(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            }
        });
    });


    // Back to the top button
    const backToTopButton = document.getElementById('backToTop');
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation')
    
        // Loop over them and prevent submission
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
            
                form.classList.add('was-validated')
                }, false)
            });
        
        // Add active class to current nav item
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');
        window.addEventListener('scroll', function() {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });

        // Animation on Scroll 
        // You can add more sophisticated animations using libraries like AOS.js
        function animateOnScroll() {
            const elements = document.querySelectorAll('.project-item, .card, .skill-item');

            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;

                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Example form validation
        (function() {
            'use strict';
            window.addEventListener('load', function() {
                var form = document.getElementById('contactForm');
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            }, false);
        })();

        // Set initial state for animated elements
        document.querySelectorAll('.project-item, .card, .skill-item').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on page load
});


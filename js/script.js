document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = navMenu.querySelectorAll("a");

    // --- Theme Toggling --- //
    const applyTheme = (theme) => {
        body.classList.remove("light-mode", "dark-mode");
        body.classList.add(theme);
        themeToggle.textContent = theme === "dark-mode" ? "Light" : "Dark";
        localStorage.setItem("theme", theme);
    };

    const savedTheme = localStorage.getItem("theme") || "light-mode"; // Default to light
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const newTheme = body.classList.contains("light-mode") ? "dark-mode" : "light-mode";
        applyTheme(newTheme);
    });

    // --- Mobile Navigation --- //
    burger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        burger.setAttribute("aria-expanded", navMenu.classList.contains("active"));
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                burger.setAttribute("aria-expanded", "false");
            }
        });
    });

    // --- Smooth Scrolling & Active Link Highlighting --- //
    const sections = document.querySelectorAll("main section[id]");

    const updateActiveLink = () => {
        let currentSectionId = "hero"; // Default to hero
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Consider middle of viewport

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    };

    // Initial call and update on scroll
    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink);

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) { // Ensure it's not just "#"
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Calculate offset based on header height
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // --- Initialize AOS --- //
    AOS.init({
        duration: 800,      // Animation duration
        offset: 120,        // Offset (in px) from the original trigger point
        once: false,        // Whether animation should happen only once - while scrolling down
        easing: 'ease-in-out', // Default easing for AOS animations
        anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
    });

});


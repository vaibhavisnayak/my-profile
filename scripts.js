document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect for Hero
    const textElement = document.getElementById('typing-text');
    // Hardcode the name to ensure perfect spacing regardless of previous turns or HTML glitches
    const text = "Vaibhavi S Nayak";
    textElement.textContent = '';

    let i = 0;
    function typeEffect() {
        if (i < text.length) {
            textElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeEffect, 100);
        }
    }
    setTimeout(typeEffect, 400);

    // Theme Switch
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeIcon.innerText = isLight ? '☀️' : '🌙';
        localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    });

    // Load saved theme
    if (localStorage.getItem('portfolio-theme') === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.innerText = '☀️';
    }

    // Section Visibility Observer (Scroll Reveal)
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Smooth Scroll for Nav
    const navLinks = document.querySelector('#nav-links');
    const menuToggle = document.querySelector('#mobile-menu');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();

                // Close mobile menu on click
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar transparency check on scroll
    const navElement = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navElement.style.background = 'var(--nav-bg-scroll)';
            navElement.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            navElement.style.background = 'var(--nav-bg)';
            navElement.style.boxShadow = 'none';
        }
    });
});

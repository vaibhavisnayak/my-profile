document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // Theme Switch
    // ----------------------------------------------------
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

    // ----------------------------------------------------
    // Mouse Glow Effect
    // ----------------------------------------------------
    document.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--mouse-x', e.clientX + 'px');
        document.body.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    // ----------------------------------------------------
    // Mobile Navigation Dropdown
    // ----------------------------------------------------
    const mobileMenu = document.getElementById('mobile-menu');
    const navWrapper = document.getElementById('nav-wrapper');
    const navLinks = document.querySelectorAll('#nav-links a');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navWrapper.classList.toggle('active');
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('is-active');
            navWrapper.classList.remove('active');
        });
    });

    // ----------------------------------------------------
    // Typing Effect for Hero Subtitle
    // ----------------------------------------------------
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "Software Developer",
        "AI Enthusiast",
        "Full Stack Developer",
        "Researcher in Cloud Computing"
    ];
    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function handleTyping() {
        const fullText = roles[currentRoleIdx];
        
        if (!isDeleting) {
            typingElement.textContent = fullText.substring(0, currentCharIdx + 1);
            currentCharIdx++;
            typeDelay = 100;

            if (currentCharIdx === fullText.length) {
                isDeleting = true;
                typeDelay = 2000; // Wait before deleting
            }
        } else {
            typingElement.textContent = fullText.substring(0, currentCharIdx - 1);
            currentCharIdx--;
            typeDelay = 50;

            if (currentCharIdx === 0) {
                isDeleting = false;
                currentRoleIdx = (currentRoleIdx + 1) % roles.length;
                typeDelay = 500; // Pause before typing next word
            }
        }
        setTimeout(handleTyping, typeDelay);
    }
    setTimeout(handleTyping, 1000);

    // ----------------------------------------------------
    // Scroll Reveal (Intersection Observer)
    // ----------------------------------------------------
    const revealItems = document.querySelectorAll('.reveal-item');
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // ----------------------------------------------------
    // Testimonials Carousel
    // ----------------------------------------------------
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Wrap around indices
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 8000);
    }

    if (slides.length > 0) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetAutoSlide();
        });

        resetAutoSlide();
    }

    // ----------------------------------------------------
    // Copy to Clipboard (Email & Phone)
    // ----------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyPhoneBtn = document.getElementById('copy-phone-btn');
    const toast = document.getElementById('toast-notif');

    function triggerToast(message) {
        toast.textContent = message;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 2000);
    }

    copyEmailBtn.addEventListener('click', () => {
        const email = document.getElementById('contact-email').textContent;
        navigator.clipboard.writeText(email).then(() => {
            triggerToast('Email copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy email: ', err);
        });
    });

    copyPhoneBtn.addEventListener('click', () => {
        const phone = document.getElementById('contact-phone').textContent;
        navigator.clipboard.writeText(phone).then(() => {
            triggerToast('Phone number copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy phone: ', err);
        });
    });

    // ----------------------------------------------------
    // GitHub Contribution Calendar Mockup Generator
    // ----------------------------------------------------
    const graphContainer = document.getElementById('contribution-graph');
    
    if (graphContainer) {
        const totalWeeks = 53;
        const daysPerWeek = 7;
        const currentDate = new Date();
        
        // Generate calendar starting from 1 year ago
        const startDate = new Date();
        startDate.setFullYear(currentDate.getFullYear() - 1);
        startDate.setDate(startDate.getDate() - startDate.getDay()); // Go to start of the week

        let calendarHTML = '';
        
        for (let w = 0; w < totalWeeks; w++) {
            calendarHTML += '<div class="graph-col">';
            for (let d = 0; d < daysPerWeek; d++) {
                const cellDate = new Date(startDate);
                cellDate.setDate(startDate.getDate() + (w * 7) + d);
                
                // Format date string YYYY-MM-DD
                const dateStr = cellDate.toISOString().split('T')[0];
                
                // Generate a pseudo-random activity density with clustering
                // Weekends are lighter, some mid-week periods are heavy (e.g. hackathons)
                let count = 0;
                const randomSeed = Math.random();
                const dayOfWeek = cellDate.getDay();
                
                // Avoid counts in future dates
                if (cellDate <= currentDate) {
                    if (randomSeed > 0.5) {
                        // High activity density factors
                        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                            count = Math.floor(Math.random() * 8); // weekdays
                        } else {
                            count = Math.floor(Math.random() * 3); // weekends
                        }
                    }
                }
                
                let level = 0;
                if (count > 0 && count <= 2) level = 1;
                else if (count > 2 && count <= 4) level = 2;
                else if (count > 4 && count <= 6) level = 3;
                else if (count > 6) level = 4;

                const levelClass = level > 0 ? ` level-${level}` : '';
                calendarHTML += `<div class="graph-cell${levelClass}" data-date="${dateStr}" data-count="${count}"></div>`;
            }
            calendarHTML += '</div>';
        }
        graphContainer.innerHTML = calendarHTML;
    }

    // ----------------------------------------------------
    // Canvas Particles System
    // ----------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let numParticles = 60;
        let particleMaxRadius = 2.5;

        // Resize Canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (window.innerWidth < 768) {
                numParticles = 30;
            } else {
                numParticles = 70;
            }
            createParticles();
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * particleMaxRadius + 0.5;
                this.alpha = Math.random() * 0.3 + 0.15;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Warp bounds
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                const isLight = document.body.classList.contains('light-theme');
                ctx.fillStyle = isLight 
                    ? `rgba(109, 40, 217, ${this.alpha * 0.5})` 
                    : `rgba(139, 92, 246, ${this.alpha})`;
                ctx.fill();
            }
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        function drawLines() {
            const maxDistance = 100;
            const isLight = document.body.classList.contains('light-theme');
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = isLight 
                            ? `rgba(109, 40, 217, ${alpha})` 
                            : `rgba(139, 92, 246, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }
});

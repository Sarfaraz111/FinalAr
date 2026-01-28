function enterApp() {
    const splash = document.getElementById('splash-overlay');
    const app = document.getElementById('app-content');
    const nav = document.querySelector('.bottom-nav');

    // Fade out splash
    gsap.to(splash, {
        duration: 0.8,
        y: '-100%',
        ease: 'power3.inOut',
        onComplete: () => {
            splash.style.display = 'none';
        }
    });

    // Fade in App Content
    app.style.display = 'block';
    gsap.to(app, {
        duration: 0.8,
        opacity: 1,
        delay: 0.3
    });

    // Search Logic
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.food-card');

        cards.forEach(card => {
            const title = card.querySelector('.food-name').textContent.toLowerCase();
            if (title.includes(term)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Category Logic
    const chips = document.querySelectorAll('.category-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Active state
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const category = chip.textContent.split(' ')[1].toLowerCase(); // e.g. "🍕 Pizza" from "🍕 Pizza"
            const cards = document.querySelectorAll('.food-card');

            cards.forEach(card => {
                const title = card.querySelector('.food-name').textContent.toLowerCase();
                // Simple keyword matching for category
                if (category === "all" || title.includes(category) ||
                    (category === "fast" && (title.includes("burger") || title.includes("roll") || title.includes("drum"))) ||
                    (category === "desi" && (title.includes("biryani") || title.includes("karhai") || title.includes("chirgah")))) {
                    card.style.display = 'flex';
                    // Re-trigger animation
                    gsap.from(card, { opacity: 0, y: 20, duration: 0.4 });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Auto Slider
    const slider = document.querySelector('.slider-wrapper');
    if (slider) {
        let scrollAmount = 0;
        const slideWidth = slider.clientWidth;

        setInterval(() => {
            scrollAmount += slideWidth;
            if (scrollAmount >= slider.scrollWidth) {
                scrollAmount = 0;
            }
            slider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, 4000); // 4 seconds
    }

    // Drawer Toggle (Bottom Nav)
    const menuBtn = document.querySelector('.icon-btn'); // Hamburger button
    const bottomNav = document.querySelector('.bottom-nav');
    let isNavVisible = true;

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (isNavVisible) {
                gsap.to(bottomNav, { y: '100%', duration: 0.3, ease: 'power2.in' });
            } else {
                gsap.to(bottomNav, { y: '0%', duration: 0.3, ease: 'power2.out' });
            }
            isNavVisible = !isNavVisible;
        });
    }

    // Animate list items
    gsap.from('.food-card', {
        duration: 0.6,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        delay: 0.5,
        ease: 'back.out(1.2)'
    });
}

// AR Button Helper
// Note: <model-viewer> handles the actual AR session overlay.
// This is just to ensure the user knows it's interactive.
// Debug Logger for Mobile
class MobileLogger {
    constructor() {
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 150px;
            background: rgba(0,0,0,0.8);
            color: #0f0;
            font-family: monospace;
            font-size: 12px;
            padding: 10px;
            overflow-y: scroll;
            z-index: 10000;
            pointer-events: none;
            display: none; 
        `;
        document.body.appendChild(this.container);
    }

    show() {
        this.container.style.display = 'block';
    }

    log(msg) {
        const line = document.createElement('div');
        line.textContent = `> ${msg}`;
        this.container.appendChild(line);
        this.container.scrollTop = this.container.scrollHeight;
        console.log(msg); // Also log to real console
    }
}

const logger = new MobileLogger();
// logger.show(); // Uncomment to force show on load, or trigger via UI

// AR Button Function (Called from HTML onclick)
function triggerAR(btn) {
    logger.show(); // Show logger when user tries to interact
    logger.log("AR Button Clicked");

    const card = btn.closest('.food-card');
    const viewer = card.querySelector('model-viewer');

    if (viewer) {
        logger.log(`Viewer found for: ${card.querySelector('.food-name').textContent}`);

        // Listen for AR Status Changes
        viewer.addEventListener('ar-status', (event) => {
            logger.log(`AR Status Change: ${event.detail.status}`);
        });

        if (viewer.canActivateAR) {
            logger.log("System reports: AR is supported.");
            logger.log("Attempting to activate AR (Scene Viewer Priority)...");

            try {
                viewer.activateAR().then(() => {
                    logger.log("AR Activation Promise Resolved");
                    logger.log("Waiting for external AR app...");
                }).catch((e) => {
                    logger.log(`AR Activation Error: ${e.message}`);
                    alert(`AR Error: ${e.message}`);
                });
            } catch (e) {
                logger.log(`Sync Error: ${e.message}`);
                alert(`Error: ${e.message}`);
            }

        } else {
            logger.log("System reports: AR NOT supported.");
            alert("AR is not supported on this device/browser. Install 'Google Play Services for AR' and use Chrome.");
        }
    } else {
        logger.log("Error: Model viewer element not found!");
        alert("Error: 3D Model not found.");
    }
}

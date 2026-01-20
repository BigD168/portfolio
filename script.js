/**
 * Alex Rivera Portfolio - Static Version Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Theme Management
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    function updateIcons(theme) {
        if (theme === 'dark') {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.className = savedTheme;
    updateIcons(savedTheme);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            html.className = newTheme;
            localStorage.setItem('theme', newTheme);
            updateIcons(newTheme);
        });
    }

    // 3. Scroll Spy for Navigation
    const sections = document.querySelectorAll('section[id]');
    const navButtons = document.querySelectorAll('nav button[data-section]');

    // 3a. Intersection Observer for Scroll Reveal
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove class to re-trigger animation when scrolling back
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    function scrollSpy() {
        const scrollPosition = window.scrollY + 300;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navButtons.forEach(btn => {
                    btn.classList.remove('nav-active', 'bg-brand-orange', 'text-white', 'shadow-neon-orange');
                    btn.classList.add('text-gray-500', 'dark:text-gray-400');
                    if (btn.getAttribute('data-section') === id) {
                        btn.classList.add('nav-active', 'bg-brand-orange', 'text-white', 'shadow-neon-orange');
                        btn.classList.remove('text-gray-500', 'dark:text-gray-400');
                        // Show/Hide Labels (Simplified logic for static)
                        const label = btn.querySelector('span');
                        if (label) label.classList.remove('hidden');
                    } else {
                        const label = btn.querySelector('span');
                        if (label && !window.matchMedia("(min-width: 768px)").matches) {
                            label.classList.add('hidden');
                        }
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial call

    // 4. Smooth Scroll for Navigation
    navButtons.forEach(btn => {
        btn.classList.add('nav-click-effect');
        btn.addEventListener('click', () => {
            // Ripple Effect
            btn.classList.remove('ripple-active');
            void btn.offsetWidth; // Trigger reflow
            btn.classList.add('ripple-active');
            setTimeout(() => btn.classList.remove('ripple-active'), 600);

            const targetId = btn.getAttribute('data-section');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetId === 'home' ? 0 : targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Hero Logo Click
    const logo = document.querySelector('header div[onclick]');
    if (logo) {
        logo.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    }

    const closeMenu = () => {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        }
    };

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach(link => {
        link.classList.add('mobile-ripple');
        link.addEventListener('click', (e) => {
            // Ripple Effect
            link.classList.remove('ripple-active');
            void link.offsetWidth;
            link.classList.add('ripple-active');
            setTimeout(() => link.classList.remove('ripple-active'), 600);

            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    setTimeout(() => {
                        closeMenu();
                        window.scrollTo({
                            top: targetId === 'home' ? 0 : targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 400); // Wait for ripple/click to be seen
                }
            } else {
                setTimeout(closeMenu, 400);
            }
        });
    });

    const getInTouchBtns = ['get-in-touch-btn', 'get-in-touch-mobile'];
    getInTouchBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            if (id === 'get-in-touch-mobile') btn.classList.add('mobile-ripple');
            btn.addEventListener('click', () => {
                if (id === 'get-in-touch-mobile') {
                    btn.classList.remove('ripple-active');
                    void btn.offsetWidth;
                    btn.classList.add('ripple-active');
                    setTimeout(() => btn.classList.remove('ripple-active'), 600);
                }

                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    setTimeout(() => {
                        if (id === 'get-in-touch-mobile') closeMenu();
                        window.scrollTo({
                            top: contactSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, id === 'get-in-touch-mobile' ? 400 : 0);
                }
            });
        }
    });

    // 7. Modal Logic
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const privacyLink = document.getElementById('privacy-link');
    const termsLink = document.getElementById('terms-link');

    const modalContent = {
        privacy: `
            <h2 class="text-brand-orange">Privacy Policy</h2>
            <p>Your privacy is important to us. This policy explains how we handle your data.</p>
            <ul class="space-y-4">
                <li><strong class="text-white">Data Collection:</strong> We do not collect any personal data unless you explicitly provide it via the contact form.</li>
                <li><strong class="text-white">Usage:</strong> Any information provided is used solely for communication purposes.</li>
                <li><strong class="text-white">Cookies:</strong> This site may use local storage to save your theme preference (Light/Dark mode).</li>
            </ul>
            <p>For more details, please contact me directly at chumvannry210@gmail.com.</p>
        `,
        terms: `
            <h2 class="text-brand-orange">Terms of Service</h2>
            <p>Agreement to these terms is implied by your continued use of the site.</p>
        `,
        purpose: `
            <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <i data-lucide="target" class="w-8 h-8"></i>
                </div>
                <div>
                    <h2 class="text-brand-orange text-3xl mb-0">Purpose Driven</h2>
                    <p class="text-gray-400">Our Core Philosophy</p>
                </div>
            </div>
            <p class="text-lg leading-relaxed">We believe that design should never be just about aesthetics. Every pixel, every interaction, and every line of code must serve a specific purpose.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div class="p-6 glass rounded-2xl border border-white/5">
                    <h3 class="text-white font-bold mb-2">Intentional Design</h3>
                    <p class="text-sm text-gray-400">Moving beyond trends to create lasting value for users and businesses alike.</p>
                </div>
                <div class="p-6 glass rounded-2xl border border-white/5">
                    <h3 class="text-white font-bold mb-2">User-Centricity</h3>
                    <p class="text-sm text-gray-400">Deeply understanding user needs to build solutions that actually solve real-world problems.</p>
                </div>
            </div>
        `,
        iteration: `
            <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <i data-lucide="zap" class="w-8 h-8"></i>
                </div>
                <div>
                    <h2 class="text-brand-blue text-3xl mb-0">Fast Iteration</h2>
                    <p class="text-gray-400">Agile Development Process</p>
                </div>
            </div>
            <p class="text-lg leading-relaxed">Speed is a feature. We utilize rapid prototyping and narrow feedback loops to arrive at the optimal solution faster.</p>
            <div class="space-y-4 mt-8">
                <div class="flex items-start gap-4 p-4 glass rounded-xl border border-white/5">
                    <div class="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">1</div>
                    <div>
                        <h4 class="text-white font-bold">Prototyping</h4>
                        <p class="text-sm text-gray-400">Quickly visualize ideas to test assumptions early.</p>
                    </div>
                </div>
                <div class="flex items-start gap-4 p-4 glass rounded-xl border border-white/5">
                    <div class="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">2</div>
                    <div>
                        <h4 class="text-white font-bold">Feedback</h4>
                        <p class="text-sm text-gray-400">Gathering insights from real users to refine the experience.</p>
                    </div>
                </div>
                <div class="flex items-start gap-4 p-4 glass rounded-xl border border-white/5">
                    <div class="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">3</div>
                    <div>
                        <h4 class="text-white font-bold">Refinement</h4>
                        <p class="text-sm text-gray-400">Continuous polishing until we reach perfection.</p>
                    </div>
                </div>
            </div>
        `,
        methodology: `
            <div class="flex flex-col gap-8">
                <div>
                    <h2 class="text-brand-orange text-4xl mb-4">Our Methodology</h2>
                    <p class="text-lg text-gray-400">A systematic approach to creating digital excellence.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="p-6 glass rounded-3xl border border-white/5 space-y-4">
                        <div class="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                            <i data-lucide="search" class="w-6 h-6"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white">01. Discovery</h3>
                        <p class="text-sm text-gray-400">We start by deeply understanding your goals, audience, and the problem space through intensive research and data analysis.</p>
                    </div>
                    
                    <div class="p-6 glass rounded-3xl border border-white/5 space-y-4">
                        <div class="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                            <i data-lucide="pen-tool" class="w-6 h-6"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white">02. Design</h3>
                        <p class="text-sm text-gray-400">Translating insights into intuitive user experiences and striking visual identities that resonate with your brand.</p>
                    </div>
                    
                    <div class="p-6 glass rounded-3xl border border-white/5 space-y-4">
                        <div class="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                            <i data-lucide="code" class="w-6 h-6"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white">03. Development</h3>
                        <p class="text-sm text-gray-400">Building robust, scalable, and high-performance solutions using the latest web technologies and best practices.</p>
                    </div>
                    
                    <div class="p-6 glass rounded-3xl border border-white/5 space-y-4">
                        <div class="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                            <i data-lucide="check-circle" class="w-6 h-6"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white">04. Delivery</h3>
                        <p class="text-sm text-gray-400">Rigorous testing and refinement to ensure a flawless launch and continued support for long-term success.</p>
                    </div>
                </div>
            </div>
        `
    };

    function openModal(type) {
        if (!modalOverlay || !modalBody) return;
        modalBody.innerHTML = modalContent[type] || '';
        modalOverlay.classList.remove('hidden');
        setTimeout(() => {
            modalOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }, 10);
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('show');
        setTimeout(() => {
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    if (privacyLink) privacyLink.addEventListener('click', () => openModal('privacy'));
    if (termsLink) termsLink.addEventListener('click', () => openModal('terms'));
    
    // Generic Modal Trigger for Cards
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const type = trigger.getAttribute('data-modal');
            openModal(type);
            // Re-initialize icons for content injected into modal
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
});


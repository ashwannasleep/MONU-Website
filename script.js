// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 70; // Height of fixed header
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header (but keep it visible)
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Always keep header visible, just add subtle background effect
        if (scrollTop > 50) {
            header.style.background = 'rgba(247, 245, 240, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(247, 245, 240, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add animation to feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Mobile menu toggle (for small screens)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.className = 'mobile-menu-toggle';
    mobileMenuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        color: #6366f1;
        cursor: pointer;
        padding: 8px;
    `;
    
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    // Add mobile menu button
    navContainer.appendChild(mobileMenuButton);
    
    // Mobile menu functionality
    mobileMenuButton.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Hide mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navContainer.contains(e.target)) {
            navLinks.style.display = 'none';
        }
    });
    
    // Responsive navigation
    function handleResize() {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            mobileMenuButton.style.display = 'block';
            navLinks.style.cssText = `
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-top: 1px solid rgba(0, 0, 0, 0.1);
            `;
        } else {
            navLinks.style.display = 'flex';
            mobileMenuButton.style.display = 'none';
            navLinks.style.cssText = '';
        }
    }
    
    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
});

// Add loading animation for app store button
document.addEventListener('DOMContentLoaded', function() {
    const storeButton = document.querySelector('.store-button');
    if (storeButton) {
        storeButton.addEventListener('click', function(e) {
            // Add loading state
            const originalContent = this.innerHTML;
            this.innerHTML = '<span>Opening App Store...</span>';
            this.style.opacity = '0.7';
            
            // Reset after a short delay
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.opacity = '1';
            }, 1000);
        });
    }
    
    // Interactive App Preview Tabs
    const previewTabs = document.querySelectorAll('.preview-tab');
    const previewPanels = document.querySelectorAll('.preview-panel');
    
    previewTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            previewTabs.forEach(t => t.classList.remove('active'));
            previewPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.querySelector(`[data-panel="${targetTab}"]`).classList.add('active');
            
            // Add gentle bounce animation
            this.style.animation = 'gentleBounce 0.6s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
    
    // Add hover effects to preview items
    const previewItems = document.querySelectorAll('.preview-item');
    previewItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Interactive iPhone Mockup Navigation
    const menuItems = document.querySelectorAll('.menu-item[data-page]');
    const appViews = document.querySelectorAll('.app-view');
    const backButtons = document.querySelectorAll('.back-btn');

    // Show page when menu item is clicked
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetPage = item.getAttribute('data-page');
            const targetView = document.getElementById(`${targetPage}-view`);
            
            if (targetView) {
                // Hide all views
                appViews.forEach(view => view.style.display = 'none');
                // Show target view
                targetView.style.display = 'flex';
            }
        });
    });

    // Back button functionality
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetView = button.getAttribute('data-back');
            const viewToShow = document.getElementById(targetView);
            
            if (viewToShow) {
                // Hide all views
                appViews.forEach(view => view.style.display = 'none');
                // Show target view
                viewToShow.style.display = 'flex';
            }
        });
    });
    
    // Back to Top Button Functionality
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show button when scrolling down
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

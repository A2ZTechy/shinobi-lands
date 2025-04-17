// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const ipAddress = document.getElementById('ip-address');
const copyBtn = document.getElementById('copy-ip');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const galleryItems = document.querySelectorAll('.gallery-item');

// Scroll variables
let lastScrollPosition = 0;
const navbarHeight = navbar.offsetHeight;

// Mobile Menu Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Animate hamburger icon
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        bars.forEach(bar => {
            bar.style.transform = '';
            bar.style.opacity = '';
        });
    }
}

// Close mobile menu when clicking a link
function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
    
    // Reset hamburger icon
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.transform = '';
        bar.style.opacity = '';
    });
}

// Copy IP Address to Clipboard
async function copyIP() {
    try {
        await navigator.clipboard.writeText(ipAddress.textContent);
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.color = '#4CAF50';
        
        // Reset after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.color = '';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy IP: ', err);
        copyBtn.innerHTML = '<i class="fas fa-times"></i>';
        copyBtn.style.color = '#f44336';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-copy"></i>';
            copyBtn.style.color = '';
        }, 2000);
    }
}

// Tab Switching Functionality
function switchTab(e) {
    // Remove active class from all buttons and panes
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Show corresponding pane
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
}

// Smooth Scrolling for Anchor Links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
}

// Handle Scroll - Hide/Show Navbar
function handleScroll() {
    const currentScrollPosition = window.scrollY;
    
    // Always show navbar when at top of page
    if (currentScrollPosition <= 0) {
        navbar.classList.remove('hide');
        navbar.classList.remove('scrolled');
        return;
    }
    
    // Add scrolled class when not at top
    if (currentScrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show logic
    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down - hide navbar
        if (currentScrollPosition > navbarHeight) {
            navbar.classList.add('hide');
        }
    } else {
        // Scrolling up - show navbar
        navbar.classList.remove('hide');
    }
    
    lastScrollPosition = currentScrollPosition;
}

// Initialize Lightbox for Gallery
function initLightbox() {
    // This would be expanded with a proper lightbox library
    // For now, just log which image was clicked
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            console.log('Image clicked:', imgSrc);
            // In a real implementation, you would open a lightbox here
        });
    });
}

// Event Listeners
hamburger.addEventListener('click', toggleMobileMenu);
copyBtn.addEventListener('click', copyIP);
window.addEventListener('scroll', handleScroll, { passive: true });

// Add event listeners to mobile menu links
document.querySelectorAll('.mobile-menu-content a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Add event listeners to tab buttons
tabBtns.forEach(btn => {
    btn.addEventListener('click', switchTab);
});

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
});

// Initialize gallery lightbox
initLightbox();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements that should animate when scrolled into view
document.querySelectorAll('.feature-card, .team-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Page load animations
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
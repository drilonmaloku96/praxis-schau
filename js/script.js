// Website functionality for Praxis website

// Configuration - Easy to modify for beginners
const CONFIG = {
    // Counter values
    experienceYears: new Date().getFullYear() - 1996,
    patientsCount: 20000,
    
    // Geschichte und Philosophie content - Easy to add more entries
    contentBlocks: [
        {
            title: "Unsere Geschichte",
            text: "Seit über 25 Jahren sind wir Ihre Experten für Kieferorthopädie. Was als kleine Praxis begann, hat sich zu einer modernen Klinik entwickelt, die auf dem neuesten Stand der Technik ist.",
            imagePath: "images/geschichte1.jpg",
            imageAlt: "Praxis Geschichte"
        },
        {
            title: "Unsere Philosophie",
            text: "Wir glauben an eine ganzheitliche Behandlung, die nicht nur das perfekte Lächeln zum Ziel hat, sondern auch die Gesundheit und das Wohlbefinden unserer Patienten im Blick behält.",
            imagePath: "images/philosophie1.jpg",
            imageAlt: "Unsere Philosophie"
        },
        {
            title: "Moderne Technik",
            text: "Mit modernster 3D-Diagnostik und digitalen Behandlungsmethoden können wir präzise Planungen erstellen und unseren Patienten optimale Ergebnisse bieten.",
            imagePath: "images/technik1.jpg",
            imageAlt: "Moderne Technik"
        }
        // Add more content blocks here by copying the structure above
    ]
};

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation highlighting
    initNavigationHighlight();
    
    // Initialize counters with intersection observer for smooth experience
    initCounters();
    
    // Initialize hamburger menu
    initHamburgerMenu();
});

// Navigation highlighting
function initNavigationHighlight() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Animated counters
function initCounters() {
    const experienceCounter = document.getElementById('experience-counter');
    const patientsCounter = document.getElementById('patients-counter');
    
    if (experienceCounter && patientsCounter) {
        // Check if elements are in viewport before animating
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(experienceCounter, CONFIG.experienceYears, 2000);
                    animateCounter(patientsCounter, CONFIG.patientsCount, 2500);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(document.querySelector('.stats'));
    }
}

// Counter animation function
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Generate content blocks for Geschichte und Philosophie
function initContentBlocks() {
    const contentContainer = document.getElementById('content-blocks');
    if (!contentContainer) return;
    
    CONFIG.contentBlocks.forEach((block, index) => {
        const blockElement = createContentBlock(block, index % 2 === 1);
        contentContainer.appendChild(blockElement);
    });
}

// Create individual content block
function createContentBlock(blockData, isReverse) {
    const blockDiv = document.createElement('div');
    blockDiv.className = `content-block ${isReverse ? 'reverse' : ''}`;
    
    const textDiv = document.createElement('div');
    textDiv.className = 'content-text';
    textDiv.innerHTML = `
        <h3>${blockData.title}</h3>
        <p>${blockData.text}</p>
    `;
    
    const imageDiv = document.createElement('div');
    imageDiv.className = 'content-image';
    
    // Create image with fixed dimensions to prevent layout shift
    const img = document.createElement('img');
    img.alt = blockData.imageAlt;
    img.style.width = '100%';
    img.style.height = '300px';
    img.style.objectFit = 'cover';
    img.style.backgroundColor = '#f8f9fa';
    img.src = `https://via.placeholder.com/500x300/5a7a9b/ffffff?text=${encodeURIComponent(blockData.imageAlt)}`;
    
    img.onerror = function() {
        this.src = `https://via.placeholder.com/500x300/5a7a9b/ffffff?text=${encodeURIComponent(blockData.imageAlt)}`;
    };
    
    imageDiv.appendChild(img);
    blockDiv.appendChild(textDiv);
    blockDiv.appendChild(imageDiv);
    
    return blockDiv;
}

// Initialize placeholder images for missing images
function initPlaceholderImages() {
    const clinicImage = document.getElementById('clinic-image');
    if (clinicImage) {
        // Set placeholder immediately to prevent layout shift
        clinicImage.src = 'https://via.placeholder.com/600x400/5a7a9b/ffffff?text=Unser+Praxisteam';
        clinicImage.style.width = '100%';
        clinicImage.style.height = '400px';
        clinicImage.style.objectFit = 'cover';
        clinicImage.style.backgroundColor = '#f8f9fa';
        
        clinicImage.onerror = function() {
            this.src = 'https://via.placeholder.com/600x400/5a7a9b/ffffff?text=Unser+Praxisteam';
        };
    }
}

// Form validation for CMD page
function validateCMDForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--desaturated-red)';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });
    
    return isValid;
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    if (validateCMDForm(form)) {
        // Here you would typically send the data to a server
        alert('Vielen Dank für Ihre Eingaben. Wir werden uns schnellstmöglich bei Ihnen melden.');
        form.reset();
    } else {
        alert('Bitte füllen Sie alle erforderlichen Felder aus.');
    }
}

// Dropdown functionality
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        const content = dropdown.querySelector('.dropdown-content');
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
        if (!dropdown.parentElement.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
});

// Simple anchor link handling
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView();
        }
    }
});

// Hamburger menu functionality
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close mobile menu on window resize if screen becomes large
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Export functions for global use
window.validateCMDForm = validateCMDForm;
window.handleFormSubmit = handleFormSubmit;
window.toggleDropdown = toggleDropdown;
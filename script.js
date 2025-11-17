// Main JavaScript functionality for Paws & Claws Wildlife Rescue
// Part 3 Implementation - Enhanced Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Paws & Claws Wildlife Rescue - JavaScript loaded');
    
    // Initialize all interactive components
    initAccordions();
    initGalleryLightbox();
    initFormValidations();
    initSearchFunctionality();
    initAnimations();
    initMap();
    initSmoothScroll();
});

// 1. Accordion Functionality for FAQ Section
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            
            // Toggle current accordion
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordions first
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });
            
            // Open current one if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            }
        });
    });
}

// 2. Gallery Lightbox Implementation
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox) return;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// 3. Form Validation Functions
function initFormValidations() {
    // Volunteer Form Validation
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateVolunteerForm()) {
                processVolunteerForm();
            }
        });
        
        // Real-time validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    showError(this, 'Please enter a valid email address');
                }
            });
        }
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                processContactForm();
            }
        });
    }
}

// 4. Search Functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');
    
    if (!searchResults) return;
    
    if (searchTerm.length < 2) {
        searchResults.innerHTML = '<p class="search-message">Please enter at least 2 characters to search.</p>';
        return;
    }
    
    // Show loading state
    searchResults.innerHTML = '<p class="search-message">Searching...</p>';
    
    // Simulate API call delay
    setTimeout(() => {
        const results = searchContent(searchTerm);
        displaySearchResults(results);
    }, 500);
}

function searchContent(term) {
    // Mock data - in real implementation, this would query a database
    const content = [
        { 
            title: "Wildlife Rescue Services", 
            page: "services.html", 
            excerpt: "Our emergency wildlife rescue services operate 24/7 across the Western Cape. We respond to calls about injured, orphaned, or distressed indigenous wildlife.",
            category: "Services"
        },
        { 
            title: "Volunteer Opportunities", 
            page: "enquiry.html", 
            excerpt: "Join our team of dedicated wildlife volunteers. We need help with animal care, rescue response, education programs, and facility maintenance.",
            category: "Get Involved"
        },
        { 
            title: "Animal Rehabilitation Process", 
            page: "services.html", 
            excerpt: "Professional rehabilitation services for injured wildlife including medical treatment, recovery care, and pre-release conditioning.",
            category: "Services"
        },
        { 
            title: "Emergency Rescue Hotline", 
            page: "contact.html", 
            excerpt: "24/7 emergency hotline for wildlife rescues. Call +27 82 123 4567 for immediate assistance with injured or distressed animals.",
            category: "Contact"
        },
        { 
            title: "Educational Programs", 
            page: "about.html", 
            excerpt: "We offer educational programs for schools and community groups to raise awareness about wildlife conservation and coexistence.",
            category: "Education"
        }
    ];
    
    return content.filter(item => 
        item.title.toLowerCase().includes(term) || 
        item.excerpt.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="search-message">No results found. Please try different keywords.</p>';
        return;
    }
    
    let html = '<div class="search-results-header">';
    html += `<h3>Found ${results.length} result${results.length !== 1 ? 's' : ''}</h3>`;
    html += '</div>';
    
    results.forEach(result => {
        html += `
            <div class="search-result-item">
                <h4><a href="${result.page}">${result.title}</a></h4>
                <span class="search-category">${result.category}</span>
                <p>${result.excerpt}</p>
            </div>
        `;
    });
    
    searchResults.innerHTML = html;
}

// 5. Scroll Animations
function initAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    animateOnScroll();
}

// 6. Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 7. Interactive Map (using Leaflet.js)
function initMap() {
    if (document.getElementById('map')) {
        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            console.warn('Leaflet.js not loaded - map functionality disabled');
            return;
        }
        
        // Initialize map centered on Cape Town
        const map = L.map('map').setView([-33.918861, 18.423300], 11);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);
        
        // Define custom icons
        const rescueIcon = L.divIcon({
            className: 'custom-rescue-icon',
            html: '<i class="fas fa-plus-circle"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        const educationIcon = L.divIcon({
            className: 'custom-education-icon',
            html: '<i class="fas fa-graduation-cap"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        // Add markers for locations
        const locations = [
            {
                coords: [-33.818861, 18.423300],
                title: "Main Rehabilitation Center",
                description: "123 Conservation Road, Table View, Cape Town. Our primary facility for wildlife care and rehabilitation.",
                icon: rescueIcon,
                type: "rescue"
            },
            {
                coords: [-33.8900, 18.5172],
                title: "Education & Outreach Center", 
                description: "45 Wildlife Way, Century City, Cape Town. Visit for educational programs and community events.",
                icon: educationIcon,
                type: "education"
            },
            {
                coords: [-33.9270, 18.4150],
                title: "Wildlife Rescue Outpost",
                description: "27 Nature Trail, Bloubergstrand. Satellite facility for emergency response in the Northern suburbs.",
                icon: rescueIcon,
                type: "rescue"
            }
        ];
        
        locations.forEach(location => {
            L.marker(location.coords, { icon: location.icon })
                .addTo(map)
                .bindPopup(`
                    <div class="map-popup">
                        <h4>${location.title}</h4>
                        <p>${location.description}</p>
                        <small>Type: ${location.type === 'rescue' ? 'Rescue Facility' : 'Education Center'}</small>
                    </div>
                `);
        });
        
        // Add click event to map container to ensure it loads properly
        document.getElementById('map').addEventListener('click', function() {
            map.invalidateSize();
        });
    }
}

// FORM VALIDATION FUNCTIONS
function validateVolunteerForm() {
    const form = document.getElementById('volunteerForm');
    let isValid = true;
    
    // Clear previous errors
    clearErrors(form);
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    const email = document.getElementById('email');
    if (email && email.value && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    const phone = document.getElementById('phone');
    if (phone && phone.value && !isValidPhone(phone.value)) {
        showError(phone, 'Please enter a valid South African phone number');
        isValid = false;
    }
    
    // Motivation text length validation
    const motivation = document.getElementById('motivation');
    if (motivation && motivation.value.length < 50) {
        showError(motivation, 'Please provide more details (at least 50 characters)');
        isValid = false;
    }
    
    return isValid;
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    let isValid = true;
    
    clearErrors(form);
    
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        }
    });
    
    const email = document.getElementById('contactEmail');
    if (email && email.value && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    const message = document.getElementById('message');
    if (message && message.value.length < 20) {
        showError(message, 'Please provide a more detailed message (at least 20 characters)');
        isValid = false;
    }
    
    return isValid;
}

// HELPER FUNCTIONS
function showError(field, message) {
    field.classList.add('error');
    let errorElement = field.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearErrors(form) {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
    
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    // South African phone number validation
    const re = /^(\+27|0)[6-8][0-9]{8}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// FORM PROCESSING FUNCTIONS
function processVolunteerForm() {
    const form = document.getElementById('volunteerForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification(
            'Thank you for your volunteer application! Our team will review your information and contact you within 2-3 business days.', 
            'success'
        );
        
        // Reset form
        form.reset();
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Log for demonstration (in real implementation, send to server)
        console.log('Volunteer application submitted:', data);
        
    }, 2000);
}

function processContactForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate email sending
    setTimeout(() => {
        const emailBody = `
            New Contact Form Submission from Paws & Claws Website:
            
            Name: ${data.contactName}
            Email: ${data.contactEmail}
            Phone: ${data.contactPhone || 'Not provided'}
            Subject: ${data.subject}
            Message: ${data.message}
            
            Submitted on: ${new Date().toLocaleString()}
        `;
        
        showNotification(
            'Your message has been sent successfully! We will respond to your inquiry as soon as possible.', 
            'success'
        );
        
        // Reset form
        form.reset();
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Log for demonstration
        console.log('Contact form submission ready for email:', emailBody);
        
    }, 1500);
}

// NOTIFICATION SYSTEM
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add show class after a delay for animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close button event
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Add this to initialize when page loads
console.log('Paws & Claws Wildlife Rescue - Part 3 JavaScript initialized');